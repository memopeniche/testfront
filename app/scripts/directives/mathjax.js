/**
 * @ngdoc directive
 * @name academiaApp.directive:mathjax
 * @description
 * # mathjax
 */
MathJax.Hub.Config({
  skipStartupTypeset: true,
  messageStyle: "none",
  "HTML-CSS": {
      showMathMenu: false
  },
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
   }
});
MathJax.Hub.Configured();

angular.module('academiaApp')
  .directive('mathjax', function () {
    return function(scope, el, attrs, ctrl) {
      scope.$watch(attrs.mathjax, function() {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, el[0]]);
      });
    };
  });
