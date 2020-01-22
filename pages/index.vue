<template>
  <div>
    <section id="header" class="relative">
      <div
        class="relative z-10 p-4 bg-white shadow-md md:w-3/4 md:p-6 lg:p-8 lg:w-1/2 lg:absolute lg:left-0"
      >
        <h1 class="mb-4 text-4xl font-bold leading-none">
          Take your architecture career to the next level
        </h1>
        <p class="mb-12">
          <strong>hatchbase</strong> keeps your portfolio updated, helps you
          develop your professional network, and organizes your job application
          process.
        </p>
        <div>
          <mailchimp />
        </div>
      </div>
      <!-- <div class="flex justify-end">
        <img src="~/assets/images/success01.png" class="w-full image-1" />
      </div> -->
    </section>
    <section
      id="quote"
      class="relative flex sm:-mt-24 sm:ml-12 md:m-0 md:justify-end md:mt-64 md:mr-24"
    >
      <div class="p-4 bg-white shadow-md md:p-6 lg:p-8 sm:w-1/2 ">
        <p class="mb-4 text-xl font-bold leading-tight text-center">
          How do you feel about your career?
        </p>
        <p class="text-xl leading-tight text-center">
          As an architect, you career only moves as slow as you want.
          <strong>hatchbase</strong> is an app to keep you always ready to
          explore new opportunities.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Mailchimp from '@/components/Mailchimp'
export default {
  auth: false,
  components: {
    Mailchimp
  }
}
</script>

<style>
@screen sm {
  .image-1 {
    @apply w-4/5 -mt-8;
  }
}
@screen md {
  .image-1 {
    @apply absolute right-0 top-0 mt-24 -mr-24;
  }
}
@screen lg {
  .image-1 {
    @apply w-4/5 -mt-24;
  }
}
@screen xl {
  .image-1 {
    @apply w-3/4;
  }
}
</style>
