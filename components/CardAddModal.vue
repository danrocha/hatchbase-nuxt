<template>
  <div ref="loadingContainer" class="p-12 m-4">
    <h2 class="mb-8 text-4xl font-bold text-center">
      Add a new job
    </h2>
    <card-actions @success-add="showCardDetails" />
    <!-- FETCH FROM URL -->
    <div v-if="!showForm">
      <form class="mb-8" @submit.prevent="fetchJobDetails()">
        <label class="block mb-2 text-gray-600" for="url"
          >Paste the job ad's URL so we can fetch the details for you:</label
        >
        <p class="mb-2">
          <el-input
            v-model="url"
            :disabled="loading"
            placeholder="http://..."
          />
        </p>
        <div class="flex mb-8">
          <el-button type="primary" :loading="loading" native-type="submit"
            >Add</el-button
          >
          <button class="ml-4 text-gray-600 underline" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
      <p class="text-gray-600">
        Or
        <button class="text-blue-500 underline" @click="showForm = true">
          add details manually.
        </button>
      </p>
    </div>
    <div v-else>
      <form>
        <p class="mb-4">
          <label class="block mb-2 text-gray-600" for="applicationTitle"
            >What's the name of this application?</label
          >
          <base-input
            v-model="details.title"
            name="applicationTitle"
            placeholder="Junior Architect at OMA"
          />
        </p>
        <div class="flex flex-wrap mb-4">
          <p class="w-1/2 pr-4">
            <label class="block mb-2 text-gray-600" for="officeName"
              >What's the office name?</label
            >
            <base-input
              v-model="details.office"
              name="officeName"
              placeholder="OMA HK"
            />
          </p>
          <p class="w-1/2">
            <label class="block mb-2 text-gray-600" for="officeUrl"
              >What's the office website?</label
            >
            <base-input
              v-model="details.officeUrl"
              name="officeUrl"
              placeholder="https://oma.eu/"
            />
          </p>
        </div>
        <div class="flex mb-8">
          <base-button :loading="loading" type="submit" class="mr-4"
            >Add</base-button
          >
          <button class="text-gray-600 underline" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
      Or
      <button class="text-blue-500 underline" @click="showForm = false">
        go back to automatic.
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import CardActions from '@/components/CardActions'
import BaseButton from '@/components/BaseButton'
export default {
  components: {
    BaseButton,
    BaseInput,
    CardActions
  },
  props: {
    listId: {
      type: Number,
      default: null
    },
    nextOrder: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      url: '',
      showForm: false,
      loading: false,
      details: { title: '', officeName: '', officeUrl: '' },
      loaded: false,
      loader: null
    }
  },
  methods: {
    async fetchJobDetails() {
      console.log('Started fetching...')
      this.loading = true
      this.$nuxt.$loading.start()

      const url = this.url
      try {
        const details = await this.$axios.$get(
          `http://localhost:4000/get-job-info?url=${url}`
        )
        if (!details.title)
          throw new Error(
            'We could not reach this URL, connection timed out! Try again...'
          )
        this.details = {
          ...details,
          listId: this.listId,
          order: this.nextOrder
        }
        console.log('...done fetching!')
        this.$bus.$emit('card-add', { card: { ...this.details } })
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
        this.$nuxt.$loading.finish()
      }
    },
    showCardDetails(e) {
      console.log('now changing to show card details with card info:', e)

      const newCard = e
      this.$bus.$emit('modal-card-details', newCard)
    }
  }
}
</script>

<style lang="scss" scoped></style>
