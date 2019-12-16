<template>
  <div class="p-12">
    <h2 class="mb-8 text-2xl font-bold text-center">
      Add a new job to be tracked
    </h2>
    <!-- FETCH FROM URL -->
    <div v-if="!loaded && !showForm">
      <form @submit.prevent="fetchJobDetails()" class="mb-8">
        <label class="block mb-2 text-gray-600" for="url"
          >Paste the job ad's URL so we can fetch the details for you:</label
        >
        <p class="flex">
          <base-input
            v-model="url"
            :disabled="loading"
            class="mr-2"
            placeholder="http://..."
          />
          <base-button :loading="loading" type="submit">
            Add
          </base-button>
        </p>
      </form>
      <p class="text-gray-600">
        Or
        <button @click="manualAdd" class="text-blue-500 underline">
          add details manually.
        </button>
      </p>
    </div>
    <div v-else>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Application name:</label
        >
        <base-input v-model="details.title" placeholder="Architect at B.I.G" />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Short Description</label
        >
        <base-input
          v-model="details.description"
          placeholder="Architect at B.I.G starting in February"
        />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Office</label
        >
        <base-input v-model="details.office" placeholder="B.I.G" />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Location</label
        >
        <base-input v-model="details.city" placeholder="Copenhagen" />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Job Title</label
        >
        <base-input
          v-model="details.jobTitle"
          placeholder="Associate Architect"
        />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Job Type</label
        >
        <base-input v-model="details.jobTitle" placeholder="Full Time" />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Posted On</label
        >
        <base-input v-model="details.postedOn" placeholder="Nov 8th" />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Description</label
        >
        <editor v-model="details.descriptionHtml" />
      </p>
      <p>
        <label class="block mb-2 text-gray-600" for="applicationTitle"
          >Ad URL</label
        >
        <base-input v-model="details.url" placeholder="https://..." />
      </p>
      <button @click="showForm = false">Back</button>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import Editor from '@/components/Editor'
export default {
  components: {
    Editor,
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
      details: { title: '' },
      loaded: false
    }
  },
  methods: {
    async fetchJobDetails() {
      this.loading = true
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
      }
    },
    manualAdd() {
      this.showForm = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
