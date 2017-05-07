// public/js/appRoutes.js
    
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider

        .when('/', {
            templateUrl: 'templates/index.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'LoginController'
        })
        .when('/tenants', {
            templateUrl: 'templates/tenants.html',
            controller: 'TenantController'
        });
    $locationProvider.html5Mode(true);
}]);