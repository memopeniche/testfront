'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('NotesCtrl', function ($scope, $routeParams, $location, api, user) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (!$routeParams.id) {
      return $location.path('/dashboard');
    }

    var userToken = user.getToken();

    api.$http.get('/notes/', {user: userToken, note: $routeParams.id}).then(function (res) {
      if (res.data) {
        processContent(res.data);
        $scope.note = res.data;
        processContent(res.data);
      } else {
        $scope.note = {
          title: 'Sin título',
          content: '# Sin contenido #'
        };
      }
    });

    function processContent(note) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, note.content]);
    }
  });
