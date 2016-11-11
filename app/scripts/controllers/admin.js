'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('AdminCtrl', function ($scope, api, user, $http, $route) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.form = {};
    var topicSelected;
    $scope.topicClick = function(idTopic){
    	topicSelected = idTopic;
    	$("#loadFileModal").modal();
    };
    
    $scope.loadFile = function(form){
    	var fd = new FormData();
        fd.append('file', form.file);
        fd.append('user', user.getToken());
        fd.append('idTopic', topicSelected);
        fd.append('notes', form.notes);
    	api.$http.postFile('/admin/loadfile',fd).then(function(res){
    		if (res.data && res.data.success) {
        		showAlert("Archivo cargado con éxito",true); 
    		}else{
        		showAlert("Error: "+res.data.error,false); 
    		}
    	});
    };

    api.$http.get('/admin/units', {user: user.getToken(),curse:1}).then(function (res) {
      if (res.data) {
        $scope.units = res.data;
      }
    });

    api.$http.get('/admin/loads', {user: user.getToken(),curse:1}).then(function (res) {
      if (res.data) {
        $scope.loads = res.data;
      }
    });
  });
