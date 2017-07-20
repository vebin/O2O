<template>
<div class="content">
  <div class="shop-img">
    <img :src="photo" :alt="detail.registDesc" ref="img">
  </div>
  <driving-information :detail="detail"></driving-information>
  <div class="edit" @click="toedit"><span>编辑</span></div>
</div>
</template>

<script>
import XHR from '../api'
import storage from '../store/storage.js'
import DrivingInformation from '../components/license-detail/driving-information.vue'
export default {
  components: {DrivingInformation},
  data () {
    return {
      detail: {},
      photo: ''
    }
  },
  created () {
    XHR.getDriveDetail({shopId: `${this.$route.params.shopid}`, infoId: `${this.$route.params.infoId}`}).then((res) => {
      this.detail = res.data.data
      this.photo = this.detail.img
    })
  },
  mounted () {  // 默认图片
    this.settitle()
    this.$refs.img.onerror = () => {
      this.photo = `https://s.kcimg.cn/wap/images/detail/o2oImg/onerror_10.png`
    }
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'报名信息'})
      } else {
        window.document.title = '报名信息'
        this.hideshare()
      }
    },
    toedit () {
      storage.set('drivedetail', this.detail)
      this.setdriver({'imgpreview':this.photo})
      this.jump('/AddLicenseInfo/1')
    }
  }
}
</script>

<style scoped>
  .edit{
   padding: 30px 15px
  }
  .edit span{
    height: 45px;
    background-color: #09BB07;
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
  }
  .shop-img{
    height: 210px;
    overflow: hidden;
  }
  .shop-img img{
    width: 100%;
    height: 100%;
  }
</style>
