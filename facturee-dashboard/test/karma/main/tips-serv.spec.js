'use strict';

describe('module: main, service: Tips', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Tips;
  beforeEach(inject(function (_Tips_) {
    Tips = _Tips_;
  }));

  it('should do something', function () {
    expect(!!Tips).toBe(true);
  });

});
