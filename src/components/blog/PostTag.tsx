import {Chip} from "@material-ui/core";
import {MyLink} from "../util/Link";
import {PostMetaGroupType} from "../../posts/domain";

export const PostTag = ({type, tag}: { type: PostMetaGroupType, tag: string }) => {
  return (
    <Chip label={
      <MyLink href={`/blog/archives/${type}/${tag}`}>
        {tag}
      </MyLink>
    }
          variant={"outlined"}
          size={"small"}
          style={{marginLeft: 5}}
          clickable/>
  )
}