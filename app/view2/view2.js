'use strict';

angular.module('myApp.view2', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/view2', {
			templateUrl: 'view2/view2.html',
			controller: 'View2Ctrl'
		});
	}])

	.controller('View2Ctrl', ['$scope', '$interval', function ($scope, $interval) {

		// Set to false if NOT debugging
		$scope.debug = true;

		var Elevator = function (id) {
			this.floor = 1.0;
			this.direction = 0;               // 1 = UP, 0 = IDLE, -1 = DOWN
			this.queue = [];                  // Holds button calls from FLOOR BUTTONS (does NOT differentiate b/n up/down calls)
			this.waitTime = 0;                // Should only be non-zero if stopped at floor for pick-up
			this.waitingQue = [];             // Holds button calls from ELEVATORS
			this.inMotion = 0;                // Probably redundant given direction
			this.id = id;					  // Elevator number
			this.floorCount = 0;			  // Track # of floors visited
			this.requestState = 0;			  // 0 = Idle, 1 = Going to floor, 2 = On floor w/ elevator request
		};

		var el1 = new Elevator(1);
		var el2 = new Elevator(2);

		// Updates the action text for given elevator with id with given actionText
		var UpdateAction = function (id, actionText) {
			if (id == 1) {
				$scope.e1Action = actionText
			} else if (id == 2) {
				$scope.e2Action = actionText
			} else {
				alert("Invalid elevator id passed to UpdateAction")
			}
		}

		// Initialize the elevator status:
		UpdateAction(1, "Idle")
		UpdateAction(2, "Idle")

		$scope.e1b1 = "btn btn-primary"
		$scope.e1b2 = "btn btn-primary"
		$scope.e1b3 = "btn btn-primary"
		$scope.e1b4 = "btn btn-primary"
		$scope.e2b1 = "btn btn-primary"
		$scope.e2b2 = "btn btn-primary"
		$scope.e2b3 = "btn btn-primary"
		$scope.e2b4 = "btn btn-primary"
		$scope.f1u = "btn btn-primary"
		$scope.f1d = "btn btn-primary"
		$scope.f2u = "btn btn-primary"
		$scope.f2d = "btn btn-primary"
		$scope.f3u = "btn btn-primary"
		$scope.f3d = "btn btn-primary"
		$scope.f4u = "btn btn-primary"
		$scope.f4d = "btn btn-primary"

		// I'm just gonna make it that floor 1 up = 1, floor 1 down = 2, floor 2 up = 3... for button value
		$scope.toggleButton = function (elevator, number, bool) {
			//console.log("Toggle elevator " + elevator + " button " + number)
			
			switch (elevator) {
				case 1:
					switch (number) {
						case 1:
							if (bool) { $scope.e1b1 = "btn btn-primary" }
							else { $scope.e1b1 = "btn btn-danger" }
							break;
						case 2:
							if (bool) { $scope.e1b2 = "btn btn-primary" }
							else { $scope.e1b2 = "btn btn-danger" }
							break;
						case 3:
							if (bool) { $scope.e1b3 = "btn btn-primary" }
							else { $scope.e1b3 = "btn btn-danger" }
							break;
						case 4:
							if (bool) { $scope.e1b4 = "btn btn-primary" }
							else { $scope.e1b4 = "btn btn-danger" }
							break;
						default:
							alert("fucked up again")
							break;
					}
					break;
				case 2:
					switch (number) {
						case 1:
							if (bool) { $scope.e2b1 = "btn btn-primary" }
							else { $scope.e2b1 = "btn btn-danger" }
							break;
						case 2:
							if (bool) { $scope.e2b2 = "btn btn-primary" }
							else { $scope.e2b2 = "btn btn-danger" }
							break;
						case 3:
							if (bool) { $scope.e2b3 = "btn btn-primary" }
							else { $scope.e2b3 = "btn btn-danger" }
							break;
						case 4:
							if (bool) { $scope.e2b4 = "btn btn-primary" }
							else { $scope.e2b4 = "btn btn-danger" }
							break;
						default:
							alert("fucked up again")
							break;
					}
					break;
				case 3:
					//Floor buttons
					switch (number) {
						case 1:
							if (bool) { $scope.f1u = "btn btn-primary" }
							else { $scope.f1u = "btn btn-danger" }
							break;
						case 2:
							if (bool) { $scope.f1d = "btn btn-primary" }
							else { $scope.f1d = "btn btn-danger" }
							break;
						case 3:
							if (bool) { $scope.f2u = "btn btn-primary" }
							else { $scope.f2u = "btn btn-danger" }
							break;
						case 4:
							if (bool) { $scope.f2d = "btn btn-primary" }
							else { $scope.f2d = "btn btn-danger" }
							break;
						case 5:
							if (bool) { $scope.f3u = "btn btn-primary" }
							else { $scope.f3u = "btn btn-danger" }
							break;
						case 6:
							if (bool) { $scope.f3d = "btn btn-primary" }
							else { $scope.f3d = "btn btn-danger" }
							break;
						case 7:
							if (bool) { $scope.f4u = "btn btn-primary" }
							else { $scope.f4u = "btn btn-danger" }
							break;
						case 8:
							if (bool) { $scope.f4d = "btn btn-primary" }
							else { $scope.f4d = "btn btn-danger" }
							break;
					}
					break;
				default:
					alert("Fucked up")
					break;
			}
		}

		//NEED TO CREATE A CHECK FLOOR FUNCTION -> checks waiting que of elevator to see if deselect button
		var checkFloor = function (elevator_id) {
			switch (elevator_id) {
				case 1:
					el1.waitingQue.forEach(function (floor, index) {
						if (floor === el1.floor) {
							el1.waitingQue.splice(index, 1)
							$scope.toggleButton(1, floor, true);
						}
					})
					// Turn off Up:
					if (el1.direction > 0)
						$scope.toggleButton(3, (el1.floor * 2) - 1, true)
					// Turn off Down:
					if (el1.direction < 0)
						$scope.toggleButton(3, el1.floor * 2, true)
					break;
				case 2:
					el2.waitingQue.forEach(function (floor, index) {
						if (floor === el2.floor) {
							el2.waitingQue.splice(index, 1)
							$scope.toggleButton(2, floor, true);
						}
					})
					// Turn off Up:
					if (el2.direction > 0)
						$scope.toggleButton(3, (el2.floor * 2) - 1, true)
					// Turn off Down:
					if (el2.direction < 0)
						$scope.toggleButton(3, el2.floor * 2, true)
					break;
			}
		}

		// REMOVE? NOT USING?
		// Just sets the inMotion field based on current floor and new one
		var motion = function (elevator, floor) {
			switch (elevator) {
				case 1:
					if (el1.floor < floor)
						el1.inMotion = 1;
					else el1.inMotion = -1;
					break;
				case 2:
					if (el2.floor < floor)
						el2.inMotion = 1;
					else el2.inMotion = -1;
					break;
			}
		}

		// Corresponds to ELEVATOR buttons, not floor buttons
		$scope.setDestination = function (elevator, button) {
			switch (elevator) {
				case 1:
					console.log("Elevator 1 has state " + el1.requestState);
					if (el1.requestState !=0){
						el1.waitTime = 0.5;
						switch (button) {
							case 1:
								// Case 1: elevator 1 clicks on button one -> 
								// First check if on floor already
								//	toggle button
								// then check if already in motion, 
								// if yes, then just put on que
								// if no, then put on que and set inMotion

								if (el1.floor !== 1) {
									$scope.toggleButton(1, 1, false);
									if (el1.inMotion !== 0) {
										registerElevator(el1, 1);
										el1.waitingQue.push(1)
									} else {
										motion(1, 1);
										registerElevator(el1, 1);
										el1.waitingQue.push(1);
									}
								}

								break;
							case 2:
								if (el1.floor !== 2) {
									$scope.toggleButton(1, 2, false);
									if (el1.inMotion !== 0) {
										registerElevator(el1, 2);
										el1.waitingQue.push(2)
									} else {
										motion(1, 2);
										registerElevator(el1, 2);
										el1.waitingQue.push(2);
									}
								}
								break;
							case 3:
								if (el1.floor !== 3) {
									$scope.toggleButton(1, 3, false);
									if (el1.inMotion !== 0) {
										registerElevator(el1, 3);
										el1.waitingQue.push(3)
									} else {
										motion(1, 3);
										registerElevator(el1, 3);
										el1.waitingQue.push(3);
									}
								}
								break;
							case 4:
								if (el1.floor !== 4) {
									$scope.toggleButton(1, 4, false);
									if (el1.inMotion !== 0) {
										registerElevator(el1, 4);
										el1.waitingQue.push(4)
									} else {
										motion(1, 4);
										registerElevator(el1, 4);
										el1.waitingQue.push(4);
									}
								}
								break;

						}
					}
					break;
				case 2:
					console.log("asd")
					console.log("Elevator 2 has state " + el2.requestState);
					if (el2.requestState !=0){
						el2.waitTime = 0.5;
						switch (button) {
							case 1:
								if (el2.floor !== 1) {
									$scope.toggleButton(2, 1, false);
									if (el2.inMotion !== 0) {
										el2.waitingQue.push(1)
										registerElevator(el2, 1);
									} else {
										motion(2, 1);
										registerElevator(el2, 1);
										el2.waitingQue.push(1);
									}
								}
								break;
							case 2:
								if (el2.floor !== 2) {
									$scope.toggleButton(2, 2, false);
									if (el2.inMotion !== 0) {
										registerElevator(el2, 2);
										el2.waitingQue.push(2)
									} else {
										motion(2, 2);
										registerElevator(el2, 2);
										el2.waitingQue.push(2);
									}
								}
								break;
							case 3:
								if (el2.floor !== 3) {
									$scope.toggleButton(2, 3, false);
									if (el2.inMotion !== 0) {
										registerElevator(el2, 3);
										el2.waitingQue.push(3)
									} else {
										motion(2, 3);
										registerElevator(el2, 3);
										el2.waitingQue.push(3);
									}
								}
								break;
							case 4:
								if (el2.floor !== 4) {
									$scope.toggleButton(2, 4, false);
									if (el2.inMotion !== 0) {
										registerElevator(el2, 4);
										el2.waitingQue.push(4)
									} else {
										motion(2, 4);
										registerElevator(el2, 4);
										el2.waitingQue.push(4);
									}
								}
								break;

						}
					}
					break;
				default:
					alert("Wrong elevator")
					break;
			}
		}

		// Advances elevator closer to target if not waiting or idle
		// Also updates action text for param elevator
		var updateElevator = function (elevator) {
			if (elevator.waitTime > 0) {
				elevator.waitTime -= 0.01;
			} else {
				// Check if elevator is close to any of the floors on the queue
				//    - if so, stop and remove that floor from the queue
				elevator.queue.forEach(function (floor, index) {
					if (Math.abs(elevator.floor - floor) <= 0.0001) {
						elevator.floor = floor;
						elevator.queue.splice(index, 1);
						elevator.waitTime = 1;
						elevator.floorCount++;
					}
					
					//Want to change requestState in here so that we are certain to have traversed to
					//the target floor. In requestState 1, we are going to fetch someone from a floor the
					//elevator is not currently on. Then we have to advance to the next state (2) to be able
					//to handle the floor request. Once we get to the floor and the queue is empty, the 
					//elevator will close its doors, elevator buttons can't be used.
					if (elevator.requestState == 1 && elevator.queue.length == 0){
						elevator.requestState = 2;
					} else if (elevator.queue.length == 0){
						elevator.requestState = 0;
					}
				
				});

				// Update direction and floor if currently in motion
				if (elevator.queue.length == 0) {
					elevator.direction = 0;
				} else if (elevator.waitTime <= 0) {
					if ((elevator.floor == 4 && elevator.direction == 1) ||
						(elevator.floor == 1 && elevator.direction == -1)) {
						elevator.direction *= -1;
					}
					if (elevator.direction == 1) {
						elevator.floor += 0.01;
					} else if (elevator.direction == -1) {
						elevator.floor -= 0.01;
					}
				}
			}

			// Update status text for elevator
			if (elevator.direction > 0) {
				UpdateAction(elevator.id, "Going Up");
			} else if (elevator.direction < 0) {
				UpdateAction(elevator.id, "Going Down");
			} else {
				UpdateAction(elevator.id, "Idle");
			}

		};

		$interval(function () {
			updateElevator(el1);
		}, 100).then(function () {
			checkFloor(1)
		})

		$interval(function () {
			updateElevator(el2);
		}, 100).then(function () {
			checkFloor(2)
		})

		// Adds call to elevator queue and adjusts direction
		var registerElevator = function (elevator, fl) {
			var newDir = 0;
			if (elevator.queue.length == 0) {
				newDir = getDirection(fl, elevator.floor);
			} else {
				newDir = elevator.direction;
			}
			if (elevator.queue.indexOf(fl) == -1 && elevator.floor != fl) {
				elevator.queue.push(fl);
				elevator.queue.sort();
			}
			elevator.direction = newDir;

		};

		var getDirection = function (f, ef) {
			if (ef > f) {
				return -1;
			} else if (ef < f) {
				return 1;
			} else {
				return 0;
			}
		};

		// Sets floor of elevator "closest" to call
		//    - "closest" determined by FS value
		this.answerCall = function (fl, dir) {
			if (dir === 1) {
				$scope.toggleButton(3, fl*2 - 1, false);
			} else {
				$scope.toggleButton(3, fl*2, false);
			}
			var getFS = function (f, d, e) {
				var fs = 4 - Math.abs(e.floor - f);

				if ((e.direction == 1 && f < e.floor) ||
					(e.direction == -1 && f > e.floor) ||
					(e.direction != d) && (f == e.floor)) {
					fs = 1;
				} else {
					if (e.direction == d || e.direction == 0) {
						fs += 2;
					} else {
						fs++;
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

			// Choose elevator that is "closer"
			if (fs1 > fs2) {
				if (el1.floor == fl){
					el1.requestState = 2;
				} else {
					el1.requestState = 1;
				}
				alert("Elevator 1 requested");
				registerElevator(el1, fl);
			} else {
				if (el2.floor == fl){
					el2.requestState = 2;
				} else {
					el2.requestState = 1;
				}
				registerElevator(el2, fl);
				alert("Elevator 2 requested");
			}
		};

		this.getE1Queue = function () {
			return el1.queue;
		};

		this.getE2Queue = function () {
			return el2.queue;
		};

		this.isE1AtFloor = function (f) {
			checkFloor(1);
			return f == el1.floor;
		}

		this.isE2AtFloor = function (f) {
			checkFloor(2);
			return f == el2.floor;
		}

		this.getE1Direction = function () {
			checkFloor(1);
			return el1.direction;
		};

		this.getE2Direction = function () {
			checkFloor(2);
			return el2.direction;
		};

		this.getE1Floor = function () {
			checkFloor(1);
			return el1.floor;
		};

		this.getE2Floor = function () {
			checkFloor(2);
			return el2.floor;
		};

	}]);

