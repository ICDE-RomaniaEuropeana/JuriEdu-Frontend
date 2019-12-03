<template>
  <div class="search-ahead">
    <form @submit="formAction">
      <vue-bootstrap-typeahead
        :data="questions"
        v-model="search"
        size="lg"
        :serializer="serialize"
        :value="value"
        placeholder="Vreau să știu despre..."
        @hit="setSelected($event)"
      />
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    </form>
  </div>
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'

const API_URL = `${process.env.VUE_APP_API_ENDPOINT}`.trim("/")

export default {
  name: 'search-ahead',

  props: ['value'],

  components: {
    VueBootstrapTypeahead
  },

  data() {
    return {
      results: {},
      questions: [],
      search: '',
      loading: false,
      selected: null,
    }
  },

  methods: {
    async autocomplete(query) {
      this.loading = true;
      const res = await fetch(`${API_URL}/question/autocomplete?search=:query`.replace(':query', query), {mode: 'cors'})
      const suggestions = await res.json()
      this.questions = suggestions.questions
      this.results = suggestions.results
      this.loading = false
    },
    async fullSearch(query) {
      const res = await fetch(`${API_URL}/question/search?search=:query`.replace(':query', query), {mode: 'cors'})
      this.selected = await res.json()
      this.loading = false
    },
    serialize(entry) {
      return entry.label
    },
    setSelected(event) {
      this.selected = [this.results[event.id]]
    },
    formAction(event) {
      this.fullSearch(this.search)
      event.preventDefault();
    }
  },

  watch: {
    selected(value) {
      this.$emit('input', value);
    },
    search: _.debounce(function(value) {
      if (value === "") {
        this.selected = null
      }

      this.autocomplete(value)
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
