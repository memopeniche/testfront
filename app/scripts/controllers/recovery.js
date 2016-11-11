'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:RecoveryCtrl
 * @description
 * # RecoveryCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('RecoveryCtrl', function ($scope, $location, api) {

    var search = $location.search();

    if (!search.token) {
      return $location.path('/');
    }

    $scope.submit = function (form) {
      $scope.showError = false;
      if (form.password !== $scope.repeatPassword) {
        $scope.showError = 'Contraseñas distintas';
        return ;
      }

      $scope.loading = true;

      form.token = search.token;
      api.$http.post('/default/updatepass', form).then(function(res) {
        if (res && res.data && res.data.success) {
          $scope.success = true;
        } else {
          $scope.failed = true;
        }
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
