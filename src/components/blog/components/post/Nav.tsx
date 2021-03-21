import {MyLink} from "../../../util/Link";
import React from "react";
import {PostMeta} from "../../../../posts/domain";

export type PostNavProps = {
  prev?: PostMeta
  next?: PostMeta
}
export const PostNav = ({prev, next}: PostNavProps) => {
  return (
    <div className={'flex text-lg md:text-xl'}>
      <div className={'w-6/12'}>
        {prev && (
          <MyLink href={prev.link}>
            上一篇: {prev.title}
          </MyLink>
        )}
      </div>
      <div className={'w-6/12 text-right '}>
        {next && (
          <MyLink href={next.link}>
            下一篇: {next.title}
          </MyLink>
        )}
      </div>
    </div>
  )
}