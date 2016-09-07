
export default class PickAddEditController {
  constructor($scope) {
  	this.niceDate = function(dateStr){
 		 return moment(dateStr).tz('America/Chicago').format('h:mm a z');
    }
 	} 
 	
  $scope.$on('bag-one.drop-model', function (e, el) {
    console.log('drop-model', e, el);
  });

  $scope.$on('bag-one.drop', function (e, el) {
    console.log('drop',e,el);
  });
  $scope.games = week1;

  pickWinner(game,winner) {
    game.winner = winner;
  }
  save() {
    console.log('games', $scope.games);
  }
}

// var week1 = [
// {'home':'DEN','away':'CAR', 'date':'2016-09-09T00:30Z'},
// {'home':'JAX','away':'GB', 'date':'2016-09-11T17:00Z'},
// {'home':'BAL','away':'BUF', 'date':'2016-09-11T17:00Z'},
// {'home':'HOU','away':'CHI', 'date':'2016-09-11T17:00Z'},
// {'home':'PHI','away':'CLE', 'date':'2016-09-11T17:00Z'},
// {'home':'ATL','away':'TB', 'date':'2016-09-11T17:00Z'},
// {'home':'TEN','away':'MIN', 'date':'2016-09-11T17:00Z'},
// {'home':'NYJ','away':'CIN', 'date':'2016-09-11T17:00Z'},
// {'home':'NO','away':'OAK', 'date':'2016-09-11T17:00Z'},
// {'home':'KC','away':'SD', 'date':'2016-09-11T17:00Z'},
// {'home':'SEA','away':'MIA', 'date':'2016-09-11T20:05Z'},
// {'home':'IND','away':'DET', 'date':'2016-09-11T20:25Z'},
// {'home':'DAL','away':'NYG', 'date':'2016-09-11T20:25Z'},
// {'home':'ARI','away':'NE', 'date':'2016-09-12T00:30Z'},
// {'home':'WSH','away':'PIT', 'date':'2016-09-12T23:10Z'},
// {'home':'SF','away':'LA', 'date':'2016-09-13T02:20Z'},
// {'home':'JAX','away':'GB', 'date':'2016-09-11T17:00Z'},
// {'home':'BAL','away':'BUF', 'date':'2016-09-11T17:00Z'},
// {'home':'HOU','away':'CHI', 'date':'2016-09-11T17:00Z'},
// {'home':'PHI','away':'CLE', 'date':'2016-09-11T17:00Z'},
// {'home':'ATL','away':'TB', 'date':'2016-09-11T17:00Z'},
// {'home':'TEN','away':'MIN', 'date':'2016-09-11T17:00Z'},
// {'home':'NYJ','away':'CIN', 'date':'2016-09-11T17:00Z'},
// {'home':'NO','away':'OAK', 'date':'2016-09-11T17:00Z'},
// {'home':'KC','away':'SD', 'date':'2016-09-11T17:00Z'},
// {'home':'SEA','away':'MIA', 'date':'2016-09-11T20:05Z'},
// {'home':'IND','away':'DET', 'date':'2016-09-11T20:25Z'},
// {'home':'DAL','away':'NYG', 'date':'2016-09-11T20:25Z'},
// {'home':'ARI','away':'NE', 'date':'2016-09-12T00:30Z'},
// {'home':'WSH','away':'PIT', 'date':'2016-09-12T23:10Z'},
// {'home':'SF','away':'LA', 'date':'2016-09-13T02:20Z'},
// {'home':'WSH','away':'PIT', 'date':'2016-09-12T23:10Z'},
// {'home':'SF','away':'LA', 'date':'2016-09-13T02:20Z'}
// ];

 // 	this.models = {
 //         selected: null,
 //         lists: {"A": [], "B": []}
 //    };

 //    // Generate initial model
 //    for (var i = 1; i <= 3; ++i) {
 //        $scope.models.lists.A.push({label: "Item A" + i});
 //        $scope.models.lists.B.push({label: "Item B" + i});
 //     }
 //    var that = this;
	// this.$watch('models', function(model) {
 //         that.modelAsJson = angular.toJson(model, true);
 //    }, true);

// app.controller('PickAddEditController',['$scope',function($scope) {
// 	console.log('init week picker');
// 	$scope.niceDate = function(dateStr){
// 		return moment(dateStr).tz('America/Chicago').format('h:mm a z');
// 	} 
// 	$scope.games = week1;


// 	$scope.models = {
//         selected: null,
//         lists: {"A": [], "B": []}
//     };

//     // Generate initial model
//     for (var i = 1; i <= 3; ++i) {
//         $scope.models.lists.A.push({label: "Item A" + i});
//         $scope.models.lists.B.push({label: "Item B" + i});
//     }

//     $scope.pickWinner = function(game, winner){
//         game.winner = winner;

//     }

//     // Model to JSON for demo purpose
//     $scope.$watch('models', function(model) {
//         $scope.modelAsJson = angular.toJson(model, true);
//     }, true);

// }]);