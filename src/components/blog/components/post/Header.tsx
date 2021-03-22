import {format} from "date-fns";
import {PostTag} from "../PostTag";
import React from "react";
import {PostMeta} from "../../../../posts/domain";
import ReactTooltip from "react-tooltip";

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
      <div className={'mt-2 ml-2'}>
        <div className={'inline-block'}
             data-tip={hasUpdate ? `更新于: ${format(new Date(meta.updated), 'yyyy-MM-dd HH:mm:ss')}` : ''}>
          {format(new Date(meta.created), 'yyyy-MM-dd')}{hasUpdate ? "*" : ""}
        </div>
        {meta.categories.map(c => <div key={c} className={'inline-block'}><PostTag type={"category"} tag={c} key={c}/>
        </div>)}
        {meta.tags.map(c => <div key={c} className={'inline-block'}><PostTag type={"tag"} tag={c} key={c}/></div>)}
      </div>
      <ReactTooltip place={'bottom'} effect={'solid'} type={'dark'}/>
    </div>
  )
}