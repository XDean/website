import {GetStaticPaths, GetStaticProps} from 'next'
import path from "path";
import {promises as fs} from "fs";
import gm from 'gray-matter'
import {getPostMeta, getPostMetas} from "../../../src/posts/service";
import {PostView} from "../../../src/components/blog";
import {useMemo} from "react";

type Props = {
  content: string
  meta: string
}

type Params = {
  path: string[]
}

const Post = (props: Props) => {
  const meta = useMemo(() => JSON.parse(props.meta), [props.meta])
  return (
    <>
      <PostView content={props.content} meta={meta}/>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const postFile = path.join(process.cwd(), 'posts', ...ctx.params.path)
  const postMeta = await getPostMeta(path.join('posts', ...ctx.params.path))
  const raw = await fs.readFile(postFile, 'utf-8')
  const {content} = gm(raw) // remove front matter
  return {
    props: {
      content: content,
      meta: JSON.stringify(postMeta),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const metas = await getPostMetas()
  return {
    paths: metas.map(m => {
      return ({
        params: {
          path: m.path.substring('posts/'.length).split('/')
        }
      });
    }),
    fallback: false,
  }
}


export default Post