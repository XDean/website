import React from "react";

export const GithubComment = () => {
  return <div dangerouslySetInnerHTML={{
    __html: `<script src="https://utteranc.es/client.js"
                  repo="XDean/blog-comment"
                  issue-term="pathname"
                  label="comment"
                  theme="github-light"
                  crossOrigin="anonymous"
                  async>
          </script>`
  }}/>
}