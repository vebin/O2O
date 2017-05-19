<template>
  <div class="search">
    <div class="begin-search" v-if="!searching">{{placeholder}}</div>
    <div class="searching" v-if="searching">
      <input type="text" placeholder="">
      <span class="delete">&#xe653;</span>
    </div>
    <span v-if="searching" class="cencal">取消</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searching: false,
      placeholder: '输入服务品牌或拼音查询'
    }
  }
}
</script>

<style scoped>
.search{
  height: 65px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  flex-direction: row;
  display: flex;
}
.begin-search{
  font-size: 16px;
  color: #666666;
  line-height: 35px;
  text-align: center;
  height: 35px;
  background: #FAFAFA;
  flex: 1;
}
.begin-search:before{
  font-family: "shoper";
  content: '\641c';
  margin-right: 5px;
}
.searching{
  flex:1;
  background: #FAFAFA;
  display: flex;
  align-items: center;
}
.searching .delete{
  font-family: "shoper";
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searching:before{
  font-family: "shoper";
  content: '\641c';
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searching input{
  flex:1;
  padding: 10px 0;
  background: #FAFAFA;
  box-sizing: border-box;
}
.cencal{
  width: 45px;
  text-align: right; 
  line-height: 38px;
  color: #09BB07;
}
</style>
