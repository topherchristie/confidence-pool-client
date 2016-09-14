"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// http://babeljs.io/docs/setup/#babel_register

// require('babel-register')({
// plugins: ['transform-async-to-generator']
///});

require("babel-core/register");
require("babel-polyfill");

var Koa = require('koa');
var app = new Koa();
var serve = require('koa-serve');
// trust proxy
app.proxy = true;

// MongoDB
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
console.log('connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'localhost');

// sessions
var convert = require('koa-convert');
var session = require('koa-generic-session');
var MongoStore = require('koa-generic-session-mongo');

app.keys = ['my-session-key-is-safe', 'and-so-it-goes'];
app.use(convert(session({
  store: new MongoStore()
})));

// body parser
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// csrf
var csrf = require('koa-csrf');
csrf(app);
app.use(convert(csrf.middleware));

// authentication
require('./auth');
var passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

// routes
var fs = require('fs');
var route = require('koa-route');

app.use(serve('public'));

app.use(route.get('/', function (ctx) {
  ctx.type = 'html';
  var body = fs.readFileSync('views/login.html', 'utf8');
  ctx.body = body.replace('{csrfToken}', ctx.csrf);
}));

app.use(route.get('/users', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    var UserDao, users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UserDao = require('./models/user');
            _context.next = 3;
            return UserDao.find({}).exec();

          case 3:
            users = _context.sent;

            console.log('users', users);
            ctx.body = users;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));

// POST /login
app.use(route.post('/login', passport.authenticate('local', {
  successRedirect: '/client',
  failureRedirect: '/'
})));

app.use(route.get('/logout', function (ctx) {
  ctx.logout();
  ctx.redirect('/');
}));

app.use(route.get('/auth/facebook', passport.authenticate('facebook')));

app.use(route.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/client',
  failureRedirect: '/'
})));

app.use(route.get('/auth/twitter', passport.authenticate('twitter')));

app.use(route.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/client',
  failureRedirect: '/'
})));

app.use(route.get('/auth/google', passport.authenticate('google')));

app.use(route.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/client',
  failureRedirect: '/'
})));

// Require authentication for now
app.use(function (ctx, next) {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect('/');
  }
});
app.use(route.get('/api/me', function (ctx, next) {
  ctx.body = ctx.state.user;
}));
// app.use(route.get('/newUserCheck'), (ctx,next) => {
//   if(cts.state.user.userSignedUp){
//     ctx.redirect('/client');
//   } else {
//     console.log('redirecting to settings');
//     ctx.redirect('/client#/settings');
//   }
// });

// var _ = require('lodash');
// function *saveUser(ctx, next){
//   var co = require('co');
//   var UserDao = require('./models/user');
//   var data = ctx.request.body;
//   console.log('updating user on server', data);
//   data.updatedBy = ctx.state.user.username;
//   data.updatedDate = new Date();
//   var res = yield UserDao.update({'_id':mongoose.Types.ObjectId(data._id)}, data);
//   console.log('res',res);
//   ctx.data = data;
//     co(function *(){
//       var res = yield UserDao.update({'_id':mongoose.Types.ObjectId(data._id)}, data);
//       console.log('res', res);

//     }).then(function (value) {
//   console.log('Then?',value);
//   ctx.status = 204;
// }, function (err) {
//   console.error('error',err, err.stack);
//   ctx.status = 500;
// });
//     // var user = yield UserDao.findOne({_id: mongoose.Types.ObjectId(data._id)});
// if (!user) {
//   console.log('error saving user', err);
//   ctx.status = 500
// } else {
//   user = _.extend(user, data);
//   user.updatedBy = ctx.state.user.username;
//   user.updatedDate = new Date();
//   var res = yield user.save();
//   ctx.body = user;
//   console.log('sent ctx.body', user);
// }
var _ = require('lodash');
app.use(route.post('/api/user', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
    var UserDao, data, res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            UserDao = require('./models/user');
            data = ctx.request.body;

            console.log('updating user on server', data);
            data.updatedBy = ctx.state.user.username;
            data.updatedDate = new Date();

            _context2.next = 7;
            return UserDao.update({ '_id': mongoose.Types.ObjectId(data._id) }, data);

          case 7:
            res = _context2.sent;

            console.log('res', res);
            ctx.body = data;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));

app.use(route.get('/api/game/current', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ctx.body = [{ 'home': 'DEN', 'away': 'CAR', 'date': '2016-09-09T00:30Z' }, { 'home': 'JAX', 'away': 'GB', 'date': '2016-09-11T17:00Z' }, { 'home': 'BAL', 'away': 'BUF', 'date': '2016-09-11T17:00Z' }, { 'home': 'HOU', 'away': 'CHI', 'date': '2016-09-11T17:00Z' }, { 'home': 'PHI', 'away': 'CLE', 'date': '2016-09-11T17:00Z' }, { 'home': 'ATL', 'away': 'TB', 'date': '2016-09-11T17:00Z' }, { 'home': 'TEN', 'away': 'MIN', 'date': '2016-09-11T17:00Z' }, { 'home': 'NYJ', 'away': 'CIN', 'date': '2016-09-11T17:00Z' }, { 'home': 'NO', 'away': 'OAK', 'date': '2016-09-11T17:00Z' }, { 'home': 'KC', 'away': 'SD', 'date': '2016-09-11T17:00Z' }, { 'home': 'SEA', 'away': 'MIA', 'date': '2016-09-11T20:05Z' }, { 'home': 'IND', 'away': 'DET', 'date': '2016-09-11T20:25Z' }, { 'home': 'DAL', 'away': 'NYG', 'date': '2016-09-11T20:25Z' }, { 'home': 'ARI', 'away': 'NE', 'date': '2016-09-12T00:30Z' }, { 'home': 'WSH', 'away': 'PIT', 'date': '2016-09-12T23:10Z' }, { 'home': 'SF', 'away': 'LA', 'date': '2016-09-13T02:20Z' }];

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()));

// app.use(route.get('/client', function(ctx) {
//   ctx.cookies.set('xsrf-token', ctx.csrf);
// });
var moment = require('moment');
app.use(route.get('/client', function (ctx) {
  ctx.cookies.set('xsrf-token', ctx.csrf, { httpOnly: false, expires: moment().add(1, 'hour').toDate() });
  ctx.type = 'html';
  ctx.body = fs.createReadStream('public/views/index.html');
}));

// start server
var port = process.env.PORT || 3333;
app.listen(port, function () {
  return console.log('Server listening on', port);
});
