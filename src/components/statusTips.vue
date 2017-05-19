<template>
  <div class="tips">
    <p class="reason">驳回原因：</p>
    <p class="reason-content">{{reasonContent}}</p>
  </div>
</template>
<script>
export default {
  props: ['reasonContent']
}
</script>
<style>
  .tips{
    display: flex;
    flex-direction: row;
    height: 36px;
    background: #F63711;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 36px;
  }
  .reason{
    position: relative;
    left: 0;
    margin-left: 34px;
  }
  .reason:before{
    position: absolute;
    font-size: 14px;
    left: -20px;
    font-family: 'shoper';
    content: "\e6d9";
  }
</style>
