import {PostMeta} from "../../posts/domain";
import {PageData} from "../../util/util";
import {PostCard} from "./PostCard";
import {useCallback} from "react";
import {useRouter} from "next/router";
import {BlogHeaderView} from "./Header";
import {MyPagination} from "../util/Pagination";

type Props = {
  data: PageData<PostMeta>
}

export const PostsView = (props: Props) => {
  const page = props.data
  const router = useRouter()
  const onPageChange = useCallback((event, value: number) => {
    router.push(`/blog/page/${value}`)
  }, [])

  return (
    <div style={{width: 900, minWidth: '50%', margin: '0 50px'}}>
      <div className={'md:mt-2 mb-4'}>
        <BlogHeaderView/>
      </div>
      {page.data.map(m => (
        <div key={m.path} style={{marginBottom: 20}}>
          <PostCard key={m.path} meta={m}/>
        </div>
      ))}
      <MyPagination data={page} onChange={onPageChange}/>
    </div>
  )
}