import { Machine } from 'xstate'

const id = 'Mutate'

export const mutateMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        UPDATE: 'updatingData',
        ADD: 'addingData',
        DELETE: 'deletingData'
      }
    },
    addingData: {
      onEntry: ['showLoading', 'addData'],
      on: {
        SUCCESS: 'idle',
        FAILURE: 'idle'
      },
      onExit: ['hideLoading']
    },
    updatingData: {
      onEntry: ['showLoading', 'updateData'],
      on: {
        SUCCESS: 'idle',
        FAILURE: 'idle'
      },
      onExit: ['hideLoading']
    },
    deletingData: {
      onEntry: ['showLoading', 'deleteData'],
      on: {
        SUCCESS: 'idle',
        FAILURE: 'idle'
      },
      onExit: ['hideLoading']
    }
  }
})
