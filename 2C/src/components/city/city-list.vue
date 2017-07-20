<template>
<div style="height:100%;">
  <div id="wrap" class="city-wrap">
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
export default {
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
  },
  data () {
    return {
      Allcity: {}
    }
  },
  methods: {
    setCity (item) {
      this.$store.dispatch('myshopdata', {'citysn': `${item.sn}`})
      this.$store.dispatch('setEdit', {'citytext': `${item.name_short}`})
      this.setdata({'citysn':item.sn,'citytext':item.name_short})
      this.back()
    },
    moveToItem (key) {
      // let container = this.$root.$el
      let wrap = document.getElementById('wrap')
      wrap.scrollTop = document.getElementById('item_' + key).offsetTop - 65
    }
  }
}
</script>

<style scoped>
  .city-wrap{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 60px;
    box-sizing: border-box;
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
  .service-brand-wrap li:last-child:after{
    width: 0;
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
