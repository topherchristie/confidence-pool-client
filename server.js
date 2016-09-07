const Koa = require('koa');
const app = new Koa();
const serve = require('koa-serve');
// trust proxy
app.proxy = true;

// MongoDB
const mongoose = require('mongoose');
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

  if (ctx.isAuthenticated()) {

    ctx.redirect('/client');
  } else {
    ctx.type = 'html';
    var body = fs.readFileSync('views/login.html', 'utf8');
    ctx.body = body.replace('{csrfToken}', ctx.csrf);
  }
}));

app.use(route.post('/custom', function(ctx, next) {
  return passport.authenticate('local', function(user, info, status) {
    if (user === false) {
      ctx.status = 401;
      ctx.body = { success: false };
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx, next);
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
var _ = require('lodash');
app.use(route.post('/api/user', function(ctx,next) {
    var UserDao = require('./models/user');
    var data = ctx.request.body;
    console.log('updating user on server', data);
    // UserDao.update({'_id':mongoose.ObjectId(data._id)}, data, function(err, r) {
    //   console.log('user.updated.data', data, err, r);
    //   ctx.body = r;
    // });
    var user = yield UserDao.findOne({_id: mongoose.Types.ObjectId(data._id)});
    if (!user) {
      console.log('error saving user', err);
      ctx.status = 500
    } else {
      user = _.extend(user, data);
      user.updatedBy = ctx.state.user.username;
      user.updatedDate = new Date();
      var res = yield user.save();
      ctx.body = user;
      console.log('sent ctx.body', user);
    }
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

app.use(route.get('/api/team', function(ctx){
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
  ctx.body = teams;
}));

// var send = require('koa-send');
//  app.use(function *(){
//    console.log('index.html', __dirname + '/client');
//    yield send(this,'index.html', { root: __dirname + '/client/' });
//  });
// app.use(async function (ctx, next){
//   if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
//   await send(ctx, 'index.html', {root: __dirname + '/public/'});
// })


// start server
const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Server listening on', port));
