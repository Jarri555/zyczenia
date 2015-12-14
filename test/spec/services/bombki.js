'use strict';

describe('Service: bombki', function () {

  // load the service's module
  beforeEach(module('zyczeniaApp'));

  // instantiate service
  var bombki;
  beforeEach(inject(function (_bombki_) {
    bombki = _bombki_;
  }));

  it('should do something', function () {
    expect(!!bombki).toBe(true);
  });

});
