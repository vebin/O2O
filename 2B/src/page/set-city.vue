<template>
<div class="wraper">
  <search-header :source="source"></search-header>
  <div v-if="!searching" class="city-wrap">
    <CityList v-if="searchList === null"></CityList>
    <search-list v-else :searchList="searchList" :source="source"></search-list>
    <div v-if='searchList !== null '>
       <search-null></search-null>
    </div>
  </div>
  <div class="search-info" v-else>
    <section class="nearby-shops-model">
      <ul class="shops-list" v-if="shops.length">
        <li v-for="shop in shops">
          <nearby-list :shopData="shop"></nearby-list>
        </li>
      </ul>
    </section>
  </div>
</div>
</template>

<script>
import SearchHeader from '../components/join/search-header.vue'
import CityList from '../components/search/city-list.vue'
import SearchList from '../components/search/searchList.vue'
import SearchNull from '../components/search/SearchNull.vue'
import NearbyList from '../components/global/nearby-list.vue'
export default {
  components: {SearchHeader, CityList, SearchList, NearbyList, SearchNull},
  data () {
    return {
      source: '0', // 地区
      searchList: null,
      citylist: '',
      shops: [],
      searching: false // 选择状态
    }
  },
  created () {
  },
  mounted () {
    this.settitle()
  },
  methods:{
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '选择城市'
        this.getWxconfig()
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'选择城市'})
      }
    }
  }
}
</script>

<style scoped>
  .wraper,.city-wrap{
    height: 100%;
  }
  .search-info{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;  
    padding-top: 60px;
    box-sizing: border-box; 
  }
</style>
