<template>
  <app-main-layout>
    <template #top-bar>
      <div class="flex items-center h-full">
        <button class="mx-2 text-lg" @click="hideCard">&larr;</button>
        <p v-if="globalLoading">Loading card details...</p>
        <p v-else-if="card" class="font-bold">{{ card.title }}</p>
      </div>
    </template>
    <template #content>
      <p v-if="globalLoading || !card">Loading...</p>
      <div v-else class="absolute inset-0 flex w-full h-full overflow-hidden">
        <aside
          class="flex flex-col items-center flex-none p-4 bg-gray-100 border-r sidebar"
        >
          <img
            :src="card.companyLogo"
            class="w-48 h-48 mb-8 overflow-hidden border-4 border-white rounded-full shadow"
          />
          <div class="text-sm">
            <p class="mb-8 text-sm font-semibold tracking-wide uppercase">
              Basic Information
            </p>

            <p
              class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
            >
              Company
            </p>
            <p class="mb-2">
              {{ card.officeName }}
            </p>
            <template v-if="card.url">
              <p
                class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
              >
                Source
              </p>
              <p class="mb-2">
                <a
                  class="flex items-center text-blue-500 underline cursor-pointer"
                  :href="card.url"
                  :alt="card.url"
                  target="_blank"
                >
                  {{ formatUrl(card.url).slice(0, 30) }}...<external-link-icon
                    size="1x"
                  />
                </a>
              </p>
            </template>
            <p
              class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
            >
              Added
            </p>
            <p class="mb-2">
              {{ $dateFns.format(new Date(card.createdAt), 'MMMM do') }}
            </p>
            <template v-if="card.createdAt !== card.updatedAt">
              <p
                class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
              >
                Modified
              </p>
              <p>{{ $dateFns.format(new Date(card.updatedAt), 'MMMM do') }}</p>
            </template>
          </div>
        </aside>
        <div class="flex flex-col w-full h-full">
          <nav class="h-12 bg-white bg-gray-200 border-b">
            <ul
              class="flex items-center h-full px-4 text-sm font-semibold tracking-wide uppercase"
            >
              <li class="mr-4">
                <button
                  class="text-sm font-semibold tracking-wide uppercase"
                  @click="pane = 'details'"
                >
                  details
                </button>
              </li>
              <li class="mr-4">
                <button
                  class="text-sm font-semibold tracking-wide uppercase"
                  @click="pane = 'notes'"
                >
                  notes
                </button>
              </li>
              <li class="mr-4">
                <button
                  class="text-sm font-semibold tracking-wide uppercase"
                  @click="pane = 'contacts'"
                >
                  contacts
                </button>
              </li>
              <li class="mr-4">
                <button
                  class="text-sm font-semibold tracking-wide uppercase"
                  @click="pane = 'office'"
                >
                  office
                </button>
              </li>
              <li class="mr-4">
                <button
                  class="text-sm font-semibold tracking-wide uppercase"
                  @click="pane = 'tasks'"
                >
                  tasks
                </button>
              </li>
              <li class="mr-4">
                <button
                  class="text-sm font-semibold tracking-wide uppercase"
                  @click="pane = 'history'"
                >
                  history
                </button>
              </li>
            </ul>
          </nav>

          <div class="px-4 pt-4 overflow-y-auto bg-gray-300">
            <div class="p-4 bg-white rounded-t-lg shadow">
              <card-pane-details v-if="pane === 'details'" :card="card" />
              <card-pane-office v-if="pane === 'office'" :card="card" />
              <card-pane-milestones v-if="pane === 'history'" :card="card" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </app-main-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ExternalLinkIcon } from 'vue-feather-icons'
import AppMainLayout from '@/components/AppMainLayout'
import CardPaneDetails from '@/components/CardPaneDetails'
import CardPaneOffice from '@/components/CardPaneOffice'
import CardPaneMilestones from '@/components/CardPaneMilestones'
export default {
  components: {
    AppMainLayout,
    CardPaneMilestones,
    CardPaneOffice,
    CardPaneDetails,
    ExternalLinkIcon
  },
  data() {
    return {
      pane: 'details'
    }
  },
  computed: {
    ...mapState({
      card: (state) => state.card.currentCard,
      showCard: (state) => state.card.showCard,
      globalLoading: (state) => state.board.globalLoading,
      localLoading: (state) => state.board.localLoading
    })
  },
  watch: {
    showCard(newVal, oldVal) {
      if (!newVal) return this.$router.push(`/home/jobs`)
    }
  },
  mounted() {
    if (!this.card) {
      if (!this.$route.params.id) return this.$router.push('/home/jobs/')
      return this['card/cardTransition']({
        type: 'FETCH_CARD',
        params: { id: this.$route.params.id }
      })
    }
  },
  methods: {
    ...mapActions(['card/cardTransition']),
    hideCard() {
      this['card/cardTransition']({ type: 'HIDE_CARD' })
    },
    formatUrl(url) {
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 300px;
}
</style>
