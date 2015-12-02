'use strict';

/**
 * @ngdoc function
 * @name zyczeniaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zyczeniaApp
 */
angular.module('zyczeniaApp')
  .controller('MainCtrl', function ($scope, $document) {
    $scope.errors = {
      wishes: false,
      fullName: false,
      ornament: false,
      paper: false,
      receipents: false
    };

    $scope.elements = {
      chooseWishes: angular.element(document.getElementById('choose-wishes')),
      fullName: angular.element(document.getElementById('full-name')),
      pickOneOrnament: angular.element(document.getElementById('pick-one-ornament')),
      chooseWrappingPaper: angular.element(document.getElementById('choose-wrapping-paper'))
    };

    $scope.scrollCfg = {
      offset: {
        page: 20,
        input: 80
      },
      duration: 1000
    };

    /* questions */

    $scope.questions = {
      q1: {
        radio: '',
        custom: {
          active: false,
          text: '',
          characters: 0
        }
      },
      q2: {
        radio: ''
      },
      q3: {
        radio: ''
      }
    };

    $scope.receipents = [
      {id: 0, name: '', email: ''}
    ];

    $scope.cards = 'card';

    $scope.$watch('questions.q1.radio', function(newVal, oldVal) {
      if (newVal === oldVal) { return; }
      $scope.errors.wishes = false;
      $scope.questions.q1.custom.active = false;
    });

    $scope.$watch('questions.q1.custom.text', function(newVal, oldVal) {
      if (newVal === oldVal) { return; }
      $scope.errors.wishes = false;
      $scope.questions.q1.custom.active = true;

      $scope.questions.q1.custom.characters = newVal.length;
      if($scope.questions.q1.custom.characters > 160) {
        $scope.questions.q1.custom.text = oldVal;
      }

    });

    $scope.$watch('fullName', function(newVal, oldVal) {
      if (newVal === oldVal) { return; }
      $scope.errors.fullName = false;
    });

    $scope.$watch('questions.q2.radio', function(newVal, oldVal) {
      if (newVal === oldVal) { return; }
      $scope.errors.ornament = false;
    });

    $scope.$watch('questions.q3.radio', function(newVal, oldVal) {
      if (newVal === oldVal) { return; }
      $scope.errors.paper = false;
    });

    $scope.$watch('receipents.length', function(newVal, oldVal) {
      if (newVal === oldVal) { return; }
      if(newVal > 1) {
        $scope.cards = 'cards';
      } else {
        $scope.cards = 'card';
      }

    });


    $scope.validation = function (val) {
      if(typeof val !== 'undefined') {
        if(val.trim().length>0){
          return true;
        }
      }
      return false;
    };

    $scope.letsSendSomeCards = function (e) {
      $document.scrollToElement($scope.elements.chooseWishes, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      e.preventDefault();
    };

    $scope.addAnotherPerson = function () {
      var newPersonId = $scope.receipents.length + 1;
      $scope.receipents.push({id: newPersonId, name: '', email: ''});
    };

    $scope.removeAnotherPerson = function (index) {
      if($scope.receipents.length < 1) {
        return;
      }
      $scope.receipents.splice(index, 1);
    };

    $scope.sendCards = function (e) {

      if(!$scope.validation($scope.questions.q3.radio)) {
        $scope.errors.paper = true;
        $document.scrollToElement($scope.elements.chooseWrappingPaper, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      }
      if(!$scope.validation($scope.questions.q2.radio)) {
        $scope.errors.ornament = true;
        $document.scrollToElement($scope.elements.pickOneOrnament, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      }
      if(!$scope.validation($scope.fullName)) {
        $scope.errors.fullName = true;
        $document.scrollToElement($scope.elements.fullName, $scope.scrollCfg.offset.input, $scope.scrollCfg.duration);
      }
      if(!$scope.validation($scope.questions.q1.radio)) {
        if(!$scope.validation($scope.questions.q1.custom.text)) {
          $scope.errors.wishes = true;
          $document.scrollToElement($scope.elements.chooseWishes, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
        }
      }

      console.log($scope.questions.q1.a1);
      e.preventDefault();
    };



  });
