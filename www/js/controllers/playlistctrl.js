'use strict';

angular.module('starter')
    .controller('MenuCtrl', function($scope, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();
    })
    .controller('PlaylistsCtrl', function($scope, $stateParams, $state, $ionicPopup) {
        console.log('params: ', $stateParams.topicId);

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
                        console.log('letters: ', res.data);
                        $scope.helpers = res.data;
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });
                    break;
                case 'huni':
                    $ionicLoading.show();
                    Helpers.sounds().then(function(res) {
                        console.log('sounds: ', res.data);
                        $scope.sounds = res.data;
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });
                    break;
                case 'kunla':
                    $ionicLoading.show();
                    Helpers.syllables().then(function(res) {
                        console.log('syllables: ', res.data);
                        $scope.syllables = res.data;
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });
                    break;
                case 'suli':
                    $ionicLoading.show();

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
    })
    .controller('PlaylistDetailCtrl', function($scope, $window, $stateParams, $ionicLoading, Helpers) {
        console.log('params: ', $stateParams.letter);
        $scope.details = {};
        if (!_.isUndefined($stateParams.letter)) {
            if (!_.isEmpty($window.localStorage['data'])) {
                $ionicLoading.show();

                var data = JSON.parse($window.localStorage['data']);
                $scope.details = _.findWhere(data, {
                    'name': $stateParams.letter
                });
                console.log('details: ', $scope.details);
                $ionicLoading.hide();
            }
        }
    })
    .controller('PlaylistSoundDetailCtrl', function($scope, $stateParams, $ionicLoading, $window, Helpers) {
        console.log('params: ', $stateParams.sound);
        $scope.details = {};

        function getPhoneGapPath() {
            var path = window.location.pathname;
            path = path.substr(path, path.length - 10);
            return 'file://' + path;
        }

        if (!_.isUndefined($stateParams.sound)) {
            if (!_.isEmpty($window.localStorage['data'])) {
                $ionicLoading.show();
                var data = JSON.parse($window.localStorage['data']);
                $scope.details = _.findWhere(data, {
                    'title': $stateParams.sound
                });
                $scope.details.url = getPhoneGapPath() + $scope.details.url
                console.log('details: ', $scope.details);
                $ionicLoading.hide();
            }
        }
    })
    .controller('PlaylistKunlaDetailCtrl', function($scope, $window, $stateParams, $ionicLoading, $ionicPopup, Helpers) {
        console.log('params: ', $stateParams.kunla);
        $scope.details = {};

        if (!_.isUndefined($stateParams.kunla)) {
            if (!_.isEmpty($window.localStorage['data'])) {
                $ionicLoading.show();

                var data = JSON.parse($window.localStorage['data']);
                $scope.details = _.findWhere(data, {
                    'name': $stateParams.kunla
                });
                console.log('details: ', $scope.details);
                $ionicLoading.hide();
            }
        }

        $scope.pilaKaKunla = function(value) {
            var num = value.split('-');
            console.log('num: ', num);
            $ionicPopup.alert({
                title: 'Resulta',
                template: '<center><b>' + value + '</b> = ' + num.length + ' ka kunla </center>'
            });
        };
    })
    .controller('PlaylistWordingDetailCtrl', function($scope, $window, $stateParams, $ionicLoading, $ionicPopup, Helpers) {
        console.log('params: ', $stateParams.kunla);
        $scope.details = {};

        if (!_.isUndefined($stateParams.kunla)) {
            if (!_.isEmpty($window.localStorage['data'])) {
                $ionicLoading.show();

                var data = JSON.parse($window.localStorage['data']);
                $scope.details = _.findWhere(data, {
                    'name': $stateParams.kunla
                });
                console.log('details: ', $scope.details);
                $ionicLoading.hide();
            }
        }
    });
