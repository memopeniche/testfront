'use strict';

/**
 * @ngdoc overview
 * @name academiaApp
 * @description
 * # academiaApp
 *
 * Main module of the application.
 */
angular
  .module('academiaApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'chart.js',
    'hc.marked',
    'angAccordion'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/recover-password', {
        templateUrl: 'views/recover-password.html',
        controller: 'RecoverPasswordCtrl',
        controllerAs: 'recover-password'
      })
      .when('/email_verification', {
        templateUrl: 'views/email_verification.html',
        controller: 'EmailVerificationCtrl',
        controllerAs: 'emailVerification'
      })
      .when('/topic/:topic', {
        templateUrl: 'views/topic.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic'
      })
      .when('/exercises/:id', {
        templateUrl: 'views/exercises.html',
        controller: 'ExercisesCtrl',
        controllerAs: 'exercises'
      })
      .when('/exercises2/:id', {
        templateUrl: 'views/exercises2.html',
        controller: 'ExercisesCtrl',
        controllerAs: 'exercises2'
      })
      .when('/exercises3/:id', {
        templateUrl: 'views/exercises3.html',
        controller: 'ExercisesCtrl',
        controllerAs: 'exercises3'
      })
      .when('/notes/:id', {
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl',
        controllerAs: 'notes'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/hook', {
        templateUrl: 'views/hook.php'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/recovery', {
        templateUrl: 'views/recovery.html',
        controller: 'RecoveryCtrl',
        controllerAs: 'recovery'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      colours : ['#1e2a35', '#d74b4b'],
      responsive: true
    });
  });
function showAlert(message, success) {
  $("#alertModal .modal-body").text(message);
  if (success) {
    $("#alertModal .modal-header")
    .removeClass("bg-danger")
    .addClass("bg-success");
  }else{
    $("#alertModal .modal-header")
    .addClass("bg-danger")
    .removeClass("bg-success");    
  }
  $("#alertModal").modal();
}
