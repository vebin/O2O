<template>
  <div class="wraper" @click="jump(`/LicenseDetail/${drives.shopId}/${drives.infoId}`)">
    <figure>
      <img :src="drives.img" alt="">
    </figure>
    <div class="info">
      <div class="title">{{drives.licenseText}}驾照</div>
      <div class="price">¥ {{drives.registerFee}}</div>
      <div class="brand">{{drives.carType}}</div>
    </div>
    <img class="remove" src="http://s.kcimg.cn/wap/images/detail/o2oImg/close.png" alt="" @click.stop="remove">
  </div>
</template>

<script>
export default {
  props: ['index', 'drives'],
  data () {
    return {}
  },
  methods: {
    remove () {
      this.$emit('remove', this.index,this.drives)
    }
  }
}
</script>

<style lang="css" scoped>
  .wraper {
    background: #fff;
    padding-left: 115px;
    position: relative;
  }
  .wraper:after{
    content: "";
    position: absolute;
    left: 0;
    top:0;
    width: 200%;
    height: 200%;
    border: 1px solid #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-radius: 8px; 
  }
  .wraper figure {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 90px;
    height: 60px;
  }
  .wraper figure img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .wraper .info {
    width: 200px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .wraper .info .title {
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    line-height: 16px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .wraper .info .price {
    margin: 8px 0;
    font-size: 14px;
    color: #FF6600;
    line-height: 14px;
  }
  .wraper .info .brand {
    font-size: 12px;
    color: #BBBBBB;
    line-height: 14px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-right: 20px;
  }
  .remove {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    z-index: 3;
  }
</style>
