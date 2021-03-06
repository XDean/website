import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostMetas} from "../../../src/posts/service";
import {PostMeta} from "../../../src/posts/domain";
import {useRouter} from "next/router";
import {getPage, PageData} from "../../../src/util/util";
import Link from 'next/link'
import {PostsView} from "../../../src/components/blog/Posts";

const pageSize = 10

type Props = {
  data: PageData<PostMeta>
}

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
      <div style={{maxWidth: 900, margin:'0 auto'}}>
        <PostsView data={props.data}/>
      </div>
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
    props: {
      data: pageData
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


export default Page