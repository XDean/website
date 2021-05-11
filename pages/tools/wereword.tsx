import {WerewordMain} from "../../src/components/tools/wereword/Main";
import {AppLayout} from "../../src/components/layout/AppLayout";

(WerewordMain as any).Layout = AppLayout({
  title: '狼人真言'
})

export default WerewordMain