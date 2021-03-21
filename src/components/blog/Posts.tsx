import {PostMeta} from "../../posts/domain";
import {PageData} from "../../util/util";
import {PostCard} from "./PostCard";
import {useCallback} from "react";
import {useRouter} from "next/router";
import {BlogHeaderView} from "./Header";
import {MyPagination} from "../util/Pagination";
import Head from "next/head";
import { motion } from "framer-motion";
import {SlideInOut} from "../../motion/SlideInOut";
import {OpacityInOut} from "../../motion/OpacityInOut";

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
    <motion.div className={'w-11/12 max-w-screen-lg'} {...OpacityInOut}>
      <Head><title>XDean's Blog - Page {page.page}</title></Head>
      <div className={'md:mt-2 mb-4'}>
        <BlogHeaderView/>
      </div>
      {page.data.map(m => (
        <motion.div key={m.path} style={{marginBottom: 20}} {...OpacityInOut}>
          <PostCard key={m.path} meta={m}/>
        </motion.div>
      ))}
      <MyPagination data={page} onChange={onPageChange}/>
    </motion.div>
  )
}