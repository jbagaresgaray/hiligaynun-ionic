'use strict';

angular.module('starter', ['ionic', 'ionic-audio', 'ngDraggable','ngCordova'])
    .run(function($ionicPlatform) {
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
            event.preventDefault();
            event.stopPropagation();
        });
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
    })
    .constant('LETRA_GAME', ['B', 'D', 'A', 'P', 'M', 'S', 'O', 'D', 'M', 'T', 'A', 'I', 'O', 'P', 'S', 'I']);
