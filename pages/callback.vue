<template>
  <div>
    <p v-if="!person">We are setting everything up....</p>
    <ul v-if="progressMessages.length">
      <li v-for="(msg, index) in progressMessages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      person: null,
      progressMessages: []
    }
  },
  async mounted() {
    this.person = await this.getUser()
    console.log(this.person)
    if (!this.person) {
      this.progressMessages.push('... creating initial boards...')
      await this.userSetup()
      this.progressMessages.push(`... Done... redirecting...`)
    }
    this.$router.push('/')
  },
  methods: {
    async userSetup() {
      await this.createPerson()
      const boardId = await this.createDefaultBoard()
      const listIds = await this.createDefaultLists(boardId)
      await this.createWelcomeCard(listIds[0])
    },
    async createPerson() {
      const input = {
        person: {
          userId: this.$auth.user.sub
        }
      }
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createPerson($input: CreatePersonInput!) {
              createPerson(input: $input) {
                clientMutationId
              }
            }
          `,
          variables: {
            input
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    async createDefaultLists(boardId) {
      this.progressMessages.push(`... creating default lists ...`)
      const listNames = ['Backlog', 'Applied', 'Interview', 'Offer', 'Negative']
      const listIds = []
      for (let i = 0; i < listNames.length; i++) {
        const name = listNames[i]
        const order = i
        this.progressMessages.push(`... list ${name}...`)
        const input = { list: { name, boardId, order } }
        try {
          const { data } = await this.$apollo.mutate({
            mutation: gql`
              mutation createList($input: CreateListInput!) {
                createList(input: $input) {
                  list {
                    id
                  }
                }
              }
            `,
            variables: {
              input
            }
          })
          this.progressMessages.push(`OK!`)
          listIds.push(data.createList.list.id)
        } catch (e) {
          console.error(e)
        }
      }
      return listIds
    },
    async createDefaultBoard() {
      const input = {
        board: { name: 'Default' }
      }
      this.progressMessages.push(`... Creating default board...`)
      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation createBoard($input: CreateBoardInput!) {
              createBoard(input: $input) {
                board {
                  id
                }
              }
            }
          `,
          variables: {
            input
          }
        })
        this.progressMessages.push(`OK!`)
        return data.createBoard.board.id
      } catch (e) {
        console.error(e)
      }
    },
    async createWelcomeCard(listId) {
      const input = {
        card: { name: 'Welcome', listId }
      }
      this.progressMessages.push(`... Creating welcome card...`)
      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation createCard($input: CreateCardInput!) {
              createCard(input: $input) {
                card {
                  id
                }
              }
            }
          `,
          variables: {
            input
          }
        })
        this.progressMessages.push(`OK!`)
        return data.createCard.card.id
      } catch (e) {
        console.error(e)
      }
    },
    async getUser() {
      await this.$auth.fetchUser()
      const userId = this.$auth.user.sub
      let person = null
      try {
        const { data } = await this.$apollo.query({
          query: gql`
            query person($userId: String!) {
              person(userId: $userId) {
                id
                userId
                createdAt
              }
            }
          `,
          variables: {
            userId
          }
        })
        console.log(data)
        person = data.person
      } catch (e) {
        console.error(e)
      }
      return person
    }
  }
}
</script>
