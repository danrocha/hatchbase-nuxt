import gql from 'graphql-tag'

export const MILESTONE_FRAGMENT = gql`
  fragment milestone on Milestone {
    id
    date
    body
    type
    createdAt
    updatedAt
  }
`

export default {
  props: {
    milestoneId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    data: null
  }),
  methods: {
    isInputOk(input) {
      if (!input.milestone)
        throw new Error('Milestone input: missing milestone')
      if (!input.milestone.cardId)
        throw new Error('Milestone input: missing cardId')
      if (!input.milestone.date)
        throw new Error('Milestone input: missing date')
      if (!input.milestone.body)
        throw new Error('Milestone input: missing body')
    },
    async create(input) {
      this.loading = true
      input.milestone.type = 'USER'
      try {
        this.isInputOk(input)
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation createMilestone($input: CreateMilestoneInput!) {
              createMilestone(input: $input) {
                milestone {
                  ...milestone
                }
              }
            }
            ${MILESTONE_FRAGMENT}
          `,
          variables: {
            input
          },
          refetchQueries: [`card${this.cardId}`]
        })
        this.$emit('success-add')
        return data.createMilestone.milestone
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async update(id, patch) {
      const input = {
        id,
        patch
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateMilestone($input: UpdateMilestoneInput!) {
              updateMilestone(input: $input) {
                milestone {
                  ...milestone
                }
              }
            }
            ${MILESTONE_FRAGMENT}
          `,
          variables: {
            input
          },
          refetchQueries: [`milestone${id}`, 'boards']
        })
        this.$emit('success-update')
      } catch (error) {
        console.error(error)
      }
    },
    async delete(id) {
      if (!id) return null
      const input = {
        id
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteMilestone($input: DeleteMilestoneInput!) {
              deleteMilestone(input: $input) {
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
    if (this.$scopedSlots.default)
      return this.$scopedSlots.default({
        loading: this.$apollo.loading,
        data: this.data,
        create: this.create,
        delete: this.delete,
        update: this.update
      })
  }
}
