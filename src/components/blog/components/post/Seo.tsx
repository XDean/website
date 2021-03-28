import React from "react";
import {PostMeta} from "../../../../posts/domain";
import {MySeo} from "../../../util/Seo";

export const PostSEO = ({meta}: { meta: PostMeta }) => {
  return (
    <MySeo
      title={meta.title}
      description={meta.summary.join('\n')}
      noindex={false}
      openGraph={{
        type: 'article',
        images: [{
          url: meta.image,
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