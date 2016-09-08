
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


// start server
const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Server listening on', port));
