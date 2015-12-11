'use strict';

describe('Controller: ZyczeniaCtrl', function () {

  // load the controller's module
  beforeEach(module('zyczeniaApp'));

  var ZyczeniaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ZyczeniaCtrl = $controller('ZyczeniaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ZyczeniaCtrl.awesomeThings.length).toBe(3);
  });
});
