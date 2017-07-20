<template>
  <div class="editStore">
    <header class="editHeader">
      请您认真阅读以下注意事项，以便我们快速通过您的认证审核：
    </header>
    <div class="editContent first">
      <span class="contentNum">1.</span><p class="content">请确保您上传的营业执照公司名称与商铺名称
     保持一致</p>
    </div>
    <div class="editContent">
      <span class="contentNum">2.</span><p class="content">请确保您上传的营业执照真实，且在有效期内</p>
    </div>
    <div class="editContent">
      <span class="contentNum">3.</span><p class="content">请确保您上传的营业执照图片清晰、完整、方向正确，不能涂改，不能带有无关的水印、标记或者其他网站的logo</p>
    </div>
    <div class="editContent">
      <span class="contentNum">4.</span><p class="content">若办理过三证合一，请您上传最新版营业执照</p>
    </div>
    <div class="editContent">
      <span class="contentNum">5.</span><p class="content">格式要求：<br />
      原件照片、扫描件或者加盖公章的复印件。支持jpg、jpeg、png、bmp等图片格式，大小不超过10M</p>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    this.hideshare()
  }
}
</script>
<style scoped>
  .editStore{
    padding: 15px;
    flex:1;
    background-color: #fff;
  }
  .first{
    margin-top: 15px;
  }
  .editHeader{
    font-size: 16px;
    color: #333333;
    line-height: 24px;
    font-weight: 900;
  }
  .editContent{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333333;
    line-height: 24px;
  }
  .content{
    margin-left: 5px;
  }
</style>
