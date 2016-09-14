'use strict';

MainController.$inject = ['$scope','User'];
function MainController($scope,User) {
	$scope.me = {};
    User.me(function(me){
    	$scope.me = me;
    }, function(err){
    	alert('error x001: cannot get logged in user: ' + err);
    });
}

module.exports = MainController;