<template>
  <vue-bootstrap-typeahead
    :data="questions"
    v-model="search"
    size="lg"
    :serializer="s => s.text"
    placeholder="Vreau să știu despre..."
    @hit="selectedQuestion = $event"
  />
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'

const API_URL = `https://${process.env.ES_API_ENDPOINT}?query=:query`

export default {
  name: 'search-ahead',

  components: {
    VueBootstrapTypeahead
  },

  data() {
    return {
      questions: [],
      search: '',
      selectedQuestion: null
    }
  },

  methods: {
    async autocomplete(query) {
      const res = await fetch(API_URL.replace(':query', query))
      const suggestions = await res.json()
      this.question = suggestions.suggestions
    }
  },

  watch: {
    addressSearch: _.debounce(function(addr) { this.autocomplete(addr) },
      500)
  }
}
</script>
