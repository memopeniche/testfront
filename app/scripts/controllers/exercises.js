'use strict';

/**
 * @ngdoc function
 * @name academiaApp.controller:ExercisesCtrl
 * @description
 * # ExercisesCtrl
 * Controller of the academiaApp
 */
angular.module('academiaApp')
  .controller('ExercisesCtrl', function ($scope, $location, $routeParams, $timeout, api, user) {

  	if (!$routeParams.id) {
      return $location.path('/dashboard');
    }

    $scope.answer = {};
    $scope.showVerify = true;
    $scope.markAnswer = true;

    var userToken = user.getToken();

    $scope.userPreferences = user.preferences();
    console.log($scope.userPreferences);

    $scope.errors = [
      'Paso incorrecto',
      'Algo esta mal escrito, intenta de nuevo',
      'El paso es el mismo que el anterior'
    ];

    function loadExercise() {
      api.$http.get('/exercises/exercise', {user: userToken, ex: $routeParams.id}).then(function (res) {
        if (res.data) {
          //res.data.steps = [{latex: '$$x^2$$', rightStep:false}, {latex: '$$x=2$$', rightStep: true}]
          $scope.ex = res.data;
          if ($scope.ex.startLatex) {
            console.log('start', $scope.ex.startLatex);
            $scope.cacheLatex = $scope.ex.steps.length==0?$scope.ex.startLatex:$scope.ex.steps[$scope.ex.steps.length-1].latex;
            if ($scope.userPreferences.freeEx) {
              setLatex("");
            }else{
              setLatex($scope.cacheLatex);
            }
          }
          $scope.mathJaxify(res.data.question);
          $scope.ex.steps = ($scope.ex.steps || []).map(function(step) {
            if (step.latex.indexOf('$$') !== 0) {
              step.latex = '$$' + step.latex + '$$';
            }
            return step;
          });
          $scope.mathJaxify(res.data.question);

          processExType4();
        }
      });
    }

    function formatAnswers(correctAnwsers) {
      if (correctAnwsers && $scope.ex && $scope.ex.choices) {
        $scope.correctAnwsers = $scope.ex.choices.map(function(val, i) {
          if (correctAnwsers.indexOf(i) !== -1) {
            return true;
          }
        });
      }
    }

    function setLatex(latex){
      $timeout(function(){
        var MQ = MathQuill.getInterface(2);
        var mathField = MQ.MathField($('.mq-editable-field')[0]);
        console.log(mathField);
        mathField.clearSelection();
        mathField.latex(latex).focus();        
      });
      // $scope.ex.steps.length==0?$scope.ex.startLatex:$scope.ex.steps[$scope.ex.steps.length-1].latex
    }
    $scope.buttonLatex = function(value) {
      var MQ = MathQuill.getInterface(2);
      var mathField = MQ.MathField($('.mq-editable-field')[0]);

      $timeout(function () {
        mathField.cmd(value).focus();
      });
    }

    $scope.mathJaxify = function(text) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, text]);
    };


    $scope.verify = function (answer, last) {
      if (last !== undefined) {
        $scope.last = last;
      }
      console.log('last', $scope.last);
      if ($scope.ex.type === 3) {
        $scope.last = true;
      }

      $scope.errorCode = null;
      var latex = $scope.latex && $scope.latex.trim() || false;
      if (!$scope.checkOne(answer) && !$scope.latex) {
        return ;
      }
      $scope.loading = true;
      $scope.showVerify = false;
      $scope.correctAnwsers = [];

      var answers = Object.keys(answer).map(function(ans) {
        if ($scope.ex.type === 1) {
          return parseInt(answer[ans]);
        } else if ($scope.ex.type === 2) {
          if (answer[ans]) {
            return parseInt(ans);
          }
        }
      }).filter(function(val) {
        return isFinite(val);
      });
      //exercises/eval_step {user, ex, step: 'latex user'}
      // res -> success:true/false

      var urlRequest = '/exercises/';
      var params = {
        user: userToken,
        ex: $routeParams.id
      };
      var postParams = {};
      if ($scope.ex.type === 3 || $scope.ex.type === 4) {
        postParams.step = latex;
        postParams.last = $scope.last ? 1 : 0;
        params.curse = 1;
        urlRequest += 'evalstep';
      } else {
        urlRequest += 'eval';
        postParams.answers = answers;
      }


      api.$http.post(urlRequest+'?curse=1&user='+params.user+'&ex='+params.ex, postParams).then(function(res) {
        console.log('par', postParams, res);
        $scope.loading = false;
        $scope.showNext = true;
        if (res.data && res.data.success) {
          $scope.ex.topic = $scope.ex.topic || {};
          $scope.ex.topic.score =  res.data.topicScore;
          if ($scope.ex.type === 4 || $scope.ex.type === 3) {
            loadExercise();
            return ;
          }

          $scope.success = true;
          $scope.correctAnwsers = res.data.answers;

          formatAnswers(res.data.answers);

        } else {

          if (res.data && $scope.ex.type === 4) {
            $scope.showError = true;
            $scope.errorCode = res.data.errorCode * -1;
            if (!res.data.closed) {
              $scope.showNext = false;
              $scope.showVerify = true;
              return ;
            }
          }

          formatAnswers(res.data && res.data.answers);
          $scope.selectedAnswers = answers;
          $scope.failed = true;

          if ($scope.ex.type === 1) {
            $scope.correctAnwsers = {radio: res.data.answers[0]}
          }
        }
      });

    };

    function processExType4() {
      if ($scope.ex.closed) {
        $scope.showNext = true;
        $scope.showVerify = false;

        if ($scope.ex.ok) {
          $scope.success = true;
        } else {
          $scope.failed = true;
        }

        if ($scope.ex.type === 1) {
          $scope.answer = {radio: $scope.ex.selectedAnswers[0]};
          $scope.correctAnwsers = {radio: $scope.ex.answers[0]}
        } else if ($scope.ex.type === 2) {
          $scope.correctAnwsers = $scope.ex.answers;
          formatAnswers($scope.ex.answers);
          $scope.answer = $scope.ex.choices.map(function (val, i) {
            if ($scope.ex.selectedAnswers.indexOf(i) !== -1) {
              return true;
            }
          });
        }

      } else {
        $scope.showNext = false;
        $scope.showVerify = true;
        return ;
      }



      $scope.otherRes = true;

    }

    $scope.checkOne = function (answer) {
      $scope.markAnswer = !Object.keys(answer).filter(function(index) {
        return answer[index];
      }).length;
      return !$scope.markAnswer;
    };

    var routeParams = {topic: $routeParams.topic, dif: $routeParams.dif};
    $scope.nextExercise = function () {
      if (!$routeParams || !isFinite($routeParams.topic) || !isFinite($routeParams.dif)) {
        //if modify the params.
        return $location.path('/');
      }
  		api.$http.get('/exercises/getex', {user: user.getToken(), topic: $routeParams.topic, dif: $routeParams.dif}).then(function (res) {
  		  if (res.data && res.data.id>=0) {
        	$location.path('/exercises/'+res.data.id).search(routeParams);
  		  }else{
  		  	alert('No se encontraron ejercicios');
  		  }
  		});
    };
    $scope.nextExercise2 = function () {
      if (!$routeParams || !isFinite($routeParams.topic) || !isFinite($routeParams.dif)) {
        //if modify the params.
        return $location.path('/');
      }
  		api.$http.get('/exercises/getex', {user: user.getToken(), topic: $routeParams.topic, dif: $routeParams.dif}).then(function (res) {
  		  if (res.data && res.data.id>=0) {
        	$location.path('/exercises2/'+res.data.id).search(routeParams);
  		  }else{
  		  	alert('No se encontraron ejercicios');
  		  }
  		});
    };

    $scope.nextExercise3 = function () {
      if (!$routeParams || !isFinite($routeParams.topic) || !isFinite($routeParams.dif)) {
        //if modify the params.
        return $location.path('/');
      }
                api.$http.get('/exercises/getex', {user: user.getToken(), topic: $routeParams.topic, dif: $routeParams.dif}).then(function (res) {
                  if (res.data && res.data.id>=0) {
                $location.path('/exercises3/'+res.data.id).search(routeParams);
                  }else{
                        alert('No se encontraron ejercicios');
                  }
                });
    };


    loadExercise();

    $scope.setPreference = function(free) {

      var obj = {freeEx: free};
      user.preferences(obj);
      $scope.userPreferences = obj;

      if (!free && $scope.cacheLatex) {
        setLatex($scope.cacheLatex);
      }else{
        setLatex("");
      }
      console.log('sta', $scope.ex.startLatex, $scope.cacheLatex);
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
