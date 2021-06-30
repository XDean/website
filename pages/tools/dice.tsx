import {DiceMain} from "../../src/components/tools/dice/Main";
import {AppLayout} from "../../src/components/layout/AppLayout";

(DiceMain as any).Layout = AppLayout({
  title: '公平的骰子'
})

export default DiceMain