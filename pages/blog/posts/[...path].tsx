import {GetStaticPaths, GetStaticProps} from 'next'
import {useEffect, useMemo} from "react";
import {useRouter} from "next/router";

const Post = () => {
  const router = useRouter()
  const newUrl = useMemo(() => {
    if (router.isReady) {
      const blogPath = router.asPath.substring('blog/posts/'.length)
      let newUrl = `https://blog.xdean.cn/posts/${blogPath}`
      if (newUrl.endsWith('/index')) {
        newUrl = newUrl.substring(0, newUrl.length - 6)
      }
      return newUrl
    }
    return ''
  }, [router])

  useEffect(() => {
    if (!!newUrl) {
      window.location.href = newUrl
    }
  }, [newUrl])

  return (
    <div className={'text-center'}>
      <div>
        博客已重构，将自动重定向到新页面
      </div>
      {newUrl && (
        <div>
          如未自动跳转，请点击：<a className={'link'} href={newUrl}>{newUrl}</a>
        </div>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}


export default Post