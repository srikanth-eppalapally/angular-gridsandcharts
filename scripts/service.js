/**
 * Created by DAY on 22-08-2014.
 */
var appService=angular.module('appService',[]);
appService.factory('movieService', function($http) {
    return {
        getMovie: function(url) {
            return $http.get(url);
        }
    }
});
appService.service('asyncService', function($http, $q) {
    return {
        loadDataFromUrls: function(urls) {
            var deferred = $q.defer();
            var urlCalls = [];
                urlCalls.push($http.get(urls));
            $q.all(urlCalls)
                .then(
                function(results) {
                    deferred.resolve(
                      results)
                },
                function(errors) {
                    deferred.reject(errors);
                },
                function(updates) {
                    deferred.update(updates);
                });
            return deferred.promise;
        }
    };
});