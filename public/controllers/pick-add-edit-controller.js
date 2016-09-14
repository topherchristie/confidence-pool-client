var moment = require('moment');

class PickAddEditController {
  constructor($scope, Game) {
    this._scope = $scope;
    $scope.$on('bag-one.drop-model', function (e, el) {
      console.log('drop-model', e, el);
    });

    $scope.$on('bag-one.drop', function (e, el) {
      console.log('drop',e,el);
    });
    
    var _this = this;
    Game.current({'userId':$scope.me._id},function(games){
        console.log('games',games);
        $scope.games = games;
        _this.title = 'week 1';
    }, function(err){
        alert('error x001: cannot get logged in user: ' + err);
    });

  }
  niceDate(dateStr){
   return moment(dateStr).tz('America/Chicago').format('MM/DD');
  }
  niceTime(dateStr){
    return moment(dateStr).tz('America/Chicago').format('h:mm a');
  }
  pickWinner(game,winner) {
    game.winner = winner;
  }
  save() {
    console.log('games', this._scope.games);
  }
}
export {PickAddEditController}

// import { PageController } from './PageController';

// class ProductPageController extends PageController {

//     constructor() {
//         super('ES6 inheritance with Angular');
//     }
// }

// export { ProductPageController }

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