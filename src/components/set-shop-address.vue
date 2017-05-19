<template>
   <div class="cells">
    <label class="cell-title">商铺位置</label>
    <input class="cell-input" type="text" placeholder="请选择城市" maxlength="10" disabled @input="">
    <span class="cell-arrow"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: ''
    }
  }
}
</script>

<style scoped>
</style>
