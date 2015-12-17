'use strict';

/**
 * @ngdoc function
 * @name zyczeniaApp.controller:ZyczeniaCtrl
 * @description
 * # ZyczeniaCtrl
 * Controller of the zyczeniaApp
 */
angular.module('zyczeniaApp')
  .controller('ZyczeniaCtrl', function ($scope, $routeParams, $http, $location, $timeout, bombki, wish) {
    var token = $routeParams.token;
    var md = new MobileDetect(window.navigator.userAgent);
    $scope.token = token;

    $scope.wishCookie = wish.getWishes();

    var assignImages = function (obj) {

      $('#gift-bombka').attr("src","images/bombki/" + bombki.getBombka(obj.q2 - 1));
      $('#gift-bombka-token').attr("src","images/bombki/" + bombki.getBombka(obj.q2 - 1));
      $('#gift-bombka4').attr("src","images/bombki/" + bombki.getBombka(obj.q2 - 1));
      $('#gift-przykrywka').attr("src","images/prezent-przykrywka-0" + obj.q3 +".svg");
      $('#gift-body').attr("src","images/prezent-body-0" + obj.q3 +".svg");
      $('#mobile-hand').attr("src","images/mobile-hand-0" + obj.q3 +".svg");
    };
    $scope.sendStatus = false;
    $scope.cards = 1;
    $scope.cardsWord = {
      pl: 'kartkę',
      en: 'card'
    };

    if(token == 'preview') {

      if(typeof $scope.wishCookie === 'undefined') {
        $location.path('/');
      }

      console.log($scope.wishCookie);

      $scope.cards = $scope.wishCookie.recipients.length;


      if ($scope.cards == 1) {
        $scope.cardsWord.pl = 'kartkę';
        $scope.cardsWord.en = 'card';
      } else if ($scope.cards < 5) {
        $scope.cardsWord.pl = 'kartki';
        $scope.cardsWord.en = 'cards';
      } else {
        $scope.cardsWord.pl = 'kartek';
        $scope.cardsWord.en = 'cards';
      }

      $scope.sendCardsZyczenia = function () {


        var data = {
          fullName: $scope.wishCookie.fullName.trim(),
          q1: $scope.wishCookie.q1,
          q1custom: $scope.wishCookie.q1custom,
          q2: $scope.wishCookie.q2,
          q3: $scope.wishCookie.q3,
          recipients: $scope.wishCookie.recipients,
          language: $scope.wishCookie.language
        };

        console.log(data);


        $http.post('api/wishes', data).then(function successCallback(response) {
          console.log(response);
          $scope.sendStatus = 'success';

        }, function errorCallback(response) {
          console.log(response.data.msg);
          $scope.sendStatus = 'error';
        });

      };



      // DEV
      /*$scope.wishCookie = {
        fullName: 'Imię i nazwisko',
        q1: 'May the Christmas season be full of warmth, love and joy. Let the New Year bring great prosperity and may all your dreams come true.',
        q2: '16',
        q3: '3',
        language: 'en'
      };*/
      //DEV

      $scope.language = '';

      var q1 = $scope.wishCookie.q1;

      if($scope.wishCookie.q1 === null) {
        q1 = $scope.wishCookie.q1custom;
      } else {
        q1 = $scope.wishCookie.q1;

        if($scope.wishCookie.q1 == 1) {
          if($scope.wishCookie.language == 'en') {
            q1 = 'May the Christmas season be full of warmth, love and joy. Let the New Year bring great prosperity and may all your dreams come true.';
          } else {
            q1 = 'Niech czas Świąt wypełni radość i rodzinne ciepło, a Nowy Rok przyniesie pomyślność i spełnienie marzeń.';
          }

        } else if ($scope.wishCookie.q1 == 2) {
          if($scope.wishCookie.language == 'en') {
            q1 = 'Let the Christmas season bring much warmth and happiness, and may the New Year be fresh and bright.';
          } else {
            q1 = 'Niech Święta będą pełne blasku i radosnych chwil, a Nowy Rok dostarczy wielu powodów do dumy.';
          }
        } else if ($scope.wishCookie.q1 == 3) {
          if($scope.wishCookie.language == 'en') {
            q1 = 'May the Christmas season be filled with peace and joy. Let the New Year bring an abundance of good fortune and delightful surprises.';
          } else {
            q1 = 'Radosnych Świąt, pełnych pięknych chwil, oraz dobrego Nowego Roku, pod znakiem sukcesów i spełnionych marzeń.';
          }
        } else if ($scope.wishCookie.q1 == 4) {
          if($scope.wishCookie.language == 'en') {
            q1 = 'Let the Christmas season be a special time of love and joy, and may the New Year be full of warm memories and great success.';
          } else {
            q1 = 'Niech świąteczna atmosfera przyniesie Wam radość, a Nowy Rok obfituje w zrealizowane marzenia.';
          }
        }
      }

      $scope.wish = {
        fullName: $scope.wishCookie.fullName,
        q1: q1,
        q2: $scope.wishCookie.q2,
        q3: $scope.wishCookie.q3,
        language: $scope.wishCookie.language
      };



      assignImages($scope.wish);

      //$scope.bombka = bombki.getBombka($scope.wish.q2 - 1);


    } else {
      $http.get('api/wishes/' + token).then(function successCallback(response) {

        $scope.wish = response.data.wish;


        assignImages($scope.wish);

      }, function errorCallback(response) {
        $scope.wish = response;
        console.log($scope.wish);
        $location.path('/');
      });
    }

    $scope.hangThisOrnament = function() {
      if(token == 'preview') {
        $location.path('/');
      } else {
        var data = {
          hang: true
        };
        $http.put('api/wishes/' + token, data).then(function successCallback(response) {

        }, function errorCallback(response) {
          console.log(response);
        });
      }
    };

    if(!md.mobile()) {
      var controller = new ScrollMagic.Controller({
        /*globalSceneOptions: {
         triggerHook: 'onLeave'
         }*/
      });

      // build scenes
      new ScrollMagic.Scene({triggerElement: "#trigger1", triggerHook: 'onLeave'})
        .setClassToggle("#overAllTop", "small") // add class toggle

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#trigger2", triggerHook: 'onLeave'})
        .setClassToggle("#overAllTop", "white") // add class toggle

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: '#this-is-small-gift', triggerHook: 'onLeave'})
        .setPin('#this-is-small-gift')

        .addTo(controller);


      var tween1 = TweenMax.to("#wieniec", 0.5, {css:{opacity:"1"}, ease: Linear.easeNone});

      new ScrollMagic.Scene({triggerElement: "#trigger3", duration: 500, triggerHook: 'onEnter'})
        .setTween(tween1)

        .addTo(controller);


      var tween2 = TweenMax.to("#git-and-hand", 0.5, { css: { "left" : "0%" }});

      new ScrollMagic.Scene({triggerElement: "#trigger4", duration: '100%', triggerHook: 'onEnter'})
        .setTween(tween2)

        .addTo(controller);


      var tween3 = TweenMax.to("#hand", 0.5, { css: { "right" : "300%" }});

      new ScrollMagic.Scene({triggerElement: "#trigger5", duration: '100%', triggerHook: 'onEnter'})
        .setTween(tween3)

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#trigger4", offset: '200%', triggerHook: 'onEnter'})
        .setClassToggle("#this-small-gift-txt", "in") // add class toggle

        .addTo(controller);


      var tween4 = TweenMax.to("#gift-przykrywka", 0.5, { css: { "top" : "-200%" }});

      var tween5 = TweenMax.to("#gift-body", 0.5, { css: { "bottom" : "-200%" }});

      new ScrollMagic.Scene({triggerElement: "#trigger6", duration: '200%', triggerHook: 'onEnter'})
        .setTween(tween4)

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#trigger6", duration: '200%', triggerHook: 'onEnter'})
        .setTween(tween5)

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#trigger7", triggerHook: 'onEnter'})
      ///.setClassToggle("#git-and-hand", "hidden") // add class toggle
        .setPin('#gift-container')

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#trigger7", triggerHook: 'onEnter'})
        //.setClassToggle("#git-and-hand", "hidden") // add class toggle
        //.setPin('#gift-container')

        .addTo(controller);


      var tween6 = TweenMax.to("#token-background", 0.5, { css: { "left" : "-80%" }});

      new ScrollMagic.Scene({triggerElement: "#is-a-token", duration: '200%', triggerHook: 'onLeave'})
        .setTween(tween6)

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#is-a-token", duration: '200%', triggerHook: 'onLeave'})
        .setPin('#token-background')

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#is-a-token", duration: '200%', triggerHook: 'onLeave'})
        .setTween(tween6)

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#is-a-token", duration: '200%', triggerHook: 'onLeave'})
        .setPin('#footer-token')

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#is-a-token", offset: '100%', triggerHook: 'onLeave'})
        .setClassToggle("#footer-token", "in") // add class toggle

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#wish", triggerHook: 'onLeave'})
        .setClassToggle("#wish", "in") // add class toggle

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#wish", offset: '-100%', triggerHook: 'onLeave'})
        .setClassToggle("#overAllTop", "color") // add class toggle

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#wish", duration: '150%', triggerHook: 'onLeave'})
        .setPin('#wish')

        .addTo(controller);


      var tween7 = TweenMax.to("#wish-bombka-01", 0.5, { css: { "top" : "0" }});

      new ScrollMagic.Scene({triggerElement: "#wish", duration: '50%', offset: '900%', triggerHook: 'onLeave'})
        .setTween(tween7)

        .addTo(controller);


      var tween8 = TweenMax.to("#wish-bombka-02", 0.5, { css: { "top" : "0" }});

      new ScrollMagic.Scene({triggerElement: "#wish", duration: '50%', offset: '400%', triggerHook: 'onLeave'})
        .setTween(tween8)

        .addTo(controller);


      var tween9 = TweenMax.to("#wish-line", 0.5, { css: { "left" : "50%", "opacity": 1 }});

      new ScrollMagic.Scene({triggerElement: "#wish", duration: '50%', offset: '400%', triggerHook: 'onLeave'})
        .setTween(tween9)

        .addTo(controller);


      var tween10 = TweenMax.to("#wish-gifts", 0.5, { css: { "bottom" : "0"}});

      new ScrollMagic.Scene({triggerElement: "#wish", duration: '50%', offset: '800%', triggerHook: 'onLeave'})
        .setTween(tween10)

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", triggerHook: 'onEnter'})
        .setClassToggle("#git-and-hand", "hang")

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", duration: '200%', triggerHook: 'onLeave'})
        .setPin('#hang-this-ornament')

        .addTo(controller);

      /* arrow */

      new ScrollMagic.Scene({triggerElement: "#home", triggerHook: 'onEnter'})
        .setClassToggle("#overAllFooter", "gold")

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#this-is-small-gift", offset: 55, triggerHook: 'onEnter'})
        .setClassToggle("#overAllFooter", "white")

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#wish", offset: 55, triggerHook: 'onEnter'})
        .setClassToggle("#overAllFooter", "gold2")

        .addTo(controller);


      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", offset: 55, triggerHook: 'onEnter'})
        .setClassToggle("#overAllFooter", "white2")

        .addTo(controller);

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", offset: '-100%', triggerHook: 'onLeave'})
        .setClassToggle("#overAllTop", "white3") // add class toggle

        .addTo(controller);

      var ribon_main = $('ribon_main');

      var tween11 = TweenMax.to(ribon_main, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone});

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", offset: '-100%', triggerHook: 'onLeave'})
        .setTween(tween11)
        .addTo(controller);


      var tween18 = TweenMax.to('#ribon', 0.5, { css: { "opacity" : "1"}});

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", duration: '50%', triggerHook: 'onLeave'})
        .setTween(tween18)

        .addTo(controller);


      var tween19 = TweenMax.to('#gift-bombka4', 0.5, { css: { "opacity" : "1"}});

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", duration: '50%', triggerHook: 'onLeave'})
        .setTween(tween19)

        .addTo(controller);


      var tween20 = TweenMax.to('#hang-this-ornament-footer', 0.5, { css: { "opacity" : "1"}});

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", duration: '50%', offset: '500%', triggerHook: 'onLeave'})
        .setTween(tween20)

        .addTo(controller);


      var tween21 = TweenMax.to('#hang-this-ornament-button', 0.5, { css: { "opacity" : "1"}});

      new ScrollMagic.Scene({triggerElement: "#hang-this-ornament", duration: '50%', offset: '1000%', triggerHook: 'onLeave'})
        .setTween(tween21)

        .addTo(controller);
    }

  });
