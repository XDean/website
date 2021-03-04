import {GetStaticPaths, GetStaticProps} from 'next'
import path from "path";
import {walkFiles} from "../../util/util";
import {promises as fs} from "fs";
import {useState} from "react";
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import gm from 'gray-matter'

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
  const raw = await fs.readFile(postFile, 'utf-8')
  const {content, data: rawMeta} = gm(raw)
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
  const rendered = md.render(content)
  const meta = {
    // TODO git info
    ...rawMeta
  }
  return {
    props: {
      content: rendered,
      meta: JSON.stringify(meta),
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