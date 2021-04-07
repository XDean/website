import {GetStaticPaths, GetStaticProps} from 'next'
import path from "path";
import {promises as fs} from "fs";
import gm from 'gray-matter'
import {getPostMetaByLink, getPostMetaRel, getPostMetas} from "../../../src/posts/service";
import {PostProps, PostView} from "../../../src/components/blog/Post";
import {extractMarkdownToc, markdownToHTML} from "../../../src/posts/util";

type Params = {
  path: string[]
}

const Post = (props: PostProps) => {
  return (
    <>
      <PostView {...props}/>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ctx => {
  const postMeta = await getPostMetaByLink(path.join('/blog/posts', ...ctx.params.path))
  const postFile = path.join(process.cwd(), postMeta.path)
  const raw = await fs.readFile(postFile, 'utf-8')
  const {content} = gm(raw) // remove front matter

  const props: PostProps = {
    content: await markdownToHTML(content),
    meta: postMeta,
    toc: await extractMarkdownToc(content),
  }
  if (postMeta.prev) {
    props.prev = await getPostMetaRel(postMeta, postMeta.prev)
  }
  if (postMeta.next) {
    props.next = await getPostMetaRel(postMeta, postMeta.next)
  }
  return {
    props: props,
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const metas = await getPostMetas()
  return {
    paths: metas.map(m => {
      return ({
        params: {
          path: m.link.substring('/blog/posts/'.length).split('/')
        }
      });
    }),
    fallback: false,
  }
}


export default Post