import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NotFoundView } from '../src/components/404';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, []);

  return <NotFoundView/>;
};

export default Page;