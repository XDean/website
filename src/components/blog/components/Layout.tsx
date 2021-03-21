import {PropsWithChildren} from "react";
import {motion} from "framer-motion";
import {OpacityInOut} from "../../../motion/OpacityInOut";
import {BlogHeaderView} from "./Header";
import Head from "next/head";

export type LayoutProps = {
  title?: string
}

export const BlogLayout = ({title, children}: PropsWithChildren<LayoutProps>) => {
  return (
    <motion.div className={'w-11/12 max-w-screen-lg'} {...OpacityInOut}>
      <Head>
        <title>
          {title || 'XDean的博客'}
        </title>
      </Head>
      <div className={'md:mt-1 mb-4'}>
        <BlogHeaderView/>
        <hr/>
      </div>
      {children}
    </motion.div>
  )
}