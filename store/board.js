import gql from 'graphql-tag'
import { boardMachine } from '@/plugins/vuex/boardMachine'
import { CARD_SUMMARY_FRAGMENT } from '@/store/card'
import { transition } from '@/plugins/vuex/fsm-transition'

export const state = () => ({
  state: boardMachine.initial,
  globalLoading: false,
  localLoading: false,
  board: null,
  error: null
})

export const mutations = {
  SET_BOARD(state, board) {
    state.board = board
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  UPDATE_BOARD_STATE(state, nextState) {
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
  boardTransition: transition.bind(null, boardMachine),
  async fetchBoard({ commit, dispatch, rootState }, { req }) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const { data } = await client.query({
        query: BOARDS_QUERY
      })
      if (data.boards.totalCount) {
        commit('SET_BOARD', data.boards.nodes[0])
        dispatch('boardTransition', {
          type: 'SUCCESS'
        })
      } else {
        commit('SET_ERROR', 'Could not find any boards!')
        dispatch('boardTransition', { type: 'FAILURE' })
      }
    } catch (e) {
      commit('SET_ERROR', e)
      dispatch('boardTransition', { type: 'FAILURE' })
    }
  },
  async updateList({ commit, dispatch }, { params: { list } }) {
    // debugger
    // console.log(list)
    const client = this.app.apolloProvider.defaultClient
    const input = {
      listId: list.id,
      cards: [...list.cards.nodes].reverse()
    }
    try {
      await client.mutate({
        mutation: UPDATE_LIST_CARDS_MUTATION,
        variables: {
          input
        }
      })
      dispatch('boardTransition', { type: 'SUCCESS' })
    } catch (e) {
      commit('SET_ERROR', e)
      dispatch('boardTransition', { type: 'FAILURE' })
    }
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

export const BOARD_FRAGMENT = gql`
  fragment board on Board {
    id
    name
    description
    order
    lists(orderBy: ORDER_ASC) {
      totalCount
      nodes {
        id
        name
        order
        cards(orderBy: ORDER_DESC) {
          totalCount
          nodes {
            ...cardSummary
          }
        }
      }
    }
  }
  ${CARD_SUMMARY_FRAGMENT}
`

const BOARDS_QUERY = gql`
  query boards {
    boards(orderBy: ID_ASC) {
      nodes {
        ...board
      }
      totalCount
    }
  }
  ${BOARD_FRAGMENT}
`

const UPDATE_LIST_CARDS_MUTATION = gql`
  mutation updateListCards($input: UpdateListCardsInput!) {
    updateListCards(input: $input) {
      list {
        id
        name
      }
      clientMutationId
    }
  }
`
