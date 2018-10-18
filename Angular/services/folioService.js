LaVendimiApp.service('FolioService', function ($http)
{
    this.Obtener = function (id) {
        var url = 'Folios/obtener/' + id;

        return $http.put(url)
        .then(function (response) {
            return response.data;
        },
        function () {
            return 'Error al obtener folio.';
        });
    };
});