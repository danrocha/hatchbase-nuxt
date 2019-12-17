<template>
  <div id="card-pane-details">
    <div id="office-name">
      <p v-if="card.officeName" class="font-bold">
        {{ card.officeName }}
        {{ card.officeURL }}
      </p>
    </div>

    <div id="office-location">
      <p v-if="card.city">
        <span class="text-xs font-bold tracking-wide text-gray-500 uppercase"
          >Location</span
        ><br />{{ card.city
        }}<span v-if="card.country">, {{ card.country }}</span>
      </p>
    </div>

    <div id="office-description-html">
      <p v-if="card.officeName">
        <span class="text-xs font-bold tracking-wide text-gray-500 uppercase"
          >Office</span
        ><br />{{ card.officeName }}
      </p>
    </div>

    <!-- POSITION -->
    <div id="posted-on">
      <p v-if="card.postedOn">
        <span class="text-xs font-bold tracking-wide text-gray-500 uppercase"
          >Posted On</span
        ><br />{{ card.postedOn }}
      </p>
    </div>

    <div id="description-html">
      <p class="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
        Description
      </p>
      <div
        v-if="card.descriptionHtml"
        class="p-2 border border-black rounded sm:p-4 html-description"
        v-html="card.descriptionHtml"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
#card-pane-details {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-template-areas:
    'job-title'
    'job-type'
    'office-name'
    'office-location'
    'posted-on'
    'description-html';
}

@screen sm {
  #card-pane-details {
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-template-areas:
      'job-title job-type'
      'office-name office-location'
      'posted-on posted-on'
      'description-html description-html';
  }
}

#job-title {
  grid-area: job-title;
}
#job-type {
  grid-area: job-type;
}
#office-name {
  grid-area: office-name;
}
#office-location {
  grid-area: office-location;
}
#posted-on {
  grid-area: posted-on;
}
#description-html {
  grid-area: description-html;
}
</style>
