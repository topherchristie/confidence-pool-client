'use strict';

SettingsController.$inject = ['$scope','$cookies','User'];
function SettingsController($scope,$cookies,User) {
	console.log('$cookies',$cookies['xsrf-token']);
	this.title = "Settings for Me";
    this.me = {'username':'Chris Christie'};
    var _this = this;
    User.me(function(me){
    	_this.me = me;
    }, function(err){
    	alert('error x001: cannot get logged in user: ' + err);
    });

    // _this.github = '';
    // gh.getStatus().success(function(status) {
    //     _this.github = status;
    // });
    this.save = function(){
    	console.log('saving settings');
    	_this.me.$save();
    }
    this.cancel = function(){ 
    	console.log('cancel');
    }
}
module.exports = SettingsController;