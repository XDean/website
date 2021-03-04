import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from "next/router";
import {groupByCategory, getPostMetas} from "../../../../../src/posts/service";

const pageSize = 10

type Params = {
  category: string
}

type Props = {
  categories: {
    [key: string]: number
  }
}

const Post = (props: Props) => {
  return (
    <>
      {Object.entries(props.categories).map(e => (
        <div key={e[0]}>
          {e[0]} - {e[1]}
        </div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  const metas = await getPostMetas()

  return {
    props: {
      categories: {},
    } as Props,
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async ctx => {
  const categories = await groupByCategory()
  return {
    paths: categories.map(c => ({
      params: {
        category: c.name,
      }
    })),
    fallback: false
  }
}


export default Post