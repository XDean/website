import {PostMeta} from "../../posts/domain";
import {PageData} from "../../util/util";
import {PostCard} from "./PostCard";
import {useCallback} from "react";
import {useRouter} from "next/router";
import {BlogHeaderView} from "./Header";
import {MyPagination} from "../util/Pagination";
import Head from "next/head";

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
    <div className={'w-11/12 max-w-screen-lg'}>
      <Head><title>XDean's Blog - Page {page.page}</title></Head>
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