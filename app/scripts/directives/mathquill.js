'use strict';

/**
 * @ngdoc directive
 * @name academiaApp.directive:mathquill
 * @description
 * # mathquill
 */

angular.module('academiaApp')
  .directive('mathquill', ['$timeout', function ($timeout) {
    return {
      template: '<span id="math-field" style="font-size: 16px;"></span>',
      restrict: 'E',
      scope: { model: '=', defaultValue: '=' },
      link: function (scope, element, attrs) {
        var MQ = MathQuill.getInterface(2);
        var mathField = MQ.MathField(element[0], {
          spaceBehavesLikeTab: true,
          handlers: {
            edit: function() {
              scope.model = mathField.latex();
              scope.$apply();
            }
          }
        });
        
        $timeout(function () {
          // assigning default value to model
          if (typeof scope.defaultValue !== 'undefined' && scope.defaultValue.length) {
            mathField.latex(scope.defaultValue.replace(/\$/g, ''));
            scope.model = mathField.latex();
            // scope.$apply();
          }
        });
      }
    };
  }]);
