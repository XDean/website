import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostMetas} from "../../../src/posts/service";
import {PostMeta} from "../../../src/posts/domain";
import {useRouter} from "next/router";
import {getPage, PageData} from "../../../src/util/util";
import {PostsView} from "../../../src/components/blog/Posts";
import {Loading} from "../../../src/components/util/Loading";

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
    return <Loading/>
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
  const metas = await getPostMetas()
  const totalPage = Math.ceil(metas.length / pageSize)
  const paths = Array.from(Array(totalPage).keys()).map(p => ({params: {page: (p + 1).toString()}}));
  return {
    paths: paths,
    fallback: true,
  }
}


export default Page