import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostMetaGroup} from "../../../../src/posts/service";
import {PostMeta, PostMetaGroup, PostMetaGroupType} from "../../../../src/posts/domain";

type Params = {
  type: PostMetaGroupType
}

type Props = {
  type: PostMetaGroupType
  groups: PostMetaGroup[]
}

const Post = (props: Props) => {
  return (
    <>
      <p>{props.type}</p>
      {props.groups.map(e => (
        <div key={e.count}>
          <a href={`${props.type}/${e.name}`}>
            {e.name} - {e.count}
          </a>
        </div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {
  const groups = await getPostMetaGroup(ctx.params.type)
  groups.sort((a, b) => a.count - b.count)
  return {
    props: {
      type: ctx.params.type,
      groups: groups,
    } as Props,
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


export default Post