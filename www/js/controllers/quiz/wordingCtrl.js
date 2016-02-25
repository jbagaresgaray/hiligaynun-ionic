'use strict';
angular.module('starter')
    .controller('wordingCtrl', function($scope, $state, $stateParams, $timeout, $ionicPopup, $ionicScrollDelegate, $ionicLoading, $window, Quiz) {
        $scope.questions = [];
        $scope.questionsArr = [];

        $scope.currentQuiz = 0;
        $scope.score = 0;
        $scope.scoreBoard = [];

        var myPopup = null;

        Quiz.parehasSuli().then(function(res) {
            if ($stateParams.topic) {
                if ($stateParams.topic == 'suli') {
                    $scope.direksyon = 'Lantawa ang laragway kag pangita ang iya kasuli nga tinaga sa kahon tum-oka ini sa pagsabat.';
                    $scope.questionsArr = _.shuffle(_.filter(res, { 'category': 'suli' }));
                    $scope.questions = $scope.questionsArr[$scope.currentQuiz];
                } else {
                    $scope.direksyon = 'Lantawa ang laragway kag pangita ang iya kaparehas nga tinaga sa kahon tum-oka ini sa pagsabat.';
                    $scope.questionsArr = _.shuffle(_.filter(res, { 'category': 'parehas' }));
                    $scope.questions = $scope.questionsArr[$scope.currentQuiz];
                }
                console.log(' parehasSuli: ', $scope.questionsArr);
            }
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

                var obj = {};
                obj = $scope.questions;
                obj.ans = $scope.questions.ans;
                obj.choice = value.choice;

                if ($scope.questions.ans === value.choice) {
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
