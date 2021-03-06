import {PostMeta} from "../../posts/domain";
import {Card, CardContent, Typography} from "@material-ui/core";

type Props = {
  meta: PostMeta
}

export const PostCard = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="h5">
          {props.meta.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {props.meta.date}
        </Typography>
        <Typography variant="subtitle1" paragraph>
          {props.meta.description}
        </Typography>
      </CardContent>
    </Card>
  )
}