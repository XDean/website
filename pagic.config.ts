import {PagicConfig} from './_deps.ts'

export default {
  srcDir: 'src',
  theme: 'blog',

  title: 'XDean的博客',

  plugins: ['blog'],
  blog: {
    root: '/posts',
    social: {
      github: 'xdean/blog-pagic',
      email: 'dean.xu@asml.com',
    },
  },
  nav: [
    {
      text: '首页',
      link: '/index.html',
      icon: 'czs-home-l',
    },
    {
      text: '分类',
      link: '/categories/index.html',
      icon: 'czs-category-l',
    },
    {
      text: '标签',
      link: '/tags/index.html',
      icon: 'czs-tag-l',
    },
    {
      text: '关于',
      link: '/about/index.html',
      icon: 'czs-about-l',
    },
    {
      text: '归档',
      link: '/archives/index.html',
      icon: 'czs-box-l',
    },
  ]
} as PagicConfig;
