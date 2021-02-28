import {React, Blog} from '../_deps.ts';

import type {PagicLayout, PageProps} from '../_deps.ts'

const Layout: PagicLayout = (props: PageProps) => {
  if (props.outputPath === 'index.html') {
    const copy = {...props}
    if (copy.blog) {
      copy.blog.posts.forEach(blog => {
        if (blog.cover && blog.link) {
          blog.cover = `${blog.link}/../${blog.cover}`
        }
      })
    }
    return (
      <Blog.LayoutBase {...copy} Main={Blog.Posts}/>
    );
  } else {
    return (
      <Blog.LayoutBase {...props} Main={Blog.Main}/>
    );
  }
};

export default Layout;