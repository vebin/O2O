<template>
<div class="wraper">
  <div class="content">
    <search-header></search-header>
    <Service-brand></Service-brand>
  </div>
  <Service-brand-footer></Service-brand-footer>
</div>
</template>

<script>
import SearchHeader from '../components/search-header.vue'
import ServiceBrand from '../components/Service-brand.vue'
import ServiceBrandFooter from '../components/Service-brand-footer.vue'
export default {
  components: {SearchHeader, ServiceBrand, ServiceBrandFooter},
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  
</style>
