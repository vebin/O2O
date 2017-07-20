<template>
  <div class="search-header">
    <div class="begin-search" @click="binginSearch">搜索店铺名称</div>
    <div class="district" @click="showDistrict">
      <span class="title">{{page.address}}</span>
      <span :class="showDist ? 'upIcon' : 'icon'"></span>
    </div>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  computed: {
    ShopData () { return this.$store.state.ShopData }
  },
  data () {
    return {
      showDist: false,
      address: ''
    }
  },
  mounted () {
    let search = JSON.parse(storage.get('searchCity'))
    if (search) {
      if (search.address.length>3) {
        this.page.address = search.address.substring(0, 3)+'...'
      } else{
        this.page.address = search.address
      }
    } else {
      this.page.address = '请选择'
    }
  },
  methods: {
    showDistrict () {
      this.jump('/SetCity/0')
    },
    binginSearch () {
      this.jump('/SearchShop')
    },
    getlocation () {
      var _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var BMap = window.BMap
            var nowlocation = new BMap.Point(res.longitude, res.latitude)
            var geoc = new BMap.Geocoder()
            geoc.getLocation(nowlocation, function (rs) {
              if (rs.address.length > 3) {
                _this.page.address = rs.address.substring(0, 3)+'...'
              } else{
                _this.page.address = rs.address
              }
            })
          }
        })
      })
    }
  }
}
</script>
<style scoped>
  .search-header{
    width: 100%;
    height: 60px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
  }
  .begin-search{
    flex: 1;
    height: 35px;
    font-size: 16px;
    background: #FAFAFA;
    color: #666666;
    line-height: 35px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
  .begin-search:before{
    font-family: "shoper";
    content: '\e71b';
    margin-left: 10px;
    margin-right: 6px;
    font-size: 15px;
    color: #999;
  }
  .district{
    position: relative;
    line-height: 28px;
    margin-left: 10px;
    margin-right: 6px;
  }
  .district .title{
    display: block;
    max-width: 65px;
    color: #333333;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .district .icon{
    position: absolute;
    top: 3px;
    right: -12px;
    margin-left: 10px;
    margin-top: 10px;
    border-top: 4px solid #999;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    width: 0;
    height: 0;
  }
  .district .upIcon{
    position: absolute;
    top: 3px;
    right: 0;
    margin-left: 10px;
    margin-top: 10px;
    border-bottom: 4px solid #999;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    width: 0;
    height: 0;
  }
</style>
