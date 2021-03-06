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
    <PostsView data={props.data}/>
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