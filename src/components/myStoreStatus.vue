<template>
  <div class="storeStatus" v-if="type === 1">
    <p class="store-title">{{storeTitle}}</p>
    <p class="status reject">{{storeStatus}}</p>
  </div>
  <div class="storeStatus" v-else-if="type === 2">
    <p class="store-title">{{storeTitle}}</p>
    <p class="status check">{{storeStatus}}</p>
  </div>
  <div class="storeStatus" v-else-if="type === 3">
    <p class="store-title">{{storeTitle}}</p>
    <p class="status authentication">{{storeStatus}}</p>
  </div>
  <div class="storeStatus" v-else>
    <p class="store-title">{{storeTitle}}</p>
    <p class="status check">{{storeStatus}}</p>
  </div>
</template>
<script>
export default {
  props: ['storeTitle', 'storeStatus', 'type']
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
  }
  .reject{
    color: #FD4C29;
  }
  .status{
    flex:1;
    text-align: right;
    margin-right: 15px;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
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
