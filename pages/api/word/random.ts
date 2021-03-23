import type {NextApiRequest, NextApiResponse} from 'next'
import {promises as fs} from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const set = singleToArray(req.query['set']).flatMap(s => s.split(','))
  const count = Number(req.query['count']) || 5
  const result = []
  if (set.length === 0) {
    set.push('easy')
  }
  for (let s of set) {
    try {
      const lines = (await fs.readFile(`assets/words/${s}.txt`, 'utf-8')).split('\n')
      result.push(...randomItem(lines, count))
    } catch (e) {
      return res.status(404).json({message: `no such word set '${s}'`})
    }
  }
  return res.status(200).json(randomItem(result, count))
}

function singleToArray<T>(e: T | T[]): T[] {
  if (!!e) {
    if (!(e instanceof Array)) {
      return [e]
    } else {
      return e
    }
  } else {
    return []
  }
}

function randomItem<T>(arr: T[], count: number = 1): T[] {
  const res = []
  const copy = [...arr]
  while (res.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    const e = copy[index]
    res.push(e)
    copy.splice(index, 1)
  }
  return res
}