'use strict';

describe('Service: wish', function () {

  // load the service's module
  beforeEach(module('zyczeniaApp'));

  // instantiate service
  var wish;
  beforeEach(inject(function (_wish_) {
    wish = _wish_;
  }));

  it('should do something', function () {
    expect(!!wish).toBe(true);
  });

});
