<template>
<div class="wrap">
  <home-header></home-header>
  <set-shop-name></set-shop-name>
  <set-shop-type></set-shop-type>
  <set-brand v-if="showBrand"></set-brand>
  <set-shop-address></set-shop-address>
  <set-address></set-address>
  <set-license></set-license>
  <set-people-name></set-people-name>
  <set-phone></set-phone>
  <get-code></get-code>
  <div :class="[page.submitStatus ? 'submit' : 'submit disabled']" @click="submit"><span>提交</span></div>
  <alert v-if="showAlert" :success="status" :msg="msg" :waiterid="waiterid"></alert>
  <pull></pull>
  <pull-second></pull-second>
  <input-ather></input-ather>
  <loading-img v-if="page.imgloading"></loading-img>
  <a href="/index.html">
    <go-back></go-back>
  </a>
</div>
</template>

<script>
import XHR from '../api'
import HomeHeader from '../components/global/home-header.vue'
import SetShopName from '../components/join/set-shop-name.vue'
import SetShopType from '../components/join/set-shop-type.vue'
import SetBrand from '../components/join/set-brand.vue'
import SetShopAddress from '../components/join/set-shop-address.vue'
import SetAddress from '../components/join/set-address.vue'
import SetLicense from '../components/join/set-license.vue'
import SetPeopleName from '../components/join/set-people-name.vue'
import SetPhone from '../components/join/set-phone.vue'
import GetCode from '../components/join/get-code.vue'
import Alert from '../components/global/alert.vue'
import Pull from '../components/join/pull.vue'
import PullSecond from '../components/join/pull-second.vue'
import InputAther from '../components/join/input-ather.vue'
import GoBack from '../components/global/go-back.vue'
import LoadingImg from '../components/global/loading-img.vue'
import storage from '../store/storage.js'
export default {
  components: {HomeHeader, SetShopName, SetShopType, SetBrand, SetShopAddress, SetAddress, SetLicense, SetPeopleName, SetPhone, GetCode, Alert, Pull, PullSecond, InputAther, GoBack, LoadingImg},
  data () {
    return {
      msg: '',
      showAlert: false,
      status: '0',
      waiterid: ''
    }
  },
  computed: {
    page () { return this.$store.state.page },
    showBrand () { return this.$store.state.showBrand },
    shopdata () { return this.$store.state.ShopData }
  },
  created () {
    this.submitStatus()
    this.$store.dispatch('setEdit', {edit: false, source: '添加'})
    let joinInfo = JSON.parse(storage.get('data'))
    if (joinInfo && joinInfo.shoptype === '服务站') {
      this.$store.dispatch('SetshowBrand', true)
    } else {
      this.$store.dispatch('SetshowBrand', false)
    }
    if (this.$parent.watchSource === '/') {
      if (this.setApp()!=='other') {
        this.webGetLocation()
      } else{
        this.getlocation()
      }
    }
    this.setShopData()
  },
  mounted () {
    this.settitle()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'添加商家'})
      } else {
        window.document.title = '添加商家'
        this.hideshare()
      }
    },
    setShopData () {
      let joinInfo = storage.get('data')
      if (!joinInfo) {
        this.setdata({'name':'','shoptypeid':'','shoptypeshow':'',"citysn":'','linkman':'','linkcall':'','shopimg':'','certificatesimg':'','vcode':''})
      } else {}
    },
    getlocation () {
      var _this = this
      var wx = window.wx
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var BMap = window.BMap
            var nowlocation = new BMap.Point(res.longitude, res.latitude)
            var geoc = new BMap.Geocoder()
            geoc.getLocation(nowlocation, function (rs) {
              _this.setdata({'lng':res.longitude,'lat':res.latitude,'address':rs.address})
              _this.$store.dispatch('myshopdata', {lng: `${res.longitude}`, lat: `${res.latitude}`, address: `${rs.address}`})
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
            _this.setdata({'lng':r.point.lng,'lat':r.point.lat,'address':rs.address})
            _this.$store.dispatch('myshopdata', {lng: `${r.point.lng}`, lat: `${r.point.lat}`, address: `${rs.address}`})
          })
        } else {}
      })
    },
    submit () {
      var _this = this
      if (this.page.submitStatus) {
        this.page.submitStatus =false
        let joinInfo = JSON.parse(storage.get('data'))
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
          'recommendertype':1,
          'bbsid':joinInfo.bbsid,
          'bbsname':decodeURIComponent(joinInfo.bbsname),
          'shopimg':joinInfo.shopimg,
          'certificatesimg':joinInfo.certificatesimg,
          'vcode':joinInfo.vcode
        }
        if (joinInfo.shoptypeshow === '服务站') {
          json.brands = joinInfo.brands
        }
        XHR.joinShop(json).then((res) => {
          if (res.data.state === 'success') {
            _this.showAlert = true
            _this.status = '1'
            _this.waiterid = res.data.waiterid
            storage.remove('data')
          } else if (res.data.state === 'fail') {
            _this.showAlert = true
            _this.status = '0'
            _this.msg = res.data.errordescription 
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
  .shoper-login{
    position: fixed;
    right: 15px;
    bottom: 120px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 0, 0, 0.5);
    line-height: 50px;
    text-align: center;
    z-index: 100;
    font-size: 12px;
    color: #fff;
  }
</style>
