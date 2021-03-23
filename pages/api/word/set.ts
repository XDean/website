import type { NextApiRequest, NextApiResponse } from 'next'
import {promises as fs} from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await fs.readFile('assets/words/meta.json', 'utf-8'))
}