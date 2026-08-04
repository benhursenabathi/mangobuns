import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const STATIC_PAGE_ROUTES = new Set([
  '/switchy/compare/',
  '/switchy/blog/',
  '/switchy/blog/how-to-switch-magic-keyboard-between-macs/',
  '/switchy/blog/magic-keyboard-pairing-mode/',
  '/switchy/blog/magic-keyboard-multiple-devices/',
  '/switchy/blog/universal-control-vs-switching-devices/',
  '/switchy/blog/kvm-switch-for-two-macs/',
  '/switchy/blog/one-keyboard-mouse-mac-mini-macbook/',
  '/switchy/privacy/',
])

function staticPageRoutes() {
  return {
    name: 'switchy-static-page-routes',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const requestUrl = request.url || ''
        const queryStart = requestUrl.indexOf('?')
        const pathname = queryStart === -1 ? requestUrl : requestUrl.slice(0, queryStart)

        const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`

        if (STATIC_PAGE_ROUTES.has(normalizedPathname)) {
          const query = queryStart === -1 ? '' : requestUrl.slice(queryStart)
          request.url = `${normalizedPathname}index.html${query}`
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [staticPageRoutes(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Deploy to /switchy/ subfolder on mangobuns.com
  base: '/switchy/',
})
