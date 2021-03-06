import {PostMeta} from "../../posts/domain";
import {PageData} from "../../util/util";
import {PostCard} from "./PostCard";
import {Pagination} from "@material-ui/lab";
import {useCallback} from "react";
import {useRouter} from "next/router";

type Props = {
  data: PageData<PostMeta>
}

export const PostsView = (props: Props) => {
  const page = props.data
  const router = useRouter()
  const onPageChange = useCallback((event, value: number) => {
    router.push(`/blog/page/${value}`)
  }, [])

  return (
    <>
      {page.data.map(m => (
        <div key={m.path} style={{marginBottom: 20}}>
          <PostCard key={m.path} meta={m}/>
        </div>
      ))}
      <Pagination count={page.total} color={"primary"} variant={"outlined"} page={page.page} onChange={onPageChange}
                  style={{width: 'fit-content', margin: '0 auto'}}/>
    </>
  )
}