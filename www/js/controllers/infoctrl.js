'use strict';

angular.module('starter')
    .controller('InforCtrl', function($scope, state) {
        console.log('state: ', state);
        $scope.tabactive = state;
    });
