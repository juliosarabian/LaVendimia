LaVendimiApp.service('VentaService', function ($http)
{
    this.Listar = function ()
    {
        var url = 'Ventas/listar';

        return $http.get(url)
        .then(function (response)
        {
            return response.data;
        },
        function ()
        {
            return 'Error al listar ventas.';
        });
    };

    this.Registrar = function (venta)
    {
        var url = 'Ventas/registrar';
        var parametros = venta;

        return $http.post(url, parametros)
        .then(function (response)
        {
            return response.data;
        },
        function ()
        {
            return 'Error al guardar venta.';
        });
    };

    this.RegistrarDetalle = function (detalle)
    {
        var url = 'VentasDetalle/registrar';
        var parametros = detalle;

        return $http.post(url, parametros)
        .then(function (response)
        {
            return response.data;
        },
        function ()
        {
            return 'Error al guardar detalle de venta.';
        });
    };
});