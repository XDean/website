import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostMetaGroup} from "../../../../src/posts/service";
import {PostMetaGroup, PostMetaGroupType} from "../../../../src/posts/domain";
import {ArchivesView} from "../../../../src/components/blog/Archives";

type Params = {
  type: PostMetaGroupType
}

type Props = {
  type: PostMetaGroupType
  groups: PostMetaGroup[]
}

const Page = (props: Props) => {
  return <ArchivesView {...props}/>
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const groups = await getPostMetaGroup(ctx.params.type)
  if (ctx.params.type === "year") {
    groups.sort((a, b) => b.name > a.name ? 1 : -1)
  } else {
    groups.sort((a, b) => b.count - a.count)
  }
  return {
    props: {
      type: ctx.params.type,
      groups: groups,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async ctx => {
  return {
    fallback: false,
    paths: [
      {params: {type: "category"}},
      {params: {type: "tag"}},
      {params: {type: "year"}},
    ],
  }
}


export default Page