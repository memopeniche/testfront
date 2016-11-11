'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('LoginCtrl', function ($scope, api, $location, user) {

    $scope.form = {
      large: true
    };

    $scope.doLogin = function(form) {
      if ($scope.loading) {
        return ;
      }
      $scope.loading = true;
      $scope.error = false;
      api.$http.get('/default/login', form).then(function(res) {
        if (res && res.data && res.data.success) {
          $scope.isLogIn = true;
          user.setToken(res.data.token, !form.large);
          $location.path('/dashboard');
        } else {
          $scope.loading = false;
          $scope.error = true;
          $scope.form = {};
        }
      });
    };

    $scope.isLogIn = user.getToken();

    $scope.$watch(function() {
      return user.getToken();
    }, function(newV) {
      $scope.isLogIn = newV;
    });

    $scope.logOut = function() {
      user.clear();
      $scope.isLogIn = false;
      $location.path('/login');
    };
  });
