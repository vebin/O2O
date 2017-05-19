<template>
  <div class="service-brand">
    <header>A</header>
    <ul>
      <li class="no-select">北奔重卡</li>
      <li class="select">北奔重卡</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    EnterStatus () { return this.$store.state.EnterStatus }  // 用户是否入住成功状态
  },
  created () {
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .service-brand >header{
    height: 30px;
    padding-left: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .service-brand > ul{
    padding-left: 15px;
    background: #fff;
  }
  .service-brand li{
    height: 44px;
    font-size: 16px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .service-brand li:after{
    content: " ";
    position: absolute;
    left: 0;
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
  .service-brand .no-select:before{
    content:'';
    display: inline-block;
    width: 17px;
    height: 17px;
    border:1px solid #eee;
    border-radius: 50%;
    margin-right: 15px;
  }
  .service-brand .select{
    color: #09BB07;
  }
  .service-brand .select:before{
    content:'\597d';
    font-family: 'shoper';
    display: inline-block;
    font-size: 18px;
    color: #09BB07;
    border-radius: 50%;
    margin-right: 15px;
  }
</style>
