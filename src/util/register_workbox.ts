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
    const wb = new Workbox(sw, {scope: scope})
    wb.register()
  }
}