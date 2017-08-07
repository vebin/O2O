<template lang="html">
  <div class="toast-wraper">
    <div class="toast">{{msg}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['msg'],
  data () {
    return {}
  },
  created () {
    this.$store.state.toast.toastLock = false
    setTimeout( () => {
      this.$store.state.toast.toastLock = true
      this.toggleToast()
    }, 2000)
  },
  methods: {
    ...mapActions(['toggleToast'])
  }
}
</script>

<style lang="css" scoped>
  @keyframes fade {
    0%   {opacity: 0;}
    15%  {opacity: 1;}
    85%  {opacity: 1;}
    100% {opacity: 0;}
  }
  .toast-wraper {
    width: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 0;
  }
  .toast {
    max-width: 80%;
    padding: 8px 7px;
    background-color: rgba(0,0,0,0.70);
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 16px;
    text-shadow: 1.5px 1.5px 0 #555555;
    transform: translate(-50%,-50%);
    opacity: 0;
    animation: fade 2s;
    display: table;
  }
</style>
