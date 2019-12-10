import gql from 'graphql-tag'

export default {
  props: {
    query: {
      type: Boolean,
      default: false
    },
    listId: {
      type: String,
      default: null
    }
  },
  data: () => ({
    data: null
  }),
  apollo: {
    cards: {
      query: gql`
        query cards($condition: ListCondition) {
          cards(condition: $condition) {
            nodes {
              id
              name
            }
            totalCount
          }
        }
      `,
      variables() {
        return {
          condition: {
            listId: this.listId
          }
        }
      },
      update(data) {
        this.data = data.cards
        return this.data
      },
      skip() {
        return !this.query
      }
    }
  },
  methods: {
    async addCard(name, listId, order) {
      console.log('adding card', name, listId, order)
      if (!name) return null
      const input = {
        card: {
          name,
          listId,
          order
        }
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createCard($input: CreateCardInput!) {
              createCard(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          },
          refetchQueries: ['boards']
        })
        this.$emit('success-add')
      } catch (e) {
        console.error(e)
      }
    },
    async deleteCard(id) {
      if (!id) return null
      const input = {
        id
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteCard($input: DeleteCardInput!) {
              deleteCard(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          },
          refetchQueries: ['boards']
        })
        this.$emit('success-delete')
      } catch (e) {
        console.error(e)
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$apollo.loading,
      data: this.data,
      addCard: this.addCard,
      deleteCard: this.deleteCard
    })
  }
}
