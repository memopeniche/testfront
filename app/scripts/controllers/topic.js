'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:TopicCtrl
 * @description
 * # TopicCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('TopicCtrl', function ($scope, $location, $routeParams, api, user) {

    var errors = [
      "No tenemos ejercicios de esta dificultad",
      "Debes resolver tus ejercicios pendientes para generar nuevos ejercicios"
    ];

    if (!$routeParams.topic) {
      return $location.path('/dashboard');
    }

    api.$http.get('/units/topic', {user: user.getToken(), topic: $routeParams.topic}).then(function (res) {
      if (res.data) {
        $scope.topic = res.data;

        $scope.topic.examples.map(function (example, i) {
          if (example === "") $scope.topic.examples[i] = "Sin ejercicios.";
          $scope.mathJaxify(example);
        });
      }
    });

    $scope.getEx = function(difficulty) {
  		if ($scope.loading){
        return ;
      }
  		api.$http.get('/exercises/getex', {user: user.getToken(), topic: $routeParams.topic, dif: difficulty}).then(function (res) {
  		  if (res.data && res.data.id>=0) {
          return $location.path('/exercises/'+res.data.id).search({topic: $routeParams.topic, dif: difficulty});
  		  }else{
          showAlert(errors[res.data.errorCode],false);
  		  }
  		});
    };
    $scope.getEx2 = function(difficulty) {
  		if ($scope.loading){
        return ;
      }
  		api.$http.get('/exercises/getex', {user: user.getToken(), topic: $routeParams.topic, dif: difficulty}).then(function (res) {
  		  if (res.data && res.data.id>=0) {
          return $location.path('/exercises2/'+res.data.id).search({topic: $routeParams.topic, dif: difficulty});
  		  }else{
          showAlert(errors[res.data.errorCode],false);
  		  }
  		});
    };
    $scope.getEx3= function(difficulty) {
                if ($scope.loading){
        return ;
      }
                api.$http.get('/exercises/getex', {user: user.getToken(), topic: $routeParams.topic, dif: difficulty}).then(function (res) {
                  if (res.data && res.data.id>=0) {
          return $location.path('/exercises3/'+res.data.id).search({topic: $routeParams.topic, dif: difficulty});
                  }else{
          showAlert(errors[res.data.errorCode],false);
                  }
                });
    };

    $scope.mathJaxify = function(text) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, text]);
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
