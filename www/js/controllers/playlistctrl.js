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
    .controller('PlaylistsCtrl', function($scope, $stateParams) {
        console.log('params: ', $stateParams.topicId);
    })
    .controller('PlaylistCtrl', function($scope, $stateParams, $ionicLoading, Helpers) {
        console.log('params: ', $stateParams.topicId);

        $scope.helpers = {};
        if (!_.isUndefined($stateParams.topicId)) {
            switch ($stateParams.topicId) {
                case 'letra':
                    $ionicLoading.show();
                    Helpers.letters().then(function(res) {
                        console.log('data: ', res.data);
                        setTimeout(function() {
                            $scope.$apply(function() {
                                $scope.helpers = res.data;
                                $ionicLoading.hide();
                            });
                        }, 100);
                    });
                    break;
                case 'huni':

                    break;
                case 'kunla':

                    break;
                case 'suli':
                    break;
                default:

                    break;
            }
        }

    });
