import {PostMetaGroup, PostMetaGroupType} from "../../posts/domain";
import {MyLink} from "../util/Link";
import {BlogLayout} from "./components/Layout";

type Props = {
  type: PostMetaGroupType
  groups: PostMetaGroup[]
}

export const ArchivesView = (props: Props) => {
  const label = typeToLabel(props.type)

  return (
    <BlogLayout title={`${label} - XDean的博客`}>
      <div className={'text-2xl md:text-3xl mb-2'}>
        所有{label}
      </div>
      <ul className={'list-disc pl-8'}>
        {props.groups.map(e => (
          <li key={e.name} className={'text-xl md:text-2xl'}>
            <MyLink href={`${props.type}/${e.name}`}>
              {e.name} ({e.count})
            </MyLink>
          </li>
        ))}
      </ul>
    </BlogLayout>
  )
}

export function typeToLabel(type: PostMetaGroupType) {
  switch (type) {
    case "year":
      return '年份';
    case "category":
      return '分类';
    case "tag":
      return '标签';
    default:
      return 'Unknown'
  }
}