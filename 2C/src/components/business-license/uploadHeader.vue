<template>
  <div class="uploadRequest">
    <div class="uploadHeader" v-if="status == '2'">
      <span class="upload" @click="jump('/EditStore')">上传要求</span>
      <span class="title">申请修改营业执照</span>
    </div>
    <div class="uploadHeader" v-else-if="status == '4'">
      <span class="upload" @click="jump('/EditStore')">上传要求</span>
      <span class="title">重新上传营业执照</span>
    </div>
    <div class="uploadHeader" v-else>
      <span class="upload" @click="jump('/EditStore')">上传要求</span>
      <span class="title">营业执照</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['status']
}
</script>
<style scoped lang="css">
  .uploadRequest{
    display: block;
  }
  .uploadHeader{
    display: flex;
    flex-direction: row-reverse;
    padding: 15px 15px 10px 15px;
  }
  .uploadHeader span{
    font-size: 18px;
    color: #333333;
    line-height: 22px;
  }
  .uploadHeader .upload{
    font-size: 14px;
    color: #0083E6;
    line-height: 22px;
  }
  .title{
    flex:1;
    align-self: flex-start;
  }
</style>
