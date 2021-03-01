import {helpers, Router} from '../deps.ts'
import {getInfos} from "./service.ts";

export const initRouter = (router: Router) => {
  router
    .get('/post/info', (ctx) => {
      const query = helpers.getQuery(ctx)
      const size = Number(query.size) || 20
      const page = Number(query.page) || 0
      ctx.response.body = getInfos(size, page)
    })
}