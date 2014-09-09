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
      otherwise({
        redirectTo: '/'
      });
}]);
 

storeApp.factory('productsDataService', function ($http, $q) {
  return {
    getProducts: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('js/data.js')
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
      for (var i = $scope.products.length - 1; i >= 0; i--) {
        if ($scope.products[i].id === $routeParams.id) {
          return $scope.products[i];
        }
      };
    };

    $scope.product = $scope.getProductByID();

    $rootScope.pageTitle = $scope.product.name;

});

/* only show products that are in stock */
storeApp.filter('filterInStock', function () {
  
  return function(products, inStockFilterEnabled) {

    if (inStockFilterEnabled) {
      var filtered = [];
      for (var i = products.length - 1; i >= 0; i--) {
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




