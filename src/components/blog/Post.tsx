import {PostMeta} from "../../posts/domain";
import React from "react";
import 'github-markdown-css/github-markdown.css'
import {GithubComment} from "../util/GithubComment";
import {OpacityInOut} from "../../motion/OpacityInOut";
import {motion} from 'framer-motion'
import {Toc} from "./components/post/Toc";
import {PostNav} from "./components/post/Nav";
import {PostHeader} from "./components/post/Header";
import {PostSEO} from "./components/post/Seo";
import css from '../../../assets/styles/post.module.css'
import clsx from "clsx";
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'

export type PostProps = {
  content: string
  toc: string
  meta: PostMeta
  prev?: PostMeta
  next?: PostMeta
}

export const PostView = (props: PostProps) => {
  return (
    <motion.div className={'w-11/12 max-w-screen-lg my-4'} {...OpacityInOut}>
      <PostSEO meta={props.meta}/>
      {props.meta.toc !== false && <Toc toc={props.toc}/>}
      <div className={'overflow-y-hidden'}>
        <div className={'mb-4'}>
          <PostHeader meta={props.meta}/>
        </div>
        <article dangerouslySetInnerHTML={{__html: props.content}} className={clsx('markdown-body', css.post)}/>
        {(props.prev || props.next) && (
          <div className={'mt-2 md:mt-4'}>
            <PostNav prev={props.prev} next={props.next}/>
          </div>
        )}
        <div className={'mt-2 md:mt-4'}>
          <hr/>
          <GithubComment/>
        </div>
      </div>
    </motion.div>
  )
}