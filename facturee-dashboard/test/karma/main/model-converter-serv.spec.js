'use strict';

describe('module: main, service: ModelConverter', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var ModelConverter;
  beforeEach(inject(function (_ModelConverter_) {
    ModelConverter = _ModelConverter_;
  }));

  it('should do something', function () {
    expect(!!ModelConverter).toBe(true);
  });

});
