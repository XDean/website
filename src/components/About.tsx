import {Divider, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {Image} from "@material-ui/icons";
import {GithubComment} from "./util/GithubComment";
import 'github-markdown-css/github-markdown.css'
import React from "react";
import clsx from "clsx";

export const AboutView = () => {
  return (
    <div style={{minWidth: 900}}>
      <ReactMarkdown className={'markdown-body'} source={`
## 我是谁

- 许德安
- XDean @internet
- Software Engineer @ASML
- Coder
- Board Game Player
- Reed

## 联系方式 / 社交账号

[![wechat](about/wechat.png)](/about/wechat-qr.jpg)
[![github](about/github.png)](https://github.com/XDean)
[![stackoverflow](about/stackoverflow.png)](https://stackoverflow.com/users/7803527/dean-xu)
[![qqmail](about/qqmail.png)](mailto:373216024@qq.com)
[![gmail](about/gmail.png)](mailto:xuda1107@gmail.com)

## Coding

### 语言

- Jave， 精通
- Typescript，熟练
- Golang，熟练
- Python，拒绝

### 技术

- Spring Boot/Quarkus
- React/Next
- Spark/PySpark

`}
                     renderers={{
                       image: props => <img {...props} className={'w-10 mr-2 inline'} alt={props.src}/>,
                       list: props => <ul className={clsx(props.ordered ? 'list-decimal' : 'list-disc')}>
                         {props.children}
                       </ul>
                     }}
      />
      <GithubComment/>
    </div>
  )
}