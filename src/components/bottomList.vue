<template>
  <div class="storeList">
    <div class="list-content">
      <span class="editStore">编辑店铺</span>
    </div>
    <div class="list-content second-content">
      <span class="license">营业执照</span>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .storeList{
    display: flex;
    flex-direction: row;
    height: 50px;
    line-height: 50px;
    background: #09BB07;
    box-shadow: 0 -2px 5px 0 rgba(0,0,0,0.05);
  }
  .list-content{
    position: relative;
    flex: 1;
    font-size: 18px;
    color: #FFFFFF;
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
    background: #F9F9F9;
  }
  .editStore{
    position: relative;
  }
  .editStore:before{
    position: absolute;
    content: "\e6fd";
    font-family: "shoper";
    left: -19px;
    top: 6px;
    font-size: 14px;
    line-height: 14px;
  }
  .license{
    position: relative;
  }
  .license:before{
    position: absolute;
    content: "\e6fe";
    font-family: "shoper";
    left: -20px;
    top: 6px;
    font-size: 14px;
    line-height: 14px;
  }
</style>
