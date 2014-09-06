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
        controller: 'homeController'
      }).
      when('/products', {
        templateUrl: 'templates/products.html',
        controller: 'productsController',
        resolve: {
          productsData: function (productsDataService) {
              return productsDataService.getItems().
                then(function (response) {
                  return response.data;
              });
          }
        }
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
 
storeApp.factory('productsDataService', function ($http) {
  return {
      getItems: function () {
          return $http.get('js/data.js');
      }
  };
});
 
storeApp.controller('homeController', function($scope) {
     
    $scope.title = 'This is the home view';
    
});
 
storeApp.controller('productsController', function($scope, productsData) {

  $scope.title = 'This is the products view';

  $scope.products = productsData.products;

});

/* only show products that are in stock */
storeApp.filter('filterInStock', function () {
  
  return function(products) {
    var filtered = [];
      for (var i = products.length - 1; i >= 0; i--) {
        if (products[i].inStock === true) {
          filtered.push(products[i]);
        };
      };
      return filtered;
    }

});