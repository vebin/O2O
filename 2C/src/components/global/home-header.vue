<template>
  <div class="header">
    <img :src="page.shopimg" alt="" class="bg" v-if="page.source!='驾照'">
    <img :src="driver.driverImg" alt="" class="bg" v-if="page.source=='驾照'">
    <div class="photo" v-if="page.imgStatus=='1'" @click="uploadImg">
      <span>{{text}}</span>
      <input type="file" class="upload" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
    </div>
    <span class="again-set-img" v-if="page.imgStatus=='2'" @click="uploadImg">修改
      <input type="file" class="upload" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
    </span>
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      text: '请横屏拍摄店铺照片',
      iphoneOld: false
    }
  },
  created () {
    if (this.setApp()==='appOld') {
      this.iphoneOld = true
    }
  },
  mounted () {
    this.setImg()
    this.connectWebViewJavascriptBridge((bridge) => { // 调用app上传图片成功回掉
      bridge.registerHandler("onImageUploadCallBack", (data, responseCallback) => {
        var res = JSON.parse(data)
        if (this.ShopData.uploadImageSource === 'shoping') {
          this.$store.dispatch('setEdit', {'shopimg': `${res.linkUrl}!200`})
          this.setdata({'shopimgPreview': `${res.linkUrl}!200`})
          this.$store.dispatch('myshopdata', {'shopimg': `${res.linkUrl}`})
          this.setdata({'shopimg': `${res.linkUrl}`})
          this.$store.dispatch('setEdit', {'imgStatus': `2`})
        } else if (this.ShopData.uploadImageSource === 'driving') {
          this.$store.dispatch('setDriver', {'driverImg': `${res.linkUrl}!200`})
          this.setdriver({'imgpreview': `${res.linkUrl}!200`})
          this.setdriver({'img': `${res.linkUrl}`})
          this.$store.dispatch('setEdit', {'imgStatus': `2`})
        } else if (this.ShopData.uploadImageSource === 'license') {
          this.setdata({'licensePreview': `${res.linkUrl}!200`})
          this.$store.dispatch('setEdit', {'certificatesimg': `${res.linkUrl}!200`})
          this.$store.dispatch('myshopdata', {'certificatesimg': `${res.linkUrl}`})
          this.setdata({'certificatesimg': `${res.linkUrl}`})
          this.$store.dispatch('setEdit', {'licenseImgstatus': `2`})
        }
        if (this.page.source === '添加') {
          this.submitStatus()
        } else if (this.page.source === '驾照') {
          this.setDriverStatus()
        }
      })
    })
  },
  computed: {
    page () { return this.$store.state.page },
    driver () { return this.$store.state.driver },
    ShopData () { return this.$store.state.ShopData }
  },
  methods: {
    setImg () {
     if (this.page.source !== '驾照') {
        let joinInfo = storage.get('data')
        if (JSON.parse(joinInfo).shopimg!=='' && JSON.parse(joinInfo).shopimg) {
          this.page.shopimg = JSON.parse(joinInfo).shopimgPreview
          this.page.imgStatus = '2'
        } else {
          this.page.imgStatus = '1'
        }
     } else {
       let driveDetail = JSON.parse(storage.get('drivedetail'))
       this.driver.driverImg = driveDetail.imgpreview
       this.text = "请横屏上传车型照片"
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
      if (this.page.source !== '驾照') {
        this.ShopData.uploadImageSource = 'shoping'
        this.ioschange(event.target,'shoping')
      }else{
        this.ShopData.uploadImageSource = 'driving'
        this.ioschange(event.target,'driving')
      }
    },
    uploadImg () {
      if (this.page.source !== '驾照') {
        if (this.setApp()==='appNew'){
          this.ShopData.uploadImageSource = 'shoping'
          this.appUpload()
        }else if(this.setApp()==='appOld'){
          console.log('旧版本之下input方法')
        } else {
          this.uploadNewImg('shoping')
        }
      } else {
        if (this.setApp()==='appNew'){
          this.ShopData.uploadImageSource = 'driving'
          this.appUpload()
        }else if(this.setApp()==='appOld'){
          console.log('旧版本之下input方法')
        } else {
          this.uploadNewImg('driving')
        }
      }
    }
  }
}
</script>

<style scoped>
.header{
  height: 210px;
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
  z-index: 1
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
.photo >span{
  color: #fff;
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
