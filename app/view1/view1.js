'use strict';
//var user='';
//var pw='';
angular.module('myApp.view1', ['ngRoute'])


.controller('View1Ctrl',['$scope','$log','$http', 'userServiceFactory', function($scope,$log,$http, userServiceFactory) {
    //    var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $scope.loginInvalid = false;
        $scope.formMaster = {};
        $scope.reset = function() {
            $scope.user = angular.copy($scope.formMaster);
        };
        $scope.login = function(){
            if($scope.loginForm.username.$invalid||$scope.loginForm.password.$invalid){
                $scope.loginInvalid = true;
                $scope.reset();
            } else {

                var promise = userServiceFactory.login($scope.loginForm.username, $scope.loginForm.password);
                promise.then(function (response) {

                        $log.log(response);
                        location.href = '#/view2';



                    }, function (reason) {
                        $scope.loginInvalid = reason;
                        $scope.reset();
                        $scope.status = 'Unable to login user: ' + error.message;
                    }
                );







                //das hier l�uft noch nicht. Es m�sste eigentlich erst hier�ber �berpr�ft werden
                //ob die nutzerdaten stimmen und danach kommt der request nach dem verschl�ss. pw
                /*var url = root +'/credential/check/'+$base64.encode($scope.user.name)+'/'+$base64.encode($scope.user.password);
                $http({method:'GET',url:url}).then(function(data) {
                    $log.log(data);
                });

                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode($scope.user.name + ":" + $scope.user.password);
                var url = root +'/credential/encryptedpassword'; //gibt verschl�sseltes pw wieder
                $http({method:'GET',url:url,headers:{'Accept': 'text/plain'}}).then(function(data) {
                    $log.log(data);
                    if(data.data.length==0){ //bisher noch nicht funktional
                        $scope.loginInvalid = true;
                        $scope.reset();
                    } else {
                        user = $scope.user.name;
                        pw = data.data;
                        location.href = '#/view2';
                    }
                });*/
            }
        };
        $scope.reset();
}]);