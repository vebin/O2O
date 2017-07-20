<template>
   <div class="cells">
    <label class="cell-title">详细地址</label>
    <input class="cell-input" type="text" placeholder="请输入详细位置" @input="oninput" :value="ShopData.address" />
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
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.ShopData.address = JSON.parse(joinInfo).address
    }
  },
  computed: {
    shopdata () { return this.$store.state.ShopData },
    page () { return this.$store.state.page }
  },
  methods: {
    oninput (e) {
      this.setdata({'address':e.target.value})
      if (this.page.source === '添加') {
        this.submitStatus()
      }
    },
    toLocation () {
      this.jump('/Location')
    }
  }
}
</script>

<style scoped>
</style>
