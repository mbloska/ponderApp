'use strict';

angular.module('ponderAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/question', {
        templateUrl: 'app/question/main.html',
        controller: 'QuestionCtrl'
      }).
    when('/question/:thingId', {
        templateUrl: 'app/question/question.html',
        controller: 'QuestionCtrl'
      });
});
