app.controller('PostController', function($scope, postFactory) {
  $scope.posts = postFactory.posts;
  
  $scope.addPost = function() {
    //todo
  }

  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  $scope.deletePost = function() {
    //extension todo - only for admins
  }
});
