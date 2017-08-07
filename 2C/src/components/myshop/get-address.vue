<template>
   <div class="cells">
    <span class="cell-icon"></span>
    <span class="cell-input">{{pageInfo.address}}</span>
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
export default {
  props: ['pageInfo'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.cell-icon{
  background: url('https://s.kcimg.cn/wap/images/detail/o2oImg/map.png') 50% 50%;
  width: 22px;
  height: 44px;
  background-size: cover;
  margin-right: 10px;
  margin-left: 15px;
}
.cell-input{
  padding-left: 0;
}
</style>
