import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTitle from "markdown-it-title";
import MarkdownItToc from "markdown-it-toc-done-right";
import {PostMeta} from "../../posts/domain";
import {useMemo} from "react";
import Link from 'next/link'
import 'github-markdown-css/github-markdown.css'
import {createStyles, Divider, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => createStyles({
  'toc': {
    marginLeft: -20,
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
  }
}))

export type PostProps = {
  content: string
  meta: PostMeta
  prev?: PostMeta
  next?: PostMeta
}

export const PostView = (props: PostProps) => {
  const classes = useStyles()
  const {content, title, toc} = useMemo(() => renderMarkdown(props.content, props.meta), [props.content])
  const hasToc = props.meta.toc !== false
  return (
    <div style={{maxWidth: hasToc ? 1200 : 1000, minWidth: '50%', display: 'flex', width: '100vw'}}>
      {hasToc && (
        <>
          <div style={{position: 'relative'}}>
            <div style={{position: 'fixed', maxWidth: 200, zIndex: 10, marginTop: 100}}>
              <Typography variant={'h5'}>目录</Typography>
              <div dangerouslySetInnerHTML={{__html: toc}} className={classes.toc}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: toc}} style={{opacity: 0, maxWidth: 200}}
                 className={classes.toc}/>
          </div>
          <Divider orientation={"vertical"} style={{marginLeft: 10, marginRight: 10}}/>
        </>
      )}
      <div style={{width: 0, flexGrow: 1}}>
        <h1>{title}</h1>
        <article className={'markdown-body'} dangerouslySetInnerHTML={{__html: content}}/>
        {props.prev && <div><Link href={props.prev.link}><a>«&nbsp;&nbsp;{props.prev.title}</a></Link></div>}
        {props.next && <div><Link href={props.next.link}><a>{props.next.title}&nbsp;&nbsp;»</a></Link></div>}
      </div>
    </div>
  )
}

function renderMarkdown(content: string, meta: PostMeta) {
  const slugify = (hash: string) =>
    encodeURIComponent(
      hash
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[ `~!@#$%^&*()=+\[{\]}\\|;:'",<.>/?·～！¥…（）—【「】」、；：‘“’”，《。》？]/g, '')
        .replace(/[\uff00-\uffff]/g, '')
    );
  const env: any = {}
  const mdRenderer = MarkdownIt({
    html: true
  })
    .use(MarkdownItTitle)
    // .use(MarkdownItReplaceLink)
    .use(MarkdownItAnchor, {
      level: [2],
      slugify,
      permalink: true,
      permalinkSpace: true,
      permalinkSymbol: '§',
      permalinkBefore: true,
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