LaVendimiApp.controller("ventaController", ['$scope', '$http', '$stateParams', '$state', 'VentaService', 'FolioService', 'ClienteService', 'ArticuloService', 'ConfiguracionService', '$window', function ($scope, $http, $stateParams, $state, VentaService, FolioService, ClienteService, ArticuloService, ConfiguracionService, $window) {
    var vm = $scope;

    vm.init = function () {
        vm.titulo = 'Registrar venta';

        // obtener folio
        var promiseFolio = FolioService.Obtener(3);
        promiseFolio.then(function (folio) {
            vm.folio = folio;
        },
        function () {
            alert('Error al obtener folio.');
        });

        // obtener clientes
        var promiseClientes = ClienteService.Listar();
        promiseClientes.then(function (clientes) {
            vm.clientes = clientes;
        },
        function () {
            alert('Error al listar clientes.');
        });

        // obtener articulos
        var promiseArticulos = ArticuloService.Listar();
        promiseArticulos.then(function (articulos) {
            vm.articulos = articulos;
        },
        function () {
            alert('Error al listar articulos.');
        });

        // obtener configuracion
        var promiseConfiguracion = ConfiguracionService.Buscar();
        promiseConfiguracion.then(function (configuracion) {
            vm.configuracion = configuracion;
        },
        function () {
            alert('Error al buscar configuracion.');
        });

        vm.articulosAgregados = [];

        vm.venta = {};
        vm.venta.detalle = [];

        vm.plazos = [3, 6, 9, 12];

        vm.opciones = [];

        vm.opcion = {};

        vm.datosValidos = false;

        vm.desactivarTablaArticulos = false;

        vm.mostrarBotones1 = true;

        vm.mostrarBotones2 = false;

        vm.mostrarOpciones = false;

        vm.mensaje = '';
    };

    vm.Registrar = function () {
        if (vm.datosValidos = true) {
            if (vm.opcion.plazo > 0) {
                vm.validarDatos();

                vm.venta.id = vm.folio;
                vm.venta.fecha = new Date();
                vm.venta.cliente_id = vm.cliente.id;
                vm.venta.cliente_nombre = vm.cliente.nombre + ' ' + vm.cliente.paterno + ' ' + vm.cliente.materno;
                vm.venta.total = vm.venta.subtotal - vm.venta.enganche - vm.venta.bonificacion;
                vm.venta.plazos = vm.opcion.plazo;
                vm.venta.tasa_financiamiento = vm.configuracion.tasa_financiamiento;
                vm.venta.porcentaje_enganche = vm.configuracion.porcentaje_enganche;
                vm.venta.enganche = vm.venta.subtotal * (vm.configuracion.porcentaje_enganche / 100);
                vm.venta.bonificacion = vm.venta.enganche * ((vm.configuracion.tasa_financiamiento * vm.configuracion.plazos_maximos) / 100);
                vm.venta.estatus = true;

                console.log(vm.venta);

                if (vm.venta.id > 0) {
                    var promiseVenta = VentaService.Registrar(vm.venta);
                    promiseVenta.then(function (resultado) {
                        angular.forEach(vm.articulosAgregados, function (value, key) {
                            vm.venta.detalle.push({
                                venta_id: vm.venta.id,
                                articulo_id: value.id,
                                cantidad: value.cantidad
                            });
                        });

                        console.log(vm.venta.detalle);

                        // registrar ventas detalle
                        var promiseVentaDetalle = VentaService.RegistrarDetalle(vm.venta.detalle);
                        promiseVentaDetalle.then(function (resultado)
                        {
                            $state.go("ventas");
                            alert('Venta registrada exitosamente.');
                        },
                        function () {
                            alert('error al registrar venta.');
                        });
                    },
                    function () {
                        alert('error al registrar venta.');
                    });
                }
                else {
                    alert('Error al registrar venta.');
                }
            }
            else {
                alert('Debe seleccionar una opcion de plazos.');
            }
        }
        else {
            alert('Uno o mas datos no son validos.');
        }
    };

    vm.Confirmar = function () {
        respuesta = $window.confirm('¿Está seguro de cancelar la operación?');

        if (respuesta) {
            $state.go("ventas");
        }
    };

    vm.clienteSeleccionado = '';

    vm.articuloSeleccionado = '';

    vm.onSelectCliente = function ($item) {
        if ($item) {
            vm.cliente = $item;
            vm.mostrarBotonCliente = true;
        }
    };

    vm.onSelectArticulo = function ($item) {
        vm.articulo = $item;
    };

    vm.filter = {};

    vm.formatoClientes = function (id) {
        var displayText;

        angular.forEach(vm.clientes, function (cliente) {
            if (cliente.id === id) {
                displayText = ('000' + cliente.id).slice(-4) + ' - ' + cliente.nombre + ' ' + cliente.paterno + ' ' + cliente.materno;
                return;
            }
        });

        return displayText ? displayText : id;
    };

    vm.formatoArticulos = function (id) {
        var displayText;

        angular.forEach(vm.articulos, function (articulo) {
            if (articulo.id === id) {
                displayText = ('000' + articulo.id).slice(-4) + ' - ' + articulo.descripcion + ' ' + articulo.modelo;
                return;
            }
        });

        return displayText ? displayText : id;
    };

    vm.destruirCliente = function () {
        vm.cliente = null;
        vm.clienteSeleccionado = '';
    };

    vm.destruirArticulo = function () {
        vm.articulo = null;
        vm.articuloSeleccionado = '';
    };

    vm.agregarArticulo = function () {
        if (vm.articulo) {
            // validar la existencia
            if (vm.articulo.existencia > 0) {
                // actualizar precio articulo
                vm.articulo.cantidad = 1;
                vm.articulo.precioModificado = vm.articulo.precio * (1 + (vm.configuracion.tasa_financiamiento * vm.configuracion.plazos_maximos) / 100);

                vm.articulo.importe = vm.articulo.cantidad * vm.articulo.precioModificado;

                if (vm.articulosAgregados.includes(vm.articulo) === false) {
                    vm.articulosAgregados.push(vm.articulo);
                    vm.destruirArticulo();
                    vm.actualizarCalculos();
                }
            }
            else {
                vm.destruirArticulo();
                vm.actualizarCalculos();
                alert('El articulo seleccionado no tiene existencias.');
            }
        }
        else {
            vm.actualizarCalculos();
            alert('Debe seleccionar un articulo antes de agregarlo.');
        }
    }

    vm.quitarArticulo = function (articulo) {
        var index = vm.articulosAgregados.indexOf(articulo);

        if (index !== -1) {
            vm.articulosAgregados.splice(index, 1);
            vm.actualizarCalculos();
        }
    };

    vm.validarDatos = function () {
        if (vm.cliente) {
            if (vm.cliente.id) {
                // validar cliente
                if (vm.cliente.id > 0) {
                    // validar si hay articulos para cobrar
                    if (vm.articulosAgregados) {
                        if (vm.articulosAgregados.length > 0) {
                            var checkCantidad = true;
                            var checkPrecio = true;
                            var checkImporte = true;

                            vm.venta.subtotal = 0;

                            // validar grid
                            angular.forEach(vm.articulosAgregados, function (value, key) {
                                // cantidad
                                if (value.cantidad) {
                                    if (value.cantidad > 0) {

                                    }
                                    else {
                                        checkCantidad = false;
                                    }
                                }
                                else {
                                    checkCantidad = false;
                                }

                                // precio
                                if (value.precioModificado) {
                                    if (value.precioModificado > 0) {

                                    }
                                    else {
                                        checkPrecio = false;
                                    }
                                }
                                else {
                                    checkPrecio = false;
                                }

                                // importe
                                if (value.importe) {
                                    if (value.importe > 0) {
                                        vm.venta.subtotal = vm.venta.subtotal + value.importe;
                                    }
                                    else {
                                        checkImporte = false;
                                    }
                                }
                                else {
                                    checkImporte = false;
                                }
                            });

                            // cantidad
                            if (checkCantidad == true) {
                                // precio
                                if (checkPrecio == true) {
                                    // importe
                                    if (checkImporte == true) {
                                        vm.datosValidos = true;
                                    }
                                    else {
                                        vm.datosValidos = false;
                                        vm.mensaje = 'Uno o mas importes de articulo no son correctos.';
                                        alert(vm.mensaje);
                                    }
                                }
                                else {
                                    vm.datosValidos = false;
                                    vm.mensaje = 'Una o mas precios de articulos no son correctos.';
                                    alert(vm.mensaje);
                                }
                            }
                            else {
                                vm.datosValidos = false;
                                vm.mensaje = 'Una o mas cantidades de articulos no son correctas.';
                                alert(vm.mensaje);
                            }
                        }
                        else {
                            vm.datosValidos = false;
                            vm.mensaje = 'No hay articulos para cobrar.';
                            alert(vm.mensaje);
                        }
                    }
                    else {
                        vm.datosValidos = false;
                        vm.mensaje = 'No hay articulos para cobrar.';
                        alert(vm.mensaje);
                    }
                }
                else {
                    vm.datosValidos = false;
                    vm.mensaje = 'Debe seleccionar un cliente.';
                    alert(vm.mensaje);
                }
            }
            else {
                vm.datosValidos = false;
                vm.mensaje = 'Debe seleccionar un cliente.';
                alert(vm.mensaje);
            }
        }
        else {
            vm.datosValidos = false;
            vm.mensaje = 'Debe seleccionar un cliente.';
            alert(vm.mensaje);
        }
    };

    vm.actualizarCalculos = function () {
        vm.venta.subtotal = 0;
        vm.venta.enganche = 0;
        vm.venta.bonificacion = 0;
        vm.venta.total = 0;
        vm.venta.contado = 0;

        // recorrer grid
        angular.forEach(vm.articulosAgregados, function (value, key) {
            var cantidad = 0;
            if (value.cantidad) {
                if (value.cantidad > 0) {
                    cantidad = value.cantidad;
                }
            }

            var precioModificado = 0;
            if (value.precioModificado) {
                if (value.precioModificado > 0) {
                    precioModificado = value.precioModificado;
                }
            }

            vm.venta.subtotal = vm.venta.subtotal + (cantidad * precioModificado);
        });

        // enganche
        vm.venta.enganche = vm.venta.subtotal * (vm.configuracion.porcentaje_enganche / 100);

        // bonificacion
        vm.venta.bonificacion = vm.venta.enganche * ((vm.configuracion.tasa_financiamiento * vm.configuracion.plazos_maximos) / 100);

        // total
        vm.venta.total = vm.venta.subtotal - vm.venta.enganche - vm.venta.bonificacion;

        if (!vm.venta.total > 0) {
            vm.mostrarOpciones = false;
            vm.opciones = [];
            vm.mostrarBotones1 = true;
            vm.mostrarBotones2 = false;
        }
    }

    vm.crearOpciones = function () {
        vm.mostrarBotones1 = false;
        vm.mostrarBotones2 = true;

        angular.forEach(vm.plazos, function (value, key) {
            // contado
            var contado = vm.venta.total / (1 + ((vm.configuracion.tasa_financiamiento * vm.configuracion.plazos_maximos) / 100));

            // pagar
            var pagar = contado * (1 + (vm.configuracion.tasa_financiamiento * value) / 100);

            // abono
            var abono = pagar / value;

            var ahorro = vm.venta.total - pagar;

            vm.opciones.push({
                plazo: value,
                abono: abono,
                contado: contado,
                pagar: pagar,
                ahorro: ahorro
            });
        });

        if (vm.opciones.length > 0) {
            vm.mostrarOpciones = true;
        }
    };

    vm.calcularImporte = function (articulo) {
        articulo.importe = articulo.cantidad * articulo.precioModificado;

        vm.actualizarCalculos();
    }

    vm.seleccionarOpcion = function (opcion) {
        vm.opcion = {
            plazo: opcion.plazo,
            abono: opcion.abono,
            pagar: opcion.pagar,
            ahorro: opcion.ahorro,
        }
    }

    vm.init();

}]);