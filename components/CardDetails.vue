<template>
  <div class="p-12">
    <header class="flex items-center justify-between mb-8">
      <card-actions>
        <template v-slot="{ updateCard }">
          <editable-text
            :text="cardDetails.name"
            @save="updateCard(cardDetails.id, { name: $event })"
            class="text-lg font-bold text-gray-900"
            ><h2 class="text-2xl font-bold text-gray-900">
              {{ cardDetails.name }}
            </h2></editable-text
          >
        </template>
      </card-actions>
      <button-close @click="$emit('close')" />
    </header>
    <main class="flex">
      <div class="w-32">
        <nav>
          <button
            @click="activatePane('details')"
            class="block mb-1 text-sm font-bold tracking-wide uppercase"
          >
            Job
          </button>
          <button
            @click="activatePane('office')"
            class="block mb-1 text-sm font-bold tracking-wide uppercase"
          >
            office
          </button>
          <button
            @click="activatePane('milestones')"
            class="block mb-1 text-sm font-bold tracking-wide uppercase"
          >
            milestones
          </button>
        </nav>
      </div>
      <div>
        <div id="details" v-if="pane === 'details'">
          + details
        </div>
        <div id="office" v-if="pane === 'office'">
          + Office
        </div>
        <div id="milestones" v-if="pane === 'milestones'">
          + Milestones
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ButtonClose from '@/components/ButtonClose'
import EditableText from '@/components/EditableText'
import CardActions from '@/components/CardActions'
export default {
  name: 'CardDetails',
  components: {
    CardActions,
    EditableText,
    ButtonClose
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cardDetails: this.card,
      pane: 'details'
    }
  },
  methods: {
    activatePane(pane) {
      this.pane = pane
    }
  },
  apollo: {
    cardDetails: {
      query: gql`
        query card($id: Int!) {
          card(id: $id) {
            id
            name
          }
        }
      `,
      variables() {
        return {
          id: this.card.id
        }
      },
      update(data) {
        return data.card
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
