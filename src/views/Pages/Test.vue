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
          <h3 class="mb-0">Legal Test {{ $route.params.id }}</h3>
        </div>
        <div class="card-body">
          <iframe ref="test-iframe" class="test-iframe" scrolling="no" frameborder="0" allowtransparency="true":src="testUrl" :height="iframeHeight"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';

export default {
  components: {
    RouteBreadCrumb,
  },
  data() {
    return {
      iframeHeight: 620,
    };
  },
  computed: {
    testUrl() {
      return `https://educatiejuridica.ro/legaltest-${this.$route.params.id}`
    },
  },
  mounted() {
    window.addEventListener('message', this.handleIframeResize);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleIframeResize);
  },
  methods: {
    handleIframeResize(e) {
      for(var b in e.data['datawrapper-height']) {
        if ('test-iframe' === b) {
          this.iframeHeight =
            e.data['datawrapper-height'][b];
        }
      }
    },
  },
};
</script>
<style lang="scss">
.test-iframe {
  display: block;
  width: 395px;
  margin: 0 auto;
  border: 0;
}
</style>
