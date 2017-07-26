<template lang="html">
  <div class="wraper">
    <figure>
      <img :src="drives.img" alt="">
    </figure>
    <div class="info">
      <div class="title">{{drives.licenseText}}驾照</div>
      <div class="price">¥ {{drives.registerFee}}</div>
      <div class="brand">{{drives.carType}}</div>
    </div>
    <img class="remove" src="http://s.kcimg.cn/wap/images/detail/o2oImg/close.png" alt="" @click="remove">
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
      // this.$parent.dringtypes.splice(this.index, 1)
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
  }
  .remove {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
  }
</style>
