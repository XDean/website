module.exports = {
    trailingSlash: true,
    async redirects() {
        return [
            {
                source: '/blog/archives/:type/:name/',
                destination: '/blog/archives/:type/:name/1/',
            },
            {
                source: '/blog/',
                destination: '/blog/page/1/',
            },
        ]
    },
}