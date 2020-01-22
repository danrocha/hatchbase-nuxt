<template>
  <nav class="flex justify-between">
    <div>
      <button
        class="flex items-center overflow-hidden bg-white rounded-b-lg shadow-md focus:outline-none"
        @click="$router.push('/')"
      >
        <logo
          class="flex-none w-10 h-10 h-full mr-2 text-yellow-500 fill-current"
        />
        <h1 class="mr-4 text-lg font-bold text-black">hatchbase</h1>
      </button>
    </div>
    <div class="flex bg-white rounded-b-lg shadow-md">
      <div v-if="$auth.loggedIn" class="flex ">
        <nuxt-link
          v-if="$route.name === 'index'"
          to="/home"
          class="px-4 text-sm font-semibold text-black hover:underline"
          @click="$router.push('/home')"
        >
          dashboard
        </nuxt-link>
        <button
          v-else
          class="px-4 text-sm font-semibold text-black hover:underline"
        >
          add job
        </button>

        <div>
          <el-dropdown trigger="click" @command="logout">
            <span>
              <img
                :src="
                  $auth.user.picture ||
                    `https://api.adorable.io/avatars/50/${$auth.user.name}.png`
                "
                class="flex-none object-cover w-10 h-10 h-full overflow-hidden border-2 border-white rounded-br-lg shadow-md"
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
      </div>
      <div v-else>
        <button
          class="px-4 text-sm font-semibold text-black hover:underline"
          @click="login"
        >
          login/sign up
        </button>
      </div>
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
