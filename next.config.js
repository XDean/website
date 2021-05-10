const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const prod = process.env.NODE_ENV === 'production'

// const withPWA = require('./build/pwa')
// there is a bug for vercel, above require will fail
const path = require('path')
const fs = require('fs')
const globby = require('globby')
const crypto = require('crypto')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const getRevision = file => crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex')

const defaultCache = [
  // if you are customizing your runtime cache rules, please note that the
  // first item in the runtime cache configuration array MUST be "start-url"
  {
    // MUST be the same as "start_url" in manifest.json
    urlPattern: '/',
    // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
    // use StaleWhileRevalidate if you want to prompt user to reload when new version available
    handler: 'NetworkFirst',
    options: {
      // don't change cache name
      cacheName: 'start-url',
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
      }
    }
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\/api\/.*$/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'apis',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      },
      networkTimeoutSeconds: 10 // fall back to cache if api does not response within 10 seconds
    }
  },
  {
    urlPattern: /.*/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'others',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      },
      networkTimeoutSeconds: 10
    }
  }
]

const withPWA = (pwa) => (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config, options) {
    const {
      buildId,
      dev,
      config: {distDir = '.next'}
    } = options

    // For workbox configurations:
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
    const {
      publicIncludes = ['**/*'],
      disable = false,
      register = false,
      dest = distDir,
      sw = 'sw.js',
      subdomainPrefix = '',
      scope = '/',
      additionalManifestEntries = [],
      ignoreURLParametersMatching = [],
      importScripts = [],
      publicExcludes = [],
      buildExcludes = [],
      manifestTransforms = [],
      modifyURLPrefix = {},
      ...workbox
    } = pwa

    let {runtimeCaching = defaultCache} = pwa

    if (typeof nextConfig.webpack === 'function') {
      config = nextConfig.webpack(config, options)
    }

    if (disable) {
      options.isServer && console.log('> [PWA] PWA support is disabled')
      return config
    }

    console.log(`> [PWA] Compile ${options.isServer ? 'server' : 'client (static)'}`)

    if (!options.isServer) {
      if (dev) {
        console.log(
          '> [PWA] Build in develop mode, cache and precache are mostly disabled. This means offline support is disabled, but you can continue developing other functions in service worker.'
        )
      }

      const _dest = path.join(options.dir, dest)

      console.log(`> [PWA] Service worker: ${path.join(_dest, sw)}`)
      console.log(`> [PWA]   url: ${path.posix.join(subdomainPrefix, sw)}`)
      console.log(`> [PWA]   scope: ${path.posix.join(subdomainPrefix, scope)}`)

      config.plugins.push(
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [
            path.join(_dest, '**', 'workbox-*.js'),
            path.join(_dest, '**', 'workbox-*.js.map'),
            path.join(_dest, '**', sw),
            path.join(_dest, '**', `${sw}.map`)
          ]
        })
      )

      // precache files in public folder
      const manifestEntries = [...additionalManifestEntries]
      manifestEntries.push(...globby
        .sync(
          [
            ...publicIncludes,
            '!workbox-*.js',
            '!workbox-*.js.map',
            '!worker-*.js',
            '!worker-*.js.map',
            '!fallback-*.js',
            '!fallback-*.js.map',
            `!${sw.replace(/^\/+/, '')}`,
            `!${sw.replace(/^\/+/, '')}.map`,
            ...publicExcludes
          ],
          {
            cwd: 'public'
          }
        )
        .map(f => ({
          url: path.posix.join(subdomainPrefix, `/${f}`),
          revision: getRevision(`public/${f}`)
        })))

      const prefix = config.output.publicPath ? `${config.output.publicPath}static/` : 'static/'
      const workboxCommon = {
        swDest: path.join(_dest, sw),
        additionalManifestEntries: dev ? [] : manifestEntries,
        exclude: [
          ({asset}) => {
            if (asset.name.match(/^(build-manifest\.json|react-loadable-manifest\.json)$/)) {
              return true
            }
            return dev && !asset.name.startsWith('static/runtime/');
          },
          ...buildExcludes
        ],
        modifyURLPrefix: {
          ...modifyURLPrefix,
          [prefix]: path.posix.join(subdomainPrefix, '/_next/static/')
        },
        manifestTransforms: [
          ...manifestTransforms,
          async (manifestEntries) => {
            const manifest = manifestEntries.map(m => {
              m.url = m.url.replace(/\/\[/g, '/%5B').replace(/]/g, '%5D')
              m.revision = buildId
              return m
            })
            return {manifest, warnings: []}
          }
        ]
      }

      if (workbox.swSrc) {
        const swSrc = path.join(options.dir, workbox.swSrc)
        console.log('> [PWA] Inject manifest in', swSrc)
        config.plugins.push(
          new WorkboxPlugin.InjectManifest({
            ...workboxCommon,
            ...workbox,
            swSrc
          })
        )
      } else {
        if (dev) {
          ignoreURLParametersMatching.push(/ts/)
        }

        config.plugins.push(
          new WorkboxPlugin.GenerateSW({
            ...workboxCommon,
            ignoreURLParametersMatching,
            importScripts,
            ...workbox,
            runtimeCaching: dev
              ? [
                {
                  urlPattern: /.*/i,
                  handler: 'NetworkOnly',
                  options: {
                    cacheName: 'dev'
                  }
                }
              ]
              : runtimeCaching
          })
        )
      }
    }

    return config
  }
})


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
  [withPWA({
    disable: !prod,
    dest: 'public',
    sw: '/tools/guobiao-sw.js',
    publicIncludes: ['tools/guobiao/**/*'],
    navigateFallback: '/tools/guobiao',
    additionalManifestEntries: ['/tools/guobiao'],
  })],
  [withPWA({
    disable: !prod,
    dest: 'public',
    sw: '/tools/wereword-sw.js',
    publicIncludes: ['tools/wereword/**/*'],
    navigateFallback: '/tools/wereword',
    additionalManifestEntries: ['/tools/wereword'],
  })],
  {
    pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
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