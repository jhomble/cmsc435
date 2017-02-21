'use strict';

angular.module('myApp.view2', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/view2', {
			templateUrl: 'view2/view2.html',
			controller: 'View2Ctrl'
		});
	}])

	.controller('View2Ctrl', ['$scope', function ($scope) {

		// Set to false if NOT debugging
		this.debug = true;

		$scope.e1Action = "text to show elevator 1 action"
		$scope.e2Action = "text to show elevator 2 action"

		// TODO: Make elevators and calls into objects
		// inMotion : 0 = idle, 1 = up, -1 = down
		var e1 = {
			'floor': 1,
			'direction': 1,
			'inMotion': 0, 
			'waitingQue': []
		};

		var e2 = {
			'floor': 1,
			'direction': 1,
			'inMotion': 0, 
			'waitingQue' : []
		};

		$scope.e1b1 = "btn btn-primary"
		$scope.e1b2 = "btn btn-primary"
		$scope.e1b3 = "btn btn-primary"
		$scope.e1b4 = "btn btn-primary"
		$scope.e2b1 = "btn btn-primary"
		$scope.e2b2 = "btn btn-primary"
		$scope.e2b3 = "btn btn-primary"
		$scope.e2b4 = "btn btn-primary"



		$scope.toggleButton = function (elevator, number, bool) {
			console.log("Toggle elevator " + elevator + " button " + number)
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
				default:
					alert("Fucked up")
					break;
			}
		}

		//NEED TO CREATE A CHECK FLOOR FUNCTION -> checks waiting que of elevator to see if deselect button
		var checkFloor = function(elevator){
			switch(elevator){
				case 1:
					e1.waitingQue.forEach(function(floor, index){
						if(floor === e1.floor){
							e1.waitingQue.splice(index, 1)
							$scope.toggleButton(1, floor, true);
						}
					})
				break;
				case 2:
					e2.waitingQue.forEach(function(floor, index){
						if(floor === e2.floor){
							e2.waitingQue.splice(index, 1)
							$scope.toggleButton(2, floor, true);
						}
					})
				break;
			}
		}

		// Just sets the inMotion field based on current floor and new one
		var motion = function(elevator, floor){
			switch(elevator){
				case 1:
					if(e1.floor < floor)
						e1.inMotion = 1;
					else e1.inMotion = -1;
				break;
				case 2:
					if(e2.floor < floor)
						e2.inMotion = 1;
					else e2.inMotion = -1;
				break;
			}
		}

		$scope.setDestination = function (elevator, button) {
			switch(elevator){
				case 1:
					switch(button){
						case 1:
							// Case 1: elevator 1 clicks on button one -> 
							// First check if on floor already
							//	toggle button
							// then check if already in motion, 
								// if yes, then just put on que
								// if no, then put on que and set inMotion

							if(e1.floor !== 1){
								$scope.toggleButton(1,1,false);
								if(e1.inMotion !== 0){
									e1.waitingQue.push(1)
								}else{
									motion(1,1);
									e1.waitingQue.push(1);
								}
							}
						break;
						case 2:
							if(e1.floor !== 2){
								$scope.toggleButton(1,2,false);
								if(e1.inMotion !== 0){
									e1.waitingQue.push(2)
								}else{
									motion(1,2);
									e1.waitingQue.push(2);
								}
							}
						break;
						case 3:
							if(e1.floor !== 3){
								$scope.toggleButton(1,3,false);
								if(e1.inMotion !== 0){
									e1.waitingQue.push(3)
								}else{
									motion(1,3);
									e1.waitingQue.push(3);
								}
							}
						break;
						case 4:
							if(e1.floor !== 4){
								$scope.toggleButton(1,4,false);
								if(e1.inMotion !== 0){
									e1.waitingQue.push(4)
								}else{
									motion(1,4);
									e1.waitingQue.push(4);
								}
							}
						break;

					}
				break;
				case 2:
					console.log("asd")
					switch(button){
						case 1:
							if(e2.floor !== 1){
								$scope.toggleButton(2,1,false);
								if(e2.inMotion !== 0){
									e2.waitingQue.push(1)
								}else{
									motion(2,1);
									e2.waitingQue.push(1);
								}
							}
						break;
						case 2:
							if(e2.floor !== 2){
								$scope.toggleButton(2,2,false);
								if(e2.inMotion !== 0){
									e2.waitingQue.push(2)
								}else{
									motion(2,2);
									e2.waitingQue.push(2);
								}
							}
						break;
						case 3:
							if(e2.floor !== 3){
								$scope.toggleButton(2,3,false);
								if(e2.inMotion !== 0){
									e2.waitingQue.push(3)
								}else{
									motion(2,3);
									e2.waitingQue.push(3);
								}
							}
						break;
						case 4:
							if(e2.floor !== 4){
								$scope.toggleButton(2,4,false);
								if(e2.inMotion !== 0){
									e2.waitingQue.push(4)
								}else{
									motion(2,4);
									e2.waitingQue.push(4);
								}
							}
						break;

					}
				break;
				default:
					alert("Wrong elevator")
				break;
			}
		}

		// Sets floor of elevator "closest" to call
		//    - "closest" determined by FS value
		this.answerCall = function (fl, dir) {

			// NOTE: We should find the following values experimentally!

			// Amount of time spent during a stop including:
			//     1) time of door opening/closing
			//     2) time lost due to slow down of elevator
			this.TIME_STOPPED = 15;

			// Amount of time to travel from one floor to the next
			this.TIME_TO_FLOOR = 7;

			var getFS = function (f, d, ef, ed) {
				var fs = 4 - Math.abs(ef - f);

				if ((ed == 1 && f < ef) || (ed == 0 && f > ef) ||
					(ed != d) && (f == ef)) {
					fs = 1;
				} else {
					if (ed == d) {
						fs += 2;
					} else {
						fs++;
					}
				}

				return fs;
			};

			var fs1 = getFS(fl, dir, e1.floor, e1.direction);
			var fs2 = getFS(fl, dir, e2.floor, e2.direction);

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

		this.isE1AtFloor = function (f) {
			checkFloor(1);
			return f == e1.floor;
		}

		this.isE2AtFloor = function (f) {
			checkFloor(2);
			return f == e2.floor;
		}

		this.getE1Direction = function () {
			checkFloor(1);
			return e1.direction;
		};

		this.getE2Direction = function () {
			checkFloor(2);
			return e2.direction;
		};

		this.getE1Floor = function () {
			checkFloor(1);
			return e1.floor;
		};

		this.getE2Floor = function () {
			checkFloor(2);
			return e2.floor;
		};

	}]);

