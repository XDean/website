import {PostMeta} from "../../posts/domain";
import {PageData} from "../../util/util";
import {PostCard} from "./components/PostCard";
import {useCallback} from "react";
import {useRouter} from "next/router";
import {BlogLayout} from "./components/Layout";
import {motion} from "framer-motion";
import {OpacityInOut} from "../../motion/OpacityInOut";
import {MyPagination} from "../util/Pagination";

type Props = {
  data: PageData<PostMeta>
}

export const PostsView = (props: Props) => {
  const page = props.data
  const router = useRouter()
  const onPageChange = useCallback((value: number) => {
    router.push(`/blog/page/${value}`)
  }, [router])

  return (
    <>
      <BlogLayout title={`第${page.page}页 - XDean的博客`}>
        {page.data.map((m, i) => (
          <motion.div key={`${page.page}-${i}`} style={{marginBottom: 20}} {...OpacityInOut}>
            <PostCard key={m.path} meta={m}/>
          </motion.div>
        ))}
        <div className={'my-2'}>
          <MyPagination data={page} onPageChange={onPageChange}/>
        </div>
      </BlogLayout>
    </>
  )
}