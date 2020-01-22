<template>
  <app-main-layout>
    <template #top-bar>
      companies top bar
    </template>
    <template #content>
      companies content
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
