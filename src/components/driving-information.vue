<template>
  <div class="driving-information">
    <div class="header">
      <strong class="price">￥13000</strong>
      <i>A1驾照</i><span class="name">东风</span>
    </div>
    <span class="time">练习时间9:00-17:00</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
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
.driving-information .time{
  font-size: 14px;
  color: #666666;
  margin-top: 15px;
  line-height: 22px;
}
.driving-information .header .name{
  font-size: 18px;
  font-weight: bold;
}
.driving-information .header >i{
  font-size: 14px;
  color: #FE7302;
  line-height: 18px;
  border: 1px solid #FE7302;
  border-radius: 2px;
  padding: 3px 4px;
  margin-right: 10px;
}
.driving-information .header .price{
  float: right;
  font-size: 18px;
  color: #FD4C29;
  line-height: 28px;
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
