'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.config(['$httpProvider',function($httpProvider) {
// Cross-Domain-Aufrufe erlauben
  $httpProvider.defaults.useXDomain = true;
// Das Mitsenden von Authentifizierungsinformationen erlauben
  $httpProvider.defaults.withCredentials = true;
}])
.factory('RESTService', ['$http','$base64',
    function($http,$base64){
        var RESTService = {
          getOffers : function(keyword){
              var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
              $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
              //laengenüberprüfung
              var url = root +'/joboffer/offers/thesis/'+keyword+'/0/10';
              $http({method: 'GET', url: url}).then(function (daten) {
                  return daten.data.offers;
              });
          }
        };
        return RESTService;
    }])
.controller('View2Ctrl',['$scope','$log','$http','$base64','RESTService', function($scope,$log,$http,$base64,RESTService) {
  var root = 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST';
      $scope.offers = [];
  $scope.getOffers = function(){
    $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(user + ":" + pw);
    var url = root +'/joboffer/offers/thesis/0/10';
    $http({method:'GET',url:url}).then(function(data) {
      $log.log(data);
      $scope.offers = data.data.offers;
    });
  };

        $scope.filterList = function(){
            $scope.offers = RESTService.getOffers($scope.keyword);
            $log.log($scope.offers);
        }


}]);

