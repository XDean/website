import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostMetas} from "../../../src/posts/service";
import {PostMeta} from "../../../src/posts/domain";
import {useRouter} from "next/router";
import {getPage, PageData} from "../../../src/util/util";
import Link from 'next/link'

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
      <div><Link href={'1'}>Home</Link></div>
      <div><Link href={'/blog/archives/tag'}>标签</Link></div>
      <div><Link href={'/blog/archives/category'}>分类</Link></div>
      <div><Link href={'/blog/archives/year'}>归档</Link></div>
      {props.data.map(m => (
        <div key={m.path}>
          <Link href={m.link}>{m.title}</Link>
        </div>
      ))}
      <p/>
      {!props.first && <div><Link href={`${props.page - 1}`}>上一页</Link></div>}
      {!props.last && <div><Link href={`${props.page + 1}`}>下一页</Link></div>}
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