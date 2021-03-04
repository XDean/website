export type PostMeta = {
  path: string
  title: string
  summary: string[]
  image: string
  created: Date
  updated: Date
  author: string
  contributors: string[]
  categories: string[]
  tags: string[]
  [key: string]: any
}

export type PostMetaGroupType = 'year' | 'category' | 'tag'

export type PostMetaGroup = {
  name: string
  count: number
}