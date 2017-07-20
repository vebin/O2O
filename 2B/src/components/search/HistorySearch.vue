<template>
  <div class="history" v-if="listArr.length">
    <span class="his-title">历史访问城市</span>
    <div class="his-city">
      <span class="city" v-for="list in listArr" @click ="toSearch(list)">{{list.address}}</span>
    </div>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  computed: {
    history () { return this.$store.state.history }  // 用户是否入住成功状态
  },
  data () {
    return {
      listArr: []
    }
  },
  created () {
    if (localStorage.getItem('historySearch')) {
      let searchcontent = localStorage.getItem('historySearch').split('|')
      for (var i = 0; i < searchcontent.length; i++) {
        this.listArr.push(JSON.parse(searchcontent[i]))
      }
    }
  },
  methods: {
    toSearch (item) {
      let json = {'citysn': `${item.citysn}`, 'address': `${item.address}`}
      storage.set('searchCity', json)
      this.back()
    }
  }
}
</script>
<style scoped>
  .history{
    padding: 15px 15px 12px 0;
  }
  .his-title{
    margin-left: 15px;
    font-size: 14px;
    color: #999999;
  }
  .his-city{
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
  .city{
    padding: 5px 9px 5px 10px;
    width: 77px;
    height: 24px;
    line-height: 24px;
    margin-left: 15px;
    background: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 16px;
    color: #333333;
  }
</style>
