import {PostMeta, PostMetaGroupType} from "../../posts/domain";
import {Card, CardContent, CardMedia, Chip, Link, Typography} from "@material-ui/core";
import {compareAsc, format} from 'date-fns'
import {useMemo} from "react";
import NextLink from 'next/link'
import {useRouter} from "next/router";
import path from "path";
import {isURL} from "../../util/util";
import {MyLink} from "../util/Link";
import {PostTag} from "./PostTag";

type Props = {
  meta: PostMeta
}

export const PostCard = (props: Props) => {
  const router = useRouter()
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
      className={'hover:bg-s hover:border-transparent hover:shadow-lg group block rounded-lg p-2 md:p-4 border border-gray-200'}>
      <div>
        <div>
          <dt className={'sr-only'}>Title</dt>
          <dd className={'text-xl md:text-3xl'}>
            <MyLink href={props.meta.link}>
              {props.meta.title}
            </MyLink>
          </dd>
        </div>
        <div className={'flex flex-row items-center mt-1 md:mt-3 overflow-auto '}>
          <div className={'whitespace-nowrap'}>
            <dt className={'sr-only'}>Date</dt>
            <dd>
              {format(new Date(props.meta.created), 'yyyy-MM-dd')}
            </dd>
          </div>
          <div>
            <dt className={'sr-only'}>Tags</dt>
            <dd className={'whitespace-nowrap'}>
              {props.meta.categories.map(tag => <PostTag type={'category'} key={tag} tag={tag}/>)}
              {props.meta.tags.map(tag => <PostTag type={'tag'} key={tag} tag={tag}/>)}
            </dd>
          </div>
        </div>
        {summary &&
        <div className={'hidden md:block'}>
            <dt className={'sr-only'}>Summary</dt>
            <dd className={'overflow-auto'}>
              {summary}
            </dd>
        </div>}
      </div>
      {image &&
      <div className={'hidden md:block'}>
          <dt className={'sr-only'}>Summary</dt>
          <dd>
              <img alt={image} src={image} className={'bg-contain'}/>
          </dd>
      </div>}
    </dl>
  )
}