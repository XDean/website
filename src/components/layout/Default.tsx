import {PropsWithChildren} from "react";
import {HeaderView} from "../Header";
import {FooterView} from "../Footer";

export const DefaultLayout = ({children}: PropsWithChildren<{}>) => {
  return (
    <>
      <div className={'flex flex-col w-full min-h-screen font-sans text-text bg-bg'}>
        <div className={'z-50 sticky top-0 w-full mb-3 md:mb-6'}>
          <HeaderView/>
        </div>
        <main className={"flex relative w-full m-w-max flex-grow flex-row justify-around bg-bg"}>
          {children}
        </main>
        <div className={'mt-2 mx-auto mb-8 w-10/12 border-t text-center'}>
          <FooterView/>
        </div>
      </div>
    </>
  )
}