<template>
  <div class="enroll-no">
    <img src="https://s.kcimg.cn/wap/images/detail/o2oImg/enroll-no.png" alt="" class="enroll-no-icon">
    <h3 class="title text">还没有驾校信息哦</h3>
    <span class="text">快来添加报名信息吧</span>
    <span class="add-driving" @click="jump('/AddLicenseInfo/0')">添加驾照信息</span>
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
  .enroll-no{
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .enroll-no-icon{
    width: 150px;
    height: 110px;
    margin: 70px auto 30px;
  }
  .text{
    font-size: 14px;
    color: #999999;
    line-height: 22px;
  }
  .title{
    font-size: 18px;
    color: #666;
    line-height: 28px;
  }
  .add-driving{
    width: 260px;
    height: 45px;
    background: #09BB07;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 45px;
    margin-top: 30px;
  }
  .add-driving:before{
    content: '\e6b8';
    font-family: 'shoper';
    margin-right: 5px;
  }
</style>
