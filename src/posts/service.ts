import {PostMeta, PostMetaGroup, PostMetaGroupType} from "./domain";
import {promises as fs} from "fs";
import path from "path";

let global: PostMeta[] = []

export async function getPostMetas(): Promise<PostMeta[]> {
  if (global.length === 0) {
    const raw = await fs.readFile(path.join(process.cwd(), 'public', 'blog', 'meta.json'), 'utf-8')
    global = JSON.parse(raw) as PostMeta[]
  }
  return global
}

export async function getPostMetaByLink(link: string): Promise<PostMeta> {
  const metas = await getPostMetas()
  return metas.find(m => path.normalize(link) === path.normalize(m.link))
}

export async function getPostMetaByPath(p: string): Promise<PostMeta> {
  const metas = await getPostMetas()
  return metas.find(m => path.normalize(p) === path.normalize(m.path))
}

export async function getPostMetaRel(meta: PostMeta, rel: string): Promise<PostMeta> {
  const p = path.join(path.dirname(meta.path), rel)
  return getPostMetaByPath(p)
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

export async function getPostByGroup(type: PostMetaGroupType, value: string) {
  switch (type) {
    case "year":
      return getByYear(value)
    case "category":
      return getByCategory(value)
    case "tag":
      return getByTag(value)
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
    const year = new Date(meta.created).getFullYear()
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

export async function getByCategory(c: string) {
  const metas = await getPostMetas()
  return metas.filter(m => m.categories.includes(c))
}

export async function getByTag(t: string) {
  const metas = await getPostMetas()
  return metas.filter(m => m.tags.includes(t))
}

export async function getByYear(year: string) {
  const metas = await getPostMetas()
  return metas.filter(m => new Date(m.created).getFullYear().toString() === year)
}