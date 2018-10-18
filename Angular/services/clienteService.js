LaVendimiApp.service('ClienteService', function ($http)
{
    this.Listar = function () {
        var url = 'Clientes/listar';

        return $http.get(url)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al listar clientes.';
        });
    };

    this.Buscar = function (id) {
        var url = 'Clientes/buscar/' + id;

        return $http.get(url)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al buscar cliente.';
        });
    };

    this.Guardar = function (cliente) {
        var url = 'Clientes/registrar';
        var parametros = cliente;

        return $http.post(url, parametros)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al guardar cliente.';
        });
    };

    this.Actualizar = function (cliente) {
        var url = 'Clientes/actualizar';
        var parametros = cliente;

        return $http.put(url, parametros)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al actualizar cliente.';
        });
    };
});