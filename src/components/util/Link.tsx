import NextLink from "next/link";
import {Link} from "@material-ui/core";
import {LinkProps} from "next/dist/client/link";
import {LinkBaseProps} from "@material-ui/core/Link/Link";
import {PropsWithChildren} from "react";

export type MyLinkProps = {
  href: string
  next?: LinkProps
} & Partial<LinkBaseProps>

export const MyLink = ({href, next, children, ...rest}: PropsWithChildren<MyLinkProps>) => {
  return (
    <NextLink {...next} href={href}>
      <Link color={"inherit"} {...rest} style={{cursor: 'pointer', ...rest?.style}} href={href}>
        {children}
      </Link>
    </NextLink>
  )
}