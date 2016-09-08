
// http://babeljs.io/docs/setup/#babel_register

// require('babel-register')({
 // plugins: ['transform-async-to-generator']
///});

require("babel-core/register");
require("babel-polyfill");

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-serve');
// trust proxy
app.proxy = true;

// MongoDB
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
console.log('connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'localhost');

// sessions
const convert = require('koa-convert');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');

app.keys = ['my-session-key-is-safe','and-so-it-goes'];
app.use(convert(session({
  store: new MongoStore()
})));

// body parser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// csrf
const csrf = require('koa-csrf');
csrf(app);
app.use(convert(csrf.middleware));

// authentication
require('./auth');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

// routes
const fs    = require('fs');
const route = require('koa-route');

app.use(serve('public'));

app.use(route.get('/', function(ctx) { 
    ctx.type = 'html';
    var body = fs.readFileSync('views/login.html', 'utf8');
    ctx.body = body.replace('{csrfToken}', ctx.csrf);
}));

app.use(route.get('/users', async (ctx, next) => { 
    var UserDao = require('./models/user');
    var users = await UserDao.find({}).exec();
    console.log('users',users);
    ctx.body = users;
}));

// POST /login
app.use(route.post('/login',
  passport.authenticate('local', {
    successRedirect: '/client',
    failureRedirect: '/'
  })
));

app.use(route.get('/logout', function(ctx) {
  ctx.logout();
  ctx.redirect('/');
}));

app.use(route.get('/auth/facebook',
  passport.authenticate('facebook')
));

app.use(route.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/client',
    failureRedirect: '/'
  })
));

app.use(route.get('/auth/twitter',
  passport.authenticate('twitter')
));

app.use(route.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/client',
    failureRedirect: '/'
  })
));

app.use(route.get('/auth/google',
  passport.authenticate('google')
));

app.use(route.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/client',
    failureRedirect: '/'
  })
));

// Require authentication for now
app.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect('/');
  }
});
app.use(route.get('/api/me', function(ctx,next) {
  ctx.body = ctx.state.user;
}));

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
app.use(route.post('/api/user', async (ctx, next) => { 
	var UserDao = require('./models/user');
	var data = ctx.request.body;
	console.log('updating user on server', data);
	data.updatedBy = ctx.state.user.username;
	data.updatedDate = new Date();

	var res = await UserDao.update({'_id':mongoose.Types.ObjectId(data._id)}, data);
	console.log('res',res);
	ctx.body = data;
	
}));


// app.use(route.get('/client', function(ctx) {
//   ctx.cookies.set('xsrf-token', ctx.csrf);
// });
var moment = require('moment');
app.use(route.get('/client', function(ctx) {
  ctx.cookies.set('xsrf-token', ctx.csrf, {httpOnly:false, expires: moment().add(1, 'hour').toDate()});
  ctx.type = 'html';
  ctx.body = fs.createReadStream('public/views/index.html');
}));

// start server
const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Server listening on', port));
