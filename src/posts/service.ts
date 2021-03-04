import {PostMeta} from "./meta";
import {promises as fs} from "fs";
import path from "path";

export async function getPostMetas(): Promise<PostMeta[]> {
  const raw = await fs.readFile(path.join(process.cwd(), 'posts', 'meta.json'), 'utf-8')
  return JSON.parse(raw) as PostMeta[]
}

export async function getPostMeta(p: string): Promise<PostMeta> {
  const metas = await getPostMetas()
  return metas.find(m => path.normalize(p)===path.normalize(m.path))
}