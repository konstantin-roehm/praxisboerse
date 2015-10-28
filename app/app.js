'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'ng.deviceDetector',
  'myApp.view1',
  'myApp.view2',
    'myApp.watchlistController',
 // 'myApp.companyDetailsController',
 // 'companyService',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
          })
          .when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
          })


          .when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
          })

          .when('/watchlist', {
            templateUrl: 'watchlist/watchlistView.html',
            controller: 'watchlistCtrl'
          })

      // .otherwise({redirectTo: 'view1'});

      // use the HTML5 History API
      //  $locationProvider.html5Mode(true);
}]);
