import MarkdownToc from 'markdown-toc-unlazy'
import uslug from 'uslug'
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import unified from "unified";
import remarkMath from "remark-math";
import remarkSlug from "remark-slug";
import rehypeKatex from "rehype-katex";
import remarkPrism from "remark-prism";

export async function markdownToHTML(content: string) {
  const res = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkMath)
    .use(remarkPrism, {
      plugins: [
        'autolinker',
        'command-line',
        'data-uri-highlight',
        'diff-highlight',
        'inline-color',
        'keep-markup',
        'line-numbers',
        'show-invisibles',
        'treeview',
      ]
    })
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content)
  return res.contents.toString()
}

export async function extractMarkdownToc(content: string) {
  const toc = MarkdownToc(content, {
    slugify: uslug,
    maxdepth: 2,
    firsth1: false,
  });
  return markdownToHTML(toc.content);
}