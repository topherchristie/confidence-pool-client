'use strict';

import { PickAddEditController } from './pick-add-edit-controller';


var angular = require('angular');

angular.module('app')
	.controller('DashboardController', require('./dashboard-controller'))
	.controller('MainController', require('./main-controller'))
	.controller('PickAddEditController', PickAddEditController)
	.controller('SettingsController', require('./settings-controller'))
;