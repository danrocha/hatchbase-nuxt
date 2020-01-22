<template>
  <app-main-layout>
    <template #top-bar>
      contacts top bar
    </template>
    <template #content>
      contacts content
    </template>
  </app-main-layout>
</template>

<script>
import AppMainLayout from '@/components/AppMainLayout'

export default {
  components: {
    AppMainLayout
  }
}
</script>

<style lang="scss" scoped></style>
