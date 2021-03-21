import {Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import React from "react";
import MarkdownToc from 'markdown-toc-unlazy'
import uslug from 'uslug'

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
      <Typography variant={'h5'}>
        <a href={'#title'}>
          目录
        </a>
      </Typography>
      <ReactMarkdown
        source={tocData.content}
        className={'text-gray-700 -ml-3'}
        renderers={{
          list: props => <ul className={'pl-4'}>{props.children}</ul>
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