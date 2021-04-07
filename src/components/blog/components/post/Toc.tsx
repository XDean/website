import React from "react";
import {MyLink} from "../../../util/Link";
import css from '../../../../../assets/styles/post.module.css'
import clsx from "clsx";

export type TocProps = {
  toc: string
}
export const Toc = ({toc}: TocProps) => {
  if (toc.length === 0) {
    return null
  }
  return (
    <div className={'hidden md:block float-left sticky border-r mr-4 pr-4 top-48 min-w-32 max-w-56 break-words'}>
      <MyLink href={'#'} className={'text-xl'} next={false} onClick={() => window.scrollTo(0, 0)}>
        目录
      </MyLink>
      <div className={clsx('text-gray-700 -ml-3 markdown-body', css.toc)} dangerouslySetInnerHTML={{__html: toc}}/>
    </div>
  )
}