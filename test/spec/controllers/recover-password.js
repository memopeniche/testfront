'use strict';

describe('Controller: RecoverPasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('academiaApp'));

  var RecoverPasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecoverPasswordCtrl = $controller('RecoverPasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecoverPasswordCtrl.awesomeThings.length).toBe(3);
  });
});
