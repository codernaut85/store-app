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
        controller: 'productsController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
 
 
storeApp.controller('homeController', function($scope) {
     
    $scope.title = 'This is the home view';
    
});
 
 
storeApp.controller('productsController', function($scope) {
 
    $scope.title = 'This is the products view';

    $scope.products = [
      {
        "name" : "Alien",
        "price" : "14.99",
        "inStock" : true
      },
      {
        "name" : "Blade Runner",
        "price" : "13.99",
        "inStock" : true
      },
      {
        "name" : "2001: A Space Odyssey",
        "price" : "11.99",
        "inStock" : false
      }
    ];

});

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