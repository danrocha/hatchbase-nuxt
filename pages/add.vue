<template>
  <div class="w-full h-full">
    <div v-if="$auth.loggedIn">
      <div class="p-12 overflow-hidden border border-black rounded-lg">
        <p class="mb-1 text-lg font-bold leading-tight">
          {{ $route.query.title }}
        </p>
        <p class="text-gray-500">{{ $route.query.url }}</p>
      </div>
    </div>
    <div v-else>
      <p class="mb-4">
        You need to login for this to work.
      </p>
      <p class="mb-8">
        <el-button type="primary" @click="login">Login</el-button>
      </p>
      <p class="text-sm">
        Don't have an account?
        <button class="text-blue-500 underline" @click="login">Register</button
        >.
      </p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  layout: 'simple',
  auth: false,
  data() {
    return {
      loading: null,
      url: this.$route.query.url,
      title: this.$route.query.title,
      redirect: this.$route.query.redirect
    }
  },
  async mounted() {
    if (!this.url) {
      return this.$router.push('/')
    }
    if (!this.$auth.loggedIn) {
      return this.$auth.$storage.setCookie(
        'redirect',
        this.$route.fullPath,
        false
      )
    }

    const cardId = await this.addCard(this.url)
    if (this.redirect === 'ad') {
      window.location.href = this.url
    } else {
      this.$router.push(`/?cardId=${cardId}`)
    }
  },
  methods: {
    login() {
      return this.$auth.loginWith('auth0')
    },
    startLoader() {
      this.loading = this.$loading({
        lock: true,
        text: 'Adding a new job to your hatchbase...',
        spinner: 'el-icon-loading'
      })
    },
    async addCard(url) {
      this.startLoader()
      console.log('Adding new card...')
      console.log('Fecthing more details from URL...')
      let details
      try {
        details = await this.fetchJobDetails(url)
        console.log('...done!')
      } catch (e) {
        console.error(e)
        details = { title: this.title, url: this.url }
      }

      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation createCardExtension($input: CreateCardExtensionInput!) {
              createCardExtension(input: $input) {
                card {
                  id
                }
              }
            }
          `,
          variables: {
            input: { details }
          }
        })
        console.log(data)
        return data.createCardExtension.card.id
      } catch (e) {
        console.error(e)
      } finally {
        this.loading.text = 'Done! Redirecting...'
        this.loading.close()
      }
    },
    async fetchJobDetails(url) {
      try {
        const details = await this.$axios.$get(
          `http://localhost:4000/get-job-info?url=${url}`
        )
        if (!details.title)
          throw new Error(
            'We could not reach this URL, connection timed out! Try again...'
          )
        return details
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
