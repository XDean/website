import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostMetas} from "../../../src/posts/service";
import {PostMeta} from "../../../src/posts/domain";
import {useRouter} from "next/router";
import {getPage, PageData} from "../../../src/util/util";

const pageSize = 10

type Props = PageData<PostMeta>

type Params = {
  page: string
}

const Page = (props: Props) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div><a href={'../1'}>Home</a></div>
      <div><a href={'/blog/archives/tag'}>标签</a></div>
      <div><a href={'/blog/archives/category'}>分类</a></div>
      <div><a href={'/blog/archives/year'}>归档</a></div>
      {props.data.map(m => (
        <div key={m.path}>
          <a href={`/blog/${m.path}`}>{m.title}</a>
        </div>
      ))}
      <p/>
      {!props.first && <div><a href={`../${props.page - 1}`}>上一页</a></div>}
      {!props.last && <div><a href={`../${props.page + 1}`}>下一页</a></div>}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const metas = await getPostMetas()
  const pageNumber = Number(ctx.params.page);
  const pageData = getPage(metas, pageNumber, pageSize)
  if (pageData === null) {
    return {
      notFound: true
    }
  }
  return {
    props: pageData,
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


export default Page