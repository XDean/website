import {useMemo} from 'react';
import {useRouter} from 'next/router';
import {Redirect} from '../../../common/components/Redirect';

const Post = () => {
  const router = useRouter();
  const newURL = useMemo(() => {
    if (router.isReady) {
      const blogPath = router.asPath.substring('blog/posts/'.length);
      let newUrl = `https://blog.xdean.cn/posts/${blogPath}`;
      if (newUrl.endsWith('/index')) {
        newUrl = newUrl.substring(0, newUrl.length - 6);
      }
      return newUrl;
    }
    return '';
  }, [router]);

  return (
    <div className={'h-[90vh] flex flex-col justify-center'}>
      {newURL && <Redirect url={newURL}
                           delay={3000}
                           text={'博客已经迁移到了新的域名'}
      />}
    </div>
  );
};


export default Post;