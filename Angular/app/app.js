var LaVendimiApp = angular.module("LaVendimiApp", ['ui.router', 'ui.bootstrap']);

LaVendimiApp.config(function ($stateProvider, $urlRouterProvider)
{
    //$urlRouterProvider.otherwise('/inicio');
    $urlRouterProvider.when("", "/inicio");

    $stateProvider

    // inicio    
    .state('inicio',
    {
        url: '/inicio',
        templateUrl: 'Inicio/Index',
        controller: 'inicioController'
    })

    // articulos
    .state('articulos',
    {
        url: '/articulos',
        templateUrl: 'Articulos/Index',
        controller: 'articulosController'
    })
    .state('articulo',
    {
        url: '/articulo?id',
        templateUrl: 'Articulos/Editar',
        controller: 'articuloController'
    })

    // clientes
    .state('clientes',
    {
        url: '/clientes',
        templateUrl: 'Clientes/Index',
        controller: 'clientesController'
    })
    .state('cliente',
    {
        url: '/cliente?id',
        templateUrl: 'Clientes/Editar',
        controller: 'clienteController'
    })

    // configuracion
    .state('configuracion',
    {
        url: '/configuracion',
        templateUrl: 'Configuracion/Index',
        controller: 'configuracionController'
    })

    // ventas
    .state('ventas',
    {
        url: '/ventas',
        templateUrl: 'Ventas/Index',
        controller: 'ventasController'
    })
    .state('venta',
    {
        url: '/venta',
        templateUrl: 'Ventas/Nueva',
        controller: 'ventaController'
    })

});