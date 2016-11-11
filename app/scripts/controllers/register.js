'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('RegisterCtrl', function ($scope, api) {

    $scope.form = {};

    $scope.doRegister = function(form, confirmPassword) {
      if ($scope.loading) {
        return ;
      }
      if (form.password !== confirmPassword) {
        $scope.passwordError = true;
        return ;
      }

      $scope.passwordError = false;

      $scope.loading = true;
      api.$http.post('/default/register', form).then(function(res) {
        if (res && res.data) {
          if (res.data.errors && Object.keys(res.data.errors).length) {
            $scope.loading = false;
            $scope.errors = res.data.errors;
            return ;
          }
          $scope.msg = true;
        }
      });
    };



    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
