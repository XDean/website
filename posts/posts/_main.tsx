import {React, Blog, path} from '../../_deps.ts';

import type {PagicLayout, PageProps} from '../../_deps.ts';

const Main: PagicLayout = (props: PageProps) => {
  const {config, content, contentTitle, contentBody, blog, author, date, loading, prev, next, pagePath} = props;
  let prevPage: any = null
  let nextPage: any = null
  if (blog && (prev || next)) {
    const prevPath = prev && path.join(pagePath, '..', prev as any as string)
    const nextPath = next && path.join(pagePath, '..', next as any as string)
    for (let i = 0; i < blog.posts.length; i++) {
      const post = blog.posts[i]
      if ((!prevPath || prevPage) && (!nextPath || nextPage)) {
        break
      }
      if (prevPath && !prevPage) {
        if (path.join(post.pagePath) === prevPath) {
          prevPage = post
        }
      }
      if (nextPath && !nextPage) {
        if (path.join(post.pagePath) === nextPath) {
          nextPage = post
        }
      }
    }
  }
  return (
    <section className="main">
      {loading ? (
        <Blog.Loading/>
      ) : blog?.isPost ? (
        <>
          {contentTitle}
          {date && (
            <div className="main_post_meta">
              <time dateTime={date.toString()}>{Blog.Utils.dateFormatter['yyyy-MM-dd'](date)}</time>
              · {author ?? 'unknown'}
            </div>
          )}
          {contentBody}
          {(prev || next) && (
            <React.Fragment>
              <link rel="stylesheet" href={`${config.root}posts/index.css`}/>
              <div className="prev_next">
                {prevPage && (
                  <a className="prev button" href={`${config.root}${prevPage.link}`}>
                    «&nbsp;&nbsp;{prevPage.title}
                  </a>
                )}
                {nextPage && (
                  <a className="next button" href={`${config.root}${nextPage.link}`}>
                    {nextPage.title}&nbsp;&nbsp;»
                  </a>
                )}
              </div>
            </React.Fragment>
          )}
        </>
      ) : (
        content
      )}
    </section>
  );
};

export default Main;
