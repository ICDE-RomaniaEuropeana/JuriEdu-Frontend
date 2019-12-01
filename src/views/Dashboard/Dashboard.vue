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
          <form>
            <search-ahead v-model="selected" />
          </form>
        </div>
      </div>

      <transition name="slide-fade">
        <div class="card mb-4" v-if="selected">
          <div class="card-header">
            <h3 class="mb-0">{{ selected.chapter }}</h3>
          </div>
          <div class="card-body">
            <div v-show="selected" v-html="selected.answer"></div>
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
<style></style>
