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
          url: '/bg.jpeg',
          title: '雷尼尔山上空的银河星系，美国华盛顿州 (© Brad Goldpaint/Cavan)',
          link: 'https://www.bing.com/search?q=%E9%9B%B7%E5%B0%BC%E5%B0%94%E5%B1%B1&form=hpcapt&mkt=zh-cn',
        },
      },
    },
    revalidate: 3600,
  };
};