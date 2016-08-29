const angular = require('angular');
var angularBootstrap = require('angular-bootstrap');
var angularAnimate = require('angular-animate');
var angularTouch = require('angular-touch');
var momentTimezone = require('moment-timezone');
var dnd = require('angular-drag-and-drop-lists');
const moment = require('moment');
const angularDragula = require('angular-dragula');
var ngRoute = require('angular-route');



var teams = {
'ARI' : [ 'Arizona', 'Cardinals', 'Arizona Cardinals'],
'ATL' : ['Atlanta', 'Falcons', 'Atlanta Falcons'],
'BAL' : ['Baltimore', 'Ravens', 'Baltimore Ravens'],
'BUF' : ['Buffalo', 'Bills', 'Buffalo Bills'],
'CAR' : ['Carolina', 'Panthers', 'Carolina Panthers'],
'CHI' : ['Chicago', 'Bears', 'Chicago Bears'],
'CIN' : ['Cincinnati', 'Bengals', 'Cincinnati Bengals'],
'CLE' : ['Cleveland', 'Browns', 'Cleveland Browns'],
'DAL' : ['Dallas', 'Cowboys', 'Dallas Cowboys'],
'DEN' : ['Denver', 'Broncos', 'Denver Broncos'],
'DET' : ['Detroit', 'Lions', 'Detroit Lions'],
'GB' : ['Green Bay', 'Packers', 'Green Bay Packers', 'G.B.', 'GNB'],
'HOU' : ['Houston', 'Texans', 'Houston Texans'],
'IND' : ['Indianapolis', 'Colts', 'Indianapolis Colts'],
'JAC' : ['Jacksonville', 'Jaguars', 'Jacksonville Jaguars', 'JAX'],
'KC' : ['Kansas City', 'Chiefs', 'Kansas City Chiefs', 'K.C.', 'KAN'],
'MIA' : ['Miami', 'Dolphins', 'Miami Dolphins'],
'MIN' : ['Minnesota', 'Vikings', 'Minnesota Vikings'],
'NE' : ['New England', 'Patriots', 'New England Patriots', 'N.E.', 'NWE'],
'NO' : ['New Orleans', 'Saints', 'New Orleans Saints', 'N.O.', 'NOR'],
'NYG' : ['Giants', 'New York Giants', 'N.Y.G.'],
'NYJ' : ['Jets', 'New York Jets', 'N.Y.J.'],
'OAK' : ['Oakland', 'Raiders', 'Oakland Raiders'],
'PHI' : ['Philadelphia', 'Eagles', 'Philadelphia Eagles'],
'PIT' : ['Pittsburgh', 'Steelers', 'Pittsburgh Steelers'],
'SD' : ['San Diego', 'Chargers', 'San Diego Chargers', 'S.D.', 'SDG'],
'SEA' : ['Seattle', 'Seahawks', 'Seattle Seahawks'],
'SF' : ['San Francisco', '49ers', 'San Francisco 49ers', 'S.F.', 'SFO'],
'STL' : ['St. Louis', 'Rams', 'St. Louis Rams', 'S.T.L.'],
'TB' : ['Tampa Bay', 'Buccaneers', 'Tampa Bay Buccaneers', 'T.B.', 'TAM'],
'TEN' : ['Tennessee', 'Titans', 'Tennessee Titans'],
'WAS' : ['Washington', 'Redskins', 'Washington Redskins', 'WSH'] 
};

var app = angular.module('app', ["ui.bootstrap", "ngRoute", angularDragula(angular)]);

//require('./user-service');

import routing from './app.routing';
import mainController from './main-controller';
import pickAddEditController from './pick-add-edit-controller';
app
  .config(routing)
  .controller('MainController', mainController)
  .controller('PickAddEditController', pickAddEditController)
;
//import User from './user-service';

// app.controller('MainController', ['$scope', '$route', '$routeParams', '$location', User, 
//   function($scope, $route, $routeParams, $location, User) {
//      $scope.$route = $route;
//      $scope.$location = $location;
//      $scope.$routeParams = $routeParams;

//   //   User.me().then(function(user){
//     //  console.log('me', user);
//      //});
//  }]);

// app.controller('SettingsController', function($scope, $routeParams) {
//      $scope.name = "SettingsController";
//      $scope.params = $routeParams;
//  })



