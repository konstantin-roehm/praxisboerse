/**
 * Created by tpf on 28.10.15.
 */

'use strict';

angular.module('myApp.watchlistController', ['ngRoute'])

    .controller('watchlistCtrl', ['$scope', '$log', '$http','$base64',

        function($scope, $log, $http, $base64) {

            var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
            $scope.filter = {
                offerType: 'thesis',
                country: 'all'
            };
            $scope.watchlist = {};
            $scope.watchlistOffers = [];



        //    $scope.deviceDetection = deviceDetector;
            /*  */
            $scope.init = function () {
                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
                var url = root + '/joboffer/notepad/0/10';
                $http({method: 'GET', url: url}).then(function (response) {
                    $log.log(response);
                    $scope.watchlist = response.data;
                    $scope.watchlistOffers = $scope.watchlist.offers;
                });

            }

            $scope.init();


            $scope.removeFromWatchlist = function(offerId){
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
        }

]);
