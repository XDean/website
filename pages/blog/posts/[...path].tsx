import {GetStaticPaths, GetStaticProps} from 'next'
import path from "path";
import {promises as fs} from "fs";
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import gm from 'gray-matter'
import {getPostMeta, getPostMetas} from "../../../src/posts/service";

type Props = {
  content: string
  meta: string
}

type Params = {
  path: string[]
}

const Post = (props: Props) => {
  return (
    <>
      <p>{props.meta}</p>
      <div dangerouslySetInnerHTML={{__html: props.content}}/>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const postFile = path.join(process.cwd(), 'posts', ...ctx.params.path)
  const postMeta = await getPostMeta(path.join('posts', ...ctx.params.path))
  const raw = await fs.readFile(postFile, 'utf-8')
  const {content} = gm(raw) // remove front matter
  const md = MarkdownIt()
    .use(MarkdownItAnchor, {
      level: [2],
      slugify: (hash: string) =>
        encodeURIComponent(
          hash
            .trim()
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[　`~!@#$%^&*()=+\[{\]}\\|;:'",<.>/?·～！¥…（）—【「】」、；：‘“’”，《。》？]/g, '')
            .replace(/[\uff00-\uffff]/g, '')
        ),
      permalink: true,
      permalinkSpace: true,
      permalinkSymbol: '§',
      permalinkBefore: true,
    })
  const rendered = md.render(content)
  return {
    props: {
      content: rendered,
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