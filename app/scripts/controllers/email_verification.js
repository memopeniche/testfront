'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:EmailVerificationCtrl
 * @description
 * # EmailVerificationCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('EmailVerificationCtrl', function ($scope, $location, $timeout, api) {

    var search = $location.search();

    if (!search.token) {
      return $location.path('/');
    }

    api.$http.get('/default/email_verification', search).then(function(res) {
      $scope.done = true;
      if (res && res.data && res.data.success) {
        $scope.success = true;
        $timeout(function () {
          $location.path('/login');
        }, 1600);
      } else {
        $scope.error = true;
      }
    });



    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
