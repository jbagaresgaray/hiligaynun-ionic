'use strict';

angular.module('starter')
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
    })
    .controller('scoreCtrl', function($scope, $timeout, $ionicHistory, $stateParams, $ionicPopup, $state, $window, $ionicViewSwitcher, Score) {
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
            /*window.location.href = "#/app/main";
            window.location.reload();*/

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicViewSwitcher.nextDirection('back');
            $state.go('app.playlists', {
                topicId: 'quiz'
            });
        };

        $scope.quizStatus = function(score) {
            if (topic.huni === 'huni') {
                switch (true) {
                    case (score == $scope.limit):
                        return {
                            msg: 'Excellent',
                            class: 'balanced'
                        }
                        break;
                    case (score >= 3 && score <= 4):
                        return {
                            msg: 'Very Good',
                            class: 'energized'
                        }
                        break;
                    case (score >= 1 && score < 3):
                        return {
                            msg: 'Good',
                            class: 'calm'
                        }
                    case (score < 1):
                        return {
                            msg: 'Bad',
                            class: 'calm'
                        }
                        break;
                }
            } else {
                switch (true) {
                    case (score == $scope.limit):
                        return {
                            msg: 'Excellent',
                            class: 'balanced'
                        }
                        break;
                    case (score >= 10 && score <= 14):
                        return {
                            msg: 'Very Good',
                            class: 'energized'
                        }
                        break;
                    case (score >= 5 && score < 10):
                        return {
                            msg: 'Good',
                            class: 'calm'
                        }
                    case (score < 5):
                        return {
                            msg: 'Bad',
                            class: 'calm'
                        }
                        break;
                }
            }
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

                                    $ionicHistory.nextViewOptions({
                                        disableBack: true
                                    });
                                    $ionicViewSwitcher.nextDirection('back');
                                    $state.go('app.main');
                                }
                            });
                        }
                    }
                }]
            });
        };

        $scope.$on("$ionicView.afterLeave", function() {
            $ionicHistory.clearCache();
        });
    });
