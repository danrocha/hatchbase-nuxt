<template>
  <card-actions :card-id="card.id" :query="true">
    <template v-slot="{ update, card: cardDetails, loading }">
      <div v-if="cardDetails" id="card-details" v-loading="loading">
        <card-pane-details v-if="pane === 'details'" :card="cardDetails" />
        <card-pane-office v-if="pane === 'office'" :card="cardDetails" />
        <card-pane-milestones
          v-if="pane === 'milestones'"
          :card="cardDetails"
        />
      </div>
    </template>
  </card-actions>
</template>

<script>
import gql from 'graphql-tag'
import { mapState, mapActions } from 'vuex'
import CardActions from '@/components/CardActions'
import CardPaneDetails from '@/components/CardPaneDetails'
import CardPaneOffice from '@/components/CardPaneOffice'
import CardPaneMilestones from '@/components/CardPaneMilestones'
export default {
  name: 'CardDetails',
  components: {
    CardPaneMilestones,
    CardPaneOffice,
    CardPaneDetails,

    CardActions
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
