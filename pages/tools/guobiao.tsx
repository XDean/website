import {Redirect} from '../../common/components/Redirect';

const Page = () => (
  <div className={'h-[90vh] flex flex-col justify-center'}>
    <Redirect url={'https://tool.xdean.cn/tool/guobiao'}
              delay={3000}
              text={'国标算番器已经迁移到了新的域名'}
    />
  </div>
);

export default Page;