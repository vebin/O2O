<template>
   <div class="cells" @click="tocity">
    <label class="cell-title">商铺位置</label>
    <input class="cell-input" type="text" placeholder="请选择城市" maxlength="10" readonly="readonly" @input="" :value="citytext" />
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
    let joinInfo = JSON.parse(storage.get('recommend'))
    if (joinInfo) {
      this.citytext = joinInfo.citytext
    }
  },
  methods: {
    tocity () {
      this.jump('/SetCity/1')
    }
  }
}
</script>

<style scoped>
.cell-input:disabled{
  color: #333
}
</style>
