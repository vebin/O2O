<template>
  <div class="driving-type">
    <figure class="driving-img">
      <img :src="photo" alt="" ref="img">
    </figure>
    <div class="content">
        <h2>{{driving.licenseText}}驾照</h2>
        <p>
          <strong class="price"><em>￥</em>{{driving.registerFee}}</strong>
          <span class="name">{{driving.carType}}</span>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['driving'],
  data () {
    return {
      photo:''
    }
  },
  created () {
    this.photo =this.driving.img
  },
  mounted () {  // 默认图片
    this.$refs.img.onerror = () => {
      this.photo = `https://s.kcimg.cn/wap/images/detail/o2oImg/onerror_10.png`
    }
  }
}
</script>

<style scoped>
.driving-type{
  background: #fff;
}
.driving-type{
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: row;
}
.content{
  display: flex;
  flex-direction: column;
  flex:1;
}
.content h2{
  font-size: 16px;
  font-weight: bold;
  flex:1;
}
.content p{
  height: 28px;
}
.content .name{
  font-size: 14px;
  color: #666;
  max-width: 230px;
  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  display: block;
  line-height: 28px;
}
.content .price{
  float: right;
  font-size: 18px;
  color: #FD4C29;
  line-height: 28px;
  font-style: normal;
}
.price em{
  font-size: 12px;
  margin-right: 3px;
}
.driving-img{
  width: 100px;
  height: 70px;
  overflow: hidden;
  margin-right: 10px;
}
.driving-img img{
  width: 100px;
  height: 70px;
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
