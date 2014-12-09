'use strict';

/* App Module */

var obeshoApp = angular.module('obeshoApp', [
  'ngRoute',
  //'obeshoAnimations',

  'obeshoControllers',
  'obeshoFilters',
  'obeshoServices'
]);

obeshoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/catalog', {
        templateUrl: 'partials/catalog.html',
        controller: 'CatalogCtrl'
      }).
      when('/catalog/:orderId', {
        templateUrl: 'partials/catalog.html',
        controller: 'CatalogCtrl'
      }).
      when('/order/:orderId', {
        templateUrl: 'partials/cart.html',
        controller: 'CartDetailCtrl'
      }).
      otherwise({
        redirectTo: '/catalog'
      });
  }]);
