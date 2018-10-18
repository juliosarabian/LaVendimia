LaVendimiApp.service('ConfiguracionService', function ($http)
{
    this.Buscar = function () {
        return $http.get('Configuracion/buscar')
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al buscar configuracion.';
        });
    };

    this.Actualizar = function (configuracion) {
        var url = 'Configuracion/actualizar';
        var parametros = configuracion;

        return $http.put(url, parametros)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al actualizar configuracion.';
        });
    };
});