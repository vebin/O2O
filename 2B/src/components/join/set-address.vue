<template>
   <div class="cells">
    <label class="cell-title">详细地址</label>
    <input class="cell-input" type="text" placeholder="请输入详细位置" maxlength="10" @input="oninput" :value="ShopData.address" />
    <div class="cell-position" @click="toLocation">定位</div>
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
    }
  },
  created () {
    let joinInfo = JSON.parse(storage.get('data'))
    if (joinInfo.address) {
      this.ShopData.address = joinInfo.address
    }
  },
  methods: {
    oninput (e) {
      this.setdata({'address':e.target.value})
      this.submitStatus()
    },
    toLocation () {
      this.jump('/Location')
    }
  }
}
</script>

<style scoped>
</style>
