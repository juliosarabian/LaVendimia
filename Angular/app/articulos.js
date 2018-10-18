LaVendimiApp.controller("articulosController", ['$scope', '$http', '$state', 'ArticuloService', function ($scope, $http, $state, ArticuloService)
{
    $scope.go = function (state) {
        $state.go(state);
    }

    $scope.Editar = function (id) {
        $state.go("articulo", { 'id': id });
    };

    $scope.init = function () {
        var promiseArticulos = ArticuloService.Listar();
        promiseArticulos.then(function (articulos) {
            $scope.articulos = articulos;
        },
        function () {
            alert('Error al listar articulos.');
        });
    };

    $scope.init();
}]);