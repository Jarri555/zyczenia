'use strict';

/**
 * @ngdoc service
 * @name zyczeniaApp.bombki
 * @description
 * # bombki
 * Factory in the zyczeniaApp.
 */
angular.module('zyczeniaApp')
  .factory('bombki', function () {
    var bombki = [
      {
        id: 1,
        image: 'bombka_pernod.svg',
        name: 'Wyborowa Pernod Ricard'
      },
      {
        id: 2,
        image: 'bombka_absolut.svg',
        name: 'Absolut'
      },
      {
        id: 3,
        image: 'bombka_ball.svg',
        name: 'Ballantine\'s'
      },
      {
        id: 4,
        image: 'bombka_ball_brasil.svg',
        name: 'Ballantine\'s Brasil'
      },
      {
        id: 5,
        image: 'bombka_ball_hard.svg',
        name: 'Ballantine\'s Hard Fired '
      },
      {
        id: 6,
        image: 'bombka_campo.svg',
        name: 'Campo Viejo'
      },
      {
        id: 7,
        image: 'bombka_chivas.svg',
        name: 'Chivas Regal'
      },
      {
        id: 8,
        image: 'bombka_glenlivet.svg',
        name: 'The Glenlivet'
      },
      {
        id: 9,
        image: 'bombka_havana.svg',
        name: 'Havana Club'
      },
      {
        id: 10,
        image: 'bombka_jacobs.svg',
        name: 'Jacob\'s Creek'
      },
      {
        id: 11,
        image: 'bombka_jameson.svg',
        name: 'Jameson'
      },
      {
        id: 12,
        image: 'bombka_luksusowa.svg',
        name: 'Luksusowa'
      },
      {
        id: 13,
        image: 'bombka_malibu.svg',
        name: 'Malibu'
      },
      {
        id: 14,
        image: 'bombka_martell.svg',
        name: 'Martell'
      },
      {
        id: 15,
        image: 'bombka_mumm.svg',
        name: 'G.H. Mumm'
      },
      {
        id: 16,
        image: 'bombka_ostoya.svg',
        name: 'Ostoya'
      },
      {
        id: 17,
        image: 'bombka_tadeusz.svg',
        name: 'Pan Tadeusz'
      },
      {
        id: 18,
        image: 'bombka_wyborowa.svg',
        name: 'Wyborowa'
      }
    ];

    var bombka = '';

    return {
      getBombki: function () {
        return bombki;
      },
      getBombka: function(index) {
        return bombki[index].image;
      },
      setBombka: function(val) {
        bombka = val;
      }
    };
  });
