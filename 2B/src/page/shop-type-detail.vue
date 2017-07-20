<template>
  <div class="container">
    <div class="nearby-shops-model" @scroll="loadMore" v-if="!cancelLocation">
      <ul class="shops-list" v-if="shops.length">
        <li v-for="shop in shops">
          <nearby-list :shopData="shop" :type="'1'"></nearby-list>
        </li>
      </ul>
      <div v-else class="data-null-wrap">
        <data-null :title='title' :text="text"></data-null>
        <a href="#/Join" class="to-join"><span>推荐入驻</span></a>
      </div>
      <div v-if="shops.length >= 20 || loading">
          <loading :end="list_end" :loading="loading"></loading>
      </div>
    </div>
    <div v-if="cancelLocation" class="no-location">
      未获取到您的位置，请返回首页选择地区
    </div>
    <a href="JavaScript:history.back(-1)"><go-back></go-back></a>
    <div class="go-top"><go-top @click.native="goTop" :status="gotopStatus" /></div>
  </div>
</template>

<script>
import XHR from '../api'
import NearbyList from '../components/global/nearby-list.vue'
import DataNull from '../components/global/data-null.vue'
import GoBack from '../components/global/go-back.vue'
import Loading from '../components/global/loading.vue'
import storage from '../store/storage.js'
import GoTop from '../components/global/go-top.vue'
export default {
  components: {NearbyList, DataNull, GoBack, Loading, GoTop},
  created () {
    let cache = storage.get('shopdetaisList')
    if (cache) {
      cache = JSON.parse(cache)
      this.pagenum = cache.page
      this.renderShops(cache)
      if (storage.get('List_end')) {
        this.list_end = true
        this.loamore = true
      }
      let search = storage.get('searchCity')
      if (search) {
        search = JSON.parse(search)
        if (search.citysn) {
          this.citysn = search.citysn
        }
      }
    } else {
      this.setCitysn()
    }
  },
  data () {
    return {
      title: '您附近还没有店铺哦',
      text: '上传店铺可获取卡路里哦，快来参与吧',
      shops: [],
      loamore: false,
      pagenum: 1,
      list_end: false,
      loading: true,
      cancelLocation:false,
      gotopStatus: false,
      citysn:null
    }
  },
  mounted (){
    this.settitle()
    this.rePosition()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = this.$route.params.text
        this.getWxconfig()
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:this.$route.params.text})
      }
    },
    setCitysn () {
      let search = storage.get('searchCity')
      if (search) {
        search = JSON.parse(search)
        if (search.citysn) {
          this.citysn = search.citysn
          this.getData()
        } else{
          if (this.setApp()!=='other') {
            this.webGetLocation()
          } else{
            this.getlocation()
          }
        }
      }
    },
    rePosition (){
      let p = storage.get('detailPosition')
      if(p){
        this.$el.firstElementChild.scrollTop = p
        storage.remove('detailPosition')
      }
    },
    renderShops(o) {
      this.loading = false
      let datas = o.datalist ? o.datalist : o.data
      if (datas.length >= 20) {
        this.loamore = false
        this.pagenum += 1
      } else {
        this.list_end = true
        this.loamore = true
        storage.set('List_end',true)
      }
      this.shops = this.shops.concat(datas)
      let cache = {
          page:this.pagenum === 1 ? 1 : this.pagenum - 1,
          data:this.shops
        }
      storage.set('shopdetaisList',cache)
    },
    getData () {
      let json = {
        lng: this.ShopData.lng,
        lat: this.ShopData.lat,
        shoptypeid: this.$route.params.typeid
      }
      if (this.citysn) {
        json.citysn = this.citysn
      }
      XHR.nearbyShopList(json).then((res) => {
        this.renderShops(res)
      })
    },
    getDealer(){
      let json = {
        lng: this.ShopData.lng,
        lat: this.ShopData.lat
      }
      XHR.getdealer(json).then((res) => {
        this.renderShops(res.data)
      })
    },
    getlocation () {
      var _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            let wxLocation = _this.gcj02tobd09(res.longitude,res.latitude)
            _this.$store.dispatch('myshopdata', {lng: `${wxLocation.lng}`, lat: `${wxLocation.lat}`})
            if (_this.$route.params.text==='经销商' ) {
              _this.getDealer()
            } else {
              _this.getData()
            }
          },
          cancel: function () { 
            _this.loading = false
            _this.cancelLocation = true
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
          if (_this.$route.params.text==='经销商' ) {
            _this.getDealer()
          } else {
            _this.getData()
          }
        } else{
          _this.loading = false
          _this.cancelLocation = true
        }
      })
    },
    loadMore (e) {
      this.gotopStatus = e.target.scrollTop >= e.target.offsetHeight*2 ? true : false;
      if (e.target.scrollTop + window.innerHeight >= e.target.scrollHeight && !this.loamore) {
        this.loamore = true
        if (this.$route.params.text==='经销商' ) {
          let json = {
            lng: this.ShopData.lng,
            lat: this.ShopData.lat,
            pageindex: this.pagenum
          }
          XHR.getdealer(json).then((res) => {
            this.renderShops(res.data)
            // for (var i = 0; i < res.data.datalist.length; i++) {
            //   this.shops.push(res.data.datalist[i])
            // }
            // if (res.data.datalist.length >= 20) {
            //   this.loamore = false
            //   this.pagenum++
            // } else{
            //   this.loamore = true
            //   this.list_end = true
            // }
          })
        } else{
          let json = {
            lng: this.ShopData.lng,
            lat: this.ShopData.lat,
            shoptypeid: this.$route.params.typeid,
            page: this.pagenum
          }
          if (this.citysn) {
            json.citysn = this.citysn
          }
          XHR.nearbyShopList(json).then((res) => {
            this.renderShops(res)
            // for (var i = 0; i < res.data.length; i++) {
            //   this.shops.push(res.data[i])
            // }
            // if (res.data.length >= 20) {
            //   this.loamore = false
            //   this.pagenum++
            // } else{
            //   this.loamore = true
            //   this.list_end = true
            // }
          })
        }
      }
    },
    goTop (){
      if(!navigator.userAgent.match(/iphone/i) && this.$el.firstElementChild.scrollTop > 500) 
      this.$el.firstElementChild.scrollTop = 500;
      this.moving(0);
    },
    moving (n){
      let that = this;
      if(this.$el.firstElementChild.scrollTop == n){
          this.scrollAnimation && cancelAnimationFrame(this.scrollAnimation);  
          return;
      }else{
          var speed = (n - this.$el.firstElementChild.scrollTop)/8;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          this.$el.firstElementChild.scrollTop = this.$el.firstElementChild.scrollTop + speed;
          this.scrollAnimation = requestAnimationFrame(function(){
              that.moving(n);
          });   
      }
    }
  }
}
</script>

<style scoped>
.go-top{
  bottom: 50px;
}
.container{
  height: 100%;
  background: #f5f5f5;
}

.nearby-shops-model{
   height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
  box-sizing: border-box;
  background: #f5f5f5;
}
.shops-list{
  background: #fff;
    padding-top: 15px;
}
.shops-list li:last-child{
  border:none;
}
.to-join{
  padding: 30px 58px 70px;
  display: block;
}
.data-null-wrap{
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.to-join span{
  display: block;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: #09BB07;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
}
.to-join span:before{
  content: '\e6b8';
  font-family: 'shoper';
  margin-right: 5px;
}
 .no-location{
    position: absolute; 
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-align: center;
    word-break: break-all;
    padding: 0 15px;
    box-sizing: border-box;
  }
</style>
