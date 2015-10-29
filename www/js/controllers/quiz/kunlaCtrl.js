'use strict';

angular.module('starter')
    .controller('kunlaCtrl', function($scope, Quiz) {
    	$scope.questions = [];

    	Quiz.syllables().then(function(res) {
            console.log('syllables: ', res[0]);
            $scope.questions = res[0];
        });
    });
