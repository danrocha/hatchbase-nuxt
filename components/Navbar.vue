<template>
  <nav class="flex items-center justify-between">
    <div class="flex items-center">
      <logo class="w-12 h-12 mr-2 text-yellow-500 fill-current" />
      <h1 class="text-lg font-bold text-black">
        hatchbase
      </h1>
    </div>
    <div>
      <div v-if="$auth.loggedIn" class="relative flex">
        <el-button type="primary">Add Job</el-button>
        <button
          class="relative z-10 block w-12 h-12 ml-4 overflow-hidden border-2 rounded focus:outline-none focus:border-yellow-500"
          @click="isOpen = !isOpen"
        >
          <img
            :src="
              $auth.user.picture ||
                `https://api.adorable.io/avatars/50/${$auth.user.name}.png`
            "
            class="object-cover w-full h-full"
          />
        </button>
        <button
          v-if="isOpen"
          tabindex="-1"
          class="fixed inset-0 w-full h-full cursor-default"
          @click="isOpen = false"
        ></button>
        <div
          v-if="isOpen"
          class="absolute right-0 w-48 py-2 mt-2 bg-white border border-gray-100 rounded shadow-lg"
        >
          <p class="px-4 py-2">{{ $auth.user.name }}</p>
          <p class="px-4 py-2 hover:bg-yellow-500">
            <button @click="logout">Log out</button>
          </p>
        </div>
      </div>
      <el-button v-else type="primary" @click="login">Login</el-button>
      <!-- <button
        v-else
        class="p-2 text-sm font-bold tracking-wide uppercase border rounded shadow"
        @click="login"
      >
        Login
      </button> -->
    </div>
  </nav>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  name: 'Navbar',
  components: {
    Logo
  },
  data() {
    return {
      isOpen: false
    }
  },
  beforeMount() {
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscape)
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0')
    },
    logout() {
      this.$auth.logout()
    },
    handleEscape(e) {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
