import { Machine } from 'xstate'

const id = 'Fetch'

export const fetchMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_DATA_REQUEST: 'fetchingData'
      }
    },
    fetchingData: {
      onEntry: ['showLoading', 'fetchData'],
      on: {
        SUCCESS: 'idle',
        FAILURE: 'fetchingData'
      },
      onExit: ['hideLoading']
    }
  }
})
