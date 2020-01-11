export const state = () => ({
  currentCard: null
})

export const mutations = {
  SET_CARD(state, card) {
    state.currentCard = card
  },
  RESET_CARD(state) {
    state.currentCard = null
  }
}
export const actions = {
  setCard({ commit }, card) {
    return commit('SET_CARD', card)
  },
  resetCard({ commit }) {
    return commit('RESET_CARD')
  }
}
