/*
 * Wird vorerst auch nicht benötigt
 ***/
'use strict';

angular.module('myApp.companyDetailsController', ['ngRoute'])


.controller('CompanyDetailCtrl', ['$scope', '$log', 'CompanyDetails',

    function($scope, $log, CompanyDetails){

        $scope.message = 'This is the company detail view.';
        $scope.company = CompanyDetails.getCompany();
        $log.log("Im CompanyController");
    }
]);
 
