const withPlugins = require('next-compose-plugins');
const withPWA = require('./build/pwa/index')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const prod = process.env.NODE_ENV === 'production'

module.exports = withPlugins([
  [withBundleAnalyzer],
  [withPWA({
    disable: !prod,
    dest: 'public',
    sw: '/tools/guobiao/sw.js',
    publicIncludes: ['tools/guobiao/**/*'],
  })],
  [withPWA({
    disable: !prod,
    dest: 'public',
    sw: '/tools/wereword/sw.js',
    publicIncludes: ['tools/wereword/**/*'],
  })],
  {
    future: {webpack5: true,},
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/blog',
        },
        {
          source: '/blog',
          destination: '/blog/page/1',
        },
        {
          source: '/blog/archives/:type/:name',
          destination: '/blog/archives/:type/:name/1',
        },
      ]
    },
  }
])