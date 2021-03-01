import {Config} from "./types.ts";

export const Default: Config = {
  port: 9010,
  posts: {
    dir: 'posts'
  },
  static: {
    serve: true,
    dir: "web/static",
  },
}