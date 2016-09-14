'use strict';

SettingsController.$inject = ['$scope','$location','User'];
function SettingsController($scope,$location,User) {
    var _this = this;
    User.me(function(user){
    	_this.user = user;
    }, function(err){
    	alert('error x001: cannot get logged in user: ' + err);
    });

    this.save = function(){
    	console.log('saving settings');
    	_this.user.$save();
    	$scope.$parent.me = _this.user;
    	$location.path('/dashboard');
    }
    this.cancel = function(){ 
    	console.log('cancel');
    	$location.path('/dashboard');
    }
}
module.exports = SettingsController;