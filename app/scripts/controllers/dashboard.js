'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('DashboardCtrl', function ($scope, api, user) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.showNoSolve = true;
    api.$http.get('/units', {user: user.getToken(), curse: 1}).then(function (res) {
      if (res.data) {
        $scope.units = formatData(res.data);
      }
    });

    api.$http.get('/exercises/history', {user: user.getToken()}).then(function (res) {
      if (res.data) {
        $scope.history = res.data.exercises;
      }
    });

    function formatData(units) {
      var f = units.map(function(unit) {
        unit.radarLabels = unit.topics.map(function(topic) {
          return topic.name;
        });
        unit.radarData = [unit.topics.map(function(topic) {
          return topic.score;
        })];

        return unit;
      });

      return f;
    }
  });
