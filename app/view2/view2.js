'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$httpProvider',function($httpProvider) {
    // Cross-Domain-Aufrufe erlauben
    $httpProvider.defaults.useXDomain = true;
    // Das Mitsenden von Authentifizierungsinformationen erlauben
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.common['X-Requested-Width'] = 'XMLHttpRequest';

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
.controller('View2Ctrl',['$scope','$location','$log','$http','$base64','RESTService','CompanyDetails',
    function($scope,$location,$log,$http,$base64,RESTService, CompanyDetails) {
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $scope.filter = {
            offerType:'thesis',
            country:'all'
        };
        $scope.offers = [];
        $scope.jobData = {};
        /*  */
        $scope.getOffers = function(){
            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
            var url = root +'/joboffer/offers/'+$scope.filter.offerType+'/0/9';
            $http({method:'GET',url:url}).then(function(response) {
                $log.log(response);
                $scope.offers = response.data.offers;
                $scope.jobData = response.data;
            });
        };
        /*jQuery(window).resize(function() {
            if (jQuery(this).width() < 768) {
                console.log('bla');
            }
        });*/
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
        $scope.showDetails ={};
        $scope.openOfferDetails = function(offerID){
            $log.log("Öffne Offer Nr."+offerID);
            //$scope.showDetails[offerID] = true;
            //Hier die Detailansicht laden für ein Angebot
        };
        $scope.openCompanyDetails = function(companyID){
            $log.log("?ffne Firma Nr."+companyID);

            /*CompanyDetails.setCompany($scope.jobData.companies[companyID]);

            var comp = CompanyDetails.getCompany();

            $location.url('companyDetails');

            $log.log("test");*/

            //Hier die Detailansicht laden f?r eine Firma
        };
        $scope.saveOffer = function(offerID){
            $log.log("Speicher Offer Nr."+offerID);
            //OfferID abspeichern
        }
        $scope.getPaginationNumber = function(offers){
            var ar = [];
            if(offers !== undefined){
                var pageCount = Math.ceil(offers.length/10);
                for(var i=0;i<pageCount;i++){
                    ar[i] = i;
                }
            }
            return ar;
        }
    }
]);

