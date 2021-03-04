import {datetime, md, dom, path} from '../deps.ts'
import {getGitLog} from "./git.ts";

export type MarkdownInfo = {
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

export async function readMarkdownInfo(file: string): Promise<MarkdownInfo> {
  const decoder = new TextDecoder("utf-8")
  const markdown = decoder.decode(await Deno.readFile(file))

  const mdResult = md.Marked.parse(markdown)
  const doc = new dom.DOMParser().parseFromString(mdResult.content, 'text/html')!

  const title = doc.querySelector('h1')?.textContent || path.basename(file)
  const image = doc.querySelector('img')?.getAttribute('src') || ""

  const maxLine = 5;
  const maxLen = 512;
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
    path: file,
    title,
    summary,
    image,
    author: gitLog.author || "",
    contributors: gitLog.contributors,
    created: gitLog.date || "",
    updated: gitLog.date || "",
    tags: [],
    categories: [],
    ...meta,
  }
}