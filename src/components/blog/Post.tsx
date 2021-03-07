import MarkdownIt from "markdown-it";
import MarkdownItTitle from "markdown-it-title";
import MarkdownItToc from "markdown-it-toc-done-right";
import {PostMeta} from "../../posts/domain";
import React, {ReactElement, useMemo} from "react";
import Link from 'next/link'
import 'github-markdown-css/github-markdown.css'
import {Button, createStyles, Divider, makeStyles, Tooltip, Typography} from "@material-ui/core";
import 'highlight.js/styles/stackoverflow-light.css'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import innerText from 'react-innertext';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {idea as syntaxStyle} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {MyLink} from "../util/Link";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {PostTag} from "./PostTag";
import {format} from "date-fns";

const useStyles = makeStyles(theme => createStyles({
  'toc': {
    marginLeft: -20,
  },
  'tocContainer': {
    color: '#555',
    '&& ol,ul': {
      listStyle: 'none',
      paddingInlineStart: 20,
    },
    '&& a': {
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        color: '#000',
        textDecoration: 'underline',
      }
    }
  },
  'title': {
    paddingTop: 200,
    marginTop: -200,
  },
}))

export type PostProps = {
  content: string
  meta: PostMeta
  prev?: PostMeta
  next?: PostMeta
}

export const PostView = (props: PostProps) => {
  const classes = useStyles()
  const {title, toc} = useMemo(() => renderMarkdown(props.content, props.meta), [props.content, classes])
  const hasToc = props.meta.toc !== false
  const hasUpdate = props.meta.updated && props.meta.updated !== props.meta.created
  return (
    <div style={{maxWidth: hasToc ? 1200 : 1000, minWidth: '50%', display: 'flex', width: '100vw', margin: '0 20px'}}>
      {hasToc && (
        <>
          <div style={{position: 'relative'}} className={classes.tocContainer}>
            <div style={{position: 'fixed', maxWidth: 200, zIndex: 10, marginTop: 100}}>
              <Typography variant={'h5'}>
                <a href={'#title'}>
                  目录
                </a>
              </Typography>
              <div dangerouslySetInnerHTML={{__html: toc}} className={classes.toc}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: toc}} style={{opacity: 0, maxWidth: 200}}
                 className={classes.toc}/>
          </div>
          <Divider orientation={"vertical"} style={{marginLeft: 20, marginRight: 20}}/>
        </>
      )}
      <div style={{width: 0, flexGrow: 1}}>
        <Typography variant={"h4"} id={'title'} className={classes.title}>
          {title}
        </Typography>
        <Typography style={{display: 'flex', margin: '5px 0 25px 10px'}}>
          <Tooltip title={hasUpdate ? `更新于: ${format(new Date(props.meta.updated), 'yyyy-MM-dd HH:mm:ss')}` : ''} arrow>
            <span>
              {format(new Date(props.meta.created), 'yyyy-MM-dd')}{hasUpdate ? "*" : ""}
            </span>
          </Tooltip>
          {props.meta.categories.map(c => <PostTag tag={c} key={c}/>)}
          {props.meta.tags.map(c => <PostTag tag={c} key={c}/>)}
        </Typography>
        <MathJax.Provider>
          <ReactMarkdown className={'markdown-body'} allowDangerousHtml
                         linkTarget={'_blank'}
                         plugins={[gfm, RemarkMathPlugin]}
                         renderers={{
                           heading: (props: { children: ReactElement[], level: number }) => {
                             if (props.level === 1) {
                               return null
                             }
                             const slug = slugify(innerText(<>{props.children}</>))
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
                           inlineMath: props => <MathJax.Node inline formula={props.value}/>,
                         }}
          >
            {props.content}
          </ReactMarkdown>
        </MathJax.Provider>
        {(props.prev || props.next) &&
        <div style={{display: 'flex', marginTop: 20}}>
            <div style={{width: 0, flexGrow: 1}}>
              {props.prev && (
                <MyLink href={props.prev.link}>
                  <Button variant={"outlined"}>
                    <Typography variant={"h6"}>
                      上一篇: {props.prev.title}
                    </Typography>
                  </Button>
                </MyLink>
              )}
            </div>
            <div style={{width: 0, flexGrow: 1, textAlign: 'right'}}>
              {props.next && (
                <MyLink href={props.next.link}>
                  <Button variant={"outlined"}>
                    <Typography variant={"h6"}>
                      下一篇: {props.next.title}
                    </Typography>
                  </Button>
                </MyLink>
              )}
            </div>
        </div>
        }
      </div>
    </div>
  )
}

function slugify(hash: string) {
  return encodeURIComponent(
    hash
      .trim()
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[ `~!@#$%^&*()=+\[{\]}\\|;:'",<.>/?·～！¥…（）—【「】」、；：‘“’”，《。》？]/g, '')
      .replace(/[\uff00-\uffff]/g, '')
  );
}

function renderMarkdown(content: string, meta: PostMeta) {

  const env: any = {}
  const mdRenderer = MarkdownIt({
    html: true
  })
    .use(MarkdownItTitle)
  if (meta.toc !== false) {
    mdRenderer.use(MarkdownItToc, {
      containerClass: 'toc',
      level: [2, 3],
      slugify,
      callback: (html: string) => {
        env.toc = html;
      },
    })
  }
  mdRenderer.render(content, env);
  return {
    toc: env.toc,
    title: env.title,
  }
}