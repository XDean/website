import {promises as fs} from "fs";
import path from "path";
import {options} from "colorette";

export async function* walkFiles(dir: string, options: {
  ext: string[]
} = {
  ext: []
}): AsyncIterableIterator<string[]> {
  const filenames = await fs.readdir(dir)
  for (const f of filenames) {
    const p = path.join(dir, f)
    const stat = await fs.lstat(p)
    if (stat.isFile()) {
      if (options.ext.length > 0) {
        const ext = path.extname(p)
        const match = options.ext.find(e => e === ext || '.' + e === ext)
        if (!match){
          continue
        }
      }
      yield [f]
    } else if (stat.isDirectory()) {
      for await (const sub of walkFiles(p, options)) {
        yield [f, ...sub]
      }
    }
  }
}