<template>
  <div class="no-login" v-if="login">
    <span class="to-login" @click="toLogin">去登陆</span>
  </div>
</template>

<script>
import XHR from '../api'
import storage from '../store/storage.js'
export default {
  created () {
   this.setShopData()
   this.hideshare()
   this.setUser()
  },
  data () {
    return {
      uid: null,
      username: null,
      login: false
    }
  },
  mounted (){
    var _this = this
    this.connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
        });
        bridge.registerHandler("onLoginCallback", function(data, responseCallback) {
          _this.setUserInfo()
          _this.toUrl()
        });
    });
  },
  methods: {
    toLogin () {
      if (this.setApp()!=='other') {                  // 判断是不是客户端
        this.callNativeMethod("onLogin",{})
      }else{
        window.truckhomeAccountBinding.show()
      }
    },
    setShopData () {                        // 避免污染 进行设置店铺空信息
      let joinInfo = storage.get('data')
      if (joinInfo) {
        storage.remove('data')
      }
      this.setdata({'name':'','shoptypeid':'','shoptypeshow':'',"citysn":'','linkman':'','linkcall':'','shopimg':'','certificatesimg':'','vcode':''})
      this.page.shopimg= 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo_bg@2x.png'
      this.page.certificatesimg='https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload_bg@2x.png'
    },
    setUser () {
      if (this.setApp()!=='other'){                // 判断是不是客户端
        this.setUserInfo()
        this.setLogin()
      } else {
        var Uid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)
        if (Uid && Uid[1]) {
          this.ShopData.bbsid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)[1]
          this.username = document.cookie.match(/AbcfN_nickname=([^;$]+)/)[1]
          this.setdata({'bbsid':this.ShopData.bbsid,'bbsname':this.username})
        }
        this.setLogin()
      }
    },
    setLogin () {
      if (this.ShopData.bbsid === '' || this.ShopData.bbsid ==='0') {
        this.login = true
      } else {
        this.login = false
        this.toUrl()
      }
    },
    toUrl () {
      XHR.getUserInfo({'bbsid': this.ShopData.bbsid}).then((res) => {
        var shopid = res.data.shopid
        if (shopid) { // 存在shopid
          if (shopid === '0') { // 没添加过的需要到首页
            this.jump('/Join')
          } else {  // 审核通过的信息
            this.jump(`/MyShop/${shopid}/0`)
          }
        } else { // 未审核通过
          var waiterid = res.data.waiterid
          this.jump(`/MyShop/${waiterid}/1`)
        }
      })
    }
  }
}
</script>

<style scoped>
.no-login{
  display: flex;
  flex:1;
  background: url("https://s.kcimg.cn/wap/images/detail/o2oImg/no-login.jpg") 50% 50%;
  background-size: cover;
  justify-content: center;
  align-items: center;
  position: relative;
}
.to-login{
  position: absolute;
  bottom: 36px;
  left: 50%;
  margin-left: -75px;
  background: #FFFFFF;
  border-radius: 100px;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #F9570E;
  text-shadow: 0 1px 2px rgba(249,87,14,0.25);
}
</style>
