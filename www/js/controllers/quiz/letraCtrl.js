'use strict';
angular.module('starter')
    .controller('letraCtrl', function($scope, Quiz) {
        console.log('letraCtrl');

        $scope.letra = [];
        $scope.selected_image = {};
        $scope.index = {};
        $scope.centerAnchor = true;


        Quiz.letters().then(function(res) {
            console.log('letters: ', res[0]);

            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.letra = res[0];
                });
            }, 10);
        });

        $scope.onDropComplete1 = function(data, evt, index) {
            console.log("index: ", index, "$event: ", evt, "onDropComplete1", "", data);

            $scope.selected_image = data.img;
            $scope.index = index;
            var my_ans = index;
            var answer = data.ans;

            $scope.enable = false;

            $scope.data = {
                index: index,
                value: data.ans,
                scope: data
            }

            $ionicLoading.show({
                template: 'Loading...'
            });

            $timeout(function() {
                if (my_ans == answer) {
                    $scope.eventButton(1);
                } else {
                    $scope.eventButton(0);
                }
            }, 1000);
        };

    });
