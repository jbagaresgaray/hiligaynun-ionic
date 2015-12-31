'use strict';

angular.module('starter')
    .controller('letraCtrl', function($scope, $ionicLoading, $ionicPopup, $timeout, $ionicScrollDelegate, Quiz) {

        $scope.letra = [];
        $scope.letraArr = [];
        $scope.selected_image = {};
        $scope.index = {};
        $scope.centerAnchor = true;
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

        function init() {
            Quiz.letters().then(function(res) {
                $scope.letraArr = shuffleArray(res);
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.letra = $scope.letraArr[$scope.currentQuiz];
                        console.log('letra: ', $scope.letra);
                    });
                }, 10);
            });
        }

        function Shuffles() {
            $scope.shuffle = [];
            $timeout(function() {
                $scope.myPromise = Quiz.shuffle().then(function(res) {
                    console.log('res: ',res);
                    $scope.shuffle = res;
                    _.each($scope.shuffle, function(item) {
                        return item.selected = false;
                    });
                    console.log('shuffle: ',$scope.shuffle);
                });
            }, 600);
        }

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

                var ans = $scope.letra.answer[0];
                var obj = {};
                obj = $scope.letra;
                obj.choice = value.value;

                if (ans === value.value) {
                    obj.isCorrect = true;
                    $scope.score++;
                    heading = 'CORRECT';
                    template = '<div class="text-center"><i class="icon icon ion-checkmark balanced" style="font-size: 70px;"></i><br><h1>' + value.value + '</h1></div>';
                } else {
                    obj.isCorrect = false;
                    heading = 'WRONG';
                    template = '<div class="text-center"><i class="icon icon ion-close assertive" style="font-size: 70px;"></i><br><h1>' + value.value + '</h1></div>';
                }


                myPopup = $ionicPopup.alert({
                    title: heading,
                    template: template
                });

                myPopup.then(function(res) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            console.log('$scope.currentQuiz: ', $scope.currentQuiz);
                            console.log('$scope.letraArr.length: ', ($scope.letraArr.length - 1));

                            if ($scope.currentQuiz != ($scope.letraArr.length - 1)) {
                                $scope.currentQuiz++;
                                $scope.letra = $scope.letraArr[$scope.currentQuiz];
                                console.log('letra: ', $scope.letra);
                                Shuffles();
                            } else {
                                console.log('go to result');
                                $state.go('app.quizResult', {
                                    reload: true
                                });
                            }
                            $ionicScrollDelegate.scrollTop();
                        });
                    }, 10);
                });
            }, 1000);
        };


        init();
        Shuffles();
    });
