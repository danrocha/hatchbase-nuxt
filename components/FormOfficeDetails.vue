<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item label="Office Name" prop="name">
      <el-input v-model="form.name" placeholder="B.I.G." />
    </el-form-item>
    <el-form-item label="Website" prop="website">
      <el-input v-model="form.website" placeholder="https://big.dk" />
    </el-form-item>
    <el-form-item label="Phone Number">
      <el-input
        v-model="form.international_phone_number"
        placeholder="+45 7221 7227"
      />
    </el-form-item>
    <el-form-item class="flex mb-8">
      <el-button type="primary" class="mr-4" @click="submitForm"
        >Save</el-button
      >
      Or
      <button class="text-blue-500 underline" @click="manual = false">
        go back to automatic.
      </button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'FormOfficeDetails',
  data() {
    return {
      form: {
        name: '',
        website: '',
        international_phone_number: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter the name of the hiring office',
            trigger: 'blur'
          }
        ],
        website: [
          {
            type: 'url',
            message: 'This does not seem to be a correct URL! Double check?',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      fetchedDetails: (state) => state.addOffice.fetchedDetails
    })
  },
  mounted() {
    this.form.name = this.fetchedDetails.name
    this.form.website = this.fetchedDetails.website
    this.form.international_phone_number = this.fetchedDetails.international_phone_number
  },
  methods: {
    ...mapActions(['addOffice/setOffice', 'addOffice/setFetchedDetails']),
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this['addOffice/setOffice']({ ...this.form })
          this.$emit('confirm')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
