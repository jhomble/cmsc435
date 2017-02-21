'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$interval', function($scope, $interval) {

    // Set to false if NOT debugging
    $scope.debug = true;    

    $scope.e1Action = "text to show elevator 1 action"
    $scope.e2Action = "text to show elevator 2 action" 

    var Elevator = function () {
	this.floor = 1.0;
	this.direction = 0;
	this.queue = [];
	this.waitTime = 0;
    };

    var el1 = new Elevator();
    var el2 = new Elevator();

	$scope.e1b1 = "btn btn-primary"
	$scope.e1b2 = "btn btn-primary"
	$scope.e1b3 = "btn btn-primary"
	$scope.e1b4 = "btn btn-primary"
	$scope.e2b1 = "btn btn-primary"
	$scope.e2b2 = "btn btn-primary"
	$scope.e2b3 = "btn btn-primary"
	$scope.e2b4 = "btn btn-primary"
	


	$scope.toggleButton = function(elevator, number, bool){
		console.log("Toggle elevator " + elevator + " button " + number)
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

    // Advances elevator closer to target if not waiting or idle
    var updateElevator = function (elevator) {
	if (elevator.waitTime > 0) {
	    elevator.waitTime -= 0.01;
	} else {
	    var lastIndex = elevator.queue.length-1;
	    if (Math.abs(elevator.floor - elevator.queue[lastIndex]) <= 0.0001) {
		elevator.floor = elevator.queue[lastIndex];
		elevator.queue.pop();
		elevator.waitTime = 1;
	    }
	    
	    if (elevator.queue.length == 0) {
		elevator.direction = 0;
	    } else if (elevator.waitTime <= 0) {
		if (elevator.direction == 1) {
		    elevator.floor += 0.01;
		} else if (elevator.direction == -1) {
		    elevator.floor -= 0.01;
		}
	    }
	}
		
    };

    $interval(function() {
	updateElevator(el1);
    }, 100);
    
    $interval(function() {
	updateElevator(el2);
    }, 100);

    // Sets floor of elevator "closest" to call
    //    - "closest" determined by FS value
    this.answerCall = function(fl, dir) {

	        var getDirection = function(f, ef) {
		    if (ef > f) {
			return -1;
		    } else if (ef < f) {
			return 1;
		    } else {
			return 0;
		    }
		};

		var getFS = function(f, d, e) {
			var fs = 4 - Math.abs(e.floor - f);

			if ((e.direction == 1 && f < e.floor) || 
			    (e.direction == 0 && f > e.floor) || 
			    (e.direction != d) && (f == e.floor)) {
			    fs = 1;
			} else {
			    if (e.direction == d) {
				fs += 2;
			    } else {
				fs ++;
			    }
			}
		    
		    return fs;
		};

		var fs1 = getFS(fl, dir, el1);
		var fs2 = getFS(fl, dir, el2);	    

		// For debugging
		//alert(fs1.toString() + " and " + fs2.toString());

		// Randomly choose if neither is "closer"
		if (fs1 == fs2) {
		    var rand = Math.random();
		    if (rand > .5) {
			fs1++;
		    } else {
			fs2++;
		    }
		}


	        // Adds call to elevator queue and adjusts direction
	        var registerElevator = function(elevator) {
	            var newDir = 0;
		    if (elevator.queue.length == 0) {
			newDir = getDirection(fl, elevator.floor);
		    } else {
			newDir = elevator.direction;
		    }
		    if (elevator.queue.indexOf(fl) == -1 && elevator.floor != fl) {
			elevator.queue.push(fl);
			elevator.queue.sort();
			if (newDir == 1) {
			    elevator.queue.reverse();
			}
		    }
		    elevator.direction = newDir;
		    
		};

		// Choose elevator that is "closer"
		if (fs1 > fs2) {
		    registerElevator(el1);
		} else {
		    registerElevator(el2);
		} 
    };

    this.isE1AtFloor = function(f) {
	return f == el1.floor;
    }

    this.isE2AtFloor = function(f) {
	return f == el2.floor;
    }

    this.getE1Queue = function() {
	return el1.queue;
    };

    this.getE2Queue = function() {
	return el2.queue;
    };

    this.getE1Direction = function() {
	return el1.direction;
    };

    this.getE2Direction = function() {
	return el2.direction;
    };

    this.getE1Floor = function() {
	return el1.floor;
    };

    this.getE2Floor = function() {
	return el2.floor;
    };

}]);

