'use strict';

describe('Directive: mathjax', function () {

  // load the directive's module
  beforeEach(module('academiaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mathjax></mathjax>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mathjax directive');
  }));
});
