const session = window.sessionStorage
import storage from '../store/storage.js'
import XHR from '../api'
import axios from 'axios'
export default {
  computed: {
    page () { return this.$store.state.page },
    ShopData () { return this.$store.state.ShopData },
    driver () { return this.$store.state.driver }
  },
  data () {
    return {
    }
  },
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    back () {
      if (this.$router) {
        this.$router.back()
      }
    },
    getUsername(uid){                // 通过接口获取用户信息
      XHR.getUserNameApp({"exituid":uid}).then((res)=>{
        let datas = res.data.data
        this.setdata({'bbsid':uid,'bbsname': datas.nikename})
      })
    },
    ioschange (widget,type) { // 选择图片
      var file = widget.files[0]; // 获取file input中的图片信息列表
      var reader = new FileReader();
      var formData = new FormData();
      if (!file.type) {
        var regexp = fileName.match(/\.\w+$/);
        if (regexp && (regexp = regexp[0]))
          file.type = this.mimeTypes[(regexp + '').toLowerCase()];
      };
      if (file.size >= 8388608) {
        alert('\u6240\u9009\u56fe\u7247\u4e0d\u80fd\u5927\u4e8e8MB') //所选图片不能大于8MB
        return;
      };
      var _this = this
      reader.onload = function() {
        _this.page.imgloading = true
      };
      reader.readAsDataURL(file);
      formData.append("file'", file);
      var config = {
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
          };
      axios.post('https://nearby-api.360che.com/cm/imgupload.aspx',formData,config).then(res=>{
          _this.page.imgloading = false
          if (type === 'shoping') {
            _this.$store.dispatch('setEdit', {'shopimg': `${res.data.imgUrl}`})
            _this.setdata({'shopimgPreview': `${res.data.imgUrl}`})
            _this.$store.dispatch('myshopdata', {'shopimg': `${res.data.imgUrl}`})
            _this.setdata({'shopimg': `${res.data.imgUrl}`})
            _this.$store.dispatch('setEdit', {'imgStatus': `2`})
          } else if (type === 'driving') {
            _this.$store.dispatch('setDriver', {'driverImg': `${res.data.imgUrl}`})
            _this.setdriver({'imgpreview':res.data.imgUrl})
            _this.setdriver({'img': `${res.data.imgUrl}`})
            _this.$store.dispatch('setEdit', {'imgStatus': `2`})
          } else if (type === 'license'){
            _this.setdata({'licensePreview': `${res.data.imgUrl}`})
            _this.$store.dispatch('setEdit', {'certificatesimg': `${res.data.imgUrl}`})
            _this.$store.dispatch('myshopdata', {'certificatesimg': `${res.data.imgUrl}`})
            _this.setdata({'certificatesimg': `${res.data.imgUrl}`})
            _this.$store.dispatch('setEdit', {'licenseImgstatus': `2`})
          }
          if (_this.page.source === '添加') {
            _this.submitStatus()
          } else if (_this.page.source === '驾照') {
            _this.setDriverStatus()
          }
      })
    },
    setUserInfo () {  
      var UA = navigator.userAgent;
      var Uid = UA.match(/USERID[^\s]+/)[0].substr(7)                                  // 获取用户uid
      var userid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)
      var Cookieuid = document.cookie.match(/ForHelp_ajaxuid=([^;$]+)/);
      var AbcfN_authapp = document.cookie.match(/AbcfN_authapp=([^;$]+)/);     //app 是否登录
      if (AbcfN_authapp) {
        if (Uid && Uid!== "0") {
          this.ShopData.bbsid = Uid
           this.getUsername(Uid)
        }else if (userid && userid[1]) {
          this.ShopData.bbsid = userid[1]
          this.getUsername(userid[1])
        } else if(Cookieuid && Cookieuid[1]) {
          this.ShopData.bbsid = Cookieuid[1]
          this.getUsername(Cookieuid[1])
        }
      }else{
        this.ShopData.bbsid =''
      }
    },
    sendData2Native(data, callback) {               //和app通信
        window.WebViewJavascriptBridge.send(data, callback);
    },
    callNativeMethod(method, param, callback) {        //和app通信
        window.WebViewJavascriptBridge.callHandler(method, param,callback);
    },
    connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false);
        }
    },
    setApp () {                    // 判断是不是客户端
      var UA = navigator.userAgent;
      if ((UA.match(/iphone/gi)) && UA.match(/360che/gi)) {
        var version = UA.match(/360CHE[^\s]+/)[0].substr(7);
            version = version.replace(/[^0-9]/ig,"");
        if (parseInt(version)>=614) {
          return 'appNew'
        }else{
          return 'appOld'
        }
      } else if((UA.match(/android/gi)) && UA.match(/360che/gi)){
        return 'appNew'
      } else {
        return 'other'
      }
    },
    setdata (t) {
      let joinInfo = storage.get('data')
      if (joinInfo) {
        joinInfo = JSON.parse(joinInfo)
        for (var i in t) {
          joinInfo[i] = t[i]
        }
      }else{
        joinInfo = t
      }
      var str=JSON.stringify(joinInfo)
      session.setItem('data', str)
    },
    setdriver (t) {
      let drivedetail = storage.get('drivedetail')
      if (drivedetail) {
        drivedetail = JSON.parse(drivedetail)
        for (var i in t) {
          drivedetail[i] = t[i]
        }
      } else {
        drivedetail = t
      }
      storage.set('drivedetail', drivedetail)
    },
    uploadNewImg (source) {
      var wx = window.wx
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function (res) {
          if (source === 'shoping') {
            _this.$store.dispatch('setEdit', {'shopimg': `${res.localIds[0]}`})
            _this.setdata({'shopimgPreview': `${res.localIds[0]}`})
          } else if (source === 'driving') {
            _this.$store.dispatch('setDriver', {'driverImg': `${res.localIds[0]}`})
            _this.setdriver({'imgpreview':res.localIds[0]})
          } else if (source === 'license'){
            _this.setdata({'licensePreview': `${res.localIds[0]}`})
            _this.$store.dispatch('setEdit', {'certificatesimg': `${res.localIds[0]}`})
          }
          wx.uploadImage({
            localId: res.localIds[0],
            isShowProgressTips: 1,
            success: function (el) {
              if (source === 'shoping') {
                _this.$store.dispatch('myshopdata', {'shopimg': `${el.serverId}`})
                _this.setdata({'shopimg': `${el.serverId}`})
                _this.$store.dispatch('setEdit', {'imgStatus': `2`})
              } else if (source === 'driving') {
                _this.setdriver({'img': `${el.serverId}`})
                _this.$store.dispatch('setEdit', {'imgStatus': `2`})
              } else if (source === 'license'){
                _this.$store.dispatch('myshopdata', {'certificatesimg': `${el.serverId}`})
                _this.setdata({'certificatesimg': `${el.serverId}`})
                _this.$store.dispatch('setEdit', {'licenseImgstatus': `2`})
              }
              if (_this.page.source === '添加') {
                _this.submitStatus()
              } else if (_this.page.source === '驾照') {
                _this.setDriverStatus()
              }
            }
          })
        }
      })
    },
    submitStatus () {
      let joinInfo = storage.get('data')
      if (joinInfo) {
        joinInfo = JSON.parse(joinInfo)
        if (joinInfo.name !== '' && joinInfo.shoptypeid !== '' && joinInfo.shoptypeshow !== '' && joinInfo.citysn !== '' && joinInfo.address !== '' && joinInfo.linkman !== '' && joinInfo.linkcall !== '' && joinInfo.shopimg !== '' && joinInfo.certificatesimg !== '' && joinInfo.vcode !== '') {
          this.$store.dispatch('setEdit', {'submitStatus': true})
        } else {
          this.$store.dispatch('setEdit', {'submitStatus': false})
        }
      }
      console.log(joinInfo)
    },
    setDriverStatus () {
      let drivers = JSON.parse(storage.get('drivedetail'))
      if (drivers.licenseType !== '' && drivers.carType !== '' && drivers.registerFee !== '' && drivers.registDesc !== '' && drivers.img !== '') {
        this.driver.status = true
      } else {
        this.driver.status = false
      }
      console.log(drivers,456)
    },
    checkEdit () {
      let joinInfo = storage.get('data')
      if (joinInfo) {
        joinInfo = JSON.parse(joinInfo)
        if (joinInfo.name !== '' && joinInfo.linkman !== '' &&  joinInfo.address !== '') {
          this.$store.dispatch('setEdit', {'Editsubmit': true})
        } else {
          this.$store.dispatch('setEdit', {'Editsubmit': false})
        }
      }
    },
    bd09togcj02 (bd_lon, bd_lat) {
      var x_pi = 3.14159265358979324 * 3000.0 / 180.0
      var x = bd_lon - 0.0065
      var y = bd_lat - 0.006
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
      var gg_lng = z * Math.cos(theta)
      var gg_lat = z * Math.sin(theta)
      return {lng: gg_lng,lat: gg_lat}
    },
    hideshare() {
      var wx = window.wx
      wx.ready(function(){
        wx.hideAllNonBaseMenuItem();
        wx.hideMenuItems({
            menuList: ["menuItem:editTag","menuItem:delete","menuItem:copyUrl","menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:QZone","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email","menuItem:share:weiboApp"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
      })
    }
  }
}
