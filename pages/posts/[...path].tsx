import {GetStaticPaths, GetStaticProps} from 'next'
import path from "path";
import {walkFiles} from "../../util/util";
import {promises as fs} from "fs";
import {useState} from "react";
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'

type Props = {
  content: string
}

type Params = {
  path: string[]
}

const Post = (props: Props) => {
  return (
    <div dangerouslySetInnerHTML={{__html: props.content}}>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const postFile = path.join(process.cwd(), 'posts', ...ctx.params.path)
  const content = await fs.readFile(postFile, 'utf-8')
  const md = MarkdownIt()
    .use(MarkdownItAnchor, {
      level: [2],
      slugify: (hash: string) =>
        encodeURIComponent(
          hash
            .trim()
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/\W/g, '')
        ),
      permalink: true,
      permalinkSpace: true,
      permalinkSymbol: '§',
      permalinkBefore: true,
    })
  const res = md.render(content)
  return {
    props: {
      content: res
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = await walkFiles(postsDir, {ext: ['md']})
  const paths = []
  for await (const f of filenames) {
    paths.push({params: {path: f}})
  }
  return {
    paths: paths,
    fallback: false,
  }
}


export default Post