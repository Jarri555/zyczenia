'use strict';

/**
 * @ngdoc function
 * @name zyczeniaApp.controller:ZyczeniaCtrl
 * @description
 * # ZyczeniaCtrl
 * Controller of the zyczeniaApp
 */
angular.module('zyczeniaApp')
  .controller('ZyczeniaCtrl', function ($scope, $routeParams, $http, $location) {
    var token = $routeParams.token;
    console.log(token);

    if(token == 'preview') {

    } else {
      $http.get('api/wishes/' + token).then(function successCallback(response) {
        $scope.wish = response.data.wish;
        console.log($scope.wish);
      }, function errorCallback(response) {
        $scope.wish = response;
        console.log($scope.wish);
        $location.path('/');
      });
    }



    $scope.hangThisOrnament = function() {
      var data = {
        hang: true
      };
      $http.put('../zyczeniaApi/wishes/' + token, data).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    };

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
      .setClassToggle("#git-and-hand", "hidden") // add class toggle
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

  });
