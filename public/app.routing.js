routing.$inject = ['$routeProvider','$locationProvider'];

function routing($routeProvider, $locationProvider) {
  $routeProvider
 //  .when('/pick/:id', {
 //    templateUrl: '/public/views/pick-add-edit.html',
 // //   controller: 'PickAddEditController'
 //  })
 //  .when('/pick', {
 //    templateUrl: '/public/views/pick-add-edit.html',
 //   // controller: 'PickAddEditController',
 //   // controllerAs: 'picker'
 //  })
  .when('/settings', {
    templateUrl: '/public/views/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm'
  })
  // .when('/dashboard', {
  //   templateUrl: '/public/views/dashboard.html',
  //  // controller: 'DashboardController'
  // })
  .otherwise('/settings');

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(false);
}
module.exports = routing;