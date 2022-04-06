import Head from 'next/head';
import { Redirect } from '../../common/components/Redirect';

const Page = () => (
  <div className={'h-[90vh] flex flex-col justify-center'}>
    <Head>
      <title>国标麻将算番器 正在跳转</title>
    </Head>
    <Redirect url={'https://tool.xdean.cn/tool/guobiao'}
              delay={3000}
              text={'国标算番器已经迁移到了新的域名'}
    />
  </div>
);

export default Page;