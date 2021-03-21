import ReactMarkdown from "react-markdown";
import React from "react";
import MarkdownToc from 'markdown-toc-unlazy'
import uslug from 'uslug'
import {MyLink} from "../../../util/Link";

export type TocProps = {
  content: string
}
export const Toc = ({content}: TocProps) => {
  const tocData = extractMarkdownToc(content)
  if (tocData.content.length === 0) {
    return null
  }
  return (
    <div className={'hidden md:block float-left sticky border-r mr-4 pr-4 top-48 min-w-32 max-w-56 break-words'}>
      <MyLink href={'#'} className={'text-xl'} next={false} onClick={() => window.scrollTo(0, 0)}>
        目录
      </MyLink>
      <ReactMarkdown
        source={tocData.content}
        className={'text-gray-700 -ml-3'}
        renderers={{
          list: props => <ul className={'pl-4'}>{props.children}</ul>,
          link: props => <MyLink {...props} next={false}>{props.children}</MyLink>
        }}
      />
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