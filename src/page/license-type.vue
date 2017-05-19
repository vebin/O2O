<template>
<div class="wraper">
  <div class="content">
    <HomeHeader></HomeHeader>
    <driving-information></driving-information>
    <div class="edit"><span>编辑</span></div>
  </div>
</div>
</template>

<script>
import HomeHeader from '../components/home-header.vue'
import DrivingInformation from '../components/driving-information.vue'
export default {
  components: {HomeHeader, DrivingInformation},
  data () {
    return {
      data: 'null'
    }
  }
}
</script>

<style scoped>
  .edit{
   padding: 30px 15px
  }
  .edit span{
    height: 45px;
    background-color: #09BB07;
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
  }
</style>
