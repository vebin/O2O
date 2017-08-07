<template>
  <div class="content">
    <home-header></home-header>
    <driving-type-select></driving-type-select>
    <div class="cells">
      <label class="cell-title">练习车型</label>
      <input class="cell-input" type="text" placeholder="请输入练习车型" :value="carType" @input="setCarType" />
    </div>
    <div class="cells">
      <label class="cell-title">报名费用</label>
      <input class="cell-input" type="tel" placeholder="0元" :value="registerFee" @input="setPrice" />
    </div>
    <div class="cells-textarea">
      <label class="cell-title cell-label">报名介绍</label>
      <textarea class="textarea" placeholder="请输入费用具体信息(如食宿，练习时间等)" :value="registDesc" @input="setDec" maxlength="200"></textarea>
    </div>
    <div @click="complete" :class="[driver.status ? 'complete' : 'disabled complete']">完成</div>
    <loading-img v-if="page.imgloading"></loading-img>
  </div>
</template>
<script>
import XHR from '../api'
import storage from '../store/storage.js'
import HomeHeader from '../components/global/home-header'
import DrivingTypeSelect from '../components/add-driving/driving-type-select'
import LoadingImg from '../components/global/loading-img.vue'
export default {
  data () {
    return {
      licenseValue: '', // 选择驾照类型
      drivingValue: {}, // 驾校信息
      carType: '',
      registerFee: '',
      registDesc: '',
      infoId: 0
    }
  },
  computed: {
    driver () { return this.$store.state.driver }
  },
  components: { HomeHeader, DrivingTypeSelect, LoadingImg},
  created () {
    if (this.$route.params.source === '1') {
      this.getLocalStorage()
      this.$store.dispatch('setEdit', {'imgStatus': `2`, 'source': `驾照`})
    } else {
      this.setdriver({'carType':'','registerFee':'','registDesc':'','licenseType':'','img':'','imgpreview':'https://s.kcimg.cn/wap/images/detail/o2oImg/car_type.jpg'})
      this.driver.licenseType = ''
      this.$store.dispatch('setEdit', {'imgStatus': `1`, 'source': `驾照`})
    }
    this.setDriverStatus()
  },
  mounted (){
    this.settitle()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()!=='other') {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'添加驾照信息'})
      } else {
        window.document.title = '添加驾照信息'
        this.hideshare()
      }
    },
    getLocalStorage () {
      this.drivingValue = JSON.parse(storage.get('drivedetail'))
      this.carType = this.drivingValue.carType
      this.registerFee = this.drivingValue.registerFee
      this.registDesc = this.drivingValue.registDesc
      this.driver.driverImg = this.drivingValue.img
      this.driver.licenseType = this.drivingValue.licenseType
      this.infoId = this.drivingValue.infoId
    },
    setCarType (e) {
      this.setdriver({'carType':e.target.value})
      this.carType = e.target.value
      this.setDriverStatus()
    },
    setPrice (e) {
      e.target.value = e.target.value
      if (e.target.value.length>6) {
        e.target.value = e.target.value.substring(0, 6)
      }
      this.setdriver({'registerFee':e.target.value})
      this.registerFee = e.target.value
      this.setDriverStatus()
    },
    setDec (e) {
      this.setdriver({'registDesc':e.target.value})
      this.registDesc = e.target.value
      this.setDriverStatus()
    },
    complete () {
      if (this.driver.status) {
        this.driver.status = false
        let drivingValue = JSON.parse(storage.get('drivedetail'))
        let json = {
          'shopId':drivingValue.shopid,
          'driverImg':drivingValue.img,
          'licenseType':drivingValue.licenseType,
          'carType':drivingValue.carType,
          'registerFee':drivingValue.registerFee,
          'registDesc':drivingValue.registDesc,
          'infoId':this.infoId
        }
        XHR.getRegisterIn(json).then((res) => {
          if (res.data.status === 1) {
            this.back()
          } else {
            alert(res.data.msg)
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .content{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
  }
  .cells-textarea{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    min-height: 88px;
    width: 100%;
    background: #fff;
  }
  .cell-label{
    margin-top: 10px;
  }
  .textarea{
    flex:1;
    padding: 10px 15px 10px 13px;
    min-height: 88px;
    resize: none;
    font-size: 16px;
    color:#333;
    line-height: 24px;
  }
  .complete{
    margin: 30px 15px 72px 15px;
    background: #FF6600;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 5px;
    text-align: center;
    letter-spacing: 0;
    line-height: 45px;
    height: 45px;
  }
  .disabled{
    background: #FF6600;
    opacity: 0.4;
  }
</style>
