module.exports = {
    siteUrl: process.env.SITE_URL || 'https://xdean.cn',
    generateRobotsTxt: true,
    exclude:[
        '/tools',
        '/blog/page/*',
        '/blog/archives/*',
    ]
}