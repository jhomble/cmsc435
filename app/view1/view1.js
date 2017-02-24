'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var database = firebase.database();
  var refDatabase = firebase.database().ref();
  var users = $firebaseArray(refDatabase.child('users'))

  $scope.input = "Type Here"
  $scope.change = function(){
    console.log("Change")
    
    users.$add({
      username: $scope.input
    }).then(function(){
      update()
    })
  }

  var update = function(){
    console.log("update")
    $scope.usernames = [];
    users.$loaded().then(function(user){
      angular.forEach(user, function(x){
        var temp = {name: x.username}
        $scope.usernames.push(temp)
      })
      console.log($scope.usernames)
    })
  }
  update()
}]);