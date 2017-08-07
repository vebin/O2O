<template>
<div class="wrap">
  <home-header></home-header>
  <set-shop-name></set-shop-name>
  <set-shop-type></set-shop-type>
  <set-brand v-if="showBrand"></set-brand>
  <set-shop-address></set-shop-address>
  <set-address></set-address>
  <div class="set-name"><set-people-name></set-people-name></div>
  <set-phone></set-phone>
  <div :class="[page.submitStatus ? 'submit' : 'submit disabled']" @click="submit"><span>提交</span></div>
  <alert v-if="showAlert" :success="status" :msg="msg"></alert>
  <pull></pull>
  <pull-second></pull-second>
  <input-ather></input-ather>
  <loading-img v-if="page.imgloading"></loading-img>
</div>
</template>

<script>
import XHR from '../api'
import HomeHeader from '../components/join/home-header.vue'
import SetShopName from '../components/join/set-shop-name.vue'
import SetShopType from '../components/join/set-shop-type.vue'
import SetBrand from '../components/join/set-brand.vue'
import SetShopAddress from '../components/join/set-shop-address.vue'
import SetAddress from '../components/join/set-address.vue'
import SetPeopleName from '../components/join/set-people-name.vue'
import SetPhone from '../components/join/set-phone.vue'
import Alert from '../components/global/alert.vue'
import Pull from '../components/join/pull.vue'
import PullSecond from '../components/join/pull-second.vue'
import InputAther from '../components/join/input-ather.vue'
import LoadingImg from '../components/global/loading-img.vue'
import storage from '../store/storage.js'
export default {
  components: {HomeHeader, SetShopName, SetShopType, SetBrand, SetShopAddress, SetAddress, SetPeopleName, SetPhone, Alert, Pull, PullSecond, InputAther, LoadingImg},
  data () {
    return {
      showAlert: false,
      shopTtpe: [],
      status: 0,
      msg: ''
    }
  },
  computed: {
    page () { return this.$store.state.page },
    showBrand () { return this.$store.state.showBrand }
  },
  created () {
    this.submitStatus()
    this.$store.dispatch('setEdit', {edit: false, source: '添加', 'imgStatus': `1`})
    if (this.$parent.watchSource === '/') {
      this.getIsApp()
    }
    let joinInfo = storage.get('recommend')
    if (joinInfo && JSON.parse(joinInfo).shoptype === '服务站') {
      this.$store.dispatch('SetshowBrand', true)
    } else {
      this.$store.dispatch('SetshowBrand', false)
    }
  },
  mounted () {
    this.settitle()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '添加商家'
        this.getWxconfig()
        this.hideshare()
      } else {
        this.setUserInfo()
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'添加商家'})
      }
    },
    getIsApp () {                  //判断是客户端还是微信
      if (this.setApp()!=='other') {
        this.webGetLocation()
      } else {
        this.getlocation()
      }
    },
    getlocation () {                  // 微信定位
      var _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var BMap = window.BMap
            var nowlocation = new BMap.Point(res.longitude, res.latitude)
            var geoc = new BMap.Geocoder()
            geoc.getLocation(nowlocation, function (rs) {
              _this.$store.dispatch('myshopdata', {lng: `${res.longitude}`, lat: `${res.latitude}`, address: `${rs.address}`})
              _this.setdata({lng: `${res.longitude}`, lat: `${res.latitude}`, address: `${rs.address}`})
            })
          }
        })
      })
    },
    webGetLocation () {             //在app端使用百度定位
      var truckhomeRegion = new BMap.Geolocation()
      var _this = this
      truckhomeRegion.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var BMap = window.BMap
            var nowlocation = new BMap.Point(r.point.lng, r.point.lat)
            var geoc = new BMap.Geocoder()
            geoc.getLocation(nowlocation, function (rs) {
              _this.$store.dispatch('myshopdata', {lng: `${r.point.lng}`, lat: `${r.point.lat}`, address: `${rs.address}`})
              _this.setdata({lng: `${r.point.lng}`, lat: `${r.point.lat}`, address: `${rs.address}`})
            })
        } else {}
      })
    },
    submit () {                        // 提交
      if (this.page.submitStatus) {
        this.page.submitStatus = false
        let joinInfo = JSON.parse(storage.get('recommend'))
        let json = {
            'name':joinInfo.name,
            'shoptypeid':joinInfo.shoptypeid,
            'shoptypeshow':joinInfo.shoptypeshow,
            'citysn':joinInfo.citysn,
            'address':joinInfo.address,
            'lng':joinInfo.lng,
            'lat':joinInfo.lat,
            'linkman':joinInfo.linkman,
            'linkcall':joinInfo.linkcall,
            'recommendertype':2,
            'bbsid':joinInfo.bbsid,
            'bbsname':decodeURIComponent(joinInfo.bbsname),
            'shopimg':joinInfo.shopimg
          }
          if (joinInfo.shoptypeshow === '服务站') {
            json.brands = joinInfo.brands
          }
         XHR.joinShop(json).then((res) => {
          if (res.data.state === 'success') {
            this.showAlert = true
            this.status = 1
            storage.remove('data')
          } else if (res.data.state === 'fail') {
            this.showAlert = true
            this.status = 0
            this.msg = res.data.errordescription 
          }
        })
      }
    }
  }
}
</script>
  
<style scoped>
.wrap{
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
  .submit{
   padding: 30px 15px
  }
  .submit.disabled span{
    background: #09BB07;
    opacity: 0.4
  }
  .submit span{
    height: 45px;
    background-color: #09BB07;
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
  }
  .set-name{
    margin-top: 15px;
  }
</style>
