import { Machine } from 'xstate'

const id = 'Board'

export const boardMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_BOARD: 'fetchingBoard',
        UPDATE_LIST: 'updatingList'
      }
    },
    fetchingBoard: {
      onEntry: ['showGlobalLoading', 'fetchBoard'],
      on: {
        SUCCESS: 'idle',
        FAILURE: {
          target: 'idle',
          actions: ['showConfirmation']
        }
      },
      onExit: ['hideGlobalLoading']
    },
    updatingList: {
      onEntry: ['showLocalLoading', 'updateList'],
      on: {
        SUCCESS: 'idle',
        FAILURE: {
          target: 'idle',
          actions: ['showConfirmation']
        }
      },
      onExit: ['hideLocalLoading']
    }
  }
})
