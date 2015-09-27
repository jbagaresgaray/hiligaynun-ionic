'use strict';

angular.module('starter')
    .factory('Helpers', function($http, $q) {
        return {
            letters: function() {
                return $http.get('js/values/letters.json').then(function(data) {
                    return data;
                });
            },
            sounds: function() {
                return $http.get('js/values/sounds.json').then(function(data) {
                    return data;
                });
            },
            syllables: function() {
                return $http.get('js/values/syllables.json').then(function(data) {
                    return data;
                });
            },
            htmltexts: function() {
                return $http.get('js/values/helper.json').then(function(data) {
                    return data;
                });
            },
            css: function() {

            }
        }
    });
