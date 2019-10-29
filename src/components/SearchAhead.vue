<template>
  <vue-bootstrap-typeahead
    :data="results"
    v-model="search"
    size="lg"
    :serializer="s => s.title"
    placeholder="Vreau să știu despre..."
    @hit="selectedQuestion = $event"
  />
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'

const API_URL = `https://${process.env.VUE_APP_ES_API_ENDPOINT}?query=:query`

export default {
  name: 'search-ahead',

  components: {
    VueBootstrapTypeahead
  },

  data() {
    return {
      results: [],
      search: '',
      selectedQuestion: null
    }
  },

  methods: {
    async autocomplete(query) {
      const res = await fetch(API_URL.replace(':query', query))
      const suggestions = await res.json()
      this.results = suggestions;
    }
  },

  watch: {
    search: _.debounce(function(value) { this.autocomplete(value) }, 500)
  }
}
</script>
