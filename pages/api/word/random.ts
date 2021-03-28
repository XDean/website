import type {NextApiRequest, NextApiResponse} from 'next'
import {WordSets} from "../../../src/components/tools/wereword/words";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let sets = singleToArray(req.query['set'])
    .flatMap(s => s.split(','))
    .map(s => WordSets.find(ws => ws.id === s))
    .filter(s => !!s)
  const count = Number(req.query['count']) || 5
  const result = []
  if (sets.length === 0) {
    sets = WordSets.filter(s => s.default)
  }
  for (let set of sets) {
    try {
      result.push(...randomItem(set.words, count))
    } catch (e) {
      return res.status(404).json({message: `no such word set '${set.id}'`})
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