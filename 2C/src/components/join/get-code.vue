<template>
   <div class="cells">
    <label class="cell-title">验证码</label>
    <input class="cell-input" type="number" placeholder="请输入收到的验证码" maxlength="4" :value="vcode" @input="oninput" />
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      vcode: ''
    }
  },
  created () {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.vcode = JSON.parse(joinInfo).vcode
    }
  },
  methods: {
    oninput (e) {
      if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, 4)
      }
      this.setdata({'vcode':e.target.value})
      this.$store.dispatch('myshopdata', {'vcode': `${e.target.value}`})
      if (this.page.source === '添加') {
        this.submitStatus()
      }
    }
  }
}
</script>

<style scoped>
</style>
