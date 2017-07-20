<template>
   <div class="cells" @click="tocity">
    <label class="cell-title">商铺位置</label>
    <input class="cell-input" type="text" placeholder="请选择城市" maxlength="10" readonly="readonly" :value="citytext" />
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      citytext: ''
    }
  },
  created () {
    let joinInfo = JSON.parse(storage.get('data'))
    if (joinInfo) {
      this.citytext = joinInfo.citytext
    }
  },
  computed: {
    page () { return this.$store.state.page },
    shopdata () { return this.$store.state.ShopData }
  },
  methods: {
    tocity () {
      this.jump('/SetCity')
    }
  }
}
</script>

<style scoped>
</style>
