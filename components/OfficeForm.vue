<template>
  <div class="mb-12">
    <el-steps :active="step" class="mb-8" finish-status="success">
      <el-step title="Step 1" description="Location"></el-step>
      <el-step title="Step 2" description="Office"></el-step>
      <el-step
        title="Step 3"
        description="Confirmation"
        :status="status"
      ></el-step>
    </el-steps>

    <div v-if="step === 0">
      <office-form-step-1 :card="card" @confirm="confirmLocation" />
    </div>

    <div v-if="step === 1">
      <office-form-step-2
        :card="card"
        :location="location"
        @confirm="confirmOffice"
      />
    </div>
    <div v-if="step === 2" v-loading="loading">
      <office-form-step-3
        :card="card"
        :location="location"
        :office="office"
        @restart="restart"
        @confirm="save"
      />
    </div>
    <div v-if="step === 3" class="h-24">
      <p class="font-bold text-center">
        Completed! Reloading the office pane...
      </p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import OfficeFormStep1 from '@/components/OfficeFormStep1'
import OfficeFormStep2 from '@/components/OfficeFormStep2'
import OfficeFormStep3 from '@/components/OfficeFormStep3'
export default {
  name: 'OfficeForm',
  components: {
    OfficeFormStep3,
    OfficeFormStep2,
    OfficeFormStep1
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      location: null,
      office: null,
      step: 0,
      status: ''
    }
  },
  methods: {
    confirmLocation(location) {
      console.log('Location confirmed!')
      console.dir(location)
      this.location = location
      this.step += 1
    },
    confirmOffice(office) {
      console.log('Office confirmed!')
      console.dir(office)
      this.office = office
      this.step += 1
    },
    async save() {
      this.loading = true
      this.status = 'wait'
      // save location
      const input = {
        office: this.office,
        location: this.location,
        cardId: this.card.id
      }
      console.dir(input)
      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation addOfficeAndLocation($input: AddOfficeAndLocationInput!) {
              addOfficeAndLocation(input: $input) {
                location {
                  id
                }
              }
            }
          `,
          variables: {
            input
          },
          refetchQueries: ['card']
        })
        this.status = 'success'
        this.finalize()
        console.log(data)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    finalize() {
      this.step += 1
      this.$bus.$emit('card-fetch', this.card.id)
      setTimeout(() => {
        this.$emit('finished')
      }, 2000)
    },
    restart() {
      this.location = this.office = null
      this.step = 0
    }
  }
}
</script>

<style lang="scss" scoped></style>
