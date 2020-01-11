export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // Customize the progress-bar color
  loading: { color: '#ECC94B', continuous: true },
  // Global CSS
  css: [
    // 'element-ui/lib/theme-chalk/reset.css',
    // 'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to load before mounting the App
  plugins: [
    '@/plugins/vue-js-modal',
    '@/plugins/v-click-outside',
    '@/plugins/bus',
    '@/plugins/element-ui'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org/#getting-started
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns',
    // With options
    [
      'nuxt-google-maps-module',
      {
        /* module options */
        key:
          process.env.NUXT_ENV_GOOGLE_MAPS_API_KEY ||
          'AIzaSyAxKpkg3S1jYWV83IXHWyLBJ8nGNSsfZFI' // Default
      }
    ]
  ],
  apollo: {
    tokenName: 'auth._token.auth0',
    authenticationType: '', // left empty because token is stored including 'Bearer " from the auth module
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql'
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  auth: {
    redirect: {
      callback: '/callback',
      home: false
    },
    strategies: {
      auth0: {
        domain: 'hatchbase.eu.auth0.com',
        client_id: '6Y6eC9sCAKPZdUM4P1ZyJ33ieXAuyUJX',
        audience: 'https://hatchbase.io/',
        scope: ['openid', 'profile', 'email', 'https://hasura.io/jwt/claims']
      }
    }
  },
  dateFns: {
    // locales: ['enUS'],
    // defaultLocale: 'enUS'
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    transpile: [/^vue2-google-maps($|\/)/]
  },
  router: {
    middleware: ['auth']
  }
}
