<template>
  <div class="license">
    <p class="title">营业执照</p>
    <div class="imgs">
      <div class="upload-img">
        <img class="licenseImg" :src="licenseImg" />
        <span class="text add" v-if="imgStatus">上传营业执照</span>
      </div>
      <div class="editImg" v-if="!imgStatus"><span class="editText">修改</span></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['imgStatus'],
  data () {
    return {
      licenseImg: 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload_bg@2x.png'
    }
  },
  computed: {
    page () { return this.$store.state.page }
  }
}
</script>
<style scoped>
  .license{
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff
  }
  .title{
    padding-top: 10px;
    padding-left: 15px;
    font-size: 16px;
    color: #666666;
    line-height: 24px;
    height: 24px;
  }
  .imgs{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .licenseImg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .upload-img{
    position: relative;
    width: 286px;
    height: 160px;
    margin:15px auto;
    display: flex;
    justify-content: center;align-items: center;
  }
  .editImg{
    position: absolute;
    right: 44px;
    top: 25px;
    opacity: 0.8;
    background: rgba(0,0,0,0.80);
    border-radius: 72.46px;
  }
  .text{
    color: #fff;
    font-size: 12px;
    position: relative;
  }
  .add:before{
    content: '\e6b8';
    font-family: 'shoper';
    display: block;
    font-size: 28px;
    text-align: center;
  }
  .editText{
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 22px;
    padding: 0 10px 0 11px;
  }
</style>
