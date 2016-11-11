'use strict';

/**
 * @ngdoc service
 * @name academiaApp.api
 * @description
 * # api
 * Service in the academiaApp.
 */
angular.module('academiaApp')
  .service('api', function ($http, $httpParamSerializerJQLike, $q, $location, user, $mdDialog) {
    /* jshint validthis: true */
    var api = this;

    //var apiUrl = 'http://web2py/academia';
    // var apiUrl = 'https://api.academia.cometdevelop.com';
    var apiUrl = 'https://ec2-52-91-69-242.compute-1.amazonaws.com/test5/';

    api.$http = function(req) {
      req.url = apiUrl + req.url;
      return $http(req).then(function(res) {
        if (res.data && res.data.error === 'noLogin') {
          user.clear();
          $location.path('/login');
          return $q.reject();
        }
        return res;
      }).catch(function() {
        showErrorHttp();
      });
    };

    api.$http.post = function(url, data) {
      var req = {
          method: 'POST',
          url: url,
          data: data,
      };
      return api.$http(req);
    };

    api.$http.postFile = function(url, data) {
      var req = {
          method: 'POST',
          url: url,
          data: data,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
      };
      return api.$http(req);
    };

    api.$http.get = function(url, data) {
      var req = {method: 'GET', url: url, params: data};
      return api.$http(req);
    };

    // data.url = apiUrl+data.url;

    api.serialize = function(req) {
      req.url = apiUrl + req.url;
      req.data = req.data || {};
      if (req.method === 'get') {
        req.url += '?';
        Object.keys(req.data).forEach(function(k) {
          if (k === 'answers') {
            var vals = req.data[k].map(function(val) {
              return 'answers='+val;
            });
            req.url += '&' + vals.join('&');
          } else {
            req.url += '&'+k+ '=' + req.data[k];
          }
        });
      }
      return req;
    };

    function fakeHttp(url, data, res) {
      res =  res || {
        data: {
          success: true
        }
      };

      return $q.resolve(res);
    }

    api.$http.fakePost = fakeHttp;
    api.$http.fakeGet = fakeHttp;

    function showErrorHttp() {
      var alert = $mdDialog.alert({
        title: 'Error',
        textContent: 'Ocurrio un error en la conexión',
        ok: 'Aceptar'
      });
      $mdDialog
        .show(alert);
    }
  });
