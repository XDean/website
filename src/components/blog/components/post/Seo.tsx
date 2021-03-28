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
        url: window.location.href,
        images: [{
          url: new URL(meta.image, window.location.href).toString(),
        }],
        article: {
          authors: [meta.author],
          publishedTime: meta.created,
          modifiedTime: meta.updated,
          tags: meta.tags,
          section: meta.categories.length > 0 ? meta.categories[0] : '',
        },
      }}
    />
  )
}