routing.$inject = ['$routeProvider','$locationProvider'];

export default function routing($routeProvider, $locationProvider) {
  $routeProvider
  .when('/pick/:id', {
    templateUrl: '/public/pick-add-edit.html',
    controller: 'PickAddEditController'
  })
  .when('/pick', {
    templateUrl: '/public/pick-add-edit.html',
    controller: 'PickAddEditController',
    controllerAs: 'picker'
  })
  .when('/settings', {
    templateUrl: '/public/settings.html',
    controller: 'SettingsController'
  })
  .otherwise('/pick');

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(false);
};