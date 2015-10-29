'use strict';

angular.module('starter')
    .factory('Helpers', function($http) {
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
            wordings: function(){
                return $http.get('js/values/wordings.json').then(function(data) {
                    return data;
                });
            }
        }
    })
    .factory('Quiz', function($http){
        return {
            letters: function() {
                return $http.get('js/values/quiz/letra.json').then(function(data) {
                    return data.data;
                });
            },
            sounds: function() {
                return $http.get('js/values/quiz/huni.json').then(function(data) {
                    return data.data;
                });
            },
            syllables: function() {
                return $http.get('js/values/quiz/kunla.json').then(function(data) {
                    return data.data;
                });
            },
            wordings: function(){
                return $http.get('js/values/quiz/wording.json').then(function(data) {
                    return data.data;
                });
            }
        };
    });
