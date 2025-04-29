/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies'

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

registerRoute(
  ({ request }: { request: Request }) =>
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style',
  new NetworkFirst({
    cacheName: 'assets-cache',
    networkTimeoutSeconds: 10,
    plugins: [],
  })
)

registerRoute(
  ({ request }: { request: Request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [],
  })
)

registerRoute(
  ({ url }: { url: URL }) => url.hostname.includes('api-game.bloque.app'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [],
  })
)
