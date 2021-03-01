import {fs} from '../deps.ts'
import * as etc from "../etc/mod.ts";
import {MarkdownInfo, readMarkdownInfo} from "../utils/md.tsx";

let infos: MarkdownInfo[] = []

export async function reloadInfos() {
  infos = []
  const posts = scanPosts(etc.Global.posts.dir)
  for await (let post of posts) {
    infos.push(await readMarkdownInfo(post))
  }
  // from new to old
  infos.sort((a, b) => b.created.getTime() - a.created.getTime())
}

export function getInfo(file: string): MarkdownInfo | undefined {
  return infos.find(info => info.path == file)
}

export function getInfos(size: number, page: number): MarkdownInfo[] {
  const start = Math.min(size * page, infos.length);
  const end = Math.min(size * (page + 1), infos.length);
  return infos.slice(start, end)
}

export async function watch() {

}

function reloadInfo(file: string) {

}

export async function* scanPosts(folder: string) {
  for await (const entry of fs.walk(folder, {
    includeDirs: false,
    exts: ['.md'],
  })) {
    yield entry.path
  }
}