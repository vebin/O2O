<template>
  <div class="loading-wrap" @touchmove.prevent.stop>
    <div class="mark"></div>
    <div class="loading">
      <img src="https://s.kcimg.cn/wap/images/detail/o2oImg/loading.gif" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
    }
  }
}
</script>
<style>
.mark{
  position: fixed;
  z-index: 15;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5)
}
.loading-wrap img{
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 18;
  bottom: auto;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: transparent;
  width: 30px;
  height: 30px;
}
</style>
