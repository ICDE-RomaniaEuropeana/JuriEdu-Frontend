<template>
  <div class="search-ahead">
    <vue-bootstrap-typeahead
      :data="results"
      v-model="search"
      size="lg"
      :serializer="s => s.message"
      :value="value"
      placeholder="Vreau să știu despre..."
      @hit="selectedQuestion = $event"
      />
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
  </div>
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'

const API_URL = `${process.env.VUE_APP_ES_API_ENDPOINT}?search=:query&type=question`

export default {
  name: 'search-ahead',

  props: ['value'],

  components: {
    VueBootstrapTypeahead
  },

  data() {
    return {
      results: [],
      search: '',
      loading: false,
      selectedQuestion: null,
    }
  },

  methods: {
    async autocomplete(query) {
      this.loading = true;
      const res = await fetch(API_URL.replace(':query', query), {mode: 'cors'});
      const suggestions = await res.json();
      this.results = suggestions;
      this.loading = false;
    }
  },

  watch: {
    selectedQuestion(value) {
      this.$emit('input', value);
    },
    search: _.debounce(function(value) {
      if (value === "") {
        this.selectedQuestion = null;
      }

      this.autocomplete(value);
    }, 500)
  }
}
</script>
<style>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance:none;
}

.search-ahead {
  position: relative;
}

.search-ahead  .fa-spinner {
  position: absolute;
  top: 19px;
  right: 19px;
}
</style>
