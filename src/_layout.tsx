import {React} from '../_deps.ts';

import type {PagicLayout, PageProps} from 'https://deno.land/x/pagic@v1.2.0/src/Pagic.ts'
import LayoutBase from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/_layout_base.tsx';
import Main from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/_main.tsx';
import Posts from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/posts/_posts.tsx';

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
      <LayoutBase {...copy} Main={Posts}/>
    );
  } else {
    return (
      <LayoutBase {...props} Main={Main}/>
    );
  }
};

export default Layout;