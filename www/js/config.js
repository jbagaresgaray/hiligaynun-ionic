'use strict';

angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
        // $ionicConfigProvider.views.maxCache(0);
        
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/main.html',
                        controller: 'MenuCtrl'
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings.html',
                        controller: 'settingsCtrl'
                    }
                }
            })
            .state('app.scoreboard', {
                url: '/scoreboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/scoreboard.html',
                        controller: 'scoreBoardCtrl'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists/:topicId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/playlists.html',
                        controller: 'PlaylistsCtrl',
                        cache: false
                    }
                }
            })
            .state('app.huni', {
                url: '/huni',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/huni/main.html',
                        controller: 'huniCtrl'
                    }
                }
            })
            .state('app.single', {
                url: '/playlist/:topicId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/letra/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.sounds', {
                url: '/sounds/:topicId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/huni/sounds.html',
                        controller: 'PlaylistCtrl',
                        cache: false
                    }
                }
            })
            .state('app.kunla', {
                url: '/kunla/:topicId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/kunla/kunla.html',
                        controller: 'PlaylistCtrl',
                        cache: false
                    }
                }
            })
            .state('app.wordings', {
                url: '/wordings/:topicId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/wordings/wording.html',
                        controller: 'PlaylistCtrl',
                        cache: false
                    }
                }
            })
            .state('app.detail', {
                url: '/detail/:letter',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/letra/detail.html',
                        controller: 'PlaylistDetailCtrl'
                    }
                }
            })
            .state('app.sounddetail', {
                url: '/sounddetail/:sound',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/huni/sound_detail.html',
                        controller: 'PlaylistSoundDetailCtrl'
                    }
                }
            })
            .state('app.kunladetail', {
                url: '/kunladetail/:kunla',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/kunla/kunla_detail.html',
                        controller: 'PlaylistKunlaDetailCtrl'
                    }
                }
            })
            .state('app.wordingdetail', {
                url: '/wordingdetail/:wording',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hibaluon/wordings/wordingdetail.html',
                        controller: 'PlaylistWordingDetailCtrl'
                    }
                }
            })
            .state('app.quizLetter', {
                url: '/quiz/letter',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hampang/letra.html',
                        controller: 'letraCtrl',
                        cache: false
                    }
                }
            })
            .state('app.quizHuni', {
                url: '/quiz/huni/:params',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hampang/huni.html',
                        controller: 'huniQuizCtrl',
                        cache: false
                    }
                }
            })
            .state('app.quizKunla', {
                url: '/quiz/kunla',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hampang/kunla.html',
                        controller: 'kunlaCtrl',
                        cache: false
                    }
                }
            })
            .state('app.quizParehasSuli', {
                url: '/quiz/parehas/:topic',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hampang/parehas.html',
                        controller: 'wordingCtrl',
                        cache: false
                    }
                }
            })
            .state('app.quizResult', {
                url: '/quiz/result',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hampang/result.html',
                        controller: 'scoreCtrl'
                    }
                }
            })
            .state('app.info', {
                url: '/info',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tab-info.html'
                    }
                }
            })
            .state('app.author', {
                url: '/author',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tab-author.html'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/main');
    });
