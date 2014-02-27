var app = angular.module('ng-app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .otherwise({redirectTo:'/'});
}]);