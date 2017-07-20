<template>
<div class="wraper">
  <div class="content">
    <ul v-if="driveData.length">
      <li v-for="item in driveData" @click="jump(`/LicenseDetail/${item.shopId}/${item.infoId}`)">
        <driving-type :driving="item"></driving-type>
      </li>
    </ul>
    <driving-null v-else></driving-null>
  </div>
  <div class="add" v-if="driveData.length" @click="jump('/AddLicenseInfo/0')">添加驾照信息</div>
</div>
</template>

<script>
import XHR from '../api'
import DrivingType from '../components/licenselist/driving-type.vue'
import DrivingNull from '../components/licenselist/driving-null.vue'
export default {
  components: {DrivingType, DrivingNull},
  data () {
    return {
      dataStatus: true,
      driveData: [],
      shopid: this.$route.params.shopid
    }
  },
  created () {
    this.setdriver({'shopid':this.shopid})
    XHR.getDriveList({shopId: this.shopid}).then( (res) => {
      this.driveData = res.data.data
    })
  },
  mounted () {
    this.settitle()
  },
  methods:{
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'驾照类型'})
      } else {
        window.document.title = '驾照类型'
        this.hideshare()
      }
    }
  }
}
</script>

<style scoped>
.wraper{
  height: 100%;
}
.content{
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
}
  .add{
    height: 45px;
    background-color: #09BB07;
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .add:before{
    font-family: 'shoper';
    content: '\e6b8';
    margin-right: 5px;
  }
</style>
