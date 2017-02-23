'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'firebase',
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/help', {
    templateUrl: '/view2/help'
  })
  .otherwise({redirectTo: '/view1'});
}]);
