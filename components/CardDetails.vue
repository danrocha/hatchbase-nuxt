<template>
  <div id="card-details">
    <office-logo
      id="logo"
      :office-name="cardDetails.officeName"
      :company-logo="cardDetails.companyLogo"
      :seed="cardDetails.id"
      class="w-full mr-2"
    />
    <header id="header" class="flex items-center mb-8">
      <card-actions>
        <template v-slot="{ updateCard }">
          <editable-text
            :text="cardDetails.title"
            class="text-lg font-bold text-gray-900"
            @save="updateCard(cardDetails.id, { title: $event })"
            ><h1
              class="text-2xl font-bold leading-tight text-left text-gray-900"
            >
              {{ cardDetails.title }}
            </h1></editable-text
          >
        </template>
      </card-actions>
    </header>
    <nav id="nav" class="flex md:flex-col md:items-center md:pt-4">
      <button
        class="block mb-1 mr-4 text-sm font-bold tracking-wide text-gray-600 uppercase md:mr-0 md:mb-8"
        @click="activatePane('details')"
      >
        Job
      </button>
      <button
        class="block mb-1 mr-4 text-sm font-bold tracking-wide text-gray-600 uppercase md:mr-0 md:mb-8"
        @click="activatePane('office')"
      >
        office
      </button>
      <button
        class="block mb-1 text-sm font-bold tracking-wide text-gray-600 uppercase"
        @click="activatePane('milestones')"
      >
        milestones
      </button>
    </nav>
    <main id="content">
      <card-pane-details v-if="pane === 'details'" :card="card" />
      <card-pane-office v-if="pane === 'office'" :card="card" />
      <div v-if="pane === 'milestones'" id="milestones">
        + Milestones
      </div>
    </main>
  </div>
</template>

<script>
import EditableText from '@/components/EditableText'
import CardActions from '@/components/CardActions'
import OfficeLogo from '@/components/OfficeLogo'
import CardPaneDetails from '@/components/CardPaneDetails'
import CardPaneOffice from '@/components/CardPaneOffice'
export default {
  name: 'CardDetails',
  components: {
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
