import {Marked, DOMParser, path} from '../deps.ts'
import {getGitLog} from "./git.ts";

export type MarkdownInfo = {
  path: string
  title: string
  summary: string
  image: string
  created: Date | string
  updated: Date | string
  author: string
  contributors: string[]
  categories: string[]
  tags: string[]
  [key: string]: any
}

export async function readMarkdownInfo(file: string): Promise<MarkdownInfo> {
  const decoder = new TextDecoder("utf-8")
  const markdown = decoder.decode(await Deno.readFile(file))

  const mdResult = Marked.parse(markdown)
  const doc = new DOMParser().parseFromString(mdResult.content, 'text/html')!

  const title = doc.querySelector('h1')?.textContent || path.basename(file)
  const image = doc.querySelector('img')?.getAttribute('src') || ""

  const maxLine = 5;
  const maxLen = 1024;
  const paragraphs = doc.querySelectorAll('p');
  const lines: string[] = [];
  let leftLength = maxLen;
  for (let paragraph of paragraphs) {
    let line = paragraph.textContent.trim();
    if (line.length == 0) {
      continue
    }
    if (line.length > leftLength) {
      line = line.substring(0, leftLength);
    }
    lines.push(line);
    leftLength -= line.length;
    if (lines.length >= maxLine || leftLength == 0) {
      break
    }
  }
  const summary = lines.join("\n")
  const gitLog = await getGitLog(file);

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
    ...mdResult.meta,
  }
}