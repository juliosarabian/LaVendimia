LaVendimiApp.controller("ventasController", ['$scope', '$http', '$state', 'VentaService', function ($scope, $http, $state, VentaService)
{
    $scope.Nueva = function ()
    {
        $state.go("venta");
    };

    $scope.init = function ()
    {
        var promiseVentas = VentaService.Listar();
        promiseVentas.then(function (ventas)
        {
            console.log(ventas);
            $scope.ventas = ventas;
        },
        function ()
        {
            alert('Error al listar ventas.');
        });
    };

    $scope.init();
}]);