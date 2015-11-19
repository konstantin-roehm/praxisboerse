'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ng.deviceDetector',
    'userService',
    'myApp.view1',
    'myApp.view2',
    'myApp.watchlistController',
    'watchlistService',
    'restService',
    'myApp.version'
]).
    run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.showSection = $location.path() !== "/view1";
        });
    }).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
          $locationProvider.html5Mode(true);


    }])
    .config(['$httpProvider',function($httpProvider) {
        // Cross-Domain-Aufrufe erlauben
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.interceptors.push(function($q, $rootScope) {
            return {
                'request': function(config) {
                    $rootScope.showLoading = true;
                    return config || $q.when(config);
                },
                'response': function(response) {
                    $rootScope.showLoading = false;
                    return response || $q.when(response);
                }
            };
        });
    }])
;
