<template>
  <div class="term-dictionary">
    <ul class="list-unstyled">
      <li v-for="(definition, term) in terms" v-bind:key="term"><strong class="term">{{ term }}</strong>: <em class="definition">{{ definition }}</em></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'term-dictionary',

  data() {
    return {
      terms: {},
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const res = await fetch(`/dictionary.json`)
      const json = await res.json()
      this.terms = json.terms
    },
  }
}
</script>
<style scoped>
.term {
  text-transform: uppercase;
}
</style>
