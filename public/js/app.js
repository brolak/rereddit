var app = angular.module('rereddit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'PostController'
    })
    .state('comment', {
      url: '/posts/:id',
      templateUrl: '/templates/comments.html',
      controller: 'CommentController'
    })
    .state('authorization', {
      url: '/authorization?token&name',
      controller: function($stateParams,$state,$rootScope,$http){
        if($stateParams.token){
          var user= {
            name: $stateParams.name,
            token: $stateParams.token
          }
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = $stateParams.name;
          $http.defaults.headers.common.Authorization = "Bearer "+user.token;
          $state.go('home');
        }
      }
    })
    $urlRouterProvider.otherwise('home');

});

app.run(function($rootScope){
  var user = JSON.parse(localStorage.getItem("user"));
  if(user){
    $rootScope.currentUser = user.name;
  }
})