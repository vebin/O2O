<template>
  <div class="license">
    <p class="title">营业执照</p>
    <div class="imgs">
      <div class="upload-img" @click="upload">
        <img class="licenseImg" :src="page.certificatesimg" />
        <span class="text add" v-if="page.licenseImgstatus=='1'">上传营业执照
        <input type="file" class="upload" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
        </span>
      </div>
      <div class="editImg" v-if="page.licenseImgstatus=='2'" @click="upload">
        <span class="editText">修改</span>
        <input type="file" class="upload" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
      </div>
    </div>
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
  created () {
    this.setImg()
    if (this.setApp()==='appOld') {
      this.iphoneOld = true
    }
  },
  computed: {
    page () { return this.$store.state.page },
    shopdata () { return this.$store.state.ShopData }
  },
  methods: {
    setImg () {
     let joinInfo = storage.get('data')
      if (JSON.parse(joinInfo).certificatesimg!=='' && JSON.parse(joinInfo).certificatesimg) {
        this.page.certificatesimg = JSON.parse(joinInfo).licensePreview
        this.page.licenseImgstatus = '2'
      } else {
        this.page.licenseImgstatus = '1'
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
      this.ShopData.uploadImageSource = 'license'
      this.ioschange(event.target,'license')
    },
    upload () {
      if (this.setApp()==='appNew'){
        this.ShopData.uploadImageSource = 'license'
        this.appUpload()
      }else if(this.setApp()==='appOld'){
        console.log('旧版本之下input方法')
      } else {
        this.uploadNewImg('license')
      }
    }
  }
}
</script>
<style scoped>
  .license{
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff
  }
  .title{
    padding-top: 10px;
    padding-left: 15px;
    font-size: 16px;
    color: #666666;
    line-height: 24px;
    height: 24px;
  }
  .imgs{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .licenseImg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .upload-img{
    position: relative;
    width: 286px;
    height: 160px;
    margin:15px auto;
    display: flex;
    justify-content: center;align-items: center;
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
  .editImg{
    position: absolute;
    right: 44px;
    top: 25px;
    opacity: 0.8;
    background: rgba(0,0,0,0.80);
    border-radius: 72.46px;
  }
  .text{
    color: #fff;
    font-size: 12px;
    position: relative;
  }
  .add:before{
    content: '\e6b8';
    font-family: 'shoper';
    display: block;
    font-size: 28px;
    text-align: center;
  }
  .editText{
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 22px;
    padding: 0 10px 0 11px;
  }
</style>
