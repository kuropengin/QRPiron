import * as FontAwesome from './build/fontawesome'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  head: {
    title: 'QReader',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/common.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    ['@nuxtjs/pwa'],
    ['@nuxt/typescript-build'],
    ['@nuxtjs/fontawesome', {
      component: 'fontAwesome', 
      icons: {
        solid: FontAwesome.solid,
        regular: FontAwesome.regular
      } 
    }]
  ],
  

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  pwa: {
    meta: {
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'black',
    },
    manifest: {
      lang: 'ja',
      name: 'QRPiron',
      short_name: 'QRPiron',
      description: 'QRPiron',
      display: 'standalone',
      theme_color: '#499e4c',
      background_color: '#499e4c',
      orientation: 'portrait',
      scope: '/',
      start_url: '/?source=app',
    },
    icon: {
      fileName:"icon-pwa.png",
    }
  },
}
