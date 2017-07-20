<template>
  <div class="location" id="location">
    <div class="map" id="allmap">
    </div>
    <div class="marker-wrap">
      <i v-if="tip">拖动地图到正确位置，并点击提交</i>
    </div>
    <div class="marker">&#xe693;</div>
    <div class="footer" id="footer">
      <span class="address">{{locationText}}</span>
      <span class="submit" @click="submit">提交</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    shopdata () { return this.$store.state.ShopData }
  },
  data () {
    return {
      lon: '',
      lat: '',
      locationText: '',
      tip: true
    }
  },
  created () {
    // 通过接口获取经纬度
    this.lon = this.shopdata.lng
    this.lat = this.shopdata.lat
  },
  mounted () {
    this.settitle()
    var BMap = window.BMap
    var _this = this
    var map = new BMap.Map('allmap')
    var point = new BMap.Point(this.lon, this.lat)
    map.centerAndZoom(point, 16)
    map.enableScrollWheelZoom(true)
    var nowlocation = new BMap.Point(this.lon, this.lat)
    var geoc = new BMap.Geocoder()
    geoc.getLocation(nowlocation, function (rs) {
      _this.locationText = rs.address
    })
    // 拖拽获取地址并解析地址
    map.addEventListener('dragend', function () {
      var center = map.getCenter()
      geoc.getLocation(center, function (rs) {
        _this.locationText = rs.address
        _this.lon = center.lng
        _this.lat = center.lat
      })
    })
    // 3s后隐藏提示
    setTimeout(() => {
      _this.tip = false
    }, 3000)
  },
  methods: {
    submit () {
      this.$store.dispatch('myshopdata', {lng: `${this.lon}`, lat: `${this.lat}`, address: `${this.locationText}`})
      this.setdata({lng: `${this.lon}`, lat: `${this.lat}`, address: `${this.locationText}`})
      this.back()
    },
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
         window.document.title = '定位地址'
         this.getWxconfig()
         this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'定位地址'})
      }
    }
  }
}
</script>

<style scoped>
  .location{
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .map{
    flex:1;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .marker-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -125px;
    margin-top: -65px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .marker{
    font-family: 'shoper';
    color: #FD4C29;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -23px;
    margin-left: -13px;
    font-size: 26px;
  }
  .marker-wrap i{
    opacity: 0.9;
    background: rgba(51,51,51,0.90);
    border-radius: 5px 5px 5px 5px;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    position: relative;
  }
  .marker-wrap i:after{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid rgba(51,51,51,0.80);
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -4px;
    bottom: -5px;
  }
  .footer{
    height: 45px;
    background: rgba(248,248,248,0.95);
    box-shadow: 0 0 0 0 #B2B2B2;
    display: flex;justify-content: center;align-items: center;
    flex-direction: row;
    border-top: 1px solid #f5f5f5;
  }
  .address{flex: 1;padding: 10px 15px;font-size: 16px;}
  .submit{
    background: #09BB07;
    width: 100px;
    height: 45px;
    text-align: center;
    font-size: 16px;
    line-height: 45px;
    color: #fff;
  }
</style>
