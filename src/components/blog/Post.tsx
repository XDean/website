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
        <article dangerouslySetInnerHTML={{__html: props.content}} className={'markdown-body'}/>
        {/*<MathJax.Provider>*/}
        {/*  <ReactMarkdown className={'markdown-body'} allowDangerousHtml*/}
        {/*                 linkTarget={'_blank'}*/}
        {/*                 plugins={[gfm, RemarkMathPlugin]}*/}
        {/*                 renderers={{*/}
        {/*                   heading: (props: { children: ReactElement[], level: number }) => {*/}
        {/*                     if (props.level === 1) {*/}
        {/*                       return null*/}
        {/*                     }*/}
        {/*                     const text = innerText(<>{props.children}</>);*/}
        {/*                     const slug = uslug(text)*/}
        {/*                     return React.createElement(`h${props.level}`, {*/}
        {/*                       id: slug,*/}
        {/*                       style: {*/}
        {/*                         paddingTop: 100,*/}
        {/*                         marginTop: -100,*/}
        {/*                       },*/}
        {/*                     }, props.children)*/}
        {/*                   },*/}
        {/*                   code: ({language, value}) => {*/}
        {/*                     const grammar = Prism.languages[language];*/}
        {/*                     const html = !!grammar ? Prism.highlight(value, grammar, language) : value;*/}
        {/*                     return <pre className={`language-${language}`}><code*/}
        {/*                       dangerouslySetInnerHTML={{__html: html}}/></pre>*/}
        {/*                   },*/}
        {/*                   math: props => <MathJax.Node formula={props.value}/>,*/}
        {/*                   list: props => <ul className={clsx(props.ordered ? 'list-decimal' : 'list-disc')}>*/}
        {/*                     {props.children}*/}
        {/*                   </ul>,*/}
        {/*                   inlineMath: props => <MathJax.Node inline formula={props.value}/>,*/}
        {/*                   link: props => {*/}
        {/*                     let href = props.href*/}
        {/*                     if (isURL(href)) {*/}
        {/*                       return <a rel={'noopener'} {...props}/>*/}
        {/*                     } else {*/}
        {/*                       if (href.endsWith('.md')) {*/}
        {/*                         href = href.substring(0, href.length - 3)*/}
        {/*                       }*/}
        {/*                       return <MyLink {...props} href={href}/>*/}
        {/*                     }*/}
        {/*                   }*/}
        {/*                 }}*/}
        {/*  >*/}
        {/*    {props.content}*/}
        {/*  </ReactMarkdown>*/}
        {/*</MathJax.Provider>*/}
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