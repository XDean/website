import {Divider, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {Image} from "@material-ui/icons";
import {GithubComment} from "./util/GithubComment";

export const AboutView = () => {
  return (
    <div style={{minWidth: 900}}>
      <ReactMarkdown source={`
## 我是谁

- 许德安
- XDean @internet
- Software Engineer @ASML
- Coder
- Board Game Player
- Reed

## 联系方式 / 社交账号

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
                       image: props => <img {...props} style={{width: 32, marginRight: 10}}/>
                     }}
      />
      <GithubComment/>
    </div>
  )
}