<template>
  <div id="card-details">
    <office-logo
      id="logo"
      :office-name="cardDetails.officeName"
      :company-logo="cardDetails.companyLogo"
      :seed="cardDetails.id"
      class="w-full mr-2"
    />
    <header id="header" class="mb-8 sm:m-0">
      <card-actions @success-update="$bus.$emit('card-fetch', card.id)">
        <template v-slot="{ update }">
          <editable-text
            :text="cardDetails.title"
            class="text-lg font-bold text-gray-900"
            @save="update(cardDetails.id, { title: $event })"
            ><h1
              class="text-2xl font-bold leading-tight text-left text-gray-900"
            >
              {{ cardDetails.title }}
            </h1></editable-text
          >
        </template>
      </card-actions>
      <h2 v-if="cardDetails.officeName" class="text-2xl">
        <span class="text-gray-500">at </span>{{ cardDetails.officeName }}
      </h2>
      <h2 v-else class="text-base text-blue-500 underline">Add Office</h2>
    </header>
    <nav id="nav" class="flex md:flex-col md:justify-start md:items-center">
      <button
        class="block mt-2 mr-4 text-sm tracking-wide text-gray-600 uppercase md:mr-0 md:mb-8 md:mt-4 focus:outline-none focus:font-bold"
        :class="{ 'font-bold': pane === 'details' }"
        @click="activatePane('details')"
      >
        Job
      </button>
      <button
        class="block mt-2 mr-4 text-sm tracking-wide text-gray-600 uppercase md:mr-0 md:mb-8 focus:outline-none focus:font-bold"
        :class="{ 'font-bold': pane === 'office' }"
        @click="activatePane('office')"
      >
        office
      </button>
      <button
        class="block mt-2 text-sm tracking-wide text-gray-600 uppercase focus:outline-none focus:font-bold"
        :class="{ 'font-bold': pane === 'milestones' }"
        @click="activatePane('milestones')"
      >
        milestones
      </button>
    </nav>
    <main id="content">
      <card-pane-details v-if="pane === 'details'" :card="cardDetails" />
      <card-pane-office v-if="pane === 'office'" :card="cardDetails" />
      <card-pane-milestones v-if="pane === 'milestones'" :card="cardDetails" />
    </main>
  </div>
</template>

<script>
import EditableText from '@/components/EditableText'
import CardActions from '@/components/CardActions'
import OfficeLogo from '@/components/OfficeLogo'
import CardPaneDetails from '@/components/CardPaneDetails'
import CardPaneOffice from '@/components/CardPaneOffice'
import CardPaneMilestones from '@/components/CardPaneMilestones'
export default {
  name: 'CardDetails',
  components: {
    CardPaneMilestones,
    CardPaneOffice,
    CardPaneDetails,
    OfficeLogo,
    CardActions,
    EditableText
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cardDetails: { ...this.card },
      pane: 'details'
    }
  },
  created() {
    this.$bus.$emit('card-fetch', this.card.id)
    this.$bus.$on('card-fetched', (e) => {
      this.cardDetails = e
    })
  },
  beforeDestroy() {
    this.$bus.$off('card-fetched')
  },
  methods: {
    activatePane(pane) {
      this.pane = pane
    }
  }
}
</script>

<style>
#logo {
  grid-area: logo;
}
#header {
  grid-area: header;
  align-self: center;
}
#nav {
  grid-area: nav;
}

#content {
  grid-area: content;
}

#card-details {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-template-areas:
    'logo . .'
    'header header header'
    'nav nav nav'
    'content content content';
}

@screen sm {
  #card-details {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
    grid-template-areas:
      'logo header header header'
      'nav nav nav nav'
      'content content content content';
  }
}
@screen md {
  #card-details {
    grid-gap: 2rem;
    grid-template-areas:
      'logo header header header'
      'nav content content content';
  }
}
@screen lg {
  #card-details {
    grid-gap: 3rem;
  }
}

.html-description p,
ul,
ol {
  @apply mb-4;
}
.html-description ul {
  @apply list-disc pl-8;
}
.html-description ol {
  @apply list-decimal;
}
</style>
