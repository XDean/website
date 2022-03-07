import { GetStaticProps } from 'next';
import { PropsOf } from '../common/util/react';
import { Index } from '../src/page/Index';

export default Index;

export const getStaticProps: GetStaticProps<PropsOf<typeof Index>> = async () => {
  try {
    const res = await fetch(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${new Date().getHours() % 10}&n=1&mkt=zh-cn`);
    const json = await res.json();
    const url = json.images[0].url;
    const title = json.images[0].copyright || '';
    const link = json.images[0].copyrightlink || '';
    if (url) {
      return {
        props: {
          home: {
            img: {
              url: new URL(url, 'https://www.bing.com/').href,
              title,
              link,
            },
          },
        },
        revalidate: 3600,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      home: {
        img: {
          url: '',
          title: '',
          link: '',
        },
      },
    },
    revalidate: 3600,
  };
};