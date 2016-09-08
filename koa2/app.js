'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost/testapp');
_mongoose2.default.connection.on('error', console.error);

var router = (0, _koaRouter2.default)();
var app = new _koa2.default();

router.get('/locations', function* (ctx, next) {
  return ctx.body = await Location.find();
});
router.post('/locations', async function (ctx, next) {
  return ctx.body = await new Location(ctx.request.body).save();
});
router.get('/locations/:id', async function (ctx, next) {
  return ctx.body = await Location.findById(ctx.params.id);
});
router.put('/locations/:id', async function (ctx, next) {
  return ctx.body = await Location.findByIdAndUpdate(ctx.params.id, ctx.body);
});
router.delete('/locations/:id', async function (ctx, next) {
  return ctx.body = await Location.findByIdAndRemove(ctx.params.id);
});
app.use((0, _koaLogger2.default)()) // Logs information.
.use((0, _koaBodyparser2.default)()) // Parses json body requests.
.use(router.routes()) // Assigns routes.
.use(router.allowedMethods());

app.listen(3333, function () {
  return console.log('Listening on port 5050.');
});
exports.default = app;
