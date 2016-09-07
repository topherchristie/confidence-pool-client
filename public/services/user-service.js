'use strict';

UserService.$inject = ['$resource'];
function UserService($resource) {
    var userService = $resource(
      '/api/user',
      {},
      {
        'me': {
          method: 'GET',
          isArray: false,
          url: '/api/me'
        }
      }
    );
    return userService;
}
module.exports = UserService;