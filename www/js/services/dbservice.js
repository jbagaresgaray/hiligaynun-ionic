'use strict';

angular
    .module('starter')
    .factory('DB', function($q, DB_CONFIG, $cordovaSQLite) {
        var self = this;
        self.db = null;

        self.init = function() {

            if (window.sqlitePlugin) {
                // Use in production
                self.db = $cordovaSQLite.openDB({
                    name: DB_CONFIG.name
                });
            } else {
                self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 200000);
            }

            angular.forEach(DB_CONFIG.tables, function(table) {
                var columns = [];

                angular.forEach(table.columns, function(column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                self.query(query);
                console.log('Table ' + table.name + ' initialized');
            });
        };

        self.query = function(query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            if (window.sqlitePlugin) {
                $cordovaSQLite.execute(self.db, query, bindings).then(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });
            } else {
                self.db.transaction(function(tx) {
                    tx.executeSql(query, bindings, function(tx, result) {
                        deferred.resolve(result);
                    }, function(tx, error) {
                        deferred.reject(error);
                    });
                });
            }


            return deferred.promise;
        };

        self.fetchAll = function(result) {
            var output = [];

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }

            return output;
        };

        self.fetch = function(result) {
            if (result.rows.length > 0) {
                return result.rows.item(0);
            }
        };

        return self;
    });
