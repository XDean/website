import {Default} from './default.ts'
import {path, deepmerge} from '../deps.ts'
import {Config} from "./types.ts";

export const Global = {...Default}

export async function loadConfigFiles(files: string[]) {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const p = path.join(Deno.cwd(), f);
    const mod = await import(`file://${p}`)
    loadConfig(mod.default)
  }
}

export function loadConfig(config: Partial<Config>) {
  deepmerge(Global, config)
}