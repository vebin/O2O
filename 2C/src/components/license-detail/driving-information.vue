<template>
  <div class="driving-information">
    <div class="header">
      <i class="driving-type">{{detail.licenseText}}驾照</i><span class="name">{{detail.carType}}</span>
    </div>
    <strong class="price" v-if="detail.registerFee">¥{{detail.registerFee}}</strong>
    <span class="time">{{detail.registDesc}}</span>
  </div>
</template>

<script>
export default {
  props: ['detail'],
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style scoped>
.driving-information{
  background: #fff;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
}
.time{
  font-size: 14px;
  color: #666666;
  margin-top: 15px;
  line-height: 22px;
}
.name{
  font-size: 18px;
  font-weight: bold;
  word-break: break-all;
}
.driving-type{
  font-size: 14px;
  color: #FE7302;
  line-height: 18px;
  border: 1px solid #FE7302;
  border-radius: 2px;
  padding: 3px 4px;
  margin-right: 10px;
}
.price{
  float: left;
  font-size: 18px;
  color: #FD4C29;
  line-height: 28px;
  margin-top: 10px;
}
.driving-line:after{
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
