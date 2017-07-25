<template lang="html">
  <div>{{msg}}</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['msg'],
  data () {
    return {

    }
  },
  created () {
    this.$store.state.page.toastLock = false
    setTimeout( () => {
      this.$store.state.page.toastLock = true
      this.toggleToast()
    }, 3000)
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
  div {
    max-width: 200px;
    padding: 8px 7px;
    background-color: rgba(0,0,0,0.70);
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 16px;
    text-shadow: 1.5px 1.5px 0 #555555;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;
    animation: fade 3s;
  }
</style>
