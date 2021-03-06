import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostByGroup} from "../../../../../src/posts/service";
import {PostMeta, PostMetaGroupType} from "../../../../../src/posts/domain";
import {getPage, PageData} from "../../../../../src/util/util";
import {useRouter} from "next/router";
import Link from 'next/link'
import {ArchiveView} from "../../../../../src/components/blog/Archive";

const pageSize = 20

type Params = {
  type: PostMetaGroupType
  name: string
  page: string
}

type Props = {
  params: Params
  data: PageData<PostMeta>
}

const Page = (props: Props) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }
  return <ArchiveView type={props.params.type} name={props.params.name} data={props.data}/>
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const metas = await getPostByGroup(ctx.params.type, ctx.params.name)
  const pageNumber = Number(ctx.params.page);
  const pageData = getPage(metas, pageNumber, pageSize)
  if (pageData === null) {
    return {notFound: true}
  }
  return {
    props: {
      data: pageData,
      params: ctx.params,
    },
  }
}


export const getStaticPaths: GetStaticPaths<Params> = async ctx => {
  return {
    paths: [],
    fallback: true,
  }
}

export default Page