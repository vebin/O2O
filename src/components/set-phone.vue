<template>
   <div class="cells">
    <label class="cell-title">手机号</label>
    <input class="cell-input" type="text" placeholder="请输入店主的手机号码"  :disabled="page.edit" :value='page.phone'>
    <div class="getCode" v-if="page.status !== '浏览'">获取验证码</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    page () { return this.$store.state.page }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
