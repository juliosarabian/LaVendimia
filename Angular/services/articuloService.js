LaVendimiApp.service('ArticuloService', function ($http)
{
    this.Listar = function () {
        var url = 'Articulos/listar';

        return $http.get(url)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al listar articulos.';
        });
    };

    this.Buscar = function (id) {
        var url = 'Articulos/buscar/' + id;

        return $http.get(url)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al buscar articulo.';
        });
    };

    this.Guardar = function (articulo) {
        var url = 'Articulos/registrar';
        var parametros = articulo;

        return $http.post(url, parametros)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al guardar articulo.';
        });
    };

    this.Actualizar = function (articulo) {
        var url = 'Articulos/actualizar';
        var parametros = articulo;

        return $http.put(url, parametros)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al actualizar articulo.';
        });
    };
});