'use strict';

angular.module('myApp.view2', ['ngRoute', "ng.deviceDetector"])

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
                //laengen�berpr�fung
                var url = root +'/joboffer/offers/thesis/'+keyword+'/0/10';
                $http({method: 'GET', url: url}).then(function (daten) {
                    return daten.data.offers;
                });


            }
        };
        return RESTService;
    }
])
.controller('View2Ctrl',['$scope','$location','$log','$http','$base64','RESTService', 'deviceDetector',//'CompanyDetails',
    function($scope,$location,$log,$http,$base64,RESTService, deviceDetector){ //, CompanyDetails) {
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $scope.filter = {
            offerType:'thesis',
            country:'all'
        };
        $scope.offers = [];
        $scope.jobData = {};
        $scope.company = {};

        $scope.deviceDetection = deviceDetector;
        /*  */
        $scope.getOffers = function(){
            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
            var url = root +'/joboffer/offers/'+$scope.filter.offerType+'/0/-1';
            $http({method:'GET',url:url}).then(function(response) {
                $log.log(response);
                $scope.offers = response.data.offers;
                $scope.jobData = response.data;
            });
            $scope.showPagination();
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
            //Hier die Detailansicht laden f�r ein Angebot
        };
        $scope.openCompanyDetails = function(companyID){
            $log.log("Öffne Firma Nr."+companyID);

            $scope.company = $scope.jobData.companies[companyID];

            /*
            CompanyDetails.setCompany($scope.jobData.companies[companyID]);
            $scope.company = CompanyDetails.getCompany();
            $location.url('companyDetails');
            $log.log("test");
            */
            //Hier die Detailansicht laden f?r eine Firma
        };
        $scope.saveOffer = function(offerID){
            $log.log("Speicher Offer Nr."+offerID);



                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                var url = root +'/joboffer/notepad/offer';
                $http({method:'POST', data: offerID,url:url}).then(function(response) {
                    $log.log(response);
                   $log.log("Save to Merkliste Success");
                });



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
        $scope.showPagination = function(){
            $log.log("Is mobile device: " + $scope.deviceDetection.isMobile());

            if($scope.deviceDetection.isMobile() && $scope.jobData.offers != null && $scope.jobData.offers.length>10){
                return true;
            }else{
                return false;
            }
        }
    }
]);


