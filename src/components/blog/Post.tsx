import {PostMeta} from "../../posts/domain";
import React, {ReactElement} from "react";
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/stackoverflow-light.css'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import innerText from 'react-innertext';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {idea as syntaxStyle} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {MyLink} from "../util/Link";
import {GithubComment} from "../util/GithubComment";
import uslug from 'uslug'
import {isURL} from "../../util/util";
import clsx from "clsx";
import Head from "next/head";
import {OpacityInOut} from "../../motion/OpacityInOut";
import {motion} from 'framer-motion'
import {Toc} from "./components/post/Toc";
import {PostNav} from "./components/post/Nav";
import {PostHeader} from "./components/post/Header";

export type PostProps = {
  content: string
  meta: PostMeta
  prev?: PostMeta
  next?: PostMeta
}

export const PostView = (props: PostProps) => {
  return (
    <motion.div className={'w-11/12 max-w-screen-lg my-4'} {...OpacityInOut}>
      <Head>
        <title>{props.meta.title} - XDean's Blog</title>
      </Head>
      {props.meta.toc !== false && <Toc content={props.content}/>}
      <div className={'overflow-y-hidden'}>
        <div className={'mb-4'}>
          <PostHeader meta={props.meta}/>
        </div>
        <MathJax.Provider>
          <ReactMarkdown className={'markdown-body'} allowDangerousHtml
                         linkTarget={'_blank'}
                         plugins={[gfm, RemarkMathPlugin]}
                         renderers={{
                           heading: (props: { children: ReactElement[], level: number }) => {
                             if (props.level === 1) {
                               return null
                             }
                             const text = innerText(<>{props.children}</>);
                             const slug = uslug(text)
                             return React.createElement(`h${props.level}`, {
                               id: slug,
                               style: {
                                 paddingTop: 100,
                                 marginTop: -100,
                               },
                             }, props.children)
                           },
                           code: ({language, value}) => {
                             return <SyntaxHighlighter style={syntaxStyle} language={language} children={value}/>
                           },
                           math: props => <MathJax.Node formula={props.value}/>,
                           list: props => <ul className={clsx(props.ordered ? 'list-decimal' : 'list-disc')}>
                             {props.children}
                           </ul>,
                           inlineMath: props => <MathJax.Node inline formula={props.value}/>,
                           link: props => {
                             let href = props.href
                             if (isURL(href)) {
                               return <a {...props}/>
                             } else {
                               if (href.endsWith('.md')) {
                                 href = href.substring(0, href.length - 3)
                               }
                               return <MyLink {...props} href={href}/>
                             }
                           }
                         }}
          >
            {props.content}
          </ReactMarkdown>
        </MathJax.Provider>
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