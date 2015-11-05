/**
 * Created by tpf on 05.11.15.
 */

'use strict';

angular.module('watchlistService', [])

    .factory('watchlistFactory', ['$log','$http','$base64',function( $log, $http, $base64){

        var watchlistFactory = {};
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);


        watchlistFactory.init = function(){
            return $http.get(root + '/joboffer/notepad/0/10');

        }

        watchlistFactory.addToWatchList = function(id){
            return $http.post(root +'/joboffer/notepad/offer', id);
        }

        watchlistFactory.removeFromWatchList = function(id){
            return $http.delete(root + '/joboffer/notepad/offer/'+id);
        }


        return watchlistFactory;
    }]);
