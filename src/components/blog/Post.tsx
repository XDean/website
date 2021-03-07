import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTitle from "markdown-it-title";
import MarkdownItHighlight from "markdown-it-highlightjs";
import MarkdownItToc from "markdown-it-toc-done-right";
import {PostMeta} from "../../posts/domain";
import React, {ReactElement, useMemo} from "react";
import Link from 'next/link'
import 'github-markdown-css/github-markdown.css'
import {createStyles, Divider, makeStyles, Typography} from "@material-ui/core";
import clsx from "clsx";
import 'highlight.js/styles/stackoverflow-light.css'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import innerText from 'react-innertext';

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
  'md': {
    '&& h2,h3': {
      paddingTop: 100,
      marginTop: -100,
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
  const {content, title, toc} = useMemo(() => renderMarkdown(props.content, props.meta),
    [props.content, classes])
  const hasToc = props.meta.toc !== false
  return (
    <div style={{maxWidth: hasToc ? 1200 : 1000, minWidth: '50%', display: 'flex', width: '100vw'}}>
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
          <Divider orientation={"vertical"} style={{marginLeft: 10, marginRight: 20}}/>
        </>
      )}
      <div style={{width: 0, flexGrow: 1}}>
        <Typography variant={"h4"} paragraph id={'title'} className={classes.title}>
          {title}
        </Typography>
        {/*<article className={clsx('markdown-body', classes.md)} dangerouslySetInnerHTML={{__html: content}}/>*/}
        <ReactMarkdown className={clsx('markdown-body')} allowDangerousHtml
                       plugins={[gfm]}
                       renderers={{
                         heading: function (props: { children: ReactElement[], level: number }) {
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
                         }
                       }}
        >
          {props.content}
        </ReactMarkdown>
        {props.prev && <div><Link href={props.prev.link}><a>«&nbsp;&nbsp;{props.prev.title}</a></Link></div>}
        {props.next && <div><Link href={props.next.link}><a>{props.next.title}&nbsp;&nbsp;»</a></Link></div>}
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
    .use(MarkdownItHighlight)
    // .use(MarkdownItReplaceLink)
    .use(MarkdownItAnchor, {
      level: [2, 3],
      slugify,
    })
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
  const mdHtml = mdRenderer.render(content, env).replace(/^<h1[ >].*?<\/h1>/, '').trim();
  return {
    content: mdHtml,
    toc: env.toc,
    title: env.title,
  }
}