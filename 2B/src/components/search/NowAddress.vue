<template>
  <div class="position">
    <p class="city" @click='torender'>{{address}}<span class="gps">GPS定位</span></p>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  props: ['position'],
  data () {
    return {
      address :''
    }
  },
  created () {
    if (this.setApp()) {
      this.webGetLocation()
    } else {
      this.getlocation()
    }
  },
  methods: {
    getlocation () {
      var _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            _this.$store.dispatch('myshopdata', {lng: `${res.longitude}`, lat: `${res.latitude}`})
            var BMap = window.BMap
            var nowlocation = new BMap.Point(res.longitude, res.latitude)
            var geoc = new BMap.Geocoder()
            geoc.getLocation(nowlocation, function (rs) {
              _this.address = rs.address
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
          _this.$store.dispatch('myshopdata', {lng: `${r.point.lng}`, lat: `${r.point.lat}`})
          var BMap = window.BMap
          var nowlocation = new BMap.Point(r.point.lng, r.point.lat)
          var geoc = new BMap.Geocoder()
          geoc.getLocation(nowlocation, function (rs) {
            _this.address = rs.address
          })
        }
      })
    },
    torender () {
      let json = {'citysn': '', 'address': `${this.address}`}
      storage.set('searchCity', json)
      this.back()
    }
  }
}
</script>
<style scoped>
  .position{
    padding: 15px;
    display: flex;
    flex-direction: row;
    background: #fff;
  }
  .city{
    font-size: 16px;
    color: #333333;
    line-height: 24px;
  }
  .gps{
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    margin-left: 6px;
  }
</style>
