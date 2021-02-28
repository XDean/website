import {Application, Router, helpers} from '../deps.ts'

export const initRouter = (router: Router) => {
  router
    .get('/posts', (ctx) => {
      helpers.getQuery(ctx, {mergeParams: true})
      ctx.response.body
    })
}