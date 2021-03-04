import {fs} from '../deps.ts'
import {MarkdownInfo, readMarkdownInfo} from "./md.ts";

let infos: MarkdownInfo[] = []

export async function generateInfoMetas() {
  infos = []
  const posts = scanPosts('posts')
  for await (let post of posts) {
    infos.push(await readMarkdownInfo(post))
  }
  infos.sort((a, b) => b.created.getTime() - a.created.getTime())
  await Deno.writeTextFile('posts/meta.json', JSON.stringify(infos))
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