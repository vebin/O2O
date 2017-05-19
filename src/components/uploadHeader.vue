<template>
  <div class="uploadHeader">
    <p class="title">{{uploadTitle}}</p>
    <p class="upload">上传要求</p>
  </div>
</template>
<script>
export default {
  props: ['uploadTitle']
}
</script>
<style>
  .uploadHeader{
    display: flex;
    flex-direction: row;
    padding-top: 15px;
    padding-bottom: 10px;
    background: #fff;
    align-items: center;
  }
  .title{
    flex:1;
    margin-left: 15px;
    font-size: 18px;
    color: #333333;
    line-height: 22px;
    text-align: left;
  }
  .upload{
    width: 56px;
    font-size: 14px;
    color: #0083E6;
    line-height: 22px;
    margin-right: 15px;
    text-align: right;
  }
</style>
