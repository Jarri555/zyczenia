'use strict';

/**
 * @ngdoc function
 * @name zyczeniaApp.controller:HangCtrl
 * @description
 * # HangCtrl
 * Controller of the zyczeniaApp
 */
angular.module('zyczeniaApp')
  .controller('HangCtrl', function ($scope, $http, $routeParams, $location, bombki) {

    var token = $routeParams.token;

    $scope.token = token;

    $scope.status = {success: false, error: false};
    //$scope.status = {success: false, error: false};

    $http.get('api/wishes/' + token).then(function successCallback(response) {
      $scope.language = response.data.wish.language;
      $scope.bombka = bombki.getBombka(response.data.wish.q2 - 1);

    }, function errorCallback(response) {
      $location.path('/');
    });



    var hangOrnamentHttp = function () {

      $http.put('api/wishes/' + token, {hang: true}).then(function successCallback(response) {
        if(response.status == 200) {
          if($scope.language == 'en') {
            $scope.message = {
              h1: 'Thank You!',
              h2: 'Your ornament will be displayed<br>at Wyborowa Pernod Ricard HQ!'
            };
          } else {
            $scope.message = {
              h1: 'Dziękujemy!',
              h2: 'Twoja bombka będzie widoczna<br>w siedzibie Wyborowa Pernod Ricard!'
            };
          }

        }

      }, function errorCallback (response) {
        if(response.data.msg = 'ERROR: Twoja bombka już jest zawieszona') {
          if($scope.language == 'en') {
            $scope.message = {
              h1: 'Your ornamet is already hang!',
              h2: 'Thank you!'
            };
          } else {
            $scope.message = {
              h1: 'Twoja bombka juz wisi!',
              h2: 'Dziękujemy!'
            };
          }

        }
      });

      return true;
    };


    $scope.hangOrnament = function () {

      if (hangOrnamentHttp()) {
        $scope.$apply(function () {
          $scope.status = {success: true, error: false};
        });

      } else {
        $scope.$apply(function () {
          $scope.status = {success: false, error: true};
        });
      }

    };


    interact('.draggable')
      .draggable({
        // enable inertial throwing
        inertia: true,
        mode: 'anchor',
        anchors: [],
        elementOrigin: {x: 0.5, y: 0.5},
        endOnly: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: ".container",
          endOnly: true,
          elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },
        // enable autoScroll
        autoScroll: false,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
          var textEl = event.target.querySelector('p');
          $('.arrow-right').css('opacity', 1);
          textEl && (textEl.textContent =
            'moved a distance of '
            + (Math.sqrt(event.dx * event.dx +
              event.dy * event.dy) | 0) + 'px');
        }
      });

    var dropzonePos = $('.dropzone').offset().left;
    var bombka = $('#bombka-drag');

    interact('.dropzone').dropzone({
      // only accept elements matching this CSS selector
      accept: '#bombka-drag',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.75,

      // listen for drop related events:

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        //event.relatedTarget.textContent = 'Dragged out';
        bombka.removeClass('dropped');
      },

      ondrop: function (event) {
        event.target.classList.add('dropped');

        var draggableElement = event.relatedTarget,
          dropzoneElement = interact.getElementRect(event.target),
          dropCenter = {
            x: dropzoneElement.left + dropzoneElement.width / 2 - $('.container').width() / 4 - 10 + 2,
            y: dropzoneElement.top + dropzoneElement.height / 2
          };

        // feedback the possibility of a drop
        //dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');


        /*draggableElement.setAttribute('data-x', dropCenter.x);
         draggableElement.setAttribute('data-y', 0);*/

        //$('#bombka-drag').css({"-webkit-transform":"translate(" + dropCenter.x + "px,0px)"});​
        $('#bombka-drag').addClass('dropped');
        $('#bombka-drag').css('transform', 'translate(' + dropCenter.x + 'px,0px)');

        $('#bombka-drag').removeClass('draggable');

        $scope.hangOrnament();
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        //bombka.removeClass('dropped');
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      }
    });


    function dragMoveListener(event) {
      $('.arrow-right').css('opacity', 0.1);

      var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;
  });
