import {Server, Flags} from "./deps.ts";

const args = Flags.parse(Deno.args);
console.log(args)
const server: Server.Server = Server.serve({
  port: 8000,
});

console.log("http://localhost:8000/");

for await (const request of server) {
  request.respond({
    body: `Hello World!!`,
  });
}