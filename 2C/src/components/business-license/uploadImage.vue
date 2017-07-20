<template>
  <div class="upload" v-if="status=='0'">
    <img class="uploadImg" :src="page.certificatesimg" />
    <span class="again-set-img" v-if="page.licenseImgstatus=='2'" @click="uploadImg">修改
      <input type="file" class="edit-input" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
    </span>
    <div @click="uploadImg" v-else class="photo">
      <img class="addImg" :src="add" />
      <span class="uploadText">上传营业执照</span>
      <input type="file" class="upload-input" @change="iphoneOldChange" accept="image/jpg,image/jpeg,image/png,image/gif" v-if="iphoneOld" @click.stop>
    </div>
  </div>
  <div class="upload" v-else-if="status == '2'">
    <img class="uploadImg" :src="uploadImg" />
    <img class="statusImg" :src="certificates" />
  </div>
  <div class="upload" v-else-if="status == '4'">
    <img class="uploadImg" :src="uploadImg" />
    <img class="statusImg" :src="failed" />
  </div>
  <div class="upload" v-else>
    <img class="uploadImg" :src="uploadImg" />
    <img class="statusImg" :src="auditing" />
    <p class="statusText">您上传的营业执照正在审核中<br />请您耐心等待</p>
    <!-- 蒙层 -->
    <div class="upload-back"></div>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
import axios from 'axios'
export default {
  props: ['status','uploadImg'],
  computed: {
    page () { return this.$store.state.page }
  },
  data () {
    return {
      add: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload@2x.png',
      certificates: 'https://s.kcimg.cn/wap/images/detail/o2oImg/adopt.png', // 已认证
      auditing: 'https://s.kcimg.cn/wap/images/detail/o2oImg/Auditing.png', // 审核中
      failed: 'https://s.kcimg.cn/wap/images/detail/o2oImg/error.png', // 审核失败
      iphoneOld: false
    }
  },
  mounted () {
    this.connectWebViewJavascriptBridge((bridge) => { // 调用app上传图片成功回掉
      bridge.registerHandler("onImageUploadCallBack", (data, responseCallback) => {
        var res = JSON.parse(data)
        this.$store.dispatch('setEdit', {'certificatesimg': `${res.linkUrl}!200`,'licenseImgstatus':'2'})
        storage.set('licensePreview',`${res.linkUrl}!200`)
        this.ShopData.certificatesimg = res.linkUrl
        storage.set('license',res.linkUrl)
        this.checkSubmit()
      })
    })
  },
  created () {
    if (this.setApp()==='appOld') {
      this.iphoneOld = true
    }
    let licensePreview = storage.get('licensePreviewPreview')
    let license = storage.get('license')
    if (licensePreview) {
      this.page.certificatesimg = licensePreview
      this.page.licenseImgstatus = '2'
    } else{
      this.page.certificatesimg = 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload_bg@2x.png'
      this.page.licenseImgstatus = '0'
    }
    if (license) {
      this.ShopData.certificatesimg = license
    } else{
      this.ShopData.certificatesimg = ''
    }
  },
  methods: {
    checkSubmit () {
      if (this.status === 2 && this.ShopData.certificatesimg !== '' && this.$parent.changeReason !== '') {
        this.$parent.submit = true
      } else if (this.ShopData.certificatesimg !== '') {
        this.$parent.submit = true 
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
      var file = event.target.files[0]; // 获取file input中的图片信息列表
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
          _this.$store.dispatch('setEdit', {'certificatesimg': `${res.data.imgUrl}`,'licenseImgstatus':'2'})
          storage.set('licensePreview',res.data.imgUrl)
          _this.ShopData.certificatesimg = res.data.imgUrl
          storage.set('license',res.data.imgUrl)
          _this.checkSubmit()
      })
    },
    uploadImg() {
      if (this.setApp()==='appNew'){
        this.appUpload()
      }else if(this.setApp()==='appOld'){
        console.log('旧版本之下input方法')
      } else {
        this.uploadNew()
      }
    },
    uploadNew () {
      var wx = window.wx
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function (res) {
          _this.$store.dispatch('setEdit', {'certificatesimg': `${res.localIds[0]}`,'licenseImgstatus':'2'})
          storage.set('licensePreview',res.localIds[0])
          wx.uploadImage({
            localId: res.localIds[0],
            isShowProgressTips: 1,
            success: function (el) {
              _this.ShopData.certificatesimg = el.serverId
              storage.set('license',el.serverId)
              _this.checkSubmit()
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .upload{
    position: relative;
    height: 193px;
    padding: 0 15px;
  }
  .uploadImg{
    width: 100%;
    height: 100%;
    -webkit-object-fit: cover;
    object-fit: cover;
    display: block;
  }
  .upload-back{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
  .addImg{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
  }
  .uploadText{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: 33px;
    font-size: 16px;
    color: #fff;
  }
  .statusImg{
    position: absolute;
    width: 55px;
    height: 55px;
    right: 15px;
    top: 0px;
  }
  .upload-input{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 96px;
    height: 64px;
    margin-top: 10px;
    transform: translate(-50%, -50%);
    z-index: 3;
    opacity: 0;
  }
  .edit-input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    opacity: 0; 
  }
  .statusText{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #fff;
  }
  .again-set-img{
    position: absolute;
    right: 30px;
    top:15px;
    background: rgba(0,0,0,0.60);
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
