import React, {PropsWithChildren} from "react";
import {Logo} from "../util/Logo";
import {MyLink} from "../util/Link";

type Props = {
  title: React.ReactNode
}

export const AppLayout = (props: Props) => ({children}: PropsWithChildren<{}>) => {
  return (
    <>
      <div className={'flex flex-col w-full min-h-screen font-sans text-text bg-white'}>
        <div
          className={'relative flex flex-row items-center justify-center z-50 sticky top-0 w-full mb-3 md:mb-6 shadow-lg p-2 border-b-1 bg-white'}>
          <MyLink href={'/'}>
            <Logo className={'w-8 h-8 md:w-12 md:h-12 absolute left-3 top-2/4 -mt-4 md:-mt-6'}/>
          </MyLink>
          <div className={'text-center text-2xl md:text-4xl'}>
            {props.title}
          </div>
        </div>
        <main className={"flex relative w-full m-w-max flex-grow flex-row justify-around bg-bg"}>
          {children}
        </main>
      </div>
    </>
  )
}