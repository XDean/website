import {scanPosts} from "./scan.ts";
import * as etc from '../etc/mod.ts'

export async function init() {
  await reloadPosts()
}

export async function reloadPosts() {
  const posts = scanPosts(etc.Global.posts.dir)
  for await (let post of posts) {
    console.log(post)
  }
}