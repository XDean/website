const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const prod = process.env.NODE_ENV === 'production'

module.exports = withPlugins([
  [withBundleAnalyzer],
  [withPWA, {
    pwa: {
      disable: !prod,
      dest: 'public'
    }
  }],
  {
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