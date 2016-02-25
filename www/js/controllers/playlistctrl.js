'use strict';

angular.module('starter')
    .controller('PlaylistsCtrl', function($scope, $stateParams, $location, $state, $ionicPopup, $ionicPopover, $window) {
        console.log('params: ', $stateParams.topicId);

        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $ionicPopover.fromTemplateUrl('templates/sulipopover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.sulipopover = popover;
        });

        $ionicPopover.fromTemplateUrl('templates/quizpopover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.quizpopover = popover;
        });

        if (!_.isUndefined($stateParams.topicId)) {
            if ($stateParams.topicId == 'learn') {

                $scope.ngShow = {
                    letra: true,
                    huni: true,
                    sapat: true,
                    butang: true,
                    suli: true,
                    parehas: true
                };

                $scope.openLetra = function() {
                    $state.go('app.single', {
                        'topicId': 'letra'
                    });
                };

                $scope.openHuni = function($event) {
                    $scope.popover.show($event);
                };

                $scope.openHuni1 = function(id) {
                    console.log('id: ', id);
                    $scope.popover.hide();
                    $state.go('app.sounds', {
                        'topicId': 'huni-' + id
                    });
                };

                /*$scope.openHuni = function() {
                    console.log('app.huni');
                    // $state.go('app.huni');
                    $location.path('/app/huni')
                };*/

                $scope.showKunla = function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Meaning',
                        template: '<b>Kunla</b> - <i>ang pag tunga sang pag mitlang sang tinaga sa pag basa sa natural nga pamaagi</i>.'
                    });

                    alertPopup.then(function(res) {
                        $state.go('app.kunla', {
                            topicId: 'kunla'
                        });
                    });
                };

                $scope.showPopSuli = function($event) {
                    $scope.sulipopover.show($event)
                };

                $scope.showSuli = function(topic) {
                    $scope.sulipopover.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Meaning',
                        template: '<b>Parehas</b>- ang tinaga o dinalan nga may pareho nga kaulugan o ambotsilingon sa isa ka tinaga <br></br> <b>Kasuli</b> - mga  tinaga nga may kasuli nga  kahulugan o ambotsinlingon, gatumod mn sang tinaga nga lain sa isa ka tinaga.'
                    });

                    alertPopup.then(function(res) {
                        if (topic === 'suli') {
                            $state.go('app.wordings', {
                                topicId: 'suli'
                            });
                        } else {
                            $state.go('app.wordings', {
                                topicId: 'parehas'
                            });
                        }
                    });
                };
            } else {
                console.log('else');

                $scope.ngShow = {
                    letra: true,
                    huni: true,
                    sapat: true,
                    butang: true,
                    suli: true,
                    parehas: true
                };

                $scope.openLetra = function() {
                    $window.localStorage.topic = JSON.stringify({
                        title: 'Letra',
                        tag: 'letra'
                    });

                    // $state.go('app.quizLetter');
                    $location.path('/app/quiz/letter');
                };

                $scope.openHuni = function($event) {
                    $scope.quizpopover.show($event);
                };

                $scope.openHuni1 = function(id) {
                    $scope.quizpopover.hide();
                    if (id == 'sapat') {
                        $window.localStorage.topic = JSON.stringify({
                            title: 'Huni - Quiz 1',
                            tag: 'huni_sapat'
                        });

                        $state.go('app.quizHuni', { params: 'sapat' });
                    } else {
                        $window.localStorage.topic = JSON.stringify({
                            title: 'Huni - Quiz 2',
                            tag: 'huni_butang'
                        });

                        $state.go('app.quizHuni', { params: 'butang' });
                    }
                };

                $scope.showKunla = function() {
                    $window.localStorage.topic = JSON.stringify({
                        title: 'Kunla/Syllables',
                        tag: 'kunla'
                    });

                    $state.go('app.quizKunla');
                };

                $scope.showPopSuli = function($event) {
                    $scope.sulipopover.show($event)
                };

                $scope.showSuli = function(topic) {
                    $scope.sulipopover.hide();
                    console.log('topic: ',topic);
                    if (topic === 'suli') {
                        $state.go('app.quizParehasSuli', {
                            topic: 'suli'
                        });
                    } else {
                        $state.go('app.quizParehasSuli', {
                            topic: 'parehas'
                        });
                    }
                };
            }
        }

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
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
                    Helpers.wordings().then(function(res) {
                        $scope.wordings = _.filter(res.data, {
                            'category': $stateParams.topicId
                        });
                        _.each($scope.wordings, function(row) {
                            return row.image = 'img/material1.jpg';
                        });
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });

                    break;
                case 'parehas':
                    $ionicLoading.show();
                    Helpers.wordings().then(function(res) {
                        $scope.wordings = _.filter(res.data, {
                            'category': $stateParams.topicId
                        });
                        _.each($scope.wordings, function(row) {
                            return row.image = 'img/material4.jpg';
                        });
                        $window.localStorage['data'] = JSON.stringify(res.data);
                        $ionicLoading.hide();
                    });
                    break;
                default:
                    $ionicLoading.hide();
                    break;
            }
        }
    });
