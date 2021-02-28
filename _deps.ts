export * from 'https://deno.land/x/pagic@v1.2.0/deps.ts'
export * from 'https://deno.land/x/pagic@v1.2.0/src/Pagic.ts'

import LayoutBase from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/_layout_base.tsx';
import Main from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/_main.tsx';
import Posts from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/posts/_posts.tsx';
import Loading from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/_loading.tsx';
import * as Utils from 'https://deno.land/x/pagic@v1.2.0/src/themes/blog/_utils.tsx';

export const Blog = {
  LayoutBase,
  Main,
  Posts,
  Loading,
  Utils
}