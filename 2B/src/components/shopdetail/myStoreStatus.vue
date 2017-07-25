<template>
  <div class="storeStatus">
    <p class="store-title">{{shopinfo.name}}</p>
    <p v-if="this.showStatus!==''" :class="[shopinfo.certified =='1' ? 'statusOK':'status' ]" :style="{ color: activeColor }">{{showStatus}}</p>
  </div>
</template>
<script>
export default {
  props: ['shopinfo'],
  created () {
  },
  data () {
    return {
      status: true,
      showStatus: '',
      activeColor: '#0083E6'
    }
  },
  updated () {
    if (this.status) {
      this.status = false
      this.SHowstatus()
    }
  },
  methods: {
    SHowstatus () {
      if (this.shopinfo.certified === '1') {
        this.showStatus = '已认证 '
        this.activeColor = '#FEA802'
      } else {
        if (this.shopinfo.auditstate === '0') {
          this.showStatus = '审核中'
        } else if (this.shopinfo.auditstate === '1') {
          this.showStatus = ''
          this.activeColor = '#09BB07'
        } else if (this.shopinfo.auditstate === '2') {
          this.showStatus = '已驳回 '
          this.activeColor = '#FD4C29'
        }
      }
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
    font-weight: bold
  }
  .status,.statusOK{
    text-align: right;
    margin-right: 15px;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
    min-width: 50px;
  }
  .statusOK:before{
    content: '\e6f9';
    font-family: 'shoper';
    margin-right: 5px;
  }
  .check{
    color: #028DFE;
  }
  .authentication{
    position: relative;
    color: #FEA802;
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
