<template>
   <div class="cells" @click="tobrand">
    <label class="cell-title">服务品牌</label>
    <input class="cell-input" type="text" placeholder="请选择服务品牌" disabled >
    <span class="cell-arrow"></span>
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
  methods: {
    tobrand (to) {
      this.jump('/MyShop')
    }
  }
}
</script>

<style scoped>
</style>
