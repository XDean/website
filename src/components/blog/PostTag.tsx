import {Chip} from "@material-ui/core";
import {MyLink} from "../util/Link";

export const PostTag = ({tag}: { tag: string }) => {
  return (
    <Chip label={
      <MyLink href={`/blog/archives/tag/${tag}`}>
        {tag}
      </MyLink>
    }
          variant={"outlined"}
          size={"small"}
          style={{marginLeft: 5}}
          clickable/>
  )
}