import {GetStaticPaths, GetStaticProps} from 'next'
import path from "path";
import {walkFiles} from "../../../src/util/util";
import {promises as fs} from "fs";
import {useState} from "react";
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import gm from 'gray-matter'
import {getPostMetas} from "../../../src/posts/service";
import {PostMeta} from "../../../src/posts/meta";
import {useRouter} from "next/router";

const pageSize = 10

type Props = {
  page: number
  first: boolean
  last: boolean
  metas: PostMeta[]
}

type Params = {
  page: string
}

const Post = (props: Props) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      {props.metas.map(m => (
        <div key={m.path}>
          <a href={`/blog/${m.path}`}>{m.title}</a>
        </div>
      ))}
      <p/>
      {!props.first && <div><a href={`/blog/page/${props.page - 1}`}>上一页</a></div>}
      {!props.last && <div><a href={`/blog/page/${props.page + 1}`}>下一页</a></div>}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const metas = await getPostMetas()
  const maxPage = Math.ceil(metas.length / pageSize)
  const page = Number(ctx.params.page)
  console.log(page, maxPage)
  if (isNaN(page) || page < 1 || page > maxPage) {
    return {
      notFound: true
    }
  }
  const pageMetas = metas.slice((page - 1) * pageSize, Math.min(page * pageSize, metas.length))
  return {
    props: {
      page: page,
      first: page === 1,
      last: page === maxPage,
      metas: pageMetas,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [
      {params: {page: "1"}}
    ],
    fallback: true,
  }
}


export default Post