import {PageData} from "../../util/util";
import {PostMeta, PostMetaGroupType} from "../../posts/domain";
import {format} from "date-fns";
import {MyLink} from "../util/Link";
import {typeToLabel} from "./Archives";
import {MyPagination} from "../util/Pagination";
import {useCallback} from "react";
import {useRouter} from "next/router";
import {BlogLayout} from "./components/Layout";

type Props = {
  type: PostMetaGroupType
  name: string
  data: PageData<PostMeta>
}

export const ArchiveView = ({type, name, data}: Props) => {
  const typeLabel = typeToLabel(type)
  const router = useRouter()
  const onPageChange = useCallback((value: number) => {
    router.push(`/blog/archives/${type}/${name}/${value}`)
  }, [router])
  return (
    <BlogLayout title={`${typeLabel} ${name} - XDean的博客`}>
      <div className={'flex text-2xl md:text-3xl text-black'}>
        <MyLink href={`/blog/archives/${type}`} className={'text-2xl md:text-3xl'}>
          {typeToLabel(type)}
        </MyLink>
        <div className={'text-2xl md:text-3xl'}>
          &nbsp;/&nbsp;{name}
        </div>
      </div>
      <ul className={'list-disc pl-8 my-2'}>
        {data.data.map(e => {
          const date = new Date(e.created);
          return (
            <li key={e.path} className={'text-xl md:text-2xl'}>
              <MyLink href={e.link}>
                {format(date, 'yyyy-MM-dd')} - {e.title}
              </MyLink>
            </li>
          );
        })}
      </ul>
      <MyPagination data={data} onPageChange={onPageChange}/>
    </BlogLayout>
  )
}