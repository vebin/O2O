<template>
  <div class="header">
    <img :src="shopimg" alt="" class="bg">
    <div class="photo" v-if="imgStatus">
      <span>拍摄店铺照片</span>
    </div>
    <span class="again-set-img" v-else>修改</span>
  </div>
</template>

<script>
export default {
  props: ['imgStatus'],
  data () {
    return {
      shopimg: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo_bg@2x.png'
    }
  },
  created () {
  }
}
</script>

<style scoped>
.header{height: 210px;width: 100%;position: relative;overflow: hidden;display: flex;justify-content: center;align-items: center;}
.bg{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top:0;
  z-index: 1
}
.photo{
  position: relative;
  z-index: 2
}
.photo:before{
  content: '';
  display: block;
  width: 90px;
  height: 90px;
  background: url("https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo@2x.png") 50% 50%;
  background-size: cover;
  margin:0 auto 10px;
}
.photo >span{
  color: #fff;
}
.again-set-img{
  position: absolute;
  right: 15px;
  top:15px;
  background: rgba(0,0,0,0.80);
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
