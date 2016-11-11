'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('ProfileCtrl', function ($scope, api, user) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var userToken = user.getToken();

    api.$http.get('/account/profile', {user: userToken}).then(function (res) {
      if (res.data) {
        $scope.profile = res.data;
        $scope.form = {idCareer:res.data.idCareer};
      }
    });

    api.$http.get('/account/careers').then(function (res) {
      if (res.data) {
        $scope.careers = res.data.careers;
      }
    });

    $scope.updateCareer = function(form){
      api.$http.post('/account/updatecareer',{user:userToken,idCareer:form.idCareer}).then(function(res){
        showAlert("Dato actualizado",true);  //BBB 
      });
    }
  });
