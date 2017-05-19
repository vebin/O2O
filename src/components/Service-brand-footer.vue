<template>
  <div class="service-footer">
    <div class="footer-content">
        最多8个，已选 <var class="select-num">2</var>个
    </div>
    <span class="ok">确定</span>
  </div>
</template>

<script>
export default {
  computed: {
    EnterStatus () { return this.$store.state.EnterStatus }  // 用户是否入住成功状态
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
  .service-footer {
    height: 45px;
    border-top:1px solid #B2B2B2;
    background: rgba(248,248,248,0.95);
    box-shadow: 0 0 0 0 #B2B2B2;
    display: flex;
  }
  .footer-content:before{
    content: '\e69e';
    font-family: 'shoper';
    transform: rotate(-90deg);
    font-size: 16px;
    color: #09BB07;
    margin-right: 15px;
  }
  .footer-content{
    flex: 1;
    padding-left: 15px;
    align-items: center;
    display: flex;
  }
  .select-num{
    color: #09BB07;
  }
  .ok{
    background: #09BB07;
    width: 100px;
    height: 45px;
    text-align: center;
    font-size: 16px;
    line-height: 45px;
    color: #fff;
  }
</style>
