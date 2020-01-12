<template>
  <card-actions :card-id="card.id" :query="true">
    <template v-slot="{ update, card: cardDetails, loading }">
      <div v-if="cardDetails" id="card-details" v-loading="loading">
        <office-logo
          id="logo"
          :office-name="cardDetails.officeName"
          :company-logo="cardDetails.companyLogo"
          :seed="cardDetails.id"
          class="w-full mr-2"
        />
        <header id="header" class="mb-8 sm:m-0">
          <editable-text
            :text="cardDetails.title"
            size="large"
            class="text-lg font-bold"
            @save="update(cardDetails.id, { title: $event })"
            ><h1 class="text-2xl font-bold leading-tight text-left text-black">
              {{ cardDetails.title }}
            </h1></editable-text
          >
          <h2 v-if="cardDetails.officeName" class="text-2xl">
            <span>at </span>{{ cardDetails.officeName }}
          </h2>
          <!-- <h2 v-else class="text-base text-blue-500 underline">Add Office</h2> -->
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
          <card-pane-milestones
            v-if="pane === 'milestones'"
            :card="cardDetails"
          />
        </main>
      </div>
    </template>
  </card-actions>
</template>

<script>
import gql from 'graphql-tag'
import { mapState, mapActions } from 'vuex'
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
      pane: 'details'
    }
  },
  computed: {
    ...mapState({
      currentCard: (state) => state.card.currentCard
    })
  },
  mounted() {
    if (!this.currentCard) {
      this['card/setCard'](this.card)
    }
    if (this.card.isNew) {
      this.setIsNew(this.card.id)
    }
  },
  methods: {
    ...mapActions(['card/setCard']),
    activatePane(pane) {
      this.pane = pane
    },
    async setIsNew(cardId) {
      const input = {
        id: cardId,
        patch: {
          isNew: false
        }
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateCard($input: UpdateCardInput!) {
              updateCard(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          },
          refetchQueries: ['boards']
        })
      } catch (e) {
        console.error(e)
      }
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
  @apply list-decimal pl-8;
}
</style>
