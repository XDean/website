import {PostMetaGroup, PostMeta, PostMetaGroupType} from "./domain";
import {promises as fs} from "fs";
import path from "path";

export async function getPostMetas(): Promise<PostMeta[]> {
  const raw = await fs.readFile(path.join(process.cwd(), 'posts', 'meta.json'), 'utf-8')
  return JSON.parse(raw) as PostMeta[]
}

export async function getPostMeta(p: string): Promise<PostMeta> {
  const metas = await getPostMetas()
  return metas.find(m => path.normalize(p) === path.normalize(m.path))
}

export async function getPostMetaGroup(type: PostMetaGroupType) {
  switch (type) {
    case "year":
      return groupByYear()
    case "category":
      return groupByCategory()
    case "tag":
      return groupByTag()
  }
}

async function groupByCategory(): Promise<PostMetaGroup[]> {
  const metas = await getPostMetas()
  const categories: PostMetaGroup[] = []
  for (const meta of metas) {
    for (const category of meta.categories) {
      const find = categories.find(c => c.name === category)
      if (find) {
        find.count++
      } else {
        categories.push({
          name: category,
          count: 1,
        })
      }
    }
  }
  return categories
}

async function groupByTag(): Promise<PostMetaGroup[]> {
  const metas = await getPostMetas()
  const tags: PostMetaGroup[] = []
  for (const meta of metas) {
    for (const tag of meta.tags) {
      const find = tags.find(c => c.name === tag)
      if (find) {
        find.count++
      } else {
        tags.push({
          name: tag,
          count: 1,
        })
      }
    }
  }
  return tags
}

export async function groupByYear(): Promise<PostMetaGroup[]> {
  const metas = await getPostMetas()
  const tags: PostMetaGroup[] = []
  for (const meta of metas) {
    const year = meta.created.getFullYear()
    const find = tags.find(c => c.name === year.toString())
    if (find) {
      find.count++
    } else {
      tags.push({
        name: year.toString(),
        count: 1,
      })
    }
  }
  return tags
}