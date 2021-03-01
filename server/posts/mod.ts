import {reloadInfos} from "./service.ts";
import * as etc from '../etc/mod.ts'
import {readMarkdownInfo} from "../utils/md.tsx";

export async function init() {
  await reloadInfos();
}
