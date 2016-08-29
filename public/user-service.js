angular.module('app').factory('User', function($resource) {
	return $resource('/api/user', {}, {
		me: {method:'GET'}
	});
});