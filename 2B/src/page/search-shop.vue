<template>
<div class="wraper">
  <search-header :source="source" v-if="!cancelLocation"></search-header>
  <div v-if="cancelLocation" class="no-location">
        未获取定位，无法使用此功能！
  </div>
  <div class="search-info" @scroll="loadMore">
    <section class="nearby-shops-model">
      <ul class="shops-list" v-if="shops.length">
        <li v-for="shop in shops">
          <nearby-list :shopData="shop"></nearby-list>
        </li>
      </ul>
    </section>
    <div v-if="shops.length">
      <loading :end="list_end"></loading>
    </div>
    <div v-if='search && !shops.length'>
       <search-null></search-null>
    </div>
  </div>
</div>
</template>

<script>
import SearchHeader from '../components/join/search-header.vue'
import CityList from '../components/search/city-list.vue'
import SearchList from '../components/search/searchList.vue'
import nearbyList from '../components/global/nearby-list.vue'
import SearchNull from '../components/search/SearchNull.vue'
import Loading from '../components/global/loading.vue'
import XHR from '../api'
import storage from '../store/storage.js'
export default {
  components: {SearchHeader, CityList, SearchList, nearbyList, SearchNull, Loading},
  data () {
    return {
      source: '2', // 地区
      searchList: null,
      shops: [],
      search: false,
      keyword: '',
      pagenum: 2,
      loamore: false,
      list_end: false,
      cancelLocation:false
    }
  },
  created () {
    this.getIsGps()
  },
  mounted () {
    this.settitle()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '搜索店铺'
        this.getWxconfig()
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'搜索店铺'})
      }
    },
    getIsGps () {          // 判断是否允许定位
      let joinInfo = storage.get('recommend')        
      if (joinInfo) {
        joinInfo = JSON.parse(joinInfo)
        if(!joinInfo.lng){
          this.cancelLocation = true
        } else {
          this.ShopData.lng = joinInfo.lng 
          this.ShopData.lat = joinInfo.lat
        }
      }
    },
    loadMore (e) {
      if (e.target.scrollTop + window.innerHeight >= e.target.scrollHeight && !this.loamore){
        let json = {
          lng: this.ShopData.lng,
          lat: this.ShopData.lat,
          keyword: this.keyword,
          page: this.pagenum
        }
        this.loamore = true
        XHR.nearbyShopList(json).then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.shops.push(res.data[i])
          }
          if ( res.data.length < 20) {
            this.loamore = true
            this.list_end = true
          } else {
            this.pagenum ++
            this.loamore = false
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .wraper{
    height: 100%;
  }
  .search-info{
    padding-top: 70px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
  }
  .no-location{
    margin:160px auto;
    padding:15px;
    text-align:center;
  }
  .nearby-shops-model{
    background: #f5f5f5;
  }
  .shops-list{
    padding-top: 15px;
    background: #fff;
  }
</style>
