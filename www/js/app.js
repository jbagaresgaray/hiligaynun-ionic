'use strict';

angular
    .module('starter', ['ionic', 'ionic-audio', 'ngDraggable', 'ngCordova', 'cgBusy'])
    .run(function(DB, $ionicPlatform, $state, $rootScope, $cordovaMedia) {

        DB.init();

        function getPhoneGapPath() {
            var path = window.location.pathname;
            path = path.substr(path, path.length - 10);
            return 'file://' + path;
        }

        $ionicPlatform.ready(function() {
            console.log('$ionicPlatform.ready');

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            /*if (window.cordova && window.Media) {
                if (!_.isUndefined(window.localStorage.appmusic) && window.localStorage.appmusic !== 'undefined') {

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
                    window.localStorage.appvolume = 100;
                    window.localStorage.appmusic = true;
                }else{
                    window.localStorage.appvolume = 0;
                    window.localStorage.appmusic = false;
                }
            }*/
        })


        /*$ionicPlatform.onHardwareBackButton(function() {
            if ($state.current.name === 'app.quizKunla') {
                event.preventDefault();
                event.stopPropagation();
            }
        });

        $ionicPlatform.registerBackButtonAction(function(event) {
            if ($state.current.name === 'app.quizKunla') {
                event.preventDefault();
                event.stopPropagation();
            }
        }, 100);*/
    })
    .constant('DB_CONFIG', {
        name: 'Hiligaynon',
        tables: [{
            name: 'scores',
            columns: [{
                name: 'id',
                type: 'integer primary key AUTOINCREMENT'
            }, {
                name: 'topic',
                type: 'text'
            }, {
                name: 'name',
                type: 'text'
            }, {
                name: 'score',
                type: 'text'
            }]
        }, {
            name: 'scoreboard',
            columns: [{
                name: 'id',
                type: 'integer primary key AUTOINCREMENT'
            }, {
                name: 'ans',
                type: 'text'
            }, {
                name: 'choice',
                type: 'text'
            }, {
                name: 'img',
                type: 'text'
            }, {
                name: 'isCorrect',
                type: 'boolean'
            }]
        }]
    });
