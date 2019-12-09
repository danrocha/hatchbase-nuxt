<template>
  <boards v-if="$auth.loggedIn" class="h-full" />
</template>

<script>
import Boards from '@/components/Boards'
export default {
  auth: false,
  components: {
    Boards
  }
}
</script>

<style></style>
