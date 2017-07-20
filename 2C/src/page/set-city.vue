<template>
<div class="wraper">
  <search-header :source="source"></search-header>
  <CityList v-if="searchList === null"></CityList>
  <div class="search-result" v-else><search-list :searchList="searchList" :source="source"></search-list></div>
</div>
</template>

<script>
import SearchHeader from '../components/search/search-header.vue'
import CityList from '../components/city/city-list.vue'
import SearchList from '../components/search/searchList'
export default {
  components: {SearchHeader, CityList, SearchList},
  data () {
    return {
      source: '0', // 地区
      searchList: null
    }
  },
  created () {
    if (this.setApp()!=='other') {
      this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'选择城市'})
    } else {
      window.document.title = '选择城市'
      this.hideshare()
    }
  }
}
</script>

<style scoped>
  .wraper{
    height: 100%;
  }
</style>
