import {Application, Router} from './deps.ts'
import {initRouter} from './posts/router.ts'
import * as etc from './etc/mod.ts'

export function runServer() {
  const router = new Router();
  initRouter(router);

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log(`server started at port ${etc.Global.port}`)

  return app.listen({port: etc.Global.port});
}
