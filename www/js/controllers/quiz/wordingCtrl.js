'use strict';
angular.module('starter')
    .controller('wordingCtrl', function($scope,Quiz) {
    	$scope.questions = [];

    	Quiz.wordings().then(function(res) {
            console.log('wordings: ', res[0]);
            $scope.questions = res[0];
        });
    });
