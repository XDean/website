import {PostMeta} from "../../posts/domain";
import React, {ReactElement} from "react";
import 'github-markdown-css/github-markdown.css'
import {Divider, Tooltip, Typography} from "@material-ui/core";
import 'highlight.js/styles/stackoverflow-light.css'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import innerText from 'react-innertext';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {idea as syntaxStyle} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {MyLink} from "../util/Link";
import {PostTag} from "./components/PostTag";
import {format} from "date-fns";
import {GithubComment} from "../util/GithubComment";
import uslug from 'uslug'
import {isURL} from "../../util/util";
import clsx from "clsx";
import Head from "next/head";
import {OpacityInOut} from "../../motion/OpacityInOut";
import {motion} from 'framer-motion'
import {Toc} from "./components/Toc";
import {PostNav} from "./components/Nav";

export type PostProps = {
  content: string
  meta: PostMeta
  prev?: PostMeta
  next?: PostMeta
}

export const PostView = (props: PostProps) => {
  const hasUpdate = props.meta.updated && props.meta.updated !== props.meta.created

  return (
    <motion.div className={'w-11/12 max-w-screen-lg my-4'} {...OpacityInOut}>
      <Head>
        <title>{props.meta.title} - XDean's Blog</title>
      </Head>
      {props.meta.toc !== false && <Toc content={props.content}/>}
      <div className={'overflow-y-hidden'}>
        <Typography variant={"h4"} id={'title'} style={{paddingTop: 200, marginTop: -200}}>
          {props.meta.title}
        </Typography>
        <div style={{display: 'flex', margin: '5px 0 25px 10px'}}>
          <Tooltip title={hasUpdate ? `更新于: ${format(new Date(props.meta.updated), 'yyyy-MM-dd HH:mm:ss')}` : ''} arrow>
            <Typography>
              {format(new Date(props.meta.created), 'yyyy-MM-dd')}{hasUpdate ? "*" : ""}
            </Typography>
          </Tooltip>
          {props.meta.categories.map(c => <PostTag type={"category"} tag={c} key={c}/>)}
          {props.meta.tags.map(c => <PostTag type={"tag"} tag={c} key={c}/>)}
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