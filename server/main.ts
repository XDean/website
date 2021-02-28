import {Command} from "./deps.ts";
import * as etc from "./etc/mod.ts";
import * as posts from "./posts/mod.ts";
import {runServer} from "./server.ts";

type Options = {
  port: number
  configs: string[]
}

const {options} = await new Command<Options>()
  .name("xdean-blog")
  .version("0.1.0")
  .description("XDean Blog Backend")
  .option('-p, --port <port:number>', 'Port Number', {default: etc.Default.port})
  .option("-f, --configs <configs:string[]>", "comma separated list of config files", {default: []})
  .parse(Deno.args);

etc.loadConfig({
  port: options.port,
})

await etc.loadConfigFiles(options.configs)

console.log('config loaded')

await posts.init()

runServer()