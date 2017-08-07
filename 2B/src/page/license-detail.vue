<template>
  <div class="content">
    <div class="main-content">
      <div class="shop-img">
        <img :src="photo" alt="" ref="img">
      </div>
      <driving-information :detail="detail"></driving-information>
    </div>
    <a :href="detail.registLink" class="edit"><span>我要报名</span></a>
    <a href="JavaScript:history.back(-1)"><go-back></go-back></a>
  </div>
</template>

<script>
import XHR from '../api'
import DrivingInformation from '../components/driving-detail/driving-information.vue'
import GoBack from '../components/global/go-back.vue'
export default {
  components: {DrivingInformation, GoBack},
  data () {
    return {
      detail: {},
      photo:''
    }
  },
  created () {
    let _this = this
    XHR.getDriveDetail({shopId: `${this.$route.params.shopid}`, infoId: `${this.$route.params.infoId}`}).then(function (res) {
      _this.detail = res.data.data
      _this.photo = _this.detail.img
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
      if (this.setApp()==='other') {
        this.getWxconfig()
        this.hideshare()
        window.document.title = '驾照详情'
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'驾照详情'})
      }
    }
  }
}
</script>

<style scoped>
.content{
  height: 100%;
  position: relative;
  padding-bottom: 45px;
  box-sizing: border-box
}
.main-content{
  height: 100%;
  overflow: scroll;
}
.edit{
 position: fixed;
 left: 0;
 right: 0;
 bottom: 0;
}
.edit span{
  height: 45px;
  background-color: #09BB07;
  width: 100%;
  text-align: center;
  line-height: 45px;
  color: #fff;
  font-size: 16px;
  display: block;
}
.edit span:before{
  content: '\e6b8';
  font-family: 'shoper';
  margin-right: 5px;
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
