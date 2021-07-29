import NextLink from "next/link";
import {LinkProps} from "next/dist/client/link";
import {AnchorHTMLAttributes, DetailedHTMLProps, PropsWithChildren} from "react";
import clsx from "clsx";

export type MyLinkProps = {
  href: string
  next?: Omit<LinkProps, 'href'> | false
} & Partial<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>

export const MyLink = ({href, next, children, ...rest}: PropsWithChildren<MyLinkProps>) => {
  const {className, ...aProps} = rest
  const Link = (
    <a className={clsx(`cursor-pointer hover:underline`, className)} href={href} {...aProps}>
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