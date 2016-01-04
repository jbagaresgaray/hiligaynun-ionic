'use strict';

angular.module('starter')
    .controller('huniCtrl', function($scope, $state, $ionicLoading, $window) {
        console.log('huniCtrl');
        $scope.openHuni = function(id) {
            console.log('id: ', id);
            $state.go('app.sounds', {
                'topicId': 'huni-' + id
            });
        };
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
        console.log('params: ', $stateParams.wording);
        $scope.details = {};

        if (!_.isUndefined($stateParams.wording)) {
            if (!_.isEmpty($window.localStorage['data'])) {
                $ionicLoading.show();

                var data = JSON.parse($window.localStorage['data']);
                $scope.details = _.findWhere(data, {
                    'name': $stateParams.wording
                });
                console.log('details: ', $scope.details);
                $ionicLoading.hide();
            }
        }
    });
