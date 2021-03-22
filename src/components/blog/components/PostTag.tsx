import {MyLink} from "../../util/Link";
import {PostMetaGroupType} from "../../../posts/domain";
import clsx from "clsx";

export const PostTag = ({type, tag, className}: { type: PostMetaGroupType, tag: string, className?: string }) => {
  return (
    <div className={clsx('mx-1 rounded-xl border border-gray-300 bg-gray-100 px-1 hover:shadow-md', className)}>
      <MyLink href={`/blog/archives/${type}/${tag}`}>
        {tag}
      </MyLink>
    </div>
  )
}