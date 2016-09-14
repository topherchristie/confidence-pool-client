'use strict';

var angular = require('angular');

angular.module('app')
	.service('Game', require('./game-service'))
	.service('User', require('./user-service'))
;