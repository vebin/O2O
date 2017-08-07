<template>
  <div class="footer-menu">
    <div class="menu">
      <span class="shop-setted" @click="toJoin">推荐入驻</span>
      <span :class="[shareShow ? 'app-my-upload':'my-upload']" @click="myUpload">我的推荐</span>
    </div>
    <span class="share" @click="share" v-if="shareShow">分享</span>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      uid: null,
      shareShow: false
    }
  },
  created () {
    if (this.setApp()!=='other') {
      this.setUserInfo()
      this.shareShow = true
    } else {
      if (document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)) {
        this.ShopData.bbsid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)[1]
        this.setdata({'bbsid':this.ShopData.bbsid})
      }
    }
  },
  methods: {
    share () {
      this.callNativeMethod("onShare",{
        title: '卡车之家', // 分享标题
        desc: '附近商家，最专业的卡友服务平台！', // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: 'https://s.kcimg.cn/wap/images/detail/o2oImg/share.png', // 分享图标
        isAddCalorie: false //分享成功后是否加卡路里，true加，false不加
      })
    },
    toJoin () {
      if (this.ShopData.bbsid === '' || this.ShopData.bbsid === '0') {
        this.$parent.login = false
      } else {
        this.jump('/Join')
      }
      storage.set("loginSourse","join") // join 代表登录去向为join页面
      this.savePositon()
    },
    myUpload () {
      if (this.ShopData.bbsid === '' || this.ShopData.bbsid === '0') {
        this.$parent.login = false
      } else {
        this.jump('/User')
      }
      storage.set("loginSourse","User") // join 代表登录去向为User页面
      this.savePositon()
    },
    savePositon(e){
      let contains = document.querySelector('.container')
      if (contains) {
        storage.set('position',contains.scrollTop)
      }
    }
  }
}
</script>
<style scoped>
  .footer-menu{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    background:#FFFFFF;
    font-size: 18px;
    color: #FF6600;
    letter-spacing: 0;
    text-align: center;
    box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.05);
    z-index: 10;
  }
  .footer-menu .menu{
    flex: 1;
    display: flex;
  }
  .footer-menu .menu span{
    font-size: 18px;
    display: block;
    flex: 1;
    position: relative;
  }
  .shop-setted:before{
    content: "\e6b8";
    font-family: 'shoper';
    font-size: 18px;
    margin-right: 5px;
  }
  .footer-menu .menu span:after{
    position: absolute;
    content: "";
    width: 1px;
    height: 20px;
    top: 15px;
    right: 0;
    background: rgba(255,102,0,0.10);
    opacity: 0.3;
  }
  .app-my-upload:after{
    width: 1px;
  }
  .footer-menu .menu .my-upload:after{
    width: 0;
  }
  .my-upload:before,.app-my-upload:before{
    content: "\e704";
    font-family: 'shoper';
    font-size: 18px;
    margin-right: 5px;
  }
  .footer-menu span.share{
    padding: 0 22px;
  }
  .share:before{
    font-family: 'shoper';
    content: "\e72b";
    font-size: 18px;
    margin-right: 5px;
    display: inline-block;
  }
</style>
