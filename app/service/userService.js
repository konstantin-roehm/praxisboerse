/**
 * Created by tpf on 05.11.15.
 */
'use strict';

angular.module('userService', ['base64'])

    .factory('userServiceFactory', ['$log','$http','$base64', '$q',function( $log, $http, $base64, $q){

        var userFactory = {};
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';

        var user = '';
        var pw = '';

        userFactory.login = function(username, password){

            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(username + ":" + password);

            var deferred = $q.defer();
            var url = root +'/credential/encryptedpassword'; //gibt verschl�sseltes pw wieder



            $http({method:'GET',url:url, headers:{'Accept': 'text/plain'}}).then(function(data) {
                if(data.data.length==0){ //bisher noch nicht funktional
                    deferred.reject(true);
                } else {
                    user = username;
                    pw = data.data;
                    deferred.resolve();
                }
            });

            return deferred.promise;

        }

        userFactory.logout = function(){
           user = '';
            pw = '';
        }

        return userFactory;
    }]);
