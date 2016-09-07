var app = angular.module('app');

app.factory('Team', function($resource) {
	return $resource('/api/team', {}, {});
});