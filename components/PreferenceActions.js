import gql from 'graphql-tag'

export const PREFERENCE_FRAGMENT = gql`
  fragment preference on Preference {
    id
    milestonesShowTip
    createdAt
    updatedAt
  }
`

export default {
  data: () => ({
    data: null
  }),
  apollo: {
    preferences: {
      query: gql`
        query preferences {
          preferences {
            totalCount
            nodes {
              ...preference
            }
          }
        }
        ${PREFERENCE_FRAGMENT}
      `,
      update(data) {
        return (this.data = data.preferences.nodes[0])
      }
    }
  },
  methods: {
    async update(id, patch) {
      const input = {
        id,
        patch
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updatePreference($input: UpdatePreferenceInput!) {
              updatePreference(input: $input) {
                preference {
                  ...preference
                }
              }
            }
            ${PREFERENCE_FRAGMENT}
          `,
          variables: {
            input
          },
          refetchQueries: ['preferences']
        })
        this.$emit('success-update')
      } catch (error) {
        console.error(error)
      }
    }
  },

  render() {
    if (this.$scopedSlots.default)
      return this.$scopedSlots.default({
        loading: this.$apollo.loading,
        data: this.data,
        update: this.update
      })
  }
}
