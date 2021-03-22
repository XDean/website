import {MyLink} from "../../util/Link";
import {PostMetaGroupType} from "../../../posts/domain";

export const PostTag = ({type, tag}: { type: PostMetaGroupType, tag: string }) => {
  return (
    <div className={'mx-1 rounded-xl border border-gray-300 bg-gray-100 px-1 hover:shadow-md'}>
      <MyLink href={`/blog/archives/${type}/${tag}`}>
        {tag}
      </MyLink>
    </div>
  )
}