<template>
  <nav class="flex items-center justify-between">
    <div class="flex items-center bg-white shadow-md">
      <logo class="w-12 h-12 mr-2 text-yellow-500 fill-current" />
      <h1 class="mr-4 text-lg font-bold text-black">hatchbase</h1>
    </div>
    <div>
      <div v-if="$auth.loggedIn" class="relative flex items-center">
        <button
          class="p-2 mr-4 text-sm font-semibold tracking-wide text-white uppercase bg-black shadow-md"
        >
          Add Job
        </button>

        <el-dropdown trigger="click" @command="logout">
          <span>
            <img
              :src="
                $auth.user.picture ||
                  `https://api.adorable.io/avatars/50/${$auth.user.name}.png`
              "
              class="object-cover w-12 h-12 border-2 border-white shadow-md"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-person" :disabled="true">{{
              $auth.user.name
            }}</el-dropdown-item>
            <el-dropdown-item icon="el-icon-exit" command="logout"
              >Log out</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <button
        v-else
        class="p-2 text-sm font-semibold tracking-wide text-white uppercase bg-black shadow-md"
        @click="login"
      >
        Login
      </button>
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

  methods: {
    login() {
      this.$auth.loginWith('auth0')
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
