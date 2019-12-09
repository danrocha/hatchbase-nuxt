import gql from 'graphql-tag'

export default {
  props: {
    query: {
      type: Boolean,
      default: false
    },
    boardId: {
      type: String,
      required: true
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
    async addBoard(name) {
      if (!name) return null
      const input = {
        board: {
          name
        }
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createBoard($input: CreateBoardInput!) {
              createBoard(input: $input) {
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
    async deleteBoard(id) {
      if (!id) return null
      const input = {
        id
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteBoard($input: DeleteBoardInput!) {
              deleteBoard(input: $input) {
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
      addBoard: this.addBoard,
      deleteBoard: this.deleteBoard
    })
  }
}
