import {GuoBiaoMainView} from '../../src/components/tools/mahjong/guobiao/Main'
import {AppLayout} from "../../src/components/layout/AppLayout";

(GuoBiaoMainView as any).Layout = AppLayout({
  title: '国标麻将算番'
})

export default GuoBiaoMainView
