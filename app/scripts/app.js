'use strict';

/**
 * @ngdoc overview
 * @name zyczeniaApp
 * @description
 * # zyczeniaApp
 *
 * Main module of the application.
 */
angular
  .module('zyczeniaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'duScroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/en', {
        templateUrl: 'views/english.html'
      })
      .when('/pl', {
        templateUrl: 'views/polski.html'
      })
      .when('/zyczenia/:token', {
        templateUrl: 'views/zyczenia.html',
        controller: 'ZyczeniaCtrl'
      })
      .when('/hang/:token', {
        templateUrl: 'views/hang.html',
        controller: 'HangCtrl'
      })
      .otherwise({
        redirectTo: '/en'
      })
    ;
  })
  .run(function ($rootScope, $timeout, $window) {
    $rootScope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        $window.scrollTo(0,0);
      }, 500);
    });
  });
