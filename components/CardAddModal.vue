<template>
  <div ref="loadingContainer" class="p-12 m-4">
    <h2 class="mb-8 text-4xl font-bold text-center">
      Add a new job
    </h2>
    <!-- FETCH FROM URL -->
    <div v-if="!showForm">
      <form @submit.prevent="fetchJobDetails()" class="mb-8">
        <label class="block mb-2 text-gray-600" for="url"
          >Paste the job ad's URL so we can fetch the details for you:</label
        >
        <p class="mb-2">
          <base-input
            v-model="url"
            :disabled="loading"
            class="mr-2"
            placeholder="http://..."
          />
        </p>
        <div class="flex mb-8">
          <base-button :loading="loading" type="submit" class="mr-4"
            >Add</base-button
          >
          <button @click="$emit('close')" class="text-gray-600 underline">
            Cancel
          </button>
        </div>
      </form>
      <p class="text-gray-600">
        Or
        <button @click="showForm = true" class="text-blue-500 underline">
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
          <button @click="$emit('close')" class="text-gray-600 underline">
            Cancel
          </button>
        </div>
      </form>
      Or
      <button @click="showForm = false" class="text-blue-500 underline">
        go back to automatic.
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
export default {
  components: {
    BaseButton,
    BaseInput
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
      this.loading = true
      // this.$nuxt.$loading.start()
      this.loader = this.$loading.show({
        container: this.$refs.loadingContainer,
        color: '#ECC94B',
        loader: 'spinner',
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        opacity: 0.5,
        zIndex: 999
      })
      const url = this.url
      try {
        const details = await this.$axios.$get(
          `http://localhost:4000/get-job-info?url=${url}`
        )
        this.details = details
        this.loaded = true
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
        // this.$nuxt.$loading.finish()
        this.loader.hide()
      }
    },
    manualAdd() {
      this.showForm = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
