'use strict';

/**
 * @ngdoc service
 * @name zyczeniaApp.gallery
 * @description
 * # gallery
 * Factory in the zyczeniaApp.
 */
angular.module('zyczeniaApp')
  .factory('gallery', function ($resource) {
    return $resource('api/wishes/:id'); // Note the full endpoint address
  }, {
    query: {
      method: 'GET',
      transformResponse: function (data) {
        return data.msg;
      },
      isArray: true
    }
  });
