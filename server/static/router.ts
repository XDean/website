import {oak} from '../deps.ts'
import {Global} from "../etc/global.ts";

export function init(router: oak.Router) {
  if (!Global.static.serve) {
    return
  }
  router
    .get('/', async ctx => {
      await oak.send(ctx, 'index.html', {
        root: Global.static.dir,
      });
    })
    .get('/static/:path(.*)', async ctx => {
      await oak.send(ctx, ctx.request.url.pathname, {
        root: Global.static.dir,
      });
    })
}