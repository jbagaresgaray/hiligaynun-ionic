'use strict';

angular.module('starter')
    .controller('MenuCtrl', function($scope, $timeout) {
        
    })
    .controller('PlaylistsCtrl', function($scope, $stateParams, $location, $state, $ionicPopup, $ionicPopover, $window) {
        console.log('params: ', $stateParams.topicId);

        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        if (!_.isUndefined($stateParams.topicId)) {
            if ($stateParams.topicId == 'learn') {

                $scope.ngShow = {
                    letra: true,
                    huni:true,
                    sapat: true,
                    butang: true,
                    suli:true
                };

                $scope.openLetra = function() {
                    $state.go('app.single', {
                        'topicId': 'letra'
                    });
                };

                $scope.openHuni = function(id) {
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

                $scope.showSuli = function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Meaning',
                        template: '<b>Parehas</b>- ang tinaga o dinalan nga may pareho nga kaulugan o ambotsilingon sa isa ka tinaga <br></br> <b>Kasuli</b> - mga  tinaga nga may kasuli nga  kahulugan o ambotsinlingon, gatumod mn sang tinaga nga lain sa isa ka tinaga.'
                    });

                    alertPopup.then(function(res) {
                        $state.go('app.wordings', {
                            topicId: 'suli'
                        });
                    });
                };
            } else {
                console.log('else');

                $scope.ngShow = {
                    letra: true,
                    huni:false,
                    sapat: false,
                    butang: false,
                    suli:false
                };

                $scope.openLetra = function() {
                    $window.localStorage.topic =  JSON.stringify({
                        title: 'Letra',
                        tag: 'letra'
                    });

                    $state.go('app.quizLetter');
                };

                $scope.openHuni = function() {
                    $window.localStorage.topic =  JSON.stringify({
                        title: 'Huni',
                        tag: 'huni'
                    });

                    $state.go('app.quizHuni');
                };

                $scope.showKunla = function() {
                    $window.localStorage.topic =  JSON.stringify({
                        title: 'Kunla/Syllables',
                        tag: 'kunla'
                    });

                    $state.go('app.quizKunla');
                };

                $scope.showSuli = function() {
                    $state.go('app.quizWording');
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
