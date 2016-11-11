'use strict';

/**
 * @ngdoc service
 * @name academiaApp.user
 * @description
 * # user
 * Service in the academiaApp.
 */
angular.module('academiaApp')
  .service('user', function () {
    /* jshint validthis: true */
    var user = this;


    var token = localStorage.loginToken || sessionStorage.loginToken;
    user.setToken = function(tk, temp) {
      var save = localStorage;
      if (temp) {
        save = sessionStorage;
      }
      save.setItem('loginToken', tk);
      token = tk;
    };

    user.getToken = function() {
      return token;
    };

    user.clear = function() {
      localStorage.clear();
      sessionStorage.clear();
    };

    user.preferences = function(obj) {
      var pre = {freeEx: true};
      if (localStorage.preferences) {
        pre = JSON.parse(localStorage.preferences);
      }
      if (obj) {
        var mer = angular.merge(pre, obj);
        localStorage.setItem('preferences', JSON.stringify(mer));
      }

      return mer || pre;
    }
  });
