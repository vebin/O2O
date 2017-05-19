<template>
<div>
  <div class="upload">
    <img class="uploadImg" :src="uploadImg" />
    <img class="addImg" :src="add" />
    <img class="statusImg" :src="status" />
    <p class="uploadText">{{uploadText}}</p>
    <p class="statusText">您上传的营业执照正在审核中<br />请您耐心等待</p>
  </div>
  <div class="upload">
    <img class="uploadImg" :src="uploadImg" />
    <img class="statusImg" :src="status" />
    <p class="statusText">您上传的营业执照正在审核中<br />请您耐心等待</p>
  </div>
</div>
  
</template>
<script>
export default {
  props: ['uploadText', 'type'],
  data () {
    return {
      uploadImg: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload_bg@2x.png',
      add: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload@2x.png',
      status: 'https://s.kcimg.cn/wap/images/detail/o2oImg/adopt.png'
    }
  }
}
</script>
<style scoped>
  .upload{
    position: relative;
    width: 100%;
    min-height: 193px;
    padding: 10px 15px;
    box-sizing: border-box;
  }
  .uploadImg{
    width: 100%;
    height: 100%;
  }
  .addImg{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
  }
  .uploadText{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: 33px;
    font-size: 16px;
    color: #fff;
  }
  .statusImg{
    position: absolute;
    width: 55px;
    height: 55px;
    right: 15px;
    top: 10px;
  }
  .statusText{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #fff;
  }
</style>
