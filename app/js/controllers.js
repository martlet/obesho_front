'use strict';

/* Controllers */

var obeshoControllers = angular.module('obeshoControllers', []);

obeshoControllers.controller('CatalogCtrl', ['$scope', 'Catalog',
  function($scope, Catalog) {
    $scope.alertType = '';
    $scope.alertText = '';

    var data = Catalog.query(function (data) {
      $scope.models = data['models']
      $scope.sizes = data['size']
    }, function (r) {
      $scope.showError(r.statusText);
    });

    $scope.order = { id: null, 'items': [], itemCount: 0, totalAmount: 0.0 }

    $scope._sum = function (arr, prop) {
      return arr.reduce(function (a, b) {
        return a + b[prop];
      }, 0);
    };

    //$scope.order.itemCount = $scope._sum($scope.order.items, 'qty');
    $scope.$watch('order.items', function (newValue /*, oldValue*/) {
      $scope.order.itemCount = $scope._sum(newValue, 'qty');
    }, true);

    $scope.showError = function(text) {
      $scope.alertText = text;
      $scope.alertType = 'error';
    };

    $scope.clearAlert = function() {
      $scope.alertType = '';
      $scope.alertText = '';
    };
  }]);

obeshoControllers.controller('CatalogItemCtrl', ['$scope', 'OrderItem',
  function($scope, OrderItem) {
    $scope.reflectChangedSize = function (size) {
      $scope.clearAlert();
      $scope.isAvailable = $scope._isAvailable();
    };

    $scope._isAvailable = function () {
      if (!$scope.model.size) {
        return false;
      }
      var r = $.grep($scope.model.available_sizes, function (item) {
        return item['size_id'] == $scope.model.size.size_id;
      });
      //console.log(r && r[0]['qty'])  // TODO: line: remove in final
      return r.length && r[0]['qty'];
    };

    $scope.addToOrder = function(modelId, sizeId) {
      // There are three distinct situations:
      // 1) Adding a new instance of model+size to a new order (it didn't exist previously).
      // 2) Adding a new instance of model+size to an already started order.
      // 3) Increasing the quantity of a model+size in an already started order.
      // There are two approaches to handling these situations:
      // 1) Handle each situation in its own function.
      // 2) Handle all three situations in the same function. The latter is attempted here.
      var qty = 1;
      $scope.clearAlert();
      var orderItem = new OrderItem({order_id: $scope.order.id, model_id: modelId, size_id: sizeId});
      orderItem.$save(function (r) {
        if (orderItem.order_id == null) {
          console.log('start new order with ID: ', r.order_item.order_id);
        }

        $scope.order.id = r.order_item.order_id;

        var x1 = $.grep($scope.order.items, function(item) {
          return item.model_id == modelId && item.size_id == sizeId;
        });
        if (x1.length) {
          x1[0].qty += qty;
        } else {
          $scope.order.items.push({model_id: modelId, size_id: sizeId, qty: qty});
        }

        // Decrease the available quantity.
        var t = $.grep($scope.model.available_sizes, function (item) {
          return item['size_id'] == $scope.model.size.size_id;
        });
        if (t.length) {
          t[0].qty -= qty;
          $scope.isAvailable = $scope._isAvailable();  // Recalculate operation's applicability.
        }

        console.log(r);  // TODO: line: remove in final
      }, function (r) {
          $scope.showError(r.statusText);
      });
    };
        
    $scope.isAvailable = $scope._isAvailable();
  }]);

obeshoControllers.controller('OrderCtrl', ['$scope', '$routeParams', 'Order',
  function($scope, $routeParams, Order) {
    /*
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }*/
  }]);
