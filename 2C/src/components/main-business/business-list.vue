<template lang="html">
  <div class="wraper">
    <figure>
      <img :src="business.businessImg">
    </figure>
    <div class="info">
      <div class="title">{{business.businessTitle}}</div>
      <div class="price">¥ {{business.businessPrice}}</div>
    </div>
    <img class="remove" src="https://s.kcimg.cn/wap/images/detail/o2oImg/close.png" alt="" @click="remove">
  </div>
</template>

<script>
export default {
  props: ['index', 'business'],
  data () {
    return {}
  },
  methods: {
    remove () {
      this.$emit('remove', this.index)
    }
  }
}
</script>

<style lang="css" scoped>
  .wraper {
    display: flex;
    align-items: center;
    height: 80px;
    background: #fff;
    padding-left: 115px;
    border-radius: 4px;
    position: relative;
     border: 1px solid #e5e5e5;
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
    margin-right: 32px;
    word-break: break-all;
  }
  .wraper .info .title {
    width: 100%;
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
  .wraper .info .price {
    width: 100%;
    margin-top: 4px;
    font-size: 16px;
    color: #FF6600;
    letter-spacing: 0;
    line-height: 16px;
  }
  .remove {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    z-index: 1;
  }
</style>
