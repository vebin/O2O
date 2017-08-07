<template>
  <div class="storeStatus">
    <span class="store-title">{{storeTitle.name}}</span>
    <span class="status reject" v-if="storeStatus === '查看修改状态'" @click="tolookstatus">查看修改状态</span>
    <span :class="[storeStatus==='已认证' ? 'authentication status' : 'status']" :style="`color:${color}`" v-else>{{storeStatus}}</span>
  </div>
</template>
<script>
export default {
  props: ['storeTitle', 'storeStatus'],
  created () {
    let _this = this
    setTimeout(function(){
      _this.setColor()
    }, 100)
  },
  data () {
    return {
      color: ''
    }
  },
  methods: {
    setColor () {
      if (this.storeStatus === '审核中') {
        this.color = '#0083E6'
      } else if (this.storeStatus === '已驳回') {
        this.color = '#F53712'
      } else if (this.storeStatus === '已认证') {
        this.color = '#FEA802'
      }
    },
    tolookstatus () {
      this.jump(`/MyShopStatus/${this.storeTitle.id}`)
    }
  }
}
</script>
<style scoped>
  .storeStatus{
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #fff;
  }
  .store-title{
    flex:1;
    text-align: left;
    margin-left: 15px;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    line-height: 28px;
    margin-right: 10px;
  }
  .reject{
    color: #028DFE;
    font-weight: bold;
  }
  .status{
    text-align: right;
    margin-right: 15px;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 28px;
    min-width: 50px;
  }
  .authentication{
    position: relative;
  }
  .authentication:before{
    position: absolute;
    content: "\e6f9";
    font-family: "shoper";
    font-size: 14px;
    top: 1px;
    right: 53px;
  }
</style>
