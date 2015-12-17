'use strict';

/**
 * @ngdoc service
 * @name zyczeniaApp.wish
 * @description
 * # wish
 * Factory in the zyczeniaApp.
 */
angular.module('zyczeniaApp')
  .factory('wish', function ($q, $http, $cookies) {

    var wishes = {};

    return {
      getWish: function (token) {
        var defer = $q.defer();

        $http.get('api/wishes/' + token).then(function successCallback(response) {
          defer.resolve(response.wish);
        }, function errorCallback(response) {
          defer.reject(response.msg);
        });

        return defer.promise;
      },

      setWishes: function (val) {
        $cookies.putObject('wishPrev', val);
      },

      getWishes: function() {
        var val = $cookies.getObject('wishPrev')
        $cookies.remove('wishPrev');
        return val;
      }
    };
  });
