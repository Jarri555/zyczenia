'use strict';

describe('Controller: HangCtrl', function () {

  // load the controller's module
  beforeEach(module('zyczeniaApp'));

  var HangCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HangCtrl = $controller('HangCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HangCtrl.awesomeThings.length).toBe(3);
  });
});
