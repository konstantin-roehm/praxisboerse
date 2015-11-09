/**
 * Created by tpf on 20.10.15.
 */
'use strict';

angular.module('restService', [])

    .factory('restServiceFactory', ['$log', '$http', '$base64', '$q', function ($log, $http, $base64, $q) {

        var restServiceFactory = {};
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);


        var cKeyword = '';
        var cOfferType = '';
        var cStartOffer = '';
        var cEndOffer = '';
        var response = {};

            restServiceFactory.getOffers = function (keyword, offerType, startOffer, endOffer) {
                var deferred = $q.defer();

                if(keyword == cKeyword && offerType == cOfferType && startOffer == cStartOffer && endOffer == cEndOffer){

                    deferred.resolve(response);
                }else {

                    cKeyword = keyword;
                    cOfferType = offerType;
                    cStartOffer = startOffer;
                    cEndOffer = endOffer;

                    var url = root + '/joboffer/offers/' + offerType + '/';
                    if (keyword.length > 2) {
                        url += keyword + '/' + startOffer + '/' + endOffer;
                    } else {
                        url += startOffer + '/' + endOffer;
                    }
                    $http.get(url).success(function(data){
                        response = data;
                        deferred.resolve(data);
                    }).error(function(error){
                        deferred.reject(error);
                    })

                }

                return deferred.promise;

        };

        return restServiceFactory;
    }]);