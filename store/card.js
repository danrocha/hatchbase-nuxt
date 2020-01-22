import gql from 'graphql-tag'
import { MILESTONE_FRAGMENT } from './milestone'
import { cardMachine } from '@/plugins/vuex/cardMachine'
import { transition } from '@/plugins/vuex/fsm-transition'

export const state = () => ({
  state: cardMachine.initial,
  currentCard: null,
  localLoading: false,
  globalLoading: false,
  showCard: false,
  error: null
})

export const mutations = {
  SET_CARD(state, card) {
    state.currentCard = card
  },
  RESET_CARD(state) {
    state.currentCard = null
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_SHOW_CARD(state, showCard) {
    state.showCard = showCard
  },
  UPDATE_CARD_STATE(state, nextState) {
    state.state = nextState
  },
  SET_GLOBAL_LOADING(state, payload) {
    state.globalLoading = payload
  },
  SET_LOCAL_LOADING(state, payload) {
    state.localLoading = payload
  }
}
export const actions = {
  cardTransition: transition.bind(null, cardMachine),
  // FETCH
  async fetchCard({ commit, dispatch }, { params: { id } }) {
    commit('SET_ERROR', null)
    try {
      const client = this.app.apolloProvider.defaultClient
      const { data } = await client.query({
        query: CARD_QUERY,
        variables: {
          id: Number(id)
        }
      })
      commit('SET_CARD', data.card)
      dispatch('cardTransition', {
        type: 'SUCCESS'
      })
    } catch (e) {
      commit('SET_ERROR', e)
      dispatch('cardTransition', { type: 'FAILURE' })
    }
  },
  // UPDATE
  async updateCard({ commit, dispatch }, { params: { id, patch } }) {
    const input = {
      id,
      patch
    }
    try {
      const client = this.app.apolloProvider.defaultClient
      const {
        data: {
          updateCard: { card }
        }
      } = await client.mutate({
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
        }
      })
      commit('SET_CARD', card)
      dispatch('cardTransition', {
        type: 'SUCCESS'
      })
    } catch (e) {
      commit('SET_ERROR', e)
      dispatch('cardTransition', { type: 'FAILURE' })
    }
  },
  showCard({ commit }) {
    commit('SET_SHOW_CARD', true)
  },
  hideCard({ commit, dispatch }) {
    commit('SET_SHOW_CARD', false)
    dispatch('cardTransition', {
      type: 'SUCCESS'
    })
  },
  setCard({ commit }, card) {
    return commit('SET_CARD', card)
  },
  resetCard({ commit }) {
    return commit('RESET_CARD')
  },
  showGlobalLoading({ commit }) {
    commit('SET_GLOBAL_LOADING', true)
  },
  hideGlobalLoading({ commit }) {
    commit('SET_GLOBAL_LOADING', false)
  },
  showLocalLoading({ commit }) {
    commit('SET_LOCAL_LOADING', true)
  },
  hideLocalLoading({ commit }) {
    commit('SET_LOCAL_LOADING', false)
  }
}

export const CARD_SUMMARY_FRAGMENT = gql`
  fragment cardSummary on Card {
    id
    title
    companyLogo
    officeName
    city
    country
    order
    isNew
    createdAt
    updatedAt
    notes {
      totalCount
    }
  }
`

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
    city
    country
    descriptionHtml
    listId
    order
    postedOn
    startDate
    salary
    isNew
    source
    createdAt
    updatedAt
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
    milestones {
      totalCount
      nodes {
        ...milestone
      }
    }
    notes {
      totalCount
      nodes {
        id
        body
        createdAt
      }
    }
  }
  ${MILESTONE_FRAGMENT}
`

const CARD_QUERY = gql`
  query card($id: Int!) {
    card(id: $id) {
      ...card
    }
  }
  ${CARD_FRAGMENT}
`
