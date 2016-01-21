'use strict';
angular.module('starter')
    .controller('huniQuizCtrl', function($window, $scope, $state, $timeout, $ionicLoading, $ionicPopup, $ionicScrollDelegate, Quiz) {
        $scope.questions = [];
        $scope.questionsArr = [];

        $scope.currentQuiz = 0;
        $scope.score = 0;
        $scope.scoreBoard = [];

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

        Quiz.sounds().then(function(res) {
            console.log('huni: ', res[0]);
            $scope.questionsArr = shuffleArray(res);
            $scope.questions = $scope.questionsArr[$scope.currentQuiz];
        });

        $scope.showLoading = function(value) {
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

                var ans = $scope.questions.ans;
                var obj = {};
                obj = $scope.questions;
                obj.ans = ans;
                obj.choice = value.choice;

                if (ans === value.choice) {
                    obj.isCorrect = true;
                    $scope.score++;
                    heading = 'CORRECT';
                    template = '<div class="text-center"><img src="img/assets/correct.png" width="100px;"><br><h1>' + value.choice + '</h1></div>';
                } else {
                    obj.isCorrect = false;
                    heading = 'WRONG';
                    template = '<div class="text-center"><img src="img/assets/wrong.png" width="100px;"><br><h1>' + value.choice + '</h1></div>';
                }
                $scope.scoreBoard.push(obj);
                $window.localStorage.scoreBoard = JSON.stringify($scope.scoreBoard);


                myPopup = $ionicPopup.alert({
                    title: heading,
                    template: template
                });

                myPopup.then(function(res) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            console.log('$scope.currentQuiz: ', $scope.currentQuiz);
                            console.log('$scope.questionsArr.length: ', ($scope.questionsArr.length - 1));

                            if ($scope.currentQuiz != ($scope.questionsArr.length - 1)) {
                                $scope.currentQuiz++;
                                $scope.questions = $scope.questionsArr[$scope.currentQuiz];
                                console.log('questions: ', $scope.questions);
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
    });
