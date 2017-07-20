<template>
<div style="height:100%;">
  <div id="wrap" class="city-wrap">
    <div class="gps-search" v-if="this.$route.params.source=='0'">
      <now-address></now-address>
      <history-search></history-search>
    </div>
    <div class="service-brand"  v-for="(val, key) in Allcity" :id="`item_${key}`">
      <header class="header">{{key}}</header>
      <ul class="service-brand-wrap">
        <li class="select" v-for="(item, index) in val" @click="setCity(item)">{{item.name_short}}</li>
      </ul>
    </div>
  </div>
  <ul class="slider" id="slider">
    <li v-for="(val, key) in Allcity" @click="moveToItem(key)">{{key}}</li>
  </ul>
</div>
</template>

<script>
import XHR from '../../api'
import NowAddress from '../search/NowAddress.vue'
import HistorySearch from '../search/HistorySearch.vue'
import storage from '../../store/storage.js'
export default {
  components: {NowAddress, HistorySearch},
  computed: {
    shopdata () { return this.$store.state.ShopData }
  },
  created () {
    var _this = this
    if (JSON.parse(localStorage.getItem('city'))) {
      _this.Allcity = JSON.parse(localStorage.getItem('city'))
    } else {
      XHR.getCity().then(function (res) {
        _this.Allcity = res.data
        localStorage.setItem('city', JSON.stringify(res.data))
      })
    }
    if (localStorage.getItem('historySearch')) {
      this.hisrorySearch = localStorage.getItem('historySearch').split('|')
    }
  },
  data () {
    return {
      Allcity: {},
      hisrorySearch: []
    }
  },
  methods: {
    setCity (item) {
      if (this.$route.params.source === '0') {
        let history = this.hisrorySearch.join(',')
        let json = {'citysn': `${item.sn}`, 'address': `${item.name_short}`}
        storage.set('searchCity', json)                              // 记录当前搜索
        if (this.hisrorySearch.length === 3) { 
          if (history.indexOf(item.name_short)==-1){
            this.hisrorySearch.splice(0, 1)
            this.hisrorySearch.push(JSON.stringify(json))
            localStorage.setItem('historySearch', this.hisrorySearch.join('|'))
          }
        } else {
          if (history.indexOf(item.name_short)==-1){
            this.hisrorySearch.push(JSON.stringify(json))
            localStorage.setItem('historySearch', this.hisrorySearch.join('|'))
          }
        }
        localStorage.setItem('searchsource', '1')
        this.back()
      } else {
        this.setdata({'citysn':item.sn,'citytext':item.name_short})
        this.back()
      }
    },
    moveToItem (key) {
      let wrap = document.getElementById('wrap')
      wrap.scrollTop = document.getElementById('item_' + key).offsetTop - 65
    }
  }
}
</script>

<style scoped>
  .city-wrap{
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  padding-top: 60px;
}
 .service-brand >header{
    height: 30px;
    padding-left: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .slider{
    position: fixed;
    width: 30px;
    right: 0;
    top: 80px;
    z-index: 100;
  }
  .service-brand-wrap{
    background: #fff;
    padding: 0 15px;
  }
  .slider li{
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    font-weight: normal;
    color: #999;
  }
  .service-brand .brand-city{
    padding-left: 15px;
    background: #fff;
  }
  .service-brand .select{
    height: 44px;
    font-size: 16px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .service-brand .select:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
</style>
