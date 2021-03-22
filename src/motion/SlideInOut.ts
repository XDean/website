import {MotionProps} from "framer-motion";

export const SlideInOut: MotionProps = {
  initial: {
    x: '100%',
  },
  animate: {
    x: '0',
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}