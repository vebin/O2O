<template>
<div class="wraper">
  <div class="content">
    <home-header :status="status" v-if="photosImg.length === 1"></home-header>
    <div v-if="photosImg.length > 1" class="slide-img">
        <a href="#/UploadShop" class="edit">修改</a>
        <photos :photoItems="photosImg"></photos>
    </div>
    <set-shop-name></set-shop-name>
    <set-shop-type></set-shop-type>
    <set-brand v-if="showBrand"></set-brand>
    <set-address></set-address>
    <set-people-name></set-people-name>
    <div @click="tel" class="line">
      <set-phone></set-phone>
    </div>
    <a :href="`#/MainBusiness/${shopInfo.id}`" v-if="shopInfo.shoptypeid!=='10'"><set-business></set-business></a>
    <div><set-descript></set-descript></div>
    <div :class="[page.Editsubmit? 'submit' :'submit disabled' ]" @click="submit">
      <span>提交</span>
    </div>
  </div>
  <pull :ind="shopdata.shoptypeid"></pull>
  <pull-second></pull-second>
  <input-ather></input-ather>
  <alert v-if="showAlert" :success="status" :msg="msg" :waiterid="waiterid"></alert>
  <loading-img v-if="page.imgloading"></loading-img>
  <toast :msg="toast" v-if="toastState"></toast>
</div>
</template>

<script>
import XHR from '../api'
import storage from '../store/storage.js'
import { mapGetters, mapActions } from 'vuex'
import HomeHeader from '../components/global/home-header.vue'
import SetShopName from '../components/join/set-shop-name.vue'
import SetPeopleName from '../components/join/set-people-name.vue'
import SetAddress from '../components/join/set-address.vue'
import SetPhone from '../components/join/set-phone.vue'
import SetShopType from '../components/join/set-shop-type'
import SetBrand from '../components/join/set-brand.vue'
import Pull from '../components/join/pull.vue'
import PullSecond from '../components/join/pull-second.vue'
import InputAther from '../components/join/input-ather.vue'
import Alert from '../components/global/alert.vue'
import LoadingImg from '../components/global/loading-img.vue'
import SetDescript from '../components/join/set-descript.vue'
import SetBusiness from '../components/join/set-business.vue'
import Photos from '../components/global/photos.vue'
import Toast from '../components/global/toast.vue'
export default {
  components: {
    HomeHeader, 
    SetShopName, 
    SetAddress, 
    SetPeopleName, 
    SetPhone, 
    SetShopType, 
    SetBrand, 
    Pull, 
    PullSecond, 
    InputAther, 
    Alert, 
    LoadingImg,
    SetDescript,
    SetBusiness,
    Photos,
    Toast
  },
  data () {
    return {
      status: 2,
      shopInfo: {},
      msg: '',
      showAlert: false,
      status: '0',
      waiterid: '',
      photosImg:[],
      shopings:[]       // 提交给后台的图片数据
    }
  },
  computed: {
    page () { return this.$store.state.page },
    showBrand () { return this.$store.state.showBrand },
    shopdata () { return this.$store.state.ShopData },
    ...mapGetters(['toastState'])
  },
  created () {
    this.$store.dispatch('setEdit', {edit: false,source: '编辑'})
    this.shopInfo = JSON.parse(storage.get('data'))
    this.photosImg = this.shopInfo.photos
    this.checkEdit()
    if (this.shopInfo.shoptype === '服务站') {
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
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'编辑店铺'})
      } else {
        window.document.title = '编辑店铺'
        this.hideshare()
      }
    },
    tel () {
      window.location.href = 'tel://010-57015663'
    },
    ...mapActions(['toggleToast']),
    showToast (msg) {
      this.toast = msg
      this.toggleToast()
    },
    passEdit (json) {
      XHR.passEdit(json).then((res) => {   // 通过用户编辑
        this.page.imgloading = false
        if (res.data.status === 1) {
          this.showAlert = true
          this.status = '1'
          this.waiterid = ''
        } else {
         this.showAlert = true
         this.status = '0'
         // this.msg = '编辑失败'
        }
      })
    },
    noPassEdit (json) {
      XHR.failEdit(json).then((res) => {   // 未通过用户编辑
        this.page.imgloading = false
        if (res.data.status === 1) {
          this.showAlert = true
          this.status = '1'
          this.waiterid = ''
        } else {
          this.showAlert = true
          this.status = '0'
          // this.msg = '编辑失败' 
        }
      })
    },
    submit () {
      if (this.page.Editsubmit) {
        this.page.Editsubmit = false
        let joinInfo = JSON.parse(storage.get('data'))
        if (joinInfo.description && joinInfo.description.length < 10) {
          this.showToast('不能少于10个字')
          this.page.Editsubmit = true
          return;
        }
        this.page.imgloading = true
        if (joinInfo.serverID && joinInfo.serverID.length > 1) {
          this.shopings = joinInfo.serverID.join(',')
        } else{
          this.shopings = joinInfo.shopimg
        }
        let json = {
          'name':joinInfo.name,
          'shopimg':this.shopings,
          'shoptypeid':joinInfo.shoptypeid,
          'shoptypeshow':joinInfo.shoptypeshow,
          'linkman':joinInfo.linkman,
          'address':joinInfo.address,
          'lng':joinInfo.lng,
          'lat':joinInfo.lat,
          'description':joinInfo.description
        }
        if (joinInfo.shoptypeshow === '服务站') {
          json.brands = joinInfo.brands
        }

        if (this.$route.params.status === '0') {    // 线上用户编辑
          json.shopid = joinInfo.id
          json.bbsid = joinInfo.bbsid
          this.passEdit(json)
        } else {
          json.id = joinInfo.id
          this.noPassEdit(json)
        }
      }
    }
  }
}
</script>

<style scoped>
.wraper{
  flex:1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content {
  flex:1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.line{
  position: relative;
}
.line:after{
    content: " ";
    position: absolute;
    left: 15px;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.uploadSuccess{
  padding-left: 15px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  height: 36px;
  line-height: 36px;
}
.showTag{
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0 15px 15px 5px;
  margin-bottom: 10px;
}
.submit{
  padding:30px 15px;
}
.submit.disabled span{
    background: rgba(255,102,0,1);
    opacity: 0.4
  }
.submit span{
    width: 100%;
    display: block;
    height: 45px;
    background:rgba(255,102,0,1);
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 45px;
  }
  .slide-img{
    position: relative;
  }
  .slide-img .edit{
    position: absolute;
    right: 15px;
    top:15px;
    background: rgba(0,0,0,0.80);
    border-radius: 100px;
    font-size: 16px;
    color: #fff;
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    z-index: 2
  }
</style>
