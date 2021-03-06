import {PostMeta} from "../../posts/domain";
import {Card, CardContent, CardMedia, Link, Typography} from "@material-ui/core";
import {compareAsc, format} from 'date-fns'
import {useMemo} from "react";
import NextLink from 'next/link'
import {useRouter} from "next/router";
import path from "path";
import {isURL} from "../../util/util";

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
    <Card style={{display: 'flex'}}>
      <CardContent style={{flexGrow: 2, width: 0}}>
        <NextLink href={props.meta.link}>
          <Link style={{cursor: 'pointer'}} color={"inherit"}>
            <Typography component="h2" variant="h5">
              {props.meta.title}
            </Typography>
          </Link>
        </NextLink>
        <Typography variant="subtitle1" color="textSecondary">
          {format(new Date(props.meta.created), 'yyyy-MM-dd')}
        </Typography>
        {summary && <Typography variant="subtitle1" paragraph>
          {summary}
        </Typography>}
      </CardContent>
      {image && <CardMedia image={image} style={{flexGrow: 1, width: 0}}/>}
    </Card>
  )
}