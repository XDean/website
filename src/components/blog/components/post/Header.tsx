import {Tooltip} from "@material-ui/core";
import {format} from "date-fns";
import {PostTag} from "../PostTag";
import React from "react";
import {PostMeta} from "../../../../posts/domain";

export type PostHeaderProps = {
  meta: PostMeta
}

export const PostHeader = ({meta}: PostHeaderProps) => {
  const hasUpdate = meta.updated && meta.updated !== meta.created
  return (
    <div id={'title'}>
      <div className={'text-2xl md:text-4xl'}>
        {meta.title}
      </div>
      <div className={'flex mt-2 ml-2 items-center'}>
        <Tooltip title={hasUpdate ? `更新于: ${format(new Date(meta.updated), 'yyyy-MM-dd HH:mm:ss')}` : ''} arrow>
          <div>
            {format(new Date(meta.created), 'yyyy-MM-dd')}{hasUpdate ? "*" : ""}
          </div>
        </Tooltip>
        {meta.categories.map(c => <PostTag type={"category"} tag={c} key={c}/>)}
        {meta.tags.map(c => <PostTag type={"tag"} tag={c} key={c}/>)}
      </div>
    </div>
  )
}