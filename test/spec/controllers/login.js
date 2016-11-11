'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('academiaApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a form to the scope', function () {
    expect(scope.form).toEqual({large: true});
  });
});
