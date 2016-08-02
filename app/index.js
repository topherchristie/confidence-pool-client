var angular = require('angular');
var angularBootstrap = require('angular-bootstrap');
var angularAnimate = require('angular-animate');
var angularTouch = require('angular-touch');
var momentTimezone = require('moment-timezone');
var dnd = require('angular-drag-and-drop-lists');
var moment = require('moment');
var angularDragula = require('angular-dragula');
var app = angular.module('app', ["ui.bootstrap", angularDragula(angular)]);

var week1 = [
{'home':'DEN','away':'CAR', 'date':'2016-09-09T00:30Z'},
{'home':'JAX','away':'GB', 'date':'2016-09-11T17:00Z'},
{'home':'BAL','away':'BUF', 'date':'2016-09-11T17:00Z'},
{'home':'HOU','away':'CHI', 'date':'2016-09-11T17:00Z'},
{'home':'PHI','away':'CLE', 'date':'2016-09-11T17:00Z'},
{'home':'ATL','away':'TB', 'date':'2016-09-11T17:00Z'},
{'home':'TEN','away':'MIN', 'date':'2016-09-11T17:00Z'},
{'home':'NYJ','away':'CIN', 'date':'2016-09-11T17:00Z'},
{'home':'NO','away':'OAK', 'date':'2016-09-11T17:00Z'},
{'home':'KC','away':'SD', 'date':'2016-09-11T17:00Z'},
{'home':'SEA','away':'MIA', 'date':'2016-09-11T20:05Z'},
{'home':'IND','away':'DET', 'date':'2016-09-11T20:25Z'},
{'home':'DAL','away':'NYG', 'date':'2016-09-11T20:25Z'},
{'home':'ARI','away':'NE', 'date':'2016-09-12T00:30Z'},
{'home':'WSH','away':'PIT', 'date':'2016-09-12T23:10Z'},
{'home':'SF','away':'LA', 'date':'2016-09-13T02:20Z'},
{'home':'JAX','away':'GB', 'date':'2016-09-11T17:00Z'},
{'home':'BAL','away':'BUF', 'date':'2016-09-11T17:00Z'},
{'home':'HOU','away':'CHI', 'date':'2016-09-11T17:00Z'},
{'home':'PHI','away':'CLE', 'date':'2016-09-11T17:00Z'},
{'home':'ATL','away':'TB', 'date':'2016-09-11T17:00Z'},
{'home':'TEN','away':'MIN', 'date':'2016-09-11T17:00Z'},
{'home':'NYJ','away':'CIN', 'date':'2016-09-11T17:00Z'},
{'home':'NO','away':'OAK', 'date':'2016-09-11T17:00Z'},
{'home':'KC','away':'SD', 'date':'2016-09-11T17:00Z'},
{'home':'SEA','away':'MIA', 'date':'2016-09-11T20:05Z'},
{'home':'IND','away':'DET', 'date':'2016-09-11T20:25Z'},
{'home':'DAL','away':'NYG', 'date':'2016-09-11T20:25Z'},
{'home':'ARI','away':'NE', 'date':'2016-09-12T00:30Z'},
{'home':'WSH','away':'PIT', 'date':'2016-09-12T23:10Z'},
{'home':'SF','away':'LA', 'date':'2016-09-13T02:20Z'},
{'home':'WSH','away':'PIT', 'date':'2016-09-12T23:10Z'},
{'home':'SF','away':'LA', 'date':'2016-09-13T02:20Z'}
];

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

app.controller('WeekPickerController',['$scope',function($scope) {
	console.log('init week picker');
	$scope.niceDate = function(dateStr){
		return moment(dateStr).tz('America/Chicago').format('h:mm a z');
	} 
	$scope.games = week1;


	$scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    $scope.pickWinner = function(game, winner){
        game.winner = winner;

    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

}]);
