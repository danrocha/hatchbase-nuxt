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
export const state = () => ({})

export const actions = () => ({})
export const mutations = () => ({})
