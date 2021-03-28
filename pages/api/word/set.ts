import type {NextApiRequest, NextApiResponse} from 'next'
import {WordSets} from "../../../src/components/tools/wereword/words";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(WordSets.map(v => ({id: v.id, name: v.name, default: v.default})))
}