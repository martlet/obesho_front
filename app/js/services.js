'use strict';

/* Services */

var backApiUrl = 'http://localhost:17489';
var obeshoServices = angular.module('obeshoServices', ['ngResource']);
/*
obeshoServices.factory('Size', ['$resource',
  function($resource){
    return $resource('http://localhost:8000/sizes', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
*/
obeshoServices.factory('Catalog', ['$resource',
  function($resource){
    return $resource(backApiUrl + '/catalog/', {}, {
      query: {method:'GET' /*, isArray:true*/}
    });
  }]);

obeshoServices.factory('Order', ['$resource',
  function($resource){
    return $resource(backApiUrl + '/order/', {}, {
      query: {method:'POST' /*, isArray:true*/}
    });
  }]);

obeshoServices.factory('OrderItem', ['$resource',
  function($resource){
    return $resource(backApiUrl + '/orderitem/', {}, {
      query: {method:'POST' /*, isArray:true*/},
      osave: {method: 'POST', headers: {abc: 'def'} }
    }, {
      stripTrailingSlashes: false
    });
  }]);
/*
obeshoServices.factory('AvailableSize', ['$resource',
  function($resource){
    return $resource('http://localhost:8000/models', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
  */
