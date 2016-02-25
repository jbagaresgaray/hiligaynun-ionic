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
            wordings: function() {
                return $http.get('js/values/wordings.json').then(function(data) {
                    return data;
                });
            }
        }
    })
    .factory('Quiz', function($http) {
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
            wordings: function() {
                return $http.get('js/values/quiz/wording.json').then(function(data) {
                    return data.data;
                });
            },
            parehasSuli: function(){
                return $http.get('js/values/quiz/parehas.json').then(function(data) {
                    return data.data;
                });
            },
            shuffle: function() {
                return $http.get('js/values/quiz/shuffle.json').then(function(data) {
                    return data.data;
                })
            }
        };
    })
    .factory('Score', function(DB) {
        var self = this;

        self.all = function() {
            return DB.query('SELECT * FROM scores')
                .then(function(result) {
                    return DB.fetchAll(result);
                });
        };

        self.byTopic = function(topic) {
            return DB.query('SELECT * FROM scores WHERE topic=? ORDER BY score DESC;', [topic])
                .then(function(result) {
                    return DB.fetchAll(result);
                });
        };

        self.insert = function(topic, name, score) {
            return DB.query('INSERT INTO scores(topic,name,score) VALUES(?,?,?)', [topic, name, score])
                .then(function(result) {
                    return result.insertId;
                });
        }
        return self;
    });
