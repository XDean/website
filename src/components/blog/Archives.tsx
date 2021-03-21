import {PostMetaGroup, PostMetaGroupType} from "../../posts/domain";
import {BlogHeaderView} from "./Header";
import {Breadcrumbs, Typography} from "@material-ui/core";
import {MyLink} from "../util/Link";
import {OpacityInOut} from "../../motion/OpacityInOut";
import { motion } from "framer-motion";

type Props = {
  type: PostMetaGroupType
  groups: PostMetaGroup[]
}

export const ArchivesView = (props: Props) => {
  const label = typeToLabel(props.type)
  return (
    <motion.div className={'w-11/12 max-w-screen-lg'} {...OpacityInOut}>
      <div className={'mb-4'}>
        <BlogHeaderView/>
      </div>
      <Typography variant={"h4"}>
        所有{label}
      </Typography>
      <ul className={'list-disc pl-8'}>
        {props.groups.map(e => (
          <li key={e.name} style={{fontSize: '1.5rem'}}>
            <MyLink href={`${props.type}/${e.name}`}>
              <Typography variant={"body1"} style={{fontSize: '1.5rem'}} component={'span'}>
                {e.name} ({e.count})
              </Typography>
            </MyLink>
          </li>
        ))}
      </ul>
    </motion.div>
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