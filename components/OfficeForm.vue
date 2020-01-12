<template>
  <div class="mb-12">
    <!-- AUTOMATIC FETCH -->
    <div v-if="card.officeName">
      <div v-if="location && office">
        <p class="mb-2">Is this correct?</p>
        <div class="flex">
          <el-button type="primary" :loading="loading" @click="save"
            >Yes!</el-button
          >
          <button class="ml-4 text-gray-600 underline" @click="restart">
            No, start again
          </button>
        </div>
      </div>
      <office-form-office v-if="location" @confirm="confirmOffice" />
      <office-form-location :key="formLocationKey" @confirm="confirmLocation" />
      <!-- <div v-if="step === 0">
        <office-form-step-1-auto
          v-if="card.officeName"
          @confirm="confirmLocation"
        />
        <office-form-step-1-manual v-else @confirm="confirmOfficeAndLocation" />
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
      </div> -->
    </div>
    <!-- MANUAL ADD -->
    <div v-else>
      <div v-if="step === 0">
        <office-form-step-1-manual @confirm="confirmOfficeAndLocation" />
      </div>

      <!-- <div v-if="step === 1">
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
      </div> -->
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
import { mapActions, mapState } from 'vuex'
import OfficeFormLocation from '@/components/OfficeFormLocation'
import OfficeFormStep1Manual from '@/components/OfficeFormStep1Manual'
import OfficeFormOffice from '@/components/OfficeFormOffice'

export default {
  name: 'OfficeForm',
  components: {
    OfficeFormOffice,
    OfficeFormLocation,
    OfficeFormStep1Manual
  },
  data() {
    return {
      loading: false,
      step: 0,
      status: '',
      formLocationKey: 0
    }
  },
  computed: {
    ...mapState({
      office: (state) => state.addOffice.office,
      fetchedDetails: (state) => state.addOffice.fetchedDetails,
      location: (state) => state.addOffice.location,
      card: (state) => state.card.currentCard
    })
  },
  methods: {
    ...mapActions([
      'addOffice/setLocation',
      'addOffice/setOffice',
      'addOffice/resetAll'
    ]),
    confirmLocation(location) {
      console.log('Location confirmed!')
      this['addOffice/setLocation'](location)
      this.step += 1
    },
    confirmOffice() {
      console.log('Office confirmed!')
      this['addOffice/setOffice'](this.fetchedDetails)
      this.save()
    },
    confirmOfficeAndLocation(details) {
      console.log('Location and office confirmed!')
      this['addOffice/setLocation'](details)
      this['addOffice/setOffice'](details)
      this.step += 2
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
      this['addOffice/resetAll']()
      this.$bus.$emit('card-fetch', this.card.id)
      setTimeout(() => {
        this.$emit('finished')
      }, 2000)
    },
    restart() {
      this.formLocationKey += 1
      this['addOffice/resetAll']()
      this.step = 0
    }
  }
}
</script>

<style lang="scss" scoped></style>
