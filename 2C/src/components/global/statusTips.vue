<template>
  <div class="tips">
    <span class="reason">驳回原因：</span>
    {{reasonContent.faildescription}}
  </div>
</template>
<script>
export default {
  props: ['reasonContent'],
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
<style>
  .tips{
    background: #F63711;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 22px;
    padding: 7px 10px;
    display: block;
  }
  .reason{
    position: relative;
    margin-left: 24px;
    display: inline-block;
  }
  .reason:before{
    position: absolute;
    font-size: 14px;
    left: -20px;
    font-family: 'shoper';
    content: "\e6d9";
  }
  .reason-content{
  line-height: 20px;
  display: inline-block;
  }
</style>
