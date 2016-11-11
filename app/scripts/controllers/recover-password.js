'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:RecoverPasswordCtrl
 * @description
 * # RecoverPasswordCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('RecoverPasswordCtrl', function ($scope, api) {

    $scope.recovery = function(email) {
      console.log('email', email);
      $scope.loading = true;
      api.$http.post('/default/recovery', {email: email}).then(function(res) {
        $scope.success = true;
      });

    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
