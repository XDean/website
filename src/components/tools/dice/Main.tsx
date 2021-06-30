import React, {useEffect} from "react";
import {register} from "../../../util/register_workbox";
import {motion} from "framer-motion";
import {OpacityInOut} from "../../../motion/OpacityInOut";
import Head from "next/head";
import {MySeo} from "../../util/Seo";
import {Dice} from "./Dice";
import {FanView} from "../mahjong/guobiao/Fan";
import {GithubComment} from "../../util/GithubComment";

export const DiceMain = () => {

  useEffect(() => register({
    scope: '/tools/dice',
    start_url: '/tools/dice',
    sw: '/tools/dice-sw.js',
  }), [])

  return (
    <motion.div className={'w-max max-w-screen-lg'} {...OpacityInOut}>
      <Head>
        <link rel='manifest' href='/tools/dice/manifest.json'/>
      </Head>
      <MySeo
        title={'公平的骰子'}
        description={'公平的骰子'}
        noindex={false}
        openGraph={{
          type: 'website',
          images: [{
            url: '/tools/dice/logo_192.webp',
            width: 192,
            height: 192,
          }],
        }}
      />
      <Dice/>
      <hr className={'mt-4'}/>
      <GithubComment/>
    </motion.div>
  )
}