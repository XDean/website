import {oak} from './deps.ts'
import {initRouter} from './posts/router.ts'
import * as etc from './etc/mod.ts'

export function runServer() {
  const router = new oak.Router();
  router.get('/ping', ctx => {
    ctx.response.body = 'pong'
  })
  initRouter(router);

  const app = new oak.Application();
  app.use(async (ctx, next) => {
    const query = oak.helpers.getQuery(ctx)
    try {
      await next();
    } catch (err) {
      if (oak.isHttpError(err)) {
        ctx.response.body = {
          code: err.status,
          message: err.message,
          stack: query.trace == undefined ? undefined : err.stack,
        }
      } else {
        throw err;
      }
    }
  })
  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log(`server started at port ${etc.Global.port}`)

  return app.listen({port: etc.Global.port});
}
