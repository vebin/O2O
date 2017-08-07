<template>
  <div class="businessLicense">
    <!-- 只有 0 或 1 会显示头图 -->
    <img class="header-img" src="https://s.kcimg.cn/wap/images/detail/o2oImg/shop-authentication.jpg" v-if="status != '2' && status != '3' && status != '4'">

    <!-- 状态不为0 和 1的时候需要显示 传入3的时候显示为2 -->
    <upload-img :status="status == '3' ? '2' : status" :uploadImg='uploadImg' v-if="status != '1' && status != '0'" :class="'head-upload-img'"></upload-img>
    <!-- 是否通过认证 -->
    <statusTips v-if="status == '4'" :reasonContent="licenseInfo.after"></statusTips>
    <p class="license-time" v-else-if="status == '2'">您的营业执照于{{year}}年{{month}}月{{day}}日通过认证</p>
    <p class="license-time" v-else-if="status == '3'">您的营业执照于{{year}}年{{month}}月{{day}}日通过认证</p>
    <!-- 标头 上传图片 -->
    <upload-header :status="status"></upload-header>

    <!-- 当状态为2 和 4的时候，是需要显示为上传， 其他时候显示正常 -->
    <upload-img :status="(status == '2' || status == '4') ? '0' : status" :uploadImg='uploadImg'></upload-img>

    <!-- 状态为2的时候可以进行更换审核图片 -->
    <div class="edit" v-if="status == '2'">
      <h2>更换原因</h2>
      <input type="text" v-model="changeReason" placeholder="请填写更换原因（20字以内）"  @input='oninput'/>
    </div>

    <!-- 状态为1 和 3的时候是不显示提交的 -->
    <div class="business-submit" v-if="status != '1' && status != '3'"><span :class="submit ? '': 'disabled'" @click="businessSubmit">提交</span>
    </div>
    <loading-img v-if="page.imgloading"></loading-img>
  </div>
</template>
<script>
import XHR from '../api'
import UploadHeader from '../components/business-license/UploadHeader'
import UploadImg from '../components/business-license/UploadImage'
import StatusTips from '../components/global/statusTips.vue'
import LoadingImg from '../components/global/loading-img.vue'
import storage from '../store/storage.js'
export default {
  components: { UploadHeader, UploadImg, StatusTips, LoadingImg},
  data () {
    return {
      licenseInfo: {},
      submit: false,
      changeReason: '',
      uploadImg:'',
      status: 0,    // 0 代表什么也没有上传，1 代表第一次上传了营业执照，审核中，2代表上传成功，并通过，3修改上传成功，审核中，4代表被驳回
      year:'',
      month:'',
      day:''
    }
  },
  created () {
    this.getInfo()
  },
  mounted (){
    this.settitle()
  },
  computed: {
    shopdata () { return this.$store.state.ShopData }
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
    oninput () {
      if (this.ShopData.certificatesimg !== '' && this.changeReason !== '') {
        this.submit = true
      }
    },
    getInfo () {
      XHR.licenseInfo({shopId: this.$route.params.shopid}).then((res) => {
        this.licenseInfo = res.data
        let before = res.data.before
        let after = res.data.after
        if (after) {
          this.year = after.checkDate.substring(0,4)
          if ( after.checkDate.substring(5,6) === '0') {
            this.month = after.checkDate.substring(6,7)
          } else {
            this.month = after.checkDate.substring(5,7)
          }
          if ( after.checkDate.substring(8,9) === '0') {
            this.day = after.checkDate.substring(9,10)
          } else {
            this.day = after.checkDate.substring(8,10)
          }
          this.uploadImg = after.certificatesImg
          if (after.auditStatus === 0) {
            this.status = 1
          } else if (after.auditStatus === 2) {
            this.status = 4
          } else if (after.auditStatus === 1) {
            this.status = 2
          }
          if (after.auditStatus === 0 && before.isCertificates === 1) {
            this.status = 3
          }
        } else {
          this.uploadImg = before.certificatesImg
          if (before.certificatesImg === '') {
            this.status = 0
          }
          if (before.isCertificates === 1) {
            this.status = 2
          }
        }
      })
    },
    businessSubmit () {
      if (this.submit) {
        this.submit = false
        var _this = this
        let json = {
          'shopId': this.$route.params.shopid,
          'certificateImg': this.shopdata.certificatesimg,
          'changeReason': this.changeReason
        }
        XHR.uploadLicenseInfo(json).then((res) => {
          this.submit = true
          if (res.data.status) {
            storage.remove('license')
            storage.remove('licensePreview')
            this.back()
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .businessLicense{
    display: flex;
    flex-direction: column;
    height: 100%;overflow-y: auto;
  }
  .head-upload-img{
    margin-top: 15px;
  }
  .header-img{
    width: 100%;
    height: 100px;
    display: block;
  }
  .business-submit{
    padding: 30px 15px;
  }
  .business-submit span{
    background:rgba(255,102,0,1);
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    display: block;
    width: 100%;
    height: 45px;
    text-align: center;
    line-height: 45px;
  }
  .business-submit .disabled {
    opacity: 0.4
  }
  .edit{
    padding: 20px 15px 0;
  }
  .edit h2{
    height: 22px;
    line-height: 22px;
   }
  .edit input{
    padding: 5px 0 10px;
    width: 100%;
    background: none;
    border-bottom: 1px solid #e5e5e5;
    font-size: 16px;
    line-height: 24px;
  }
  .license-time{
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
  }
</style>
