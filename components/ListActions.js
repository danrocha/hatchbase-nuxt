import gql from 'graphql-tag'

export default {
  props: {
    query: {
      type: Boolean,
      default: false
    },
    boardId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    data: null
  }),
  apollo: {
    lists: {
      query: gql`
        query lists($condition: ListCondition) {
          lists(condition: $condition) {
            nodes {
              id
              name
              order
            }
            totalCount
          }
        }
      `,
      variables() {
        return {
          condition: {
            boardId: this.boardId
          }
        }
      },
      update(data) {
        this.data = data.lists
        return this.data
      },
      skip() {
        return !this.query
      }
    }
  },
  methods: {
    async addList(name, boardId, order) {
      if (!name) return null
      const input = {
        list: {
          name,
          boardId,
          order
        }
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createList($input: CreateListInput!) {
              createList(input: $input) {
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
    async deleteList(id) {
      if (!id) return null
      const input = {
        id
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteList($input: DeleteListInput!) {
              deleteList(input: $input) {
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
    },
    async updateList(id, patch) {
      const input = {
        id,
        patch
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateList($input: UpdateListInput!) {
              updateList(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          },
          refetchQueries: ['boards']
        })
        this.$emit('success-update')
      } catch (error) {
        console.error(error)
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$apollo.loading,
      data: this.data,
      addList: this.addList,
      deleteList: this.deleteList,
      updateList: this.updateList
    })
  }
}
