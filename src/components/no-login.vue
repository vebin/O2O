<template>
  <div class="no-login">
    <span class="to-login">去登陆</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.no-login{
  display: flex;
  flex:1;
  background: url("https://s.kcimg.cn/wap/images/detail/o2oImg/no-login.jpg") 50% 50%;
  background-size: cover;
  justify-content: center;
  align-items: center;
}
.to-login{
  position: fixed;
  bottom: 36px;
  background: #FFFFFF;
  border-radius: 100px;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #F9570E;
  text-shadow: 0 1px 2px rgba(249,87,14,0.25);
}
</style>
