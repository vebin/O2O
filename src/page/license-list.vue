<template>
<div class="wraper">
  <div class="content">
    <driving-type v-if="data!='null'"></driving-type>
    <driving-null v-if="data=='null'"></driving-null>
  </div>
  <div class="add" v-if="data!='null'">添加驾照信息</div>
</div>
</template>

<script>
import DrivingType from '../components/driving-type.vue'
import DrivingNull from '../components/driving-null.vue'
export default {
  components: {DrivingType, DrivingNull},
  data () {
    return {
      data: 'null'
    }
  }
}
</script>

<style scoped>
  .add{
    height: 45px;
    background-color: #09BB07;
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
  }
  .add:before{
    font-family: 'shoper';
    content: '\e6b8';
    margin-right: 5px;
  }
</style>
