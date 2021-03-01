import {oak} from '../deps.ts'
import {Global} from "../etc/global.ts";

export function init(router: oak.Router) {
  router
    .get('/', async ctx => {
      await oak.send(ctx, 'index.html', {
        root: Global.static.dir,
      });
    })
    .get('/static/:path(.*)', async ctx => {
      const query = oak.helpers.getQuery(ctx, { mergeParams: true });
      await oak.send(ctx, query.path, {
        root: Global.static.dir,
      });
    })
}