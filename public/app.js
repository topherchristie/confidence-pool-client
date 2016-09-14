 var angular = require('angular');
var angularBootstrap = require('angular-bootstrap');
var angularAnimate = require('angular-animate');
var angularTouch = require('angular-touch');
var momentTimezone = require('moment-timezone');
// var dnd = require('angular-drag-and-drop-lists');
var moment = require('moment');
const angularDragula = require('angular-dragula');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var ngCookies = require('angular-cookies');
// console.log('ngRoute',ngRoute);
// //var app = angular.module('app', ["ui.bootstrap", "ngRoute", angularDragula(angular)]);
 var app = angular.module('app', ['ngResource', 'ngRoute',"ui.bootstrap", ngCookies, angularDragula(angular)]);

// //var userService = require('./services/user-service');

var routing = require('./app.routing');
// //var mainController = require('./controllers/main-controller');
// //var pickAddEditController = require('./controllers/pick-add-edit-controller');
// //var settingsController = require('./controllers/settings-controller');/
app.config(routing);
app.run(['$http','$cookies', function($http, $cookies){
	console.log('setting default token', $cookies.get(['xsrf-token']));
	$http.defaults.headers.post['x-xsrf-token'] = $cookies.get(['xsrf-token']);
}]);
require('./services');
require('./controllers');
//  .service('User', userService)
 // .controller('MainController', mainController)
  //.controller('PickAddEditController', pickAddEditController)
  //.controller('SettingsController', settingsController)
//;

