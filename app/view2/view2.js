'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {

    // Set to false if NOT debugging
    this.debug = true;    

    $scope.e1Action = "text to show elevator 1 action"
    $scope.e2Action = "text to show elevator 2 action" 

    // TODO: Make elevators and calls into objects
    var e1 = {
      'floor': 1,
      'direction': 1,
	  'inMotion' : false
    };

    var e2 = {
      'floor': 1,
      'direction': 1, 
	  'inMotion' : false
    };

	$scope.e1b1 = "btn btn-primary"
	$scope.e1b2 = "btn btn-primary"
	$scope.e1b3 = "btn btn-primary"
	$scope.e1b4 = "btn btn-primary"
	$scope.e2b1 = "btn btn-primary"
	$scope.e2b2 = "btn btn-primary"
	$scope.e2b3 = "btn btn-primary"
	$scope.e2b4 = "btn btn-primary"
	


	$scope.toggleButton = function(elevator, number, bool){
		switch(elevator){
			case 1:
				switch(number){
					case 1: 
						if(bool){$scope.e1b1 = "btn btn-primary"}
						else {$scope.e1b1 = "btn btn-danger"}
						break;
					case 2:
						if(bool){$scope.e1b2 = "btn btn-primary"}
						else {$scope.e1b2 = "btn btn-danger"}
						break;
					case 3:
						if(bool){$scope.e1b3 = "btn btn-primary"}
						else {$scope.e1b3 = "btn btn-danger"}
						break;
					case 4:
						if(bool){$scope.e1b4 = "btn btn-primary"}
						else {$scope.e1b4 = "btn btn-danger"}
						break;
					default:
						alert("fucked up again")
						break;
				}
				break;
			case 2:
				switch(number){
					case 1:
						if(bool){$scope.e2b1 = "btn btn-primary"}
						else {$scope.e2b1 = "btn btn-danger"}
						break;
					case 2:
						if(bool){$scope.e2b2 = "btn btn-primary"}
						else {$scope.e2b2 = "btn btn-danger"}
						break;
					case 3:
						if(bool){$scope.e2b3 = "btn btn-primary"}
						else {$scope.e2b3 = "btn btn-danger"}
						break;
					case 4:
						if(bool){$scope.e2b4 = "btn btn-primary"}
						else {$scope.e2b4 = "btn btn-danger"}
						break;
					default:
						alert("fucked up again")
						break;
				}
				break;
			default:
				alert("Fucked up")
				break;
		}
	}

	$scope.setDestination = function(){

	}

    // Sets floor of elevator "closest" to call
    //    - "closest" determined by FS value
    this.answerCall = function(fl, dir) {

		// NOTE: We should find the following values experimentally!
		
		// Amount of time spent during a stop including:
		//     1) time of door opening/closing
		//     2) time lost due to slow down of elevator
		this.TIME_STOPPED = 15;
		
		// Amount of time to travel from one floor to the next
		this.TIME_TO_FLOOR = 7;

		var getFS = function(f, d, ef, ed) {
			var fs = 4 - Math.abs(ef - f);

			if ((ed == 1 && f < ef) || (ed == 0 && f > ef) || 
				(ed != d) && (f == ef)) {
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

		// For debugging
		alert(fs1.toString() + " and " + fs2.toString());

		// Randomly choose if neither is "closer"
		if (fs1 == fs2) {
			var rand = Math.random();
			if (rand > .5) {
			fs1++;
			} else {
			fs2++;
			}
		}

		// Choose elevator that is "closer"
		if (fs1 > fs2) {
			e1.direction = dir;
			e1.floor = fl;
		} else {
			e2.direction = dir;
			e2.floor = fl;
		} 
    };

    this.isE1AtFloor = function(f) {
	return f == e1.floor;
    }

    this.isE2AtFloor = function(f) {
	return f == e2.floor;
    }

    this.getE1Direction = function() {
	return e1.direction;
    };

    this.getE2Direction = function() {
	return e2.direction;
    };

    this.getE1Floor = function() {
	return e1.floor;
    };

    this.getE2Floor = function() {
	return e2.floor;
    };

}]);

