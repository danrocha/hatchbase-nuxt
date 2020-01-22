import { Machine } from 'xstate'

const id = 'Card'

export const cardMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_CARD: 'fetchingCard',
        UPDATE_CARD: 'updatingCard',
        HIDE_CARD: 'hidingCard'
      }
    },
    fetchingCard: {
      onEntry: ['showLocalLoading', 'fetchCard'],
      on: {
        SUCCESS: { target: 'idle', actions: ['showCard'] },
        FAILURE: 'idle'
      },
      onExit: ['hideLocalLoading']
    },
    updatingCard: {
      onEntry: ['showLocalLoading', 'updateCard'],
      on: {
        SUCCESS: 'idle',
        FAILURE: 'idle'
      },
      onExit: ['hideLocalLoading']
    },
    hidingCard: {
      onEntry: ['hideCard'],
      on: {
        SUCCESS: { target: 'idle', actions: ['resetCard'] }
      }
    }
  }
})
