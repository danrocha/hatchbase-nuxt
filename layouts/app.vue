<template>
  <div id="app-ui">
    <div id="top-bar">
      <nav>top bard</nav>
    </div>
    <div id="side-bar">
      <nav>
        <ul>
          <li><nuxt-link to="/home/jobs">jobs</nuxt-link></li>
          <li><nuxt-link to="/home/companies">companies</nuxt-link></li>
          <li><nuxt-link to="/home/contacts">contacts</nuxt-link></li>
        </ul>
      </nav>
    </div>
    <div id="main">
      <nuxt />
    </div>
    <div id="bottom-bar">bottom bar</div>
  </div>
</template>

<script>
import { useClient } from 'villus'

// Your App component
export default {
  setup() {
    useClient({
      url: 'http://localhost:4000/graphql' // your endpoint.
    })
  }
}
</script>

<style>
#__nuxt {
  @apply overflow-hidden;
}

#app-ui {
  @apply absolute inset-0;
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-rows: 40px 1fr 30px;
  grid-template-areas:
    'top top'
    'side main'
    'bottom bottom';
}

#top-bar {
  @apply bg-gray-200;
  grid-area: top;
}
#side-bar {
  @apply bg-gray-900 text-white;
  grid-area: side;
}
#main {
  grid-area: main;
}
#bottom-bar {
  @apply bg-gray-200 border-t;
  grid-area: bottom;
}
</style>
