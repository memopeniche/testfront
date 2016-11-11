'use strict';

describe('Controller: RecoveryCtrl', function () {

  // load the controller's module
  beforeEach(module('academiaApp'));

  var RecoveryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecoveryCtrl = $controller('RecoveryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecoveryCtrl.awesomeThings.length).toBe(3);
  });
});
