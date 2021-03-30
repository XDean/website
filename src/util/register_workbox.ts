import {Workbox} from 'workbox-window'

export function register(
  {
    sw = '/sw.js',
    scope = '/',
    start_url = '/',
  }: {
    sw: string,
    scope: string,
    start_url: string,
  }) {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    // @ts-ignore
    (window as any).workbox = new Workbox(sw, {scope: scope})

    (window as any).workbox.addEventListener('activated', function (event) {
      if (!event.isUpdate) {
        caches.keys().then(function (c) {
          if (!c.includes('start-url')) {
            fetch(start_url)
          }
        })
      }
    })
    (window as any).workbox.register()
  }
}