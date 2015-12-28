'use strict';

angular.module('starter')
    .controller('letraCtrl', function($scope, $ionicLoading, $ionicPopup, $timeout, Quiz) {

        $scope.letra = [];
        $scope.letraArr = [];
        $scope.selected_image = {};
        $scope.index = {};
        $scope.centerAnchor = true;
        $scope.shuffle = [];
        $scope.currentQuiz = 0;

        var myPopup = null;

        function shuffleArray(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        Quiz.letters().then(function(res) {
            $scope.letraArr = shuffleArray(res);
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.letra = $scope.letraArr[$scope.currentQuiz];
                    console.log('letra: ', $scope.letra);
                });
            }, 10);
        });

        Quiz.shuffle().then(function(res) {
            $scope.shuffle = res;
            _.each($scope.shuffle, function(item) {
                return item.selected = false;
            });
        });

        $scope.showLoading = function(value) {
            console.log('value: ', value);
            value.selected = !value.selected;

            $timeout(function() {
                $ionicLoading.show({
                    template: 'Loading...'
                });
            }, 300);

            $timeout(function() {
                $ionicLoading.hide();

                var template = null;
                var heading = null;
                if ($scope.letra.answer.length > 0) {
                    if ($scope.letra.answer.length == 1) {
                        var ans = $scope.letra.answer[0];
                        if (ans === value) {
                            heading = 'CORRECT';
                            template = '<div class="text-center"><i class="icon icon ion-checkmark balanced" style="font-size: 70px;"></i></div>';
                        } else {
                            heading = 'WRONG';
                            template = '<div class="text-center"><i class="icon icon ion-close assertive" style="font-size: 70px;"></i></div>';
                        }
                    } else if ($scope.letra.answer.length == 2) {
                        var ans = $scope.letra.answer[0];
                        var ans2 = $scope.letra.answer[1];
                        if (ans === value) {

                        } else {

                        }
                    }
                }


                myPopup = $ionicPopup.alert({
                    title: heading,
                    template: template
                });

                myPopup.then(function(res) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            _.each($scope.shuffle, function(item) {
                                return item.selected = false;
                            });
                            
                            if ($scope.currentQuiz != $scope.letraArr.length) {
                                $scope.currentQuiz++;
                                $scope.letra = $scope.letraArr[$scope.currentQuiz];
                                console.log('letra: ', $scope.letra);
                            }
                        });
                    }, 10);
                });
            }, 1000);
        };
    });
