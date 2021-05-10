import {useState} from "react";
import clsx from "clsx";

type Props = {
  className?: string
}

export const Logo = (props: Props) => {
  const [logoHover, setLogoHover] = useState(false)
  return (
    <div
      className={clsx('bg-contain bg-no-repeat', props.className)}
      style={{backgroundImage: logoHover ? `url('/xd.webp')` : `url('/favicon.webp')`}}
      onMouseEnter={() => setLogoHover(true)}
      onMouseLeave={() => setLogoHover(false)}
    />
  )
}