//Define an angular module for our app
var storeApp = angular.module('storeApp', [
  'ngRoute'
]);

storeApp.run(function($rootScope) {
    $rootScope.currency = '£';
})

//Define Routing for app
storeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeController',
        title: 'Home'
      }).
      when('/products', {
        templateUrl: 'templates/products.html',
        controller: 'productsController',
        title: 'Products',
        resolve: {
          productsData: function (productsDataService) {
              return productsDataService.getProducts()
              .then(function(data) {
                return data;
              }, function(error) {
                console.log(productsDataService.getProducts());
              });
          }
        }
      }).
      when('/products/:id', {
        templateUrl: 'templates/product.html',
        controller: 'productController',
        title: 'Product Details',
        resolve: {
          productsData: function (productsDataService) {
              return productsDataService.getProducts()
              .then(function(data) {
                return data;
              }, function(error) {
                console.log(productsDataService.getProducts());
              });
          }
        }
      }).
      when('/orders',{
        templateUrl: 'templates/orders.html',
        controller: 'ordersController',
        title: 'Orders',
        resolve: {
          ordersData: function (ordersDataService) {
              return ordersDataService.getOrders()
              .then(function(data) {
                return data;
              }, function(error) {
                console.log(ordersDataService.getOrders());
              });
          }
        }
      }).
      when('/orders/:id', {
        templateUrl: 'templates/order.html',
        controller: 'orderController',
        title: 'Order Details',
        resolve: {
          ordersData: function (ordersDataService) {
              return ordersDataService.getOrders()
              .then(function(data) {
                return data;
              }, function(error) {
                console.log(ordersDataService.getOrders());
              });
          }
        }
      }).
      when('/customers',{
        templateUrl: 'templates/customers.html',
        controller: 'customersController',
        title: 'Customers',
        resolve: {
          customersData: function (customersDataService) {
              return customersDataService.getCustomers()
              .then(function(data) {
                return data;
              }, function(error) {
                console.log(customersDataService.getCustomers());
              });
          }
        }
      }).
      when('/customers/:id', {
        templateUrl: 'templates/customer.html',
        controller: 'customerController',
        title: 'Customer',
        resolve: {
          customersData: function (customersDataService) {
              return customersDataService.getCustomers()
              .then(function(data) {
                return data;
              }, function(error) {
                console.log(customersDataService.getCustomers());
              });
          }
        }
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
 

storeApp.factory('productsDataService', function ($http, $q) {
  return {
    getProducts: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('js/product-data.js')
          .then(function(response) {
              if (typeof response.data === 'object') {
                  return response.data;
              } else {
                  // invalid response
                  return $q.reject(response.data);
              }

          }, function(response) {
              // something went wrong
              return $q.reject(response.data);
        });
    }
  };
});

storeApp.factory('ordersDataService', function ($http, $q) {
  return {
    getOrders: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('js/order-data.js')
          .then(function(response) {
              if (typeof response.data === 'object') {
                  return response.data;
              } else {
                  // invalid response
                  return $q.reject(response.data);
              }

          }, function(response) {
              // something went wrong
              return $q.reject(response.data);
        });
    }
  };
});

storeApp.factory('customersDataService', function ($http, $q) {
  return {
    getCustomers: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('js/customer-data.js')
          .then(function(response) {
              if (typeof response.data === 'object') {
                  return response.data;
              } else {
                  // invalid response
                  return $q.reject(response.data);
              }

          }, function(response) {
              // something went wrong
              return $q.reject(response.data);
        });
    }
  };
});



 
storeApp.controller('homeController', function($scope, $rootScope, $route) {
    $rootScope.pageTitle = $route.current.title;
});






 
storeApp.controller('productsController', function($scope, $rootScope, $route, productsData) {
  $rootScope.pageTitle = $route.current.title;
  $scope.title = 'Stock List';
  $scope.products = productsData.products;
  $scope.predicate = 'name';
  $scope.inStockFilterEnabled = true;
});

storeApp.controller('productController', function($scope, $rootScope, $route, $routeParams, productsData) {

    $scope.products = productsData.products;

    $scope.getProductByID = function () {
      var i = $scope.products.length - 1;
      for (i; i >= 0; i--) {
        if ($scope.products[i].id === $routeParams.id) {
          return $scope.products[i];
        }
      };
    };

    $scope.product = $scope.getProductByID();

    $rootScope.pageTitle = $scope.product.name;

});





storeApp.controller('ordersController', function($scope, $rootScope, $route, ordersData) {
  $rootScope.pageTitle = $route.current.title;
  $scope.title = 'Orders';
  $scope.orders = ordersData.orders;
});

storeApp.controller('orderController', function($scope, $rootScope, $route, $routeParams, ordersData) {

    $scope.orders = ordersData.orders;

    $scope.getOrderByID = function () {
      var i = $scope.orders.length - 1;
      for (i; i >= 0; i--) {
        if ($scope.orders[i].id === $routeParams.id) {
          return $scope.orders[i];
        }
      };
    };

    $scope.order = $scope.getOrderByID();

    $scope.orderTotal = function () {
      var orderTotal = 0,
          i = $scope.order.items.length - 1;
      for (i; i >= 0; i--) {
        orderTotal += parseFloat($scope.order.items[i].price);
      };
      return orderTotal;
    };

    $rootScope.pageTitle = $scope.order.name;

});




storeApp.directive('calculateOrderTotal', function() {
  return {
    template: '{{order.id}}'
  };
});



storeApp.controller('customersController', function($scope, $rootScope, $route, customersData) {
  $rootScope.pageTitle = $route.current.title;
  $scope.title = 'Customers';
  $scope.customers = customersData.customers;
});

storeApp.controller('customerController', function($scope, $rootScope, $route, $routeParams, customersData) {

    $scope.customers = customersData.customers;

    $scope.getCustomerByID = function () {
      var i = $scope.customers.length - 1;
      for (i; i >= 0; i--) {
        if ($scope.customers[i].id === $routeParams.id) {
          return $scope.customers[i];
        }
      };
    };

    $scope.customer = $scope.getCustomerByID();

    console.log($scope.customer);

    $rootScope.pageTitle = $scope.customer.firstName + ' ' + $scope.customer.lastName;

});









/* only show products that are in stock */
storeApp.filter('filterInStock', function () {
  
  return function(products, inStockFilterEnabled) {

    if (inStockFilterEnabled) {
      var filtered = [],
          i = products.length - 1;
      for (i; i >= 0; i--) {
        if (products[i].inStock === true) {
          filtered.push(products[i]);
        };
      };
      return filtered;
    } else {
      return products;
    }

  } 

});


