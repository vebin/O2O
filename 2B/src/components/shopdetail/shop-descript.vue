<template>
  <div class="main">
    <h5>店铺介绍</h5>
    <p>
      {{article}}
      <span class="more" v-show="seeMore" @click="more">查看更多</span>
      <span class="back" v-show="takeBack" @click="back">收起</span>
    </p>
  </div>
</template>
<script>
export default {
  props: ['descript'],
  data () {
    return {
      article: '',
      seeMore: false,
      takeBack: false
    }
  },
  created () {
    if (this.descript.length > 60) {
      this.subStrdescript()
      this.seeMore = true
    }else {
      this.article = this.descript
    }
  },
  methods: {
    more () {
      this.article = this.descript
      this.toggle()
    },
    back () {
      this.subStrdescript()
      this.toggle()
    },
    toggle () {
      this.seeMore = !this.seeMore
      this.takeBack = !this.takeBack
    },
    subStrdescript () {
      this.article = `${this.descript.substr(0, 60)}...`
    }
  }
}
</script>
<style scoped>
  .main {
    background: #fff;
    padding: 10px 15px 0;
    margin-top: 10px;
  }
  .main h5 {
    font-size: 18px;
    color: #222222;
    line-height: 27px;
    font-weight: bold;
  }
  .main p {
    margin-top: 5px;
    font-size: 14px;
    color: #666666;
    line-height: 22px;
    padding-bottom: 15px;
    word-break: break-all
  }
  .main .more, .main .back {
    color: #FF6600;
  }
  .main .back {
    display: block;
    line-height: 44px;
    height: 29px;
    text-align: center;
  }
</style>
