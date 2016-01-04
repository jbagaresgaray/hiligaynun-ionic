'use strict';

angular.module('starter')
    .controller('scoreCtrl', function($scope, $timeout, $ionicHistory, $stateParams, $ionicPopup, $state, $window, Score) {
        $scope.quiz = {
            title: '',
            phrase: '',
            answer: '',
            myans: ''
        };

        var quizarray = [];

        $scope.results = {};
        $scope.score = 0;
        $scope.data = {}

        var scoreBoard = JSON.parse(window.localStorage['scoreBoard'] || {});
        var score = 0;
        var topic = JSON.parse($window.localStorage.topic);

        for (var i = 0; i < scoreBoard.length; i++) {
            var ans = scoreBoard[i].ans;
            var mychoice = scoreBoard[i].choice;
            var img = scoreBoard[i].img;
            var title = scoreBoard[i].title;
            var phrase = scoreBoard[i].phrase;
            var iscorrect = scoreBoard[i].isCorrect;

            if (iscorrect) {
                score = score + 1;
            }

            $scope.quiz = {
                title: title,
                phrase: phrase,
                img: img,
                answer: ans,
                myans: mychoice,
                correct: iscorrect
            };

            quizarray.push($scope.quiz);
        };

        $scope.results = quizarray;
        $scope.score = score;
        $scope.limit = quizarray.length;

        $scope.resetQuiz = function() {
            // $state.go('app.main');
            window.location.href="#/app/main";
            window.location.reload();
        };

        $scope.saveScore = function() {
            $ionicPopup.show({
                title: 'Save Score',
                template: '<input type="text" ng-model="data.username">',
                subTitle: 'Please Enter your name',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.username) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Hiligaynon App',
                                template: 'Please enter your name'
                            });
                            return;
                        } else {
                            var score = $scope.score + '/' + quizarray.length;
                            Score.insert(topic.tag, $scope.data.username, score).then(function(documents) {
                                console.log(documents);
                                if (documents) {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Hiligaynon App',
                                        template: 'Record Successfully Saved'
                                    });
                                    $state.go('app.main');
                                }
                            });
                        }
                    }
                }]
            });
        }
    })
    .controller('scoreBoardCtrl', function($scope, $window, Score) {
        $scope.doRefresh = function() {
            Score.all().then(function(response) {
                    console.log('response: ', response);
                    $scope.scores = response;
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });

        };
    });
