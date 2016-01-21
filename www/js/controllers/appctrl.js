'use strict';

angular.module('starter')
    .controller('MenuCtrl', function($scope, $timeout) {

    })
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
        $scope.exit = function() {
            ionic.Platform.exitApp();
        };
    })
    .controller('settingsCtrl', function($scope, $timeout) {
        $scope.changeVolume = function() {
            console.log('volume: ', $scope.volume);
        };
    });
