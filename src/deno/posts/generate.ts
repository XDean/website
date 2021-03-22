import {fs} from '../deps.ts'
import {readPostMeta} from "./meta.ts";
import {PostMeta} from "../../posts/domain.ts";

let infos: PostMeta[] = []

export async function generateInfoMetas() {
  infos = []
  const posts = scanPosts('public/blog/posts')
  for await (let post of posts) {
    infos.push(await readPostMeta(post))
  }
  infos.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
  await Deno.writeTextFile('public/blog/meta.json', JSON.stringify(infos, null, '\t'))
  console.log('generate meta.json success')
}

async function* scanPosts(folder: string) {
  for await (const entry of fs.walk(folder, {
    includeDirs: false,
    exts: ['.md'],
  })) {
    yield entry.path
  }
}

if (import.meta.main) {
  generateInfoMetas()
}