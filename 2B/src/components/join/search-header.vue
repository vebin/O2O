<template>
  <div class="search">
    <div class="begin-search" v-if="!searching" @click="binginSearch">{{placeholder}}</div>
    <div class="searching" v-if="searching">
    <form action="javascript:return true;">
      <input type="search" placeholder="" v-model="entry" v-focus="searching" @keydown.enter="onchange"/>
    </form>
      <span class="delete" @click="clear">&#xe653;</span>
    </div>
    <span v-if="searching" class="cencal" @click="cancalSearch">取消</span>
  </div>
</template>

<script>
import XHR from '../../api'
export default {
  props: ['source'],
  directives: {
    focus: {
      inserted: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  data () {
    return {
      searching: true,
      placeholder: '',
      entry: ''
    }
  },
  created () {
    if (this.source === '0') {
      this.placeholder = '输入城市名或拼音查询'
    } else if (this.source === '1') {
      this.placeholder = '输入服务品牌或拼音查询'
    } else if (this.source === '2') {
      this.placeholder = '搜索店铺'
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
      if (this.source === '2') {
        this.$parent.shops = []
        this.$parent.search = false
        this.back()
      }
      if (this.$route.params.source === '0') {
        this.$parent.searching = false
      }
    },
    clear () {
      this.entry = ''
      this.$parent.searchList = null
      if (this.source === '2') {
        this.$parent.search = false
      }
    },
    onchange () {
      if (this.source === '0') {
        if (this.entry !== '') {
          this.$parent.searching = false
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
      }
      if (this.source === '1') {
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
      if (this.source === '2') {
        if (this.entry !== ''){
          let json = {
            lng: this.ShopData.lng,
            lat: this.ShopData.lat,
            keyword: this.entry
          }
          this.$parent.keyword = this.entry
          XHR.nearbyShopList(json).then((res) => {
            this.$parent.shops = res.data
            if (res.data.length === 0) {
              this.$parent.search = true
            }
            if (res.data.length < 20) {
              this.$parent.list_end = true
              this.$parent.loamore = true
            } else {
              this.$parent.list_end = false
              this.$parent.loamore = false
            }
          })
        }
      }
      this.searching = false
    }
  }
}
</script>

<style scoped>
.search{
  height: 60px;
  background: #fff;
  padding: 12px 15px;
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
  width: 160px;
  border:1px solid #e5e5e5;
  border-radius: 2px;
}
.searching .delete{
  font-family: "shoper";
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searching:before{
  font-family: "shoper";
  content: '\e71b';
  margin-left: 10px;
  margin-right: 6px;
  font-size: 15px;
  line-height: 15px;
  color: #999;
}
.searching form{
  flex:1;
  width: 160px;
}
.searching input{
  background: #FAFAFA;
  font-size: 16px;
}
.cencal{
  width: 45px;
  text-align: right;
  line-height: 38px;
  color: #09BB07;
}
</style>
