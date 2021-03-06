import NextLink from "next/link";
import {CardContent, Link, Typography} from "@material-ui/core";
import {LinkProps} from "next/dist/client/link";
import {LinkBaseProps} from "@material-ui/core/Link/Link";
import {PropsWithChildren} from "react";

export type MyLinkProps = {
  href: string
  next?: LinkProps
  mui?: LinkBaseProps
}

export const MyLink = ({href, next, mui, children}: PropsWithChildren<MyLinkProps>) => {
  return (
    <NextLink {...next} href={href}>
      <Link color={"inherit"} {...mui} style={{cursor: 'pointer', ...mui?.style}}>
        {children}
      </Link>
    </NextLink>
  )
}