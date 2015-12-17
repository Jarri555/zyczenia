'use strict';

/**
 * @ngdoc function
 * @name zyczeniaApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the zyczeniaApp
 */
angular.module('zyczeniaApp')
  .controller('GalleryCtrl', function ($scope, $interval, $timeout, $http, bombki) {
    $scope.showBombki = false;
    $http.get('api/wishes').then(function successCallback(response){
      $scope.bombki = response.data.msg;

      for(var i in $scope.bombki) {
        $scope.bombki[i].name = $scope.bombki[i].fullName.replace(/\s/g,'<br>');
        $scope.bombki[i].bombka = bombki.getBombka(parseInt($scope.bombki[i].q2) - 1);
      }
      $scope.showBombki = true;
    },function errorCalback(response) {
      console.log(response);
    });


    /*$scope.bombki = [
      {
        bombka: 1,
        name: 'Jan Kowalski'
      },
      {
        bombka: 2,
        name: 'Jan Kowalski'
      },
      {
        bombka: 5,
        name: 'Jan Kowalski'
      },
      {
        bombka: 8,
        name: 'Jan Kowalski'
      },
      {
        bombka: 8,
        name: 'Jan Kowalski'
      },
      {
        bombka: 8,
        name: 'Jan Kowalski'
      },
      {
        bombka: 8,
        name: 'Jan Kowalski'
      },
      {
        bombka: 8,
        name: 'Jan Kowalski'
      },
      {
        bombka: 8,
        name: 'Jan Kowalski'
      },
    ];*/



    $interval(function() {
      $http.get('api/wishes').then(function successCallback(response){
        $scope.bombki = response.data.msg;

        for(var i in $scope.bombki) {
          $scope.bombki[i].name = $scope.bombki[i].fullName.replace(/\s/g,'<br>');
          $scope.bombki[i].bombka = bombki.getBombka(parseInt($scope.bombki[i].q2) - 1);
        }

        $scope.showBombki = true;
      },function errorCalback(response) {
        console.log(response);
      });
    }, 1000*30);



  });
