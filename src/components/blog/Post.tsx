import {PostMeta} from "../../posts/domain";
import React, {ReactElement} from "react";
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
import {PostTag} from "./PostTag";
import {format} from "date-fns";
import {GithubComment} from "../util/GithubComment";
import MarkdownToc from 'markdown-toc-unlazy'
import uslug from 'uslug'
import {isURL} from "../../util/util";

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
  const tocData = extractMarkdownToc(props.content)
  const hasToc = props.meta.toc !== false && tocData.content.length > 0
  const hasUpdate = props.meta.updated && props.meta.updated !== props.meta.created

  return (
    <div style={{maxWidth: hasToc ? 1200 : 1000, minWidth: '50%', display: 'flex', width: '100vw', margin: '0 20px'}}>
      {hasToc && function () {
        const toc = (
          <div style={{minWidth: 80, maxWidth: 200}}>
            <Typography variant={'h5'}>
              <a href={'#title'}>
                目录
              </a>
            </Typography>
            <ReactMarkdown source={tocData.content} className={classes.toc}/>
          </div>
        )
        return (
          <>
            <div style={{position: 'relative'}} className={classes.tocContainer}>
              <div style={{position: 'fixed', zIndex: 10, marginTop: 100}}>
                {toc}
              </div>
              <div style={{opacity: 0}}>
                {toc}
              </div>
            </div>
            <Divider orientation={"vertical"} style={{marginLeft: 20, marginRight: 20}}/>
          </>
        )
      }()}
      <div style={{width: 0, flexGrow: 1}}>
        <Typography variant={"h4"} id={'title'} className={classes.title}>
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
        <div style={{marginTop: 30}}>
          <Divider/>
          <GithubComment/>
        </div>
      </div>
    </div>
  )
}

function extractMarkdownToc(content: string) {
  return MarkdownToc(content, {
    slugify: uslug,
    maxdepth: 2,
    firsth1: false,
  })
}