import {motion} from 'framer-motion';
import Head from 'next/head'
import {MyLink} from "../util/Link";
import {OpacityInOut} from "../../motion/OpacityInOut";

export const ToolsView = () => {
  return (
    <motion.div {...OpacityInOut}>
      <Head>
        <title>工具箱 - XDean</title>
      </Head>
      <div className={'text-3xl my-4'}>
        XDean的工具箱
      </div>
      <ul className={'list-disc'}>
        <li>
          <MyLink href={'/tools/guobiao'}>
            国标麻将算番器
          </MyLink>
        </li>
        <li>
          <MyLink href={'/tools/werewords.tsx'}>
            狼人真言
          </MyLink>
        </li>
      </ul>
    </motion.div>
  )
}