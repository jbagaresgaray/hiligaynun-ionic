'use strict';

angular.module('starter')
    .controller('MenuCtrl', function($scope, $timeout) {

    })
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
        $scope.exit = function() {
            ionic.Platform.exitApp();
        };
    })
    .controller('settingsCtrl', function($scope, $timeout, $window, $rootScope) {

        $scope.music = (!_.isUndefined(window.localStorage.appmusic) && window.localStorage.appmusic !== 'undefined') ? window.localStorage.appmusic : true;
        $scope.volume = (!_.isUndefined(window.localStorage.appvolume) && window.localStorage.appvolume !== 'undefined') ? window.localStorage.appvolume : 0;

        console.log('music: ', $scope.music);
        console.log('volume: ', $scope.volume);

        $scope.$watch('volume', function(value) {
            console.log('volume1: ', value);
            if (value == true) {
                if ($rootScope.media) {
                    $rootScope.media.play();
                } else {
                    $rootScope.media = $cordovaMedia.newMedia(getPhoneGapPath() + 'img/assets/bg_music.mp3', function(resp) {
                        console.log('Play Success: ', resp);
                    }, function(err) {
                        console.log("playAudio():Audio Error: " + err);
                    }, function(status) {
                        console.log('Play status', status);
                        if (status == Media.MEDIA_STOPPED) {
                            $rootScope.media.play();
                            console.log('Play again');
                        };
                    });
                    $rootScope.media.play();
                }
            } else {
                if ($rootScope.media) {
                    $rootScope.media.stop();
                }
            }
            $window.localStorage.appvolume = value;
        });

        $scope.$watch('music', function(value) {
            console.log('music1: ', value);
            if ($rootScope.media) {
                $rootScope.media.setVolume(value);
                $window.localStorage.appmusic = value;
            }
        });
    });
