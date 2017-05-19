<template>
  <div>
    <div class="mask"></div>
    <div class="pop">
      <h2 class="title">{{title}}</h2>
      <textarea name="" class="content" :placeholder="placeholder"></textarea>
      <div class="footer">
        <span class="cencel">取消</span>
        <span class="ok">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  computed: {
  },
  created () {
  },
  data () {
    return {
      title: '其他商铺类型',   // 如果是维修类型改为'其他维修类型'
      placeholder: '输入维修类型（如个人修理工）'   // 如果是维修类型改为'请输入维修类型'
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
.title{
  height: 44px;
  font-size: 16px;
  line-height: 44px;
  border-bottom: 1px solid #f5f5f5;
  width: 100%;
  text-align: center;
}
.footer{
  height: 50px;
  border-top:1px solid #f5f5f5;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  display: flex;
  width: 100%;
}
.footer >span{flex:1;}
.ok{
  color: #02BB00;
  border-left:1px solid #f5f5f5;
}
.content{
  padding: 10px 15px;
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  
}
</style>
