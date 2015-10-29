'use strict';

angular.module('starter')
    .controller('MenuCtrl', function($scope, $timeout) {

    })
    .controller('PlaylistsCtrl', function($scope, $stateParams, $location, $state, $ionicPopup) {
        console.log('params: ', $stateParams.topicId);

        if (!_.isUndefined($stateParams.topicId)) {
            if ($stateParams.topicId == 'learn') {
                $scope.openLetra = function() {
                    $state.go('app.single', {
                        'topicId': 'letra'
                    });
                };

                $scope.openHuni = function() {
                    console.log('app.huni');
                    // $state.go('app.huni');
                    $location.path('/app/huni')
                };

                $scope.showKunla = function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Meaning',
                        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    });

                    alertPopup.then(function(res) {
                        $state.go('app.kunla', {
                            topicId: 'kunla'
                        });
                    });
                };

                $scope.showSuli = function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Meaning',
                        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    });

                    alertPopup.then(function(res) {
                        $state.go('app.wordings', {
                            topicId: 'suli'
                        });
                    });
                };
            } else {
                console.log('else');
                $scope.openLetra = function() {
                    console.log('openLetra');
                    $state.go('app.quizLetter');
                };

                $scope.openHuni = function() {
                    $state.go('app.quizHuni');
                };

                $scope.showKunla = function() {
                    $state.go('app.quizKunla');
                };

                $scope.showSuli = function() {
                    $state.go('app.quizWording');
                };
            }
        }
    })
    .controller('PlaylistCtrl', function($scope, $stateParams, $ionicLoading, $window, Helpers) {
        console.log('params: ', $stateParams.topicId);
        $scope.helpers = {};
        $scope.sounds = {};
        $scope.syllables = {};

        $window.localStorage['data'] = {};

        if (!_.isUndefined($stateParams.topicId)) {
            switch ($stateParams.topicId) {
                case 'letra':
                    $ionicLoading.show();
                    Helpers.letters().then(function(res) {
                        $scope.helpers = res.data;
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });
                    break;
                case 'huni-sapat':
                    $ionicLoading.show();
                    Helpers.sounds().then(function(res) {
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $scope.sounds = _.filter(res.data, {
                            'category': 'sapat'
                        });
                        $ionicLoading.hide();
                    });
                    break;
                case 'huni-butang':
                    $ionicLoading.show();
                    Helpers.sounds().then(function(res) {
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $scope.sounds = _.filter(res.data, {
                            'category': 'butang'
                        });
                        $ionicLoading.hide();
                    });
                    break;
                case 'kunla':
                    $ionicLoading.show();
                    Helpers.syllables().then(function(res) {
                        $scope.syllables = res.data;
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });
                    break;
                case 'suli':
                    $ionicLoading.show();

                    $scope.$parent.showHeader();
                    $scope.$parent.clearFabs();
                    $scope.isExpanded = false;
                    $scope.$parent.setExpanded(false);

                    $scope.clientSideList = [{
                        text: "Suli",
                        value: "suli"
                    }, {
                        text: "Parehas",
                        value: "parehas"
                    }];

                    $scope.data = {
                        clientSide: 'suli'
                    };

                    Helpers.wordings().then(function(res) {
                        console.log('wordings: ', res.data);

                        $scope.wordings = _.filter(res.data, {
                            'category': $scope.data.clientSide
                        });
                        console.log('details: ', $scope.wordings);
                        $window.localStorage['data'] = JSON.stringify(res.data);

                        $ionicLoading.hide();
                    });


                    $scope.eventButton = function(value) {
                        $scope.wordings = [];
                        $scope.data.clientSide = value;

                        var data = JSON.parse($window.localStorage['data']);
                        console.log('wordings: ', data);
                        $scope.wordings = _.filter(data, {
                            'category': $scope.data.clientSide
                        });
                        console.log('details: ', $scope.wordings);
                    };
                    break;
                default:
                    $ionicLoading.hide();
                    break;
            }
        }
    });
