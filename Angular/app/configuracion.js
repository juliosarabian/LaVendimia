LaVendimiApp.controller("configuracionController", ['$scope', '$http', 'ConfiguracionService', '$window', function ($scope, $http, ConfiguracionService, $window) {
    $scope.init = function () {
        $scope.editar = false;

        var promiseConfiguracion = ConfiguracionService.Buscar();
        promiseConfiguracion.then(function (configuracion) {
            $scope.configuracion = configuracion;
        },
        function () {
            alert('Error al buscar configuracion.');
        });
    };

    $scope.Editar = function () {
        $scope.editar = true;
    };

    $scope.Guardar = function (configuracion) {
        var promiseConfiguracion = ConfiguracionService.Actualizar(configuracion);
        promiseConfiguracion.then(function (resultado) {
            $scope.init();
            alert(resultado);
        },
        function () {
            alert('error al actualizar configuracion.');
        });
    };

    $scope.Confirmar = function () {
        respuesta = $window.confirm('¿Está seguro de cancelar la operación?');

        if (respuesta) {
            $scope.init();
        }
    };

    $scope.init();
}]);