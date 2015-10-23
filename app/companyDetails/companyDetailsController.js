
'use strict';

angular.module('myApp.companyDetailsController', ['ngRoute'])

    /*.config(['$routeProvider', function($routeProvider){
     $routeProvider.when('companyDetails', {
     templateUrl: 'companyDetails/viewCompanyDetails.html',
     controller: 'CompanyDetailCtrl'
     });
     }])*/

.controller('CompanyDetailCtrl', ['$scope', '$log', 'CompanyDetails',

    function CompanyDetailCtrl($scope, $log, CompanyDetails){

        $scope.message = 'This is the company detail view.';
        $scope.company = CompanyDetails.getCompany();
        $log.log("Im CompanyController");
    }
]);
 
