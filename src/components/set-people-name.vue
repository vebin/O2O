<template>
   <div class="cells">
    <label class="cell-title">联系人</label>
    <input class="cell-input" type="text" placeholder="请输入店主姓名" :value="page.name" :disabled="page.edit">
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    page () { return this.$store.state.page }
  }
}
</script>

<style scoped>
</style>
