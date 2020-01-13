<template>
  <div ref="loadingContainer" class="p-12 m-4">
    <h2 class="mb-8 text-4xl font-bold text-center">
      Add a new job
    </h2>
    <card-actions @success-add="showCardDetails" />
    <!-- FETCH FROM URL -->
    <div v-if="!manual">
      <el-form
        ref="formAuto"
        :model="formAuto"
        :rules="rulesAuto"
        class="mb-8"
        @submit.native="submitForm('formAuto')"
      >
        <div class="mb-6">
          <el-form-item
            prop="url"
            label="Paste the job ad's URL so we can fetch the details for you:"
          >
            <!-- <label class="block mb-2 text-gray-600" for="url"
            >Paste the job ad's URL so we can fetch the details for you:</label
          >-->
            <el-input
              v-model="formAuto.url"
              :disabled="loading"
              placeholder="http://..."
            />
          </el-form-item>
        </div>
        <el-form-item class="flex mb-8">
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm('formAuto')"
            >Add</el-button
          >
          <el-button type="text" @click="$emit('close')">
            Cancel
          </el-button>
        </el-form-item>
      </el-form>
      <p class="text-gray-600">
        Or
        <button class="text-blue-500 underline" @click="manual = true">
          add details manually.
        </button>
      </p>
    </div>
    <div v-else>
      <el-form
        ref="formManual"
        :model="formManual"
        :rules="rulesManual"
        class="mb-8"
      >
        <el-form-item prop="title" label="What's the name of this application?">
          <!-- <label class="block mb-2 text-gray-600" for="applicationTitle"
              >What's the name of this application?</label
            > -->
          <el-input
            v-model="formManual.title"
            placeholder="Junior Architect at OMA"
          />
        </el-form-item>
        <div class="flex flex-wrap mb-4">
          <el-form-item
            class="w-1/2 pr-4"
            prop="officeName"
            label="What's the office's name?"
          >
            <!-- <label class="block mb-2 text-gray-600" for="officeName"
              >What's the office name?</label
            > -->
            <el-input v-model="formManual.officeName" placeholder="OMA HK" />
          </el-form-item>

          <el-form-item
            class="w-1/2"
            prop="officeUrl"
            label="What's the office website?"
          >
            <!-- <label class="block mb-2 text-gray-600" for="officeUrl"
              >What's the office website?</label
            > -->
            <el-input
              v-model="formManual.officeUrl"
              placeholder="https://oma.eu/"
            />
          </el-form-item>
        </div>
        <el-form-item class="flex mb-8">
          <el-button
            :loading="loading"
            type="primary"
            class="mr-4"
            @click="submitForm('formManual')"
            >Add</el-button
          >
          <el-button type="text" @click="$emit('close')">
            Cancel
          </el-button>
        </el-form-item>
      </el-form>
      Or
      <button class="text-blue-500 underline" @click="manual = false">
        go back to automatic.
      </button>
    </div>
  </div>
</template>

<script>
import CardActions from '@/components/CardActions'
export default {
  components: {
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
      formAuto: {
        url: ''
      },
      rulesAuto: {
        url: [
          {
            type: 'url',
            required: true,
            message: 'Please paste a URL',
            trigger: 'blur'
          }
        ]
      },
      manual: false,
      loading: false,
      formManual: { title: '', officeName: '', officeUrl: '' },
      rulesManual: {
        title: [
          {
            required: true,
            message:
              'Please enter a name for you card (usually the job ad title)',
            trigger: 'blur'
          }
        ],
        officeName: [
          {
            required: true,
            message: 'Please enter the name of the hiring office',
            trigger: 'blur'
          }
        ],
        officeUrl: [
          {
            type: 'url',
            message: 'This does not seem to be a correct URL! Double check?',
            trigger: 'blur'
          }
        ]
      },
      loaded: false,
      loader: null
    }
  },
  methods: {
    async fetchJobDetails(url) {
      console.log('Started fetching...')
      this.$nuxt.$loading.start()

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
    },
    submitForm(formName) {
      this.loading = true

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'formAuto') {
            this.fetchJobDetails(this.formAuto.url)
          } else {
            console.log('adding manual details:', this.formManual)
            this.addManualCard(this.formManual)
          }
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    addManualCard({ title, officeName, officeUrl }) {
      const details = {
        title,
        officeName,
        officeUrl,
        listId: this.listId,
        order: this.nextOrder
      }
      this.$bus.$emit('card-add', { card: { ...details } })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
