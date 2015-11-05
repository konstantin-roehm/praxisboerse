/**
 * Created by tpf on 28.10.15.
 */

'use strict';
/*
var addToWatchList;
var removeFromWatchList;
var initWatchList;
var watchListOffers;
*/
angular.module('myApp.watchlistController', ['ngRoute'])

/*
    .factory('watchList', ['$log',function(){


    return{
        addOffer: function(offerId){
            return addToWatchList(offerId);
        },
        removeOffer: function(offerId){
            return removeFromWatchList(offerId);
        },
        init: function(){
            return initWatchList;
        },
        getWatchlist: function(){
            return watchListOffers;
        }
    };
    }])*/
    .controller('watchlistCtrl', ['$scope', '$log', '$http','$base64', 'watchlistFactory',

        function($scope, $log, $http, $base64, watchlistFactory) {

            var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';

            $scope.watchlist = {};
          //  $scope.watchlistOffers = [];
            $scope.offer={};



            function initWatchlist() {
                watchlistFactory.init().success(function (data) {
                    $scope.watchlist = data;
                    $scope.watchlistOffers = $scope.watchlist.offers;

                    $log.log("watchlistOffers");
                    $log.log($scope.watchlistOffers);
                })
                    .error(function (error) {
                        $scope.status = 'Unable to load customer data: ' + error.message;
                    });
            }

            $scope.removeOffer = function (offerID) {
                watchlistFactory.removeFromWatchList(offerID);


            };


        //    $scope.deviceDetection = deviceDetector;
            /*
            initWatchList = function () {
                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                var url = root + '/joboffer/notepad/0/10';
                $http({method: 'GET', url: url}).then(function (response) {
                    $log.log(response);
                    $scope.watchlist = response.data;
                    watchListOffers = $scope.watchlist.offers;
                });

            }
*/
           // initWatchList;
          //  $scope.init();

/*
            addToWatchList = function(offerID){
                $log.log("Speicher Offer Nr."+offerID);

                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                var url = root +'/joboffer/notepad/offer';
                $http({method:'POST', data: offerID,url:url}).then(function(response) {
                    $log.log(response);
                    $log.log("Save to Merkliste Success");
                });

                //OfferID abspeichern
            }

            removeFromWatchList = function(offerId){
                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                var url = root + '/joboffer/notepad/offer/'+offerId;
                $http({method: 'DELETE', url: url}).then(function (response) {
                    $scope.watchlistOffers = [];

                    for(var offer in $scope.watchlist.offers){

                        if($scope.watchlist.offers[offer].id != offerId){
                            $scope.watchlistOffers.push($scope.watchlist.offers[offer]);
                        }

                    }

                });

            }
*/

            $scope.openOfferDetails = function(selectedOffer){
                $log.log("�ffne Offer Nr."+selectedOffer.id);
                $log.log(selectedOffer);
                $scope.offer = selectedOffer;
            };
        }

]);
