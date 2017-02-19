'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {

    // Here are a list of variables to show buttons or change text
    // My convention right now is e1_1 being elevator 1 on floor 1 
    $scope.e1_1 = true;
    $scope.e2_1 = true;
    $scope.e1_2 = false;
    $scope.e2_2 = false;
    $scope.e1_3 = false;
    $scope.e2_3 = false;
    $scope.e1_4 = false;
    $scope.e2_4 = false;

    $scope.e1Action = "text to show elevator 1 action"
    $scope.e2Action = "text to show elevator 2 action" 

    // TODO: Make elevators and calls into objects
    var e1 = {
      'floor': 1,
      'direction': 1
    };

    var e2 = {
      'floor': 1,
      'direction': 1
    };

    // Sets floor of elevator "closest" to call
    //    - "closest" determined by FS value
    this.answerCall = function(fl, dir) {

	var getFS = function(f, d, ef, ed) {
    var fs = 4 - Math.abs(ef - f);

    if ((ed == 1 && (ef - f) < 0) || (ed == 0 && (ef-f) > 0)){
      fs = 1;
        } else {
      if (ed == d) {
          fs += 2;
      } else {
          fs ++;
      }
        }

        return fs;
    };

	var fs1 = getFS(fl,dir, e1.floor, e1.direction);
	var fs2 = getFS(fl,dir, e2.floor, e2.direction);	    

	if (fs1 >= fs2) {
	    if (fl > e1.floor) {
		e1.direction = 1;
	    } else {
		e1.direction = 0;
	    }
	    e1.floor = fl;
	} else {
	    if (fl > e2.floor) {
		e2.direction = 1;
	    } else {
		e2.direction = 0;
	    }
	    e2.floor = fl;
	}
    };

    this.getE1Floor = function() {
	return e1.floor;
    };

    this.getE2Floor = function() {
	return e2.floor;
    };

}]);

