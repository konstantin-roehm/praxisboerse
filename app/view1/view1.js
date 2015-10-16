'use strict';
var user='';
var pw='';
angular.module('myApp.view1', ['ngRoute','base64'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.config(['$httpProvider',function($httpProvider) {
// Cross-Domain-Aufrufe erlauben
      $httpProvider.defaults.useXDomain = true;
// Das Mitsenden von Authentifizierungsinformationen erlauben
      $httpProvider.defaults.withCredentials = true;
}])

.controller('View1Ctrl',['$scope','$log','$http','$base64', function($scope,$log,$http,$base64) {
        var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
        $scope.login = function(){
            $log.log('hallo');
            $http.defaults.headers.common.Authorization = "Basic " + $base64.encode($scope.username + ":" + $scope.password);
            var url = root +'/credential/encryptedpassword'; //gibt verschlüsseltes pw wieder
            $http({method:'GET',url:url,headers:{'Accept': 'text/plain'}}).then(function(data) {
                $log.log(data);
                if(data.data.length==0){
                    alert('Falsche Zugangsdaten');
                } else {
                    user = $scope.username;
                    pw = data.data;
                    location.href = '#/view2';
                }
            });
        };
}]);