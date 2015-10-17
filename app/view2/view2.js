'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.config(['$httpProvider',function($httpProvider) {
    // Cross-Domain-Aufrufe erlauben
    $httpProvider.defaults.useXDomain = true;
    // Das Mitsenden von Authentifizierungsinformationen erlauben
    $httpProvider.defaults.withCredentials = true;
}])
.factory('RESTService', ['$http','$base64',
    function($http,$base64){
        var RESTService = {
            getOffers : function(keyword){
                var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                //laengenüberprüfung
                var url = root +'/joboffer/offers/thesis/'+keyword+'/0/10';
                $http({method: 'GET', url: url}).then(function (daten) {
                    return daten.data.offers;
                });
            }
        };
        return RESTService;
    }
])
.controller('View2Ctrl',['$scope','$log','$http','$base64','RESTService',
    function($scope,$log,$http,$base64,RESTService) {
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $scope.filter = {
            offerType:'thesis',
            country:'all'
        };
        $scope.offers = [];
        $scope.jobData = {};
        $scope.getOffers = function(){
            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
            var url = root +'/joboffer/offers/'+$scope.filter.offerType+'/0/100';
            $http({method:'GET',url:url}).then(function(response) {
                $log.log(response);
                $scope.offers = response.data.offers;
                $scope.jobData = response.data;
            });
        };
        $scope.getCompanyByID = function(id){
            return $scope.jobData.companies[id];
        };
        $scope.getUniqueCountryList = function(list){
            var uniqueList = [];
            for(var el in list){
                var isNew = true;
                for(var i=0;i<uniqueList.length;i++){
                    if(list[el].city==uniqueList[i].city){
                        isNew = false;
                        break;
                    }
                }
                if(isNew){
                    uniqueList.push(list[el]);
                }
            }
            return uniqueList;
        };
        $scope.filterCountry = function(input){
            if($scope.getCompanyByID(input.companyId).city==$scope.filter.country || $scope.filter.country=='all'){
                return true;
            }
            return false;
        };
        $scope.filterList = function(){
            //Laeuft nicht
            //$scope.offers = RESTService.getOffers($scope.keyword);
            $log.log($scope.offers);
        };
        $scope.openOfferDetails = function(offerID){
            $log.log("Öffne Offer Nr."+offerID);
            //Hier die Detailansicht laden für ein Angebot
        };
        $scope.openCompanyDetails = function(companyID){
            $log.log("Öffne Firma Nr."+companyID);
            //Hier die Detailansicht laden für eine Firma
        };
        $scope.saveOffer = function(offerID){
            $log.log("Speicher Offer Nr."+offerID);
            //OfferID abspeichern
        }
    }
]);

