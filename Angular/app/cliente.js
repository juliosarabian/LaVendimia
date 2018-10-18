LaVendimiApp.controller("clienteController", ['$scope', '$http', '$stateParams', '$state', 'ClienteService', 'FolioService', '$window', function ($scope, $http, $stateParams, $state, ClienteService, FolioService, $window) {
    $scope.init = function () {
        // actualizar
        if ($stateParams.id > 0) {
            $scope.titulo = 'Editar cliente';

            // cargar datos
            var promiseCliente = ClienteService.Buscar($stateParams.id);
            promiseCliente.then(function (cliente) {
                $scope.folio = cliente.id;
                $scope.cliente = cliente;
            },
            function () {
                alert('Error al buscar cliente.');
            });
        }

            // registrar
        else {
            $scope.titulo = 'Registrar cliente';

            // obtener folio
            var promiseFolio = FolioService.Obtener(2);
            promiseFolio.then(function (folio) {
                $scope.folio = folio;
            },
            function () {
                alert('Error al obtener folio.');
            });
        }
    };

    $scope.Guardar = function (cliente) {
        if (cliente.id > 0) {
            var promiseCliente = ClienteService.Actualizar(cliente);
            promiseCliente.then(function (resultado) {
                $state.go("clientes");
                alert(resultado);
            },
            function () {
                alert('Error al actualizar cliente.');
            });
        }
        else {
            if ($scope.folio > 0) {
                cliente.id = $scope.folio;

                var promiseCliente = ClienteService.Guardar(cliente);
                promiseCliente.then(function (resultado) {
                    $state.go("clientes");
                    alert(resultado);
                },
                function () {
                    alert('Error al guardar cliente.');
                });
            }
            else {
                alert('Error al guardar cliente.');
            }
        }
    };

    $scope.Confirmar = function () {
        respuesta = $window.confirm('¿Está seguro de cancelar la operación?');

        if (respuesta) {
            $state.go("clientes");
        }
    };

    $scope.init();
}]);