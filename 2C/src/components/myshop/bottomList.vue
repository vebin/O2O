<template>
  <div class="storeList">
    <div class="list-content" @click="toEditShop">
      <span class="editStore">编辑店铺</span>
    </div>
    <div class="list-content second-content" @click="jump(`/BusinessLicense/${pageInfo.id}`)">
      <span class="license">营业执照</span>
    </div>
  </div>
</template>
<script>
import XHR from '../../api'
export default {
  props: ['pageInfo', 'status'],
  methods: {
    toEditShop () {
      XHR.editInfo({'shopId':this.pageInfo.id}).then((res)=>{
        let pageInfo = res.data.data
        if (pageInfo.auditstate==='0') {
          this.storeStatus = '审核中'
          alert('正在审核中，请不要重复修改')
        } else {
          this.jump(`/MyShopEdit/${this.status}`)
        }
      })
    }
  }
}
</script>
<style scoped>
  .storeList{
    display: flex;
    flex-direction: row;
    height: 50px;
    line-height: 50px;
    background: #FFFFFF;
    box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.05);
  }
  .list-content{
    position: relative;
    flex: 1;
    font-size: 18px;
    color: #FF6600;
    letter-spacing: 0;
    text-align: center;
  }
  .second-content:before{
    position: absolute;
    content: "";
    left: 0;
    top: 15px;
    width: 1px;
    height: 20px;
    opacity: 0.3;
    background: rgba(255,102,0,0.10);
  }
  .editStore:before{
    content: "\e6fd";
    font-family: "shoper";
    margin-right: 5px;
  }
  .license:before{
    content: "\e6fe";
    font-family: "shoper";
    margin-right: 5px;
  }
</style>
