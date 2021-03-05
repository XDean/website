import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTitle from "markdown-it-title";
import MarkdownItToc from "markdown-it-toc-done-right";
import {PostMeta} from "../../posts/domain";
import {useMemo} from "react";

export type PostProps = {
  content: string
  meta: PostMeta
}

export const PostView = (props: PostProps) => {
  const {content, title, toc} = useMemo(() => renderMarkdown(props.content, props.meta), [props.content])
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: toc}}/>
      <article dangerouslySetInnerHTML={{__html: content}}/>
    </>
  )
}

function renderMarkdown(content: string, meta: PostMeta) {
  const slugify = (hash: string) =>
    encodeURIComponent(
      hash
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[　`~!@#$%^&*()=+\[{\]}\\|;:'",<.>/?·～！¥…（）—【「】」、；：‘“’”，《。》？]/g, '')
        .replace(/[\uff00-\uffff]/g, '')
    );
  const env: any = {}
  const mdRenderer = MarkdownIt()
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

  const mdHtml = mdRenderer.render(content, env);
  return {
    content: mdHtml,
    toc: env.toc,
    title: env.title,
  }
}