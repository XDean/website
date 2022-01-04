import {useEffect} from 'react';

// backward compatibility
const newUrl = 'https://tool.xdean.cn/tool/guobiao';
const Page = () => {

  useEffect(() => {
    window.location.href = newUrl;
  }, []);

  return (
    <div className={'text-center'}>
      <div>
        域名换了，将自动重定向到新页面
      </div>
      <div>
        如未自动跳转，请点击：<a className={'link'} href={newUrl}>这里</a>
      </div>
    </div>
  );
};

export default Page;