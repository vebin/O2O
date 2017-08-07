<template>
  <div class="header">
    <img :src="page.shopimg" alt="" class="bg" v-if="page.source!='驾照'">
    <div class="photo" v-if="ShopData.shopimg===''" @click="uploadnew">
      <span>请横屏拍摄店铺照片</span>
      <input type="file" class="upload" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
    </div>
    <span class="again-set-img" v-if="ShopData.shopimg!==''" @click="uploadnew">
      修改
      <input type="file" class="upload" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
    </span>
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      iphoneOld: false
    }
  },
  computed: {
    page () { return this.$store.state.page }
  },
  created () {
    this.setImg()
    if (this.setApp()==='appOld') {
      this.iphoneOld = true
    }
  },
  mounted () {
    var _this = this
    this.connectWebViewJavascriptBridge(function(bridge) {              // 调用app上传图片成功回掉
        bridge.registerHandler("onImageUploadCallBack", function(data, responseCallback) {
          var res = JSON.parse(data)
          _this.$store.dispatch('setEdit', {'shopimg': `${res.linkUrl}!200`})
          _this.setdata({'shopimgPreview': `${res.linkUrl}!200`})
          _this.$store.dispatch('myshopdata', {'shopimg': `${res.linkUrl}`})
          _this.setdata({'shopimg': `${res.linkUrl}`})
          _this.submitStatus()
        });
    });
  },
  methods: {
    setImg () {
     let joinInfo = storage.get('recommend')
      if (JSON.parse(joinInfo).shopimg!=='') {
        this.page.shopimg = JSON.parse(joinInfo).shopimgPreview
        this.ShopData.shopimg  = JSON.parse(joinInfo).shopimg
      }
    },
    supplementZero (n) {
        n = n + '';
        return n.length == 1 ? '0' + n : n;
    },
    appUpload () {                      // 调用app上传图片
      var time = new Date()
      var year = time.getFullYear().toString()
      var mouth= time.getMonth()+1 
          mouth= this.supplementZero(mouth)
      var day = time.getDate()
          day = this.supplementZero(day)
      this.callNativeMethod("onImageUpload",{
        "bucket":"img1-360che-com",
        "imgPath":"peripheral/"+year+"/"+mouth+day+"/",
        "hostUrl":"https://img1.kcimg.cn/"
      })
    },
    iphoneOldChange (event) {        //旧版本iphone上传图片
      this.ioschange(event.target)
    },
    uploadnew () {
      if (this.setApp()==='appNew') {
        this.appUpload()
        this.ShopData.uploadimgSource = 1
      } else if(this.setApp()==='appOld'){
        console.log('不执行')
      } else {
        this.uploadNewImg('shoping')
      }
    }
  }
}
</script>

<style scoped>
.header{
  min-height: 180px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top:0;
  z-index: 1;
}
.photo{
  position: relative;
  z-index: 2
}
.photo:before{
  content: '';
  display: block;
  width: 90px;
  height: 90px;
  background: url("https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo@2x.png") 50% 50%;
  background-size: cover;
  margin:0 auto 10px;
}
.file{
  position: absolute;
  z-index: 3;
}
.upload{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  opacity: 0;
}
.photo >span{
  color: #fff;
}
.again-set-img{
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
