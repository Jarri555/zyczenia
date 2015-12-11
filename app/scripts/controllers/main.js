'use strict';

/**
 * @ngdoc function
 * @name zyczeniaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zyczeniaApp
 */
angular.module('zyczeniaApp')
  .controller('MainCtrl', function ($rootScope, $scope, $document, $http, $timeout, $location) {

    $scope.resetForm = function () {
      $scope.sendStatus = 'none';
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

      $scope.recipients = [
        {id: 0, fullName: '', email: '', fullNameError: false, emailError: false}
      ];

      $scope.fullName = '';

      $scope.cards = 'card';
    };

    $scope.errors = {
      wishes: false,
      fullName: false,
      ornament: false,
      paper: false,
      recipients: false
    };

    $rootScope.$on( "$routeChangeSuccess", function() {
      $scope.resetForm();

      $timeout(function() {
        $scope.elements = {
          chooseWishes: angular.element(document.getElementById('choose-wishes')),
          fullName: angular.element(document.getElementById('full-name')),
          pickOneOrnament: angular.element(document.getElementById('pick-one-ornament')),
          chooseWrappingPaper: angular.element(document.getElementById('choose-wrapping-paper')),
          defineRecipients: angular.element(document.getElementById('define-recipients'))
        };
      }, 800);
    });

    $scope.scrollCfg = {
      offset: {
        page: 20,
        input: 80
      },
      duration: 1000
    };



    $scope.resetForm();

    $scope.sender = {
      asd: ''
    };

    /* questions */

    var isEmpty = function (val) {
      console.log('a');
      if (typeof val !== 'undefined') {
        if (val == '') {
          return true;
        }
        else {
          return false;
        }
      } else {
        return true;
      }
    };

    $scope.$watch('questions.q1.radio', function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      $scope.errors.wishes = false;
      $scope.questions.q1.custom.active = false;
    });

    $scope.$watch('questions.q1.custom.text', function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      $scope.errors.wishes = false;
      $scope.questions.q1.custom.active = true;

      $scope.questions.q1.custom.characters = newVal.length;
      if ($scope.questions.q1.custom.characters > 160) {
        $scope.questions.q1.custom.text = oldVal;
      }

    });

    $scope.$watch('sender.fullName', function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      $scope.errors.fullName = false;
    });

    $scope.$watch('recipients', function (newVal, oldVal) {
      for (var i in newVal) {
        if(typeof oldVal[i] !== 'undefined') {
          if(newVal[i].fullName !== oldVal[i].fullName) {
            $scope.recipients[i].fullNameError = false;
            $scope.errors.recipients = false;
          }

          if(newVal[i].email !== oldVal[i].email) {
            $scope.recipients[i].emailError = false;
            $scope.errors.recipients = false;
          }
        }
      }
    }, true);

    $scope.$watch('questions.q2.radio', function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      $scope.errors.ornament = false;
    });

    $scope.$watch('questions.q3.radio', function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      $scope.errors.paper = false;
    });

    $scope.$watch('recipients.length', function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      if (newVal > 1) {
        $scope.cards = 'cards';
      } else {
        $scope.cards = 'card';
      }

    });

    $scope.validation = function (val) {
      if (typeof val !== 'undefined') {
        if (val.trim().length > 0) {
          return true;
        }
      }
      return false;
    };

    $scope.isEmail = function (email) {
      var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    };

    $scope.letsSendSomeCards = function (e) {
      $document.scrollToElement($scope.elements.chooseWishes, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      e.preventDefault();
    };

    $scope.addAnotherPerson = function () {
      var newPersonId = $scope.recipients.length + 1;
      $scope.recipients.push({id: newPersonId, fullName: '', email: ''});
    };

    $scope.removeAnotherPerson = function (index) {
      if ($scope.recipients.length < 1) {
        return;
      }
      $scope.recipients.splice(index, 1);
    };

    $scope.sendCards = function (e) {

      if (!$scope.validation($scope.recipients[0].fullName) || !$scope.validation($scope.recipients[0].email)) {
        $scope.errors.recipients = true;
        $document.scrollToElement($scope.elements.defineRecipients, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      }

      for (var i in $scope.recipients) {
        if (i > 0) {
          if (($scope.validation($scope.recipients[i].fullName) && !$scope.validation($scope.recipients[i].email)) || (!$scope.validation($scope.recipients[i].fullName) && $scope.validation($scope.recipients[i].email))) {
            $scope.errors.recipients = true;

            if(!$scope.validation($scope.recipients[i].fullName)) {
              $scope.recipients[i].fullNameError = true;
            }

            if(!$scope.validation($scope.recipients[i].email)) {
              $scope.recipients[i].emailError = true;
            } else {
              if(!$scope.isEmail($scope.recipients[i].email)) {
                $scope.errors.recipients = true;
                $scope.recipients[i].emailError = true;
              }
            }

            $document.scrollToElement($scope.elements.defineRecipients, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
          }
        } else {
          if (!$scope.validation($scope.recipients[i].fullName) || !$scope.validation($scope.recipients[i].email)) {
            $scope.errors.recipients = true;

            if(!$scope.validation($scope.recipients[i].fullName)) {
              $scope.recipients[i].fullNameError = true;
            }

            if(!$scope.validation($scope.recipients[i].email)) {
              $scope.recipients[i].emailError = true;
            }

            $document.scrollToElement($scope.elements.defineRecipients, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);

            if (!$scope.validation($scope.recipients[i].fullName)) {

            }
          }
          if(!$scope.isEmail($scope.recipients[i].email)) {
            $scope.errors.recipients = true;
            $scope.recipients[i].emailError = true;
          }
        }


      }

      if (!$scope.validation($scope.questions.q3.radio)) {
        $scope.errors.paper = true;
        $document.scrollToElement($scope.elements.chooseWrappingPaper, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      }

      if (!$scope.validation($scope.questions.q2.radio)) {
        $scope.errors.ornament = true;
        $document.scrollToElement($scope.elements.pickOneOrnament, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      }

      if (!$scope.validation($scope.sender.fullName)) {
        $scope.errors.fullName = true;
        $document.scrollToElement($scope.elements.fullName, $scope.scrollCfg.offset.input, $scope.scrollCfg.duration);
      }

      if (!$scope.validation($scope.questions.q1.radio)) {
        if (!$scope.validation($scope.questions.q1.custom.text)) {
          $scope.errors.wishes = true;
          $document.scrollToElement($scope.elements.chooseWishes, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
        }
      }


      if (!$scope.errors.recipients && !$scope.errors.paper && !$scope.errors.ornament && !$scope.errors.fullName && !$scope.errors.wishes) {

        var q1 = isEmpty($scope.questions.q1.radio) && $scope.questions.q1.custom.active ? null : $scope.questions.q1.radio;
        var q1custom = isEmpty($scope.questions.q1.custom.text) && !$scope.questions.q1.custom.active ? null : $scope.questions.q1.custom.text;

        var data = {
          fullName: $scope.sender.fullName.trim(),
          q1: q1,
          q1custom: q1custom,
          q2: $scope.questions.q2.radio,
          q3: $scope.questions.q3.radio,
          recipients: $scope.recipients,
          language: $location.path()
        };

        console.log(data);

        $http.post('api/wishes', data).then(function successCallback(response) {
          console.log(response.wish);
          $scope.sendStatus = 'success';

        }, function errorCallback(response) {
          console.log(response.data.msg);
          $scope.sendStatus = 'error';
        });
      }

      e.preventDefault();
    };



    $scope.sendMoreCards = function (e) {
      $scope.resetForm();
      $document.scrollToElement($scope.elements.chooseWishes, $scope.scrollCfg.offset.page, $scope.scrollCfg.duration);
      e.preventDefault();
    };
  });
