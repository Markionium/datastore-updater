function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');

    $stateProvider
        .state('list', {
            url: '/list',
            templateUrl: 'views/list.html'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'views/add.html'
        })
        .state('edit', {
            url: '/edit',
            templateUrl: 'views/edit.html'
        })
        .state('restore', {
            url: '/restore',
            templateUrl: 'views/restore.html'
        });
}

angular.module('PEPFAR.datastore', [
     'ngAnimate',
     'ngMessages',
     'restangular',
     'dhis2.notify',
     'ui.select',
     'ui.bootstrap.collapse',
     'ui.bootstrap.pagination',
     'ui.bootstrap.tpls',
     'ui.bootstrap',
     'ui.bootstrap.modal',
     'ui.router'
]);

angular.module('PEPFAR.datastore')
    .config(routerConfig)
    .run(function (Restangular, webappManifest) {
        Restangular.setBaseUrl([webappManifest.activities.dhis.href, 'api'].join('/'));
    });

//==================================================================================
// Bootstrap the app manually
//
window.getBootstrapper('PEPFAR.datastore', document)
    .addInjectableFromRemoteLocation('webappManifest', 'manifest.webapp')
    .execute(function () {
        window.dhis2 = window.dhis2 || {};
        window.dhis2.settings = window.dhis2.settings || {};
        window.dhis2.settings.baseUrl = '/';
        //window.dhis2.settings.baseUrl = injectables.webappManifest.activities.dhis.href.replace(window.location.origin, '').replace(/^\//, '');
    })
    .loadStylesheet('/dhis-web-commons/css/menu.css')
    .loadScript('/dhis-web-commons/javascripts/dhis2/dhis2.util.js')
    .loadScript('/dhis-web-commons/javascripts/dhis2/dhis2.translate.js')
    .loadModule('/dhis-web-commons/javascripts/dhis2/dhis2.menu.js', 'd2HeaderBar')
    .loadScript('/dhis-web-commons/javascripts/dhis2/dhis2.menu.ui.js')
    .bootstrap();
