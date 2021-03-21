import NextLink from "next/link";
import {LinkProps} from "next/dist/client/link";
import {LinkBaseProps} from "@material-ui/core/Link/Link";
import {PropsWithChildren} from "react";
import clsx from "clsx";

export type MyLinkProps = {
  href: string
  next?: LinkProps | false
} & Partial<LinkBaseProps>

export const MyLink = ({href, next, children, ...rest}: PropsWithChildren<MyLinkProps>) => {
  const Link = (
    <a className={clsx(`cursor-pointer hover:underline`, rest.className)} href={href}>
      {children}
    </a>
  )
  if (next === false) {
    return Link
  } else {
    return (
      <NextLink {...next} href={href}>
        {Link}
      </NextLink>
    )
  }
}