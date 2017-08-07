<template>
  <div class="driving-type-select">
    <h2 class="title">驾照类型</h2>
    <div class="driving-tab">
      <label v-for="(item, index) in typeList" class="label">
        <input type="radio" name="drive" :value="item.typeId" v-model.number="driver.licenseType" @change="onchange()" class="input" />
        <span class="Desc">{{item.typeDesc}}</span>
        </label>
    </div>
  </div>
</template>

<script>
import XHR from '../../api'
export default {
  data () {
    return {
      typeList: []
    }
  },
  created () {
    XHR.getDriveType().then((res) => {
      this.typeList = res.data
    })
  },
  methods: {
    onchange (e) {
      this.setdriver({'licenseType':this.driver.licenseType})
      this.setDriverStatus()
    }
  }
}
</script>

<style scoped>
.driving-type-select{
  padding: 10px 15px 0 15px;
  background: #fff;
  position: relative;
  overflow: hidden;
}
.title{
  font-size: 16px;
  color: #666666;
  line-height: 24px;
}
.driving-tab{
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.label{
  flex:1;margin-right: 10px;
  position: relative;
  height:30px
}
.input{
  position: absolute;
  left: 0;
  top:0;
  z-index: 5;
  width: 100%;
  height: 100%;
  opacity: 0;
  border:none;
}
.Desc{
  border: 1px solid #E5E5E5;
  border-radius: 100px;
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex:1;
  font-size: 14px;
  color: #666;
}
.driving-tab input[type="radio"]:checked + span{
  color: #fff;
  background: #FF6600;
  border-color: #FF6600;
  box-shadow: 0 2px 4px 0 rgba(255,102,0,0.30);
  border-radius: 100px;
}
.label:last-child{
  margin-right: 0;
}
.driving-type-select:after{
  content: " ";
  position: absolute;
  left: 15px;
  bottom: -1px;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
