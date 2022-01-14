const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([
  [withMDX({
      extension: /\.(md|mdx)$/,
      options: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    }
  )],
  [withBundleAnalyzer],
  {
    pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  }
]);