LaVendimiApp.controller("clientesController", ['$scope', '$http', '$state', 'ClienteService', function ($scope, $http, $state, ClienteService)
{
    $scope.go = function (state) {
        $state.go(state);
    }

    $scope.Editar = function (id) {
        $state.go("cliente", { 'id': id });
    };

    $scope.init = function () {
        var promiseClientes = ClienteService.Listar();
        promiseClientes.then(function (clientes) {
            $scope.clientes = clientes;
        },
        function () {
            alert('Error al listar clientes.');
        });
    };

    $scope.init();
}]);