<template>
<div class="wraper">
  <search-header :source="source"></search-header>
  <Service-brand :selectedNum='brand.selectNum' :selectText='brand.selectTexts' v-if="searchList === null"></Service-brand>
  <search-list v-else :searchList="searchList" :source="source" :selectText='brand.selectTexts' :selectedNum='brand.selectNum'></search-list>
  <Service-brand-footer></Service-brand-footer>
  <select-brand></select-brand>
</div>
</template>

<script>
import SearchHeader from '../components/search/search-header.vue'
import ServiceBrand from '../components/brand/Service-brand.vue'
import ServiceBrandFooter from '../components/brand/Service-brand-footer.vue'
import SelectBrand from '../components/brand/select-brand.vue'
import SearchList from '../components/search/searchList'
export default {
  components: {SearchHeader, ServiceBrand, ServiceBrandFooter, SelectBrand, SearchList},
  data () {
    return {
      source: '1', // 地区
      searchList: null
    }
  },
  created () {
  },
  mounted (){
    this.settitle()
  },
  computed: {
    brand () { return this.$store.state.brand }  // 用户是否入住成功状态
  },
  methods:{
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'选择服务品牌'})
      } else {
        window.document.title = '选择服务品牌'
        this.hideshare()
      }
    }
  }
}
</script>

<style scoped>
  .wraper{
    height: 100%;
  }
</style>
