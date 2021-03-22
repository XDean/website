import {PostMeta} from "../../../posts/domain";
import {format} from 'date-fns'
import {useMemo} from "react";
import path from "path";
import {isURL} from "../../../util/util";
import {MyLink} from "../../util/Link";
import {PostTag} from "./PostTag";

type Props = {
  meta: PostMeta
}

export const PostCard = (props: Props) => {
  const summary = useMemo(() => props.meta.summary.join(' '), [props.meta]);
  const image = useMemo(() => {
    if (props.meta.image) {
      if (isURL(props.meta.image)) {
        return props.meta.image
      }
      return path.join(props.meta.link, '..', props.meta.image)
    } else {
      return null
    }
  }, [props.meta])

  return (

    <dl
      className={'bg-white hover:border-transparent hover:shadow-lg group block rounded-lg border border-gray-200l flex flex-row'}>
      <div className={'flex flex-col w-0 flex-grow-2 p-2 md:p-4'}>
        <div>
          <dt className={'sr-only'}>Title</dt>
          <dd className={'text-xl md:text-3xl'}>
            <MyLink href={props.meta.link} next={{prefetch:false}}>
              {props.meta.title}
            </MyLink>
          </dd>
        </div>
        <div className={'flex flex-row items-center mt-1 md:mt-2 overflow-auto '}>
          <div className={'whitespace-nowrap'}>
            <dt className={'sr-only'}>Date</dt>
            <dd>
              {format(new Date(props.meta.created), 'yyyy-MM-dd')}
            </dd>
          </div>
          <div>
            <dt className={'sr-only'}>Tags</dt>
            <dd className={'whitespace-nowrap flex items-center'}>
              {props.meta.categories.map(tag => <PostTag type={'category'} key={tag} tag={tag}/>)}
              {props.meta.tags.map(tag => <PostTag type={'tag'} key={tag} tag={tag}/>)}
            </dd>
          </div>
        </div>
        {summary && <div className={'w-full flex-grow hidden md:block mt-2 md:mt-3'}>
            <dt className={'sr-only'}>Summary</dt>
            <dd className={'overflow-auto'}>
              {summary}
            </dd>
        </div>}
      </div>
      {image &&
      <div className={'hidden md:block w-0 bg-contain flex-grow-1 bg-no-repeat bg-center'}
           style={{backgroundImage: `url(${image})`}}/>}
    </dl>
  )
}