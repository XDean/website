import {React, Blog} from '../../_deps.ts';

import type {PagicLayout, PageProps} from '../../_deps.ts';
import Main from './_main.tsx'

const Layout: PagicLayout = (props: PageProps) => (
  <Blog.LayoutBase {...props} Main={props.blog?.isPost ? Main : Blog.Posts}/>
);

export default Layout;
