import gql from 'graphql-tag'
import { MILESTONE_FRAGMENT } from '@/components/MilestoneActions'

export const CARD_FRAGMENT = gql`
  fragment card on Card {
    id
    url
    title
    description
    companyLogo
    jobTitle
    jobType
    officeName
    officeUrl
    officeId
    office {
      id
      domain
      description
      logoUrl
      name
      url
    }
    location {
      id
      lat
      lng
      city {
        name
      }
      formattedAddress
      internationalPhoneNumber
    }
    city
    country
    descriptionHtml
    listId
    order
    postedOn
    startDate
    salary
    notes
    createdAt
    updatedAt
    milestones {
      totalCount
      nodes {
        ...milestone
      }
    }
  }
  ${MILESTONE_FRAGMENT}
`

export default {
  props: {
    queryAll: {
      type: Boolean,
      default: false
    },
    query: {
      type: Boolean,
      default: false
    },
    cardId: {
      type: Number,
      default: null
    },
    listId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    card: null,
    cards: null
  }),
  apollo: {
    cards: {
      query: gql`
        query cards($condition: ListCondition) {
          cards(condition: $condition) {
            nodes {
              ...card
            }
            totalCount
          }
        }
        ${CARD_FRAGMENT}
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
        return !this.queryAll
      }
    },

    card: {
      query: gql`
        query card($id: Int!) {
          card(id: $id) {
            ...card
          }
        }
        ${CARD_FRAGMENT}
      `,
      variables() {
        return {
          id: this.cardId
        }
      },

      skip() {
        return !this.query && !this.cardId
      }
    }
  },
  methods: {
    async getCard(id) {
      this.loading = true
      try {
        const { data } = await this.$apollo.query({
          query: gql`
            query card${id}($id: Int!) {
              card(id: $id) {
                ...card
              }
            }
            ${CARD_FRAGMENT}
          `,
          variables: {
            id
          }
        })
        this.$bus.$emit('card-fetched', data.card)
        return data.card
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async addCard(e) {
      console.log('adding card in cardActions...')
      try {
        const input = await this.checkInput(e)
        const card = await this.createCard(input)
        console.log('added card!', card)
        this.$emit('success-add', card)
      } catch (error) {
        console.error(error)
      } finally {
        // this.$bus.$emit('loader-stop')
      }
    },
    async createCard(input) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation createCard($input: CreateCardInput!) {
              createCard(input: $input) {
                card {
                  ...card
                }
              }
            }
            ${CARD_FRAGMENT}
          `,
          variables: {
            input
          },
          refetchQueries: ['boards']
        })
        return data.createCard.card
      } catch (e) {
        console.error(e)
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
            mutation updateCard($input: UpdateCardInput!) {
              updateCard(input: $input) {
                card {
                  ...card
                }
              }
            }
            ${CARD_FRAGMENT}
          `,
          variables: {
            input
          },
          refetchQueries: ['card', 'boards']
        })
        this.$emit('success-update')
      } catch (error) {
        console.error(error)
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
    },
    checkInput(e) {
      console.log(e)

      if (!e.card)
        throw new Error('Input is not correct: no card object found!')
      if (
        !e.card.title ||
        !Object.prototype.hasOwnProperty.call(e.card, 'order') ||
        !Object.prototype.hasOwnProperty.call(e.card, 'listId')
      )
        throw new Error(
          'Input is not correct: card object contain wrong properties!'
        )
      return e
    },
    cleanInput(input) {
      // separate office, location, card details
      console.log('cleaning input...')

      const {
        url,
        title,
        description,
        companyLogo,
        jobTitle,
        jobType,
        officeName,
        officeUrl,
        city,
        country,
        descriptionHtml,
        listId,
        order
      } = input
      let { postedOn } = input
      const office = { officeName, officeUrl, companyLogo }
      const location = { city, country }
      if (postedOn) {
        try {
          postedOn = new Date(postedOn)
        } catch (error) {
          console.error(error)
          postedOn = ''
        }
      }
      const card = {
        title,
        description,
        jobTitle,
        jobType,
        descriptionHtml,
        postedOn,
        listId,
        order,
        url
      }
      console.log('...cleaned!')
      return {
        office,
        location,
        card
      }
    }
  },
  created() {
    this.$bus.$on('card-add', (e) => {
      this.addCard(e)
    })
    this.$bus.$on('card-fetch', (e) => {
      this.getCard(e)
    })
  },
  beforeDestroy() {
    this.$bus.$off('card-add')
    // this.$bus.$off('card-fetch')
  },
  render() {
    if (this.$scopedSlots.default)
      return this.$scopedSlots.default({
        loading: this.$apollo.loading,
        card: this.card,
        cards: this.cards,
        addCard: this.addCard,
        deleteCard: this.deleteCard,
        update: this.update
      })
  }
}
