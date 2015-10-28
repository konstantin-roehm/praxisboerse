'use strict';

angular.module('myApp.view2', ['ngRoute', "ng.deviceDetector"])

.config(['$httpProvider',function($httpProvider) {
    // Cross-Domain-Aufrufe erlauben
    $httpProvider.defaults.useXDomain = true;
    // Das Mitsenden von Authentifizierungsinformationen erlauben
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}])
.factory('RESTService', ['$http','$base64',
    function($http,$base64){
        var RESTService = {
            getOffers : function(keyword){
                var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                //$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
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
        $scope.offer={};
        $scope.jobData = {};
        $scope.company = {};

        $scope.deviceDetection = deviceDetector;
        $scope.isMobile = $scope.deviceDetection.isMobile();

        if(!$scope.isMobile){
            var script = document.createElement("script");
            script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBSsGUEvpaUdzSUXS_S-5136GKJDNeVzTM";
            document.body.appendChild(script);
        }

        $scope.startOffer = 0;
        $scope.endOffer = -1;
        /*  */

        $scope.getOffers = function(){
            if($scope.isMobile){
                $scope.endOffer = 10;
            }
            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
            var url = root +'/joboffer/offers/'+$scope.filter.offerType+'/'+$scope.startOffer+'/'+$scope.endOffer;
            $http({method:'GET',url:url}).then(function(response) {
                $log.log(response);
                $scope.offers = response.data.offers;
                $scope.jobData = response.data;
                $log.log($scope.jobData);
            });
            $scope.showPagination();

        };
        $scope.changePage = function(pageID,event){
            event.preventDefault();
            if(pageID==-2 && $scope.startOffer+10<$scope.jobData.totalHits){
                $scope.startOffer += 10;
                $scope.getOffers();
            } else if(pageID==-1 && $scope.startOffer>9){
                $scope.startOffer -= 10;
                $scope.getOffers();
            } else if(pageID>0){
                $scope.startOffer = pageID*10 - 10;
                $scope.getOffers();
            }
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
        $scope.showDetails ={};
        $scope.openOfferDetails = function(index){
            $log.log("Öffne Offer Nr."+index);
            $scope.offer = $scope.offers[index];
        };
        $scope.openCompanyDetails = function(companyID){
            $log.log("Öffne Firma Nr."+companyID);

            $scope.company = $scope.jobData.companies[companyID];

            if(!$scope.isMobile){
                var mapProp = {
                    zoom:13,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
                var marker;
                var geocoder = new google.maps.Geocoder();

                var address =  $scope.company.country + ',' + $scope.company.zipCode + ' ' + $scope.company.city + ',' +$scope.company.street;
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                        marker.setMap(map);
                    } else {
                        $log.log('Adresse nicht gefunden');
                    }
                });

                jQuery('#myModalCompany').on('shown.bs.modal', function (e) {
                    google.maps.event.trigger(map,'resize');
                    map.setCenter(marker.position);
                });
            }

        };
        $scope.saveOffer = function(offerID){
            $log.log("Speicher Offer Nr."+offerID);
            //OfferID abspeichern
        }
        $scope.getPaginationNumber = function(offers){
            var ar = [];
            if(offers !== undefined){
                var pageCount = Math.ceil($scope.jobData.totalHits/10);
                for(var i=0;i<pageCount;i++){
                    ar[i] = i;
                }
            }
            return ar;
        }
        $scope.showPagination = function(){
            $log.log("Is mobile device: " + $scope.deviceDetection.isMobile());

            jQuery('.pagination>li').removeClass('active').eq($scope.startOffer/10 + 1).addClass('active');

            if($scope.isMobile && $scope.jobData.offers != null && $scope.jobData.totalHits>=10){
                return true;
            }else{
                return false;
            }
        }
        $scope.getOffers();

    }
]);
$(document).ready(function(){

});


