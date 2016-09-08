'use strict';

var angular = require('angular');

angular.module('app')
	.controller('MainController', require('./main-controller'))
	.controller('SettingsController', require('./settings-controller'))
	.controller('DashboardController', require('./dashboard-controller'))
;