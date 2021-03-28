import {NextSeo} from "next-seo";
import {NextSeoProps} from "next-seo/lib/types";
import {useRouter} from "next/router";

export const MySeo = (props: NextSeoProps) => {
  const router = useRouter()

  const copy = JSON.parse(JSON.stringify(props)) as NextSeoProps
  const url = `https://xdean.cn${router.route}`
  const og = copy.openGraph;
  if (!!og) {
    if (!!og.url) {
      og.url = new URL(og.url, url).toString()
    } else {
      og.url = url
    }
    if (!!og.images) {
      og.images.forEach(im => {
        im.url = new URL(im.url, url).toString()
      })
    }
  }

  return (
    <NextSeo {...copy}/>
  )
}