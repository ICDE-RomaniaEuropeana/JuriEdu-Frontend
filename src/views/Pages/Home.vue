<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="mb-0">Caută</h3>
        </div>
        <div class="card-body">
          <search-ahead v-model="selected" />
        </div>
      </div>

      <transition name="slide-fade">
        <div class="card mb-4" v-if="selected">
          <div class="card-header">
            <h3 class="mb-0">Rezultate</h3>
          </div>
          <div class="card-body">
            <div v-for="(result, idx) in selected" v-bind:key="idx" v-show="selected">
              <h3><span v-for="(question, qi) in result.questions" v-bind:key="qi">{{ question }}<br v-if="qi < (result.questions.length - 1)"/></span></h3>
              <div v-html="result.answer"></div>
              <hr v-if="idx < (selected.length -1)">
            </div>
            <h3 class="text-center" v-if="selected.length === 0">Ne pare rău, nu s-au găsit rezultate pentru căutarea ta :(</h3>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
import SearchAhead from '@/components/SearchAhead';

export default {
  components: {
    RouteBreadCrumb,
    SearchAhead,
  },

  data() {
    return {
      selected: null,
    }
  },
};
</script>
<style lang="scss">
$highlight-color: rgba(255, 246, 219, 0.65);

.alert-block {
  margin-top: 2.5rem;

  .alert-icon {
    margin-right: .5rem;
  }

  .alert-title {
    vertical-align: middle;
  }

  .alert-text {
    margin-top: 1rem;
  }

  .highlight {
    background-color: rgba($highlight-color, .15);
  }
}

.highlight {
  background-color: $highlight-color;
}
</style>
