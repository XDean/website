import {NextSeo} from "next-seo";
import React from "react";
import {PostMeta} from "../../../../posts/domain";

export const PostSEO = ({meta}: { meta: PostMeta }) => {
  if (typeof window === 'undefined') {
    return null
  }
  return (
    <NextSeo
      title={meta.title}
      description={meta.summary.join('\n')}
      openGraph={{
        type: 'article',
        locale: 'zh',
        title: meta.title,
        description: meta.summary.join('\n'),
        site_name: 'XDean的个人网站',
        url: window.location.href,
        images: [{
          url: new URL(meta.image, window.location.href).toString(),
        }]
      }}
    />
  )
}