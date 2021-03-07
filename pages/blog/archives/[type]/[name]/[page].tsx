import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostByGroup, getPostMetaGroup, getPostMetas} from "../../../../../src/posts/service";
import {PostMeta, PostMetaGroupType, PostMetaGroupTypes} from "../../../../../src/posts/domain";
import {getPage, PageData} from "../../../../../src/util/util";
import {useRouter} from "next/router";
import Link from 'next/link'
import {ArchiveView} from "../../../../../src/components/blog/Archive";
import {Loading} from "../../../../../src/components/util/Loading";

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
    return <Loading/>
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
  const paths = []
  for (const type of PostMetaGroupTypes) {
    const groups = await getPostMetaGroup(type)
    for (const group of groups) {
      const metas = await getPostByGroup(type, group.name)
      const totalPage = Math.ceil(metas.length / pageSize)
      for (let page = 0; page < totalPage; page++) {
        paths.push({params: {type: type, name: group.name, page: (page + 1).toString()}})
      }
    }
  }
  return {
    paths: paths,
    fallback: true,
  }
}

export default Page