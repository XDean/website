import {oak, path} from '../deps.ts'
import {getContent, getInfo, getInfos} from "./service.ts";

export const initRouter = (router: oak.Router) => {
  router
    .get('/post/info', (ctx) => {
      const query = oak.helpers.getQuery(ctx)
      const size = Number(query.size) || 20
      const page = Number(query.page) || 0
      const p = query.path
      if (!!p) {
        const info = getInfo(path.normalize(p));
        if (!!info) {
          ctx.response.body = info
        } else {
          ctx.throw(404)
        }
      } else {
        ctx.response.body = getInfos(size, page)
      }
    })
    .get('/post/content', async ctx => {
      const query = oak.helpers.getQuery(ctx)
      const p = query.path
      if (!!p) {
        const content = await getContent(path.normalize(p));
        if (!!content) {
          ctx.response.body = content
        } else {
          ctx.throw(404)
        }
      } else {
        ctx.throw(400)
      }
    })
}