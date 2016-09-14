'use strict';

DashboardController.$inject = ['$scope','$location','Game'];
function DashboardController($scope,$location,Game) {
    var _this = this;
	Game.current({'userId':$scope.me._id},function(games){
        console.log('games',games);
        _this.games = games;
        _this.title = 'week 1';
    }, function(err){
        alert('error x001: cannot get logged in user: ' + err);
    });
}
module.exports = DashboardController;