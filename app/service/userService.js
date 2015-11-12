/**
 * Created by tpf on 05.11.15.
 */
'use strict';

angular.module('userService', ['base64'])
    /*
    .config(['$httpProvider',function($httpProvider) {
// Cross-Domain-Aufrufe erlauben
        $httpProvider.defaults.useXDomain = true;
// Das Mitsenden von Authentifizierungsinformationen erlauben
        // $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.interceptors.push(function($q){
            return {
                'request': function(config) {
                    return config;
                },

                'response': function(response) {
                    if(response.status == 401){
                        console.log('401 fehler');
                        location.href = './';
                    }
                    console.log(response);
                    return response;
                },
                'responseError': function(rejection) {
                    console.log('error');
                    console.log(rejection);
                    if (rejection.status === 401) {

                        // location.href = './';
                        return false;
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }])
    */
    .factory('userServiceFactory', ['$log','$http','$base64', '$q',function( $log, $http, $base64, $q){

        var userFactory = {};
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';

        var user = '';
        var pw = '';

        userFactory.login = function(username, password){
            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(username + ":" + password);

            var deferred = $q.defer();
            var url = root +'/credential/encryptedpassword'; //gibt verschl�sseltes pw wieder

            $http({method:'GET',url:url}).then(function(data) {
                $log.log(data);
                if(data.data.length==0){ //bisher noch nicht funktional
                    deferred.reject(true);
                } else {
                    user = username;
                    pw = data.data;
                    deferred.resolve();
                }
            })


            
            /*
            $http.get(url, {'Accept': 'text/plain'}).success(function (data) {
                if (data == undefined) {
                    deferred.reject(true);
                } else {


                 user = username;
                    pw = data.data;

                   deferred.resolve();
            }
            }).error(function(error){

                deferred.reject(true);
            });*/

            return deferred.promise;

        }

        userFactory.logout = function(){
           user = '';
            pw = '';
        }




        return userFactory;
    }]);
