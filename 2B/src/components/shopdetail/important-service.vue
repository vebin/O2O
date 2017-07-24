<template>
  <li class="main">
    <figure>
      <img :src="service.businessImg" alt="">
    </figure>
    <div class="content">
      <h6>{{service.businessTitle}}</h6>
      <p>￥{{service.businessPrice}}</p>
    </div>
  </li>
</template>
<script>
export default {
  props: ['service'],
  data () {
    return {}
  }
}
</script>
<style scoped>
  li {
    list-style-type:none;
    background: #fff;
    position: relative;
    padding: 15px;
    padding-left: 120px;
  }
  li::after {
  position: absolute;
  left: 0;
  bottom: 0;
  content: "";
  width: 100%;
  height: 1px;
  background: #E5E5E5;
  transform: scaleY(0.5);
  }
  li figure {
    position: absolute;
    left: 15px;
    width: 90px;
    height: 60px;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .content h6 {
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: bold;
    padding-right: 15px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .content p {
    margin-top: 4px;
    font-size: 16px;
    color: #FF6600;
    letter-spacing: 0;
    line-height: 16px;
  }
</style>
