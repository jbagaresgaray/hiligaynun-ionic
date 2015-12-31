'use strict';

angular.module('starter')
    .controller('kunlaCtrl', function($window, $scope, $state, $timeout, $ionicLoading, $ionicPopup, $ionicScrollDelegate, Quiz) {
        console.log('kunlaCtrl');

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

        Quiz.syllables().then(function(res) {
            console.log('syllables: ', res[0]);
            $scope.questionsArr = shuffleArray(res);
            $scope.questions = $scope.questionsArr[$scope.currentQuiz];
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
                if (!_.isNull($scope.questions.ans)) {
                    var obj = {};
                    obj = $scope.questions;
                    obj.choice = value.choice;
                    
                    if ($scope.questions.ans === value.choice) {
                        obj.isCorrect = true;
                        $scope.score++;
                        heading = 'CORRECT';
                        template = '<div class="text-center"><i class="icon icon ion-checkmark balanced" style="font-size: 70px;"></i><br><h1>' + value.choice + '</h1></div>';
                    } else {
                        obj.isCorrect = false;
                        heading = 'WRONG';
                        template = '<div class="text-center"><i class="icon icon ion-close assertive" style="font-size: 70px;"></i><br><h1>' + value.choice + '</h1></div>';
                    }
                    $scope.scoreBoard.push(obj);
                    $window.localStorage.scoreBoard = JSON.stringify($scope.scoreBoard);
                }


                myPopup = $ionicPopup.alert({
                    title: heading,
                    template: template
                });

                myPopup.then(function(res) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            console.log('$scope.currentQuiz: ',$scope.currentQuiz);
                            console.log('$scope.questionsArr.length: ',($scope.questionsArr.length -1));
                            if ($scope.currentQuiz != ($scope.questionsArr.length -1)) {
                                $scope.currentQuiz++;
                                $scope.questions = $scope.questionsArr[$scope.currentQuiz];
                            }else{
                                console.log('go to result');
                                $state.go('app.quizResult',{reload:true});
                            }
                            $ionicScrollDelegate.scrollTop();
                        });
                    }, 10);
                });
            }, 1000);
        };
    });
