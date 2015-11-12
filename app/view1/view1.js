'use strict';

angular.module('myApp.view1', ['ngRoute', 'base64'])

    .controller('View1Ctrl', ['$scope', '$log', '$http', '$base64', '$location','userServiceFactory', function ($scope, $log, $http, $base64, $location, userServiceFactory) {

        $scope.showNavbar = false;
        $scope.loginInvalid = false;
        $scope.formMaster = {};
        $scope.reset = function () {
            $scope.user = angular.copy($scope.formMaster);
        };
        $scope.login = function () {
            if ($scope.loginForm.username.$invalid || $scope.loginForm.password.$invalid) {
                $scope.loginInvalid = true;
                $scope.reset();
            } else {
                //das hier l�uft noch nicht. Es m�sste eigentlich erst hier�ber �berpr�ft werden
                //ob die nutzerdaten stimmen und danach kommt der request nach dem verschl�ss. pw

                var promise = userServiceFactory.login($scope.user.name, $scope.user.password);
                promise.then(function (response) {
                        $location.path('view2');

                    }, function (reason) {

                        $scope.loginInvalid = reason;
                        $scope.reset();
                        $scope.status = 'Unable to login user: ' + error.message;
                    }
                );
        }
    };
$scope.reset();
}])
;