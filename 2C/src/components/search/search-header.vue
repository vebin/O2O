<template>
  <div class="search">
    <div class="begin-search" v-if="!searching" @click="binginSearch">{{placeholder}}</div>
    <div class="searching" v-if="searching">
      <input type="text" placeholder="" v-model="entry" @input="search" autofocus />
      <span class="delete" @click="clear">&#xe653;</span>
    </div>
    <span v-if="searching" class="cencal" @click="cancalSearch">取消</span>
  </div>
</template>

<script>
import XHR from '../../api'
export default {
  props: ['source'],
  data () {
    return {
      searching: false,
      placeholder: '',
      entry: ''
    }
  },
  created () {
    if (this.source === '0') {
      this.placeholder = '输入城市名或拼音查询'
    } else {
      this.placeholder = '输入服务品牌或拼音查询'
    }
  },
  methods: {
    binginSearch () {
      this.searching = true
    },
    cancalSearch () {
      this.$parent.searchList = null
      this.searching = false
      this.entry = ''
    },
    clear () {
      this.entry = ''
      this.$parent.searchList = null
    },
    search () {
      if (this.source === '0') {
        if (this.entry !== '') {
          XHR.getCity({keyword: this.entry}).then((res) => {
            var d = []
            for (let key in res.data) {
              d.push(res.data[key])
            }
            this.$parent.searchList = d[0]
          })
        } else {
          this.$parent.searchList = null
        }
      } else {
        if (this.entry !== '') {
          XHR.getBrand({val: this.entry}).then((res) => {
            var d = []
            for (let key in res.data.data.list) {
              d.push(res.data.data.list[key])
            }
            this.$parent.searchList = d
          })
        } else {
          this.$parent.searchList = null
        }
      }
    }
  }
}
</script>

<style scoped lang="css">
.search{
  height: 65px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  flex-direction: row;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 10
}
.begin-search{
  font-size: 16px;
  color: #666666;
  line-height: 35px;
  text-align: center;
  height: 35px;
  background: #FAFAFA;
  flex: 1;
}
.begin-search:before{
  font-family: "shoper";
  content: '\641c';
  margin-right: 5px;
}
.searching{
  flex:1;
  background: #FAFAFA;
  display: flex;
  align-items: center;
}
.searching .delete{
  font-family: "shoper";
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searching:before{
  font-family: "shoper";
  content: '\641c';
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searching input{
  flex:1;
  padding: 10px 0;
  background: #FAFAFA;
  box-sizing: border-box;
}
.cencal{
  width: 45px;
  text-align: right;
  line-height: 38px;
  color: #09BB07;
}
</style>
