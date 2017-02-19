'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

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

