import ReactMarkdown from "react-markdown";
import {GithubComment} from "./util/GithubComment";
import 'github-markdown-css/github-markdown.css'
import React from "react";
import clsx from "clsx";
import {motion} from "framer-motion";
import {OpacityInOut} from "../motion/OpacityInOut";
import {MySeo} from "./util/Seo";

export const AboutView = () => {
  return (
    <motion.div className={'w-11/12 max-w-screen-lg my-4'} {...OpacityInOut}>
      <MySeo
        title={'关于我'}
        noindex={false}
        openGraph={{
          type: 'profile',
          images: [{
            url: '/icons/192.webp',
          }],
          profile: {
            firstName: 'Dean',
            lastName: 'Xu',
            username: 'XDean'
          }
        }}
      />
      <ReactMarkdown className={'markdown-body'} source={`
## 我是谁

- 许德安
- XDean @internet
- Software Engineer @ASML
- Coder
- Board Game Player
- Reed

## 联系方式 / 社交账号

[![wechat](about/wechat.webp)](/about/wechat-qr.webp)
[![github](about/github.webp)](https://github.com/XDean)
[![stackoverflow](about/stackoverflow.webp)](https://stackoverflow.com/users/7803527/dean-xu)
[![qqmail](about/qqmail.webp)](mailto:373216024@qq.com)
[![gmail](about/gmail.webp)](mailto:xuda1107@gmail.com)

## Coding

### 语言

- Jave， 精通
- Typescript，熟练
- Golang，熟练
- Python，拒绝

### 技术

- 后端 Spring/Quarkus/Node
- 前端 React(Next)
- 大数据 Spark

`}
                     renderers={{
                       image: props => <img {...props} className={'w-10 mr-2 inline'} alt={props.src}/>,
                       list: props => <ul className={clsx(props.ordered ? 'list-decimal' : 'list-disc')}>
                         {props.children}
                       </ul>,
                       link: props => <a rel={'noopener'} {...props}/>,
                     }}
      />
      <GithubComment/>
    </motion.div>
  )
}