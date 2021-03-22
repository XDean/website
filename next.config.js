const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
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
})