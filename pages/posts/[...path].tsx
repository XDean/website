import {GetStaticPaths, GetStaticProps} from 'next'
import {promises as fs} from "fs";
import path from "path";
import {walkFiles} from "../../util/util";

const Post = (props) => {
  console.log('hah', props)
  return (
    <div>
      {props.toString()}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  return {
    props: {},
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = await walkFiles(postsDir, {ext: ['md']})
  const paths = []
  for await (const f of filenames) {
    paths.push({params: {path: f}})
  }
  console.log(paths)
  return {
    paths: paths,
    fallback: false,
  }
}


export default Post