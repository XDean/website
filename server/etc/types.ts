export type Config = {
  port: number
  posts: {
    dir: string
  }
  static:{
    serve:boolean
    dir: string
  }
}