<template>
<div class="wraper">
  <div class="content">
    <home-header></home-header>
    <statusTips :reasonContent='msg'></statusTips>
    <set-people-name></set-people-name>
    <set-phone :disabled='false'></set-phone>
  </div>
  <bottomList></bottomList>
</div>
</template>

<script>
import HomeHeader from '../components/home-header.vue'
import StatusTips from '../components/statusTips.vue'
import BottomList from '../components/bottomList.vue'
import SetPeopleName from '../components/set-people-name.vue'
import SetPhone from '../components/set-phone.vue'
export default {
  components: {HomeHeader, StatusTips, BottomList, SetPeopleName, SetPhone},
  data () {
    return {
      msg: '姓名有误'
    }
  },
  computed: {
    EnterStatus () { return this.$store.state.EnterStatus }
  },
  created () {
    this.$store.dispatch('setEdit', {edit: true, status: '浏览', name: 'ceshi', phone: '13269511810'})
  },
  methods: {
  }
}
</script>
  
<style>
.wraper{
  flex:1;
  display: flex;
  flex-direction: column;
}
.content {
  flex:1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
