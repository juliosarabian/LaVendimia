LaVendimiApp.controller("articuloController", ['$scope', '$http', '$stateParams', '$state', 'ArticuloService', 'FolioService', '$window', function ($scope, $http, $stateParams, $state, ArticuloService, FolioService, $window) {
    $scope.init = function () {
        // actualizar
        if ($stateParams.id > 0) {
            $scope.titulo = 'Editar articulo';

            // cargar datos
            var promiseArticulo = ArticuloService.Buscar($stateParams.id);
            promiseArticulo.then(function (articulo) {
                $scope.folio = articulo.id;
                $scope.articulo = articulo;
            },
            function () {
                alert('Error al buscar articulo.');
            });
        }

            // registrar
        else {
            $scope.titulo = 'Registrar articulo';

            // obtener folio
            var promiseFolio = FolioService.Obtener(1);
            promiseFolio.then(function (folio) {
                $scope.folio = folio;
            },
            function () {
                alert('Error al obtener folio.');
            });
        }
    };

    $scope.Guardar = function (articulo) {
        if (articulo.id > 0) {
            var promisearticulo = ArticuloService.Actualizar(articulo);
            promisearticulo.then(function (resultado) {
                $state.go("articulos");
                alert(resultado);
            },
            function () {
                alert('error al actualizar articulo.');
            });
        }
        else {
            if ($scope.folio > 0) {
                articulo.id = $scope.folio;

                var promiseArticulo = ArticuloService.Guardar(articulo);
                promiseArticulo.then(function (resultado) {
                    $state.go("articulos");
                    alert(resultado);
                },
                function () {
                    alert('error al guardar articulo.');
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
            $state.go("articulos");
        }
    };

    $scope.init();
}]);