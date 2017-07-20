<template>
  <div class="location">
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import storage from '../store/storage.js'
export default {
  data () {
    return {
      shopinfo:null
    }
  },
  created () {
    this.shopinfo=JSON.parse(storage.get("shopinfoMap"))
  },
  mounted () {
    this.settitle()
    this.lookMap()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'查看位置'})
      } else {
        window.document.title = '查看位置'
        this.hideshare()
      }
    },
    lookMap () {
      var sContent ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+this.shopinfo.name+"</h4>"  + 
  "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+this.shopinfo.address+"</p>";
      var map = new BMap.Map("map");    // 创建Map实例
      var point = new BMap.Point(this.$route.params.lng, this.$route.params.lat);
      var marker = new BMap.Marker(point);
      map.centerAndZoom(point, 14);
      map.addOverlay(marker);
      var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
      map.openInfoWindow(infoWindow,point); //开启信息窗口
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
</style>
