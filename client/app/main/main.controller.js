'use strict';

angular.module('ponderAppApp')
  .controller('MainCtrl', function ($scope, $location, $http, socket, Auth, $routeParams) {
    //add ismytweet function to check if message is mine or not
   
    $scope.questionThings = [];
    $scope.questionSide = []; //second scope for adding more sides 

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.isMyTweet = function(thing){
      //if gets user logged id - and the tweets user id matches 
      return Auth.isLoggedIn() && thing.user && thing.user._id===Auth.getCurrentUser()._id;
    };

    
// get post ------------------------------------------------    
    $http.get('/api/things').success(function(questionThings) {
      $scope.questionThings = questionThings;
      socket.syncUpdates('thing', $scope.questionThings);
    });

// add more side options ----------------------------------    
    $scope.addfield = function(){
      $scope.questionSide.push({})
    }  
    
    
// adding new posts ----------------------------------------    
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
        
      //teams added togeather        
      var addedSides = ''
                 
      for (var i = 1; i < $scope.questionSide.length; i++) {
        addedSides = $scope.questionSide[i] + ', '
        
        console.log(addedSides);
      }  //error here
        
      var sides =  addedSides + $scope.newThing.side1 + ' ' + $scope.newThing.side2;

      var sides = sides.split(' ');
      
      //gategories split on ,
      var postTags = $scope.newThing.category;
      var postTags = postTags.split(',');
        
      $http.post('/api/things', { name: $scope.newThing.question, category: postTags});
      $scope.newThing = '';
    };
    
// delete post ----------------------------------------------
    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

// sockets page update --------------------------------------
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
    
// go to question -------------------------------------------
    $scope.goToQuestion = function(thing) {
        var question = '/question/' + thing._id; //added to be able to navigate to questions
        $location.path(question);
    };
    
    
    
  });
