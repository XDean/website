import NextLink from "next/link";
import {LinkProps} from "next/dist/client/link";
import {LinkBaseProps} from "@material-ui/core/Link/Link";
import {PropsWithChildren} from "react";
import clsx from "clsx";

export type MyLinkProps = {
  href: string
  next?: LinkProps
} & Partial<LinkBaseProps>

export const MyLink = ({href, next, children, ...rest}: PropsWithChildren<MyLinkProps>) => {
  return (
    <NextLink {...next} href={href}>
      <a className={clsx(`cursor-pointer transition duration-300 hover:underline`, rest.className)} href={href}>
        {children}
      </a>
    </NextLink>
  )
}