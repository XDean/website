import {dom, md, path, slash} from '../deps.ts'
import {getGitLog} from "./git.ts";
import {PostMeta} from "../../posts/domain.ts"


export async function readPostMeta(file: string): Promise<PostMeta> {
  const decoder = new TextDecoder("utf-8")
  const markdown = decoder.decode(await Deno.readFile(file))

  const mdResult = md.Marked.parse(markdown)
  const doc = new dom.DOMParser().parseFromString(mdResult.content, 'text/html')!

  const title = doc.querySelector('h1')?.textContent || ''
  const image = doc.querySelector('img')?.getAttribute('src') || ""

  const maxLine = 5;
  const maxLen = 300;
  const paragraphs = doc.querySelectorAll('p');
  const summary: string[] = [];
  let leftLength = maxLen;
  for (let paragraph of paragraphs) {
    let line = paragraph.textContent?.trim() || "";
    if (line.length == 0) {
      continue
    }
    if (line.length > leftLength) {
      line = line.substring(0, leftLength);
    }
    summary.push(line);
    leftLength -= line.length;
    if (summary.length >= maxLine || leftLength == 0) {
      break
    }
  }
  const gitLog = await getGitLog(file)

  const meta = mdResult.meta
  if ('date' in meta) {
    meta.created = meta.date
  }

  return {
    path: slash(file),
    link: pathToLink(file),
    title,
    summary,
    image,
    author: gitLog.author || "",
    contributors: gitLog.contributors,
    created: gitLog.date.toString() || "",
    updated: gitLog.updated?.toString() || "",
    tags: [],
    categories: [],
    ...meta,
  }
}

function pathToLink(file: string) {
  file = slash(file)
  if (file.startsWith('public/')) {
    file = file.substring('public/'.length)
  }
  const ext = path.extname(file)
  if (ext === '.md') {
    file = file.substring(0, file.length - 3)
  }
  return '/' + slash(file)
}