<template>
<div class="wraper">
  <div class="container" @scroll="loadMore" ref="container">
    <search-header></search-header>
    <div class="entries">
      <a :href="`#/ShopTypeDetail/${item.Id}/${item.Typedescription}`" v-for="(item,index) in entries">
        <nav-item :data="item"></nav-item>
      </a>
    </div>
    <div :class="advert" v-if="advs.length">
      <div class="adv-item" v-for="adv in advs">
        <advert :data="adv"></advert>
      </div>
    </div>
    <section class="nearby-shops-model" v-if="!loading">
      <div class="caption">附近店铺</div>
      <ul class="shops-list" v-if="shops.length">
        <li v-for="shop in shops">
          <nearby-list :shopData="shop" :type="'1'"></nearby-list>
        </li>
      </ul>
      <div v-if="!cancelLocation && !shops.length"  class="data-null">
        <data-null :title='title' :text="text"></data-null>
      </div>
      <div v-if="cancelLocation" class="no-location">
        未获取定位，无法显示信息.请点击右上角，选择定位城市！
      </div>
    </section>
    <div v-if="shops.length">
        <loading :end="list_end" :loading="loading"></loading>
    </div>
  </div>
  <footer-menu></footer-menu>
  <layer v-if="!login"></layer>
  <div v-if="loading">
      <loading :end="list_end" :loading="loading"></loading>
  </div>
  <go-top @click.native="goTop" :status="gotopStatus" />
  <a href="/shoper.html" class="shoper-login"></a>
</div>
</template>

<script>
import SearchHeader from '../components/home/SearchHeader.vue'
import Advert from '../components/home/advert.vue'
import FooterMenu from '../components/home/FooterMenu.vue'
import NavItem from '../components/home/NavItem.vue'
import DataNull from '../components/global/data-null.vue'
import nearbyList from '../components/global/nearby-list.vue'
import Loading from '../components/global/loading.vue'
import Layer from '../components/home/layer.vue'
import GoTop from '../components/global/go-top.vue'
import API from '../api'
import storage from '../store/storage.js'
export default {
  components: {
    SearchHeader,
    Advert,
    FooterMenu,
    NavItem,
    DataNull,
    nearbyList,
    Loading,
    Layer,
    GoTop
  },
  computed: {
    nowAddress () { return this.$store.state.nowAddress }
  },
  data () {
    return {
      entries: [],
      shops: [],
      advs: [],
      advert: '',
      title: '您附近还没有店铺哦',
      text: '上传店铺可获取卡路里哦，快来参与吧',
      loamore: false,
      pagenum: 1,
      list_end: false,
      loading: true,
      gotopStatus: false,
      login: true,
      cancelLocation:false
    }
  },
  created () {
    this.getWxconfig()
    let joinInfo = storage.get('data')
    if (!joinInfo) {
      this.setdata({'name':'','shoptypeid':'','shoptypeshow':'',"citysn":'','linkman':'','linkcall':'','shopimg':'','bbsid':'','bbsname':''})
    } else {
      joinInfo = JSON.parse(joinInfo)
      this.$store.dispatch('myshopdata', {lng: `${joinInfo.lng}`, lat: `${joinInfo.lat}`})
    }
    if (this.$parent.watchSource.indexOf("ShopTypeDetail")>-1) {
      storage.remove('shopdetaisList')
    }
    this.renderEntries()
    this.renderAdvs()
    this.share()
    this.settitle()
  },
  mounted (){
    if (this.$parent.watchSource === '/SetCity/0') {
      this.renderNearbyShops()
    } else {
      let cache = storage.get('shopsList')
      if (cache) {
        cache = JSON.parse(cache)
        this.pagenum = cache.page
        this.renderShops(cache)
      } else {                       // 判断是不是客户端 进行不同的定位
        if (this.setApp()==='other') {
          // this.getlocation() 线上
          this.webGetLocation()
        } else {
          // this.webGetLocation()  线上
          this.getlocation()
        }
      }
    }
    var _this = this
    this.rePosition()
    this.connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
        });
        bridge.registerHandler("onLoginCallback", function(data, responseCallback) {
          let loginUrl = storage.get('loginSourse')
          _this.jump(`/${loginUrl}`)
        });
    });
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '附近商家'
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'附近商家'})
      }
    },
    share() {                             // 微信分享
      wx.ready(function(){
         wx.showAllNonBaseMenuItem();
         wx.hideMenuItems({
            menuList: ["menuItem:editTag","menuItem:delete","menuItem:copyUrl","menuItem:share:qq","menuItem:share:QZone","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email","menuItem:share:weiboApp"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
        wx.onMenuShareTimeline({
            title: '卡车之家',
            link: window.location.href,
            imgUrl: 'https://s.kcimg.cn/wap/images/detail/o2oImg/share.png',
            success: function () {
              console.log(info)
            },
            cancel: function () {
            }
        })
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: '卡车之家',
            desc: '附近商家，最专业的卡友服务平台！',
            link: window.location.href,
            imgUrl: 'https://s.kcimg.cn/wap/images/detail/o2oImg/share.png',
            success: function () {
              console.log(info)
            },
            cancel: function () {
            }
        })
      })
    },
    renderEntries () {  // 渲染入口
      API.getShopTypes({'v':1}).then((res) => {
        this.entries = res.data
      }).catch(() => {
        console.log('入口数据请求失败')
      })
    },
    renderNearbyShops (o) { // 渲染附近店铺
      let json = {
        lng: this.ShopData.lng,
        lat: this.ShopData.lat,
        page: this.pagenum
      }
      let search = storage.get('searchCity')
      if (search) {
        search = JSON.parse(search)
        if (search.citysn) {
          json.citysn = search.citysn
        }
      }
      API.nearbyShopList(json).then((res) => {
        this.renderShops(res)
      }).catch(() => {})
    },
    renderShops(o) {
      this.loading = false
      if (o.data.length >= 20) {
        this.loamore = false
        this.pagenum += 1
      } else {
        this.list_end = true
        this.loamore = true
      }
      this.shops = this.shops.concat(o.data)
      let cache = {
          page:this.pagenum === 1 ? 1 : this.pagenum - 1,
          data:this.shops
        }
      storage.set('shopsList',cache)
    },
    renderAdvs () {
      API.homeadvert().then((res) => {
        this.advs = res.data.data
        this.advert = res.data.data.length === 4 ? 'advert-max' : 'advert-flex'
      }).catch(() => {})
    },
    getlocation () {                    // 微信端定位
      var _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            var wxLocation = _this.gcj02tobd09(res.longitude,res.latitude)
            var BMap = window.BMap
            var nowlocation = new BMap.Point(wxLocation.lng, wxLocation.lat)
            var geoc = new BMap.Geocoder()
            geoc.getLocation(nowlocation, function (rs) {
              _this.page.address = rs.address
              var json = {'address': `${rs.address}`}
              storage.set('searchCity', json)
            })
            _this.$store.dispatch('myshopdata', {lng: `${wxLocation.lng}`, lat: `${wxLocation.lat}`})
            _this.setdata({lng: `${wxLocation.lng}`, lat: `${wxLocation.lat}`})
            _this.renderNearbyShops()
          },
          cancel: function () {
            _this.loading = false
            _this.loamore = true
            _this.cancelLocation = true
          }
        })
      })
    },
    loadMore (e) {                   // 滚动加载更多
      if(!this.Container){
        this.Container = e.target
      }
      this.gotopStatus = this.Container.scrollTop >= this.Container.offsetHeight*2 ? true : false;
      if (e.target.scrollTop + window.innerHeight >= e.target.scrollHeight && !this.loamore) {
        this.loamore = true
        this.renderNearbyShops()
      }
    },
    webGetLocation () {             //在app端使用百度定位
      var truckhomeRegion = new BMap.Geolocation()
      var _this = this
      truckhomeRegion.getCurrentPosition(function (r) {
         if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var nowlocation = new BMap.Point(r.point.lng, r.point.lat)
          var geoc = new BMap.Geocoder()
          geoc.getLocation(nowlocation, function (rs) {
            _this.page.address = rs.address
            let json = {'address': `${rs.address}`}
            storage.set('searchCity', json)
          })
          _this.$store.dispatch('myshopdata', {lng: `${r.point.lng}`, lat: `${r.point.lat}`})
          _this.setdata({lng: `${r.point.lng}`, lat: `${r.point.lat}`})
          _this.renderNearbyShops()
        } else {
          _this.loading = false
          _this.loamore = true
          _this.cancelLocation = true
        }
      })
    },
    rePosition (){
      let p = storage.get('position')
      if(p){
        this.$el.firstElementChild.scrollTop = p
        storage.remove('position')
      }
    },
    goTop (){
      if(!navigator.userAgent.match(/iphone/i) && this.Container.scrollTop > 500)
      this.Container.scrollTop = 500;
      this.moving(0);
    },
    moving (n){
      let that = this;
      if(this.Container.scrollTop == n){
          this.scrollAnimation && cancelAnimationFrame(this.scrollAnimation);
          return;
      }else{
          var speed = (n - this.Container.scrollTop)/8;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          this.Container.scrollTop = this.Container.scrollTop + speed;
          this.scrollAnimation = requestAnimationFrame(function(){
              that.moving(n);
          });
      }
    }
  }
}
</script>

<style scoped>
.wraper{
  height: 100%;
  overflow:hidden;
}
  .container{
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .nearby-shops-model .caption{
    padding:15px;  
    text-align: left;
    line-height: 22px;
    font-size: 18px; 
  }
  .entries{
    padding:5px 0 0;
    overflow: hidden;
    background: #fff;
  }
  .entries a{
    margin-bottom:12px;
    float: left;
    width: 25%;
    box-sizing: border-box;
  }
  .advert-max,.advert-flex{
    margin-top:10px;
    overflow: hidden;
    background: #fff
  }
  .adv-item{
    box-sizing: border-box;
    position: relative;
    border-right:1px solid #e5e5e5;
  }
  .advert-flex{
    display: flex;
    height:60px;
  }
  .advert-flex .adv-item:last-child{
    border-right: none;
  }
  .advert-flex:nth-of-type(n+2){
    border-left:1px solid #e5e5e5;
  }
  .advert-flex .adv-item{
    flex:1;
  }
  .advert-max .adv-item{
    float: left;
    width: 50%;
  }
  .advert-max .adv-item:nth-of-type(-n+2){
    border-bottom: 1px solid #e5e5e5
  }
  .nearby-shops-model{
    margin-top:10px;
  }
  .no-location{
    height: 60px;
    margin:60px auto;
    padding:15px;
  }
  .shoper-login{
    position: fixed;
    right: 0px;
    bottom: 65px;
    width: 60px;
    height: 61px;
    z-index: 100;
    font-size: 0;
    background: url('http://s.kcimg.cn/wap/images/detail/o2oImg/login.png') 100%;
    background-size: cover;
  }
</style>
