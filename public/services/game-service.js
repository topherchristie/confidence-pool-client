'use strict';

GameService.$inject = ['$resource'];
function GameService($resource) {
    var gameService = $resource(
    	'/api/game',
		{},
		{
			'current': {
		          method: 'GET',
		          isArray: true,
		          url: '/api/game/current'
	        }
  		}
    );
    return gameService;
}
module.exports = GameService;