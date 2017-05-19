<template>
  <div class="select-brand">
    <header class="title">
        已选品牌
      <span class="chear-all">清空</span>
    </header>
    <ul class="brand-tab">
      <li>长安跨越<span class="delete">&#xe6fc;</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
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
  .select-brand{padding-left: 15px;}
  .select-brand .title{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    position: relative;
    padding-right: 15px;
  }
  .select-brand .title:after{
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
  .chear-all{
    font-size: 12px;
    color: #999;
  }
  .chear-all:before{
    content:'\e6ff';
    font-family: "shoper";
    margin-right: 5px;
  }
  .brand-tab{
    padding: 15px;
    padding-left: 0;
    overflow: hidden;
  }
  .brand-tab >li{
    height: 18px;
    padding: 0 24px 0 4px;
    font-size: 12px;
    color: #2196F3;
    border:1px solid #2196F3;
    float: left;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .brand-tab >li .delete{
    width: 20px;
    height: 20px;
    background: #2196F3;
    color: #fff;
    font-family: 'shoper';
    display: inline-block;
    position: absolute;
    right: 0;
    top:0;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }
</style>
