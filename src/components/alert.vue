<template>
  <div>
    <div class="mask"></div>
    <div class="pop">
      <span :class="[success=='0' ? 'error status-icon' : 'status-icon']">{{ icon }}</span>
      <span class="msg">{{ text }}</span>
      <a href="javascript:;" class="button">我知道了</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['success'],
  name: 'hello',
  computed: {
  },
  created () {
    if (this.success === '1') {
      this.text = '添加成功，请等待审核'
      this.icon = '好'
    } else {
      this.text = '添加失败，请确认填写信息'
      this.icon = '错'
    }
  },
  data () {
    return {
      text: '',
      icon: '错'
    }
  }
}
</script>

<style scoped>
.mask{
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}
.pop{
  position: fixed;
  z-index: 1000;
  width: 85%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  justify-content: center; 
  align-items: center;
  flex-direction: column;
}
.status-icon{
  font-family: "shoper";
  font-size: 60px;
  margin:30px 0 15px;
  color: #54C50D;
  line-height: 60px;
}
.error{
  color: #F76260;
}
.msg{
  font-size: 16px;
  margin-bottom: 20px;
}
.button{
  border-top: 1px solid #D2D3D5;
  height: 50px;
  font-size: 18px;
  color: #02BB00;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
</style>
