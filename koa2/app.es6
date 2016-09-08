import "babel-polyfill";

import Koa from 'koa';
import mongoose from 'mongoose';
import middleware from 'koa-router';
import logger from 'koa-logger';
import parser from 'koa-bodyparser';

mongoose.connect('mongodb://localhost/testapp');
mongoose.connection.on('error', console.error);

const router = middleware();
const app = new Koa();

router.get('/locations',  async (ctx, next) =>  ctx.body = await Location.find());
router.post('/locations', async (ctx, next) =>  ctx.body = await new Location(ctx.request.body).save());
router.get('/locations/:id', async (ctx, next) =>  ctx.body = await Location.findById(ctx.params.id));
router.put('/locations/:id', async (ctx, next) =>  ctx.body = await Location.findByIdAndUpdate(ctx.params.id, ctx.body));
router.delete('/locations/:id', async (ctx, next) =>  ctx.body = await Location.findByIdAndRemove(ctx.params.id));
app
  .use(logger()) // Logs information.
  .use(parser()) // Parses json body requests.
  .use(router.routes()) // Assigns routes.
  .use(router.allowedMethods())

app.listen(3333, () => console.log('Listening on port 5050.'));
export default app;
