'use strict';

angular
    .module('starter', ['ionic', 'ionic-audio', 'ngDraggable', 'ngCordova','cgBusy'])
    .run(function($ionicPlatform, $state, $rootScope) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $ionicPlatform.onHardwareBackButton(function() {
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
        }, 100);
    })
    .run(function(DB) {
        DB.init();
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
        }]
    })
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);;
    });
