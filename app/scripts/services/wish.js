'use strict';

/**
 * @ngdoc service
 * @name zyczeniaApp.wish
 * @description
 * # wish
 * Factory in the zyczeniaApp.
 */
angular.module('zyczeniaApp')
  .factory('wish', function ($q, $http) {

    return {
      getWish: function (token) {
        var defer = $q.defer();

        $http.get('../zyczeniaApi/wishes/' + token).then(function successCallback(response) {
          defer.resolve(response.wish);
        }, function errorCallback(response) {
          defer.reject(response.msg);
        });

        return defer.promise;
      }
    };
  });
