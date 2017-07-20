<template>
   <div class="cells">
    <label class="cell-title">商铺名称</label>
    <input class="cell-input" type="text" placeholder="请输入商铺名称" maxlength="20" :value="name" @input="setShopName" />
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      name:''
    }
  },
  created () {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.name = JSON.parse(joinInfo).name
    }
  },
  methods: {
    setShopName (e) {
      this.setdata({'name':e.target.value})
      this.submitStatus()
    }
  }
}
</script>

<style scoped>
</style>
