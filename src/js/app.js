var app = angular.module('ng-app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .otherwise({redirectTo:'/'});
}])
  .run(['$rootScope', function ($rootScope) {

    var _getTopScope = function () {
      return $rootScope;
    };

    $rootScope.ready = function () {
      var $scope = _getTopScope();
      $scope.status = 'ready';
      if (!$scope.$$phase) $scope.$apply();
    };
    $rootScope.loading = function () {
      var $scope = _getTopScope();
      $scope.status = 'loading';
      if (!$scope.$$phase) $scope.$apply();
    };
    $rootScope.$on('$routeChangeStart', function () {
      _getTopScope().loading();
    });

    $rootScope.seo = [];
  }]);