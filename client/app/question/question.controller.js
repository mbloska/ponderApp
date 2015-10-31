'use strict';

angular.module('ponderAppApp')


  .controller('QuestionCtrl', function ($scope, $location, $http, socket, Auth, $routeParams) {
 // .controller('QuestionCtrl, ['$scope','$routeParams', function($scope, $routeParams) {
    
    //$scope.question = [];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    // get question and rest of contents
    var thisQuestion = $routeParams.thingId;
    
    
    //get comment info
    $http.get('/api/comments').success(function(thingComment) {          
          var postComments = [];
          for (var i = 0, len = thingComment.length; i < len; i++){
              
               if (thingComment[i].post === thisQuestion) {
                 postComments.push(thingComment[i]);    
               }
          }
          //console.log(postComments);
          $scope.comments = postComments;
    });
    
    //get question info
    $http.get('/api/things/' + thisQuestion).success(function(data) {
      $scope.question = [data]; //add content to an array
      socket.syncUpdates('comment', $scope.question);
    });
    
    
    //adding comments to the system
   $scope.addComment = function() {
      //if($scope.newComment === '') {
      //  return;
      //}
      $http.post('/api/comments', { comment: $scope.newComment, post: thisQuestion });
      $scope.newComment = '';
    };
    //error possibly here ^


});
