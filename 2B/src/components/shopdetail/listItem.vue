<template>
  <li class="main">
    <figure>
      <img src="" alt="">
    </figure>
    <div class="content">
      <h6>{{type}}</h6>
      <p>{{price}}</p>
    </div>
  </li>
</template>
<script>
export default {
  // props: ['typetext', 'index'],
  data () {
    return {
      type: '钣金喷漆',
      price: '¥ 120',
    }
  },
  created () {
    if (this.articleCache.length > 60) {
      this.subStrarticleCache()
      this.seeMore = true
    }else {
      this.article = this.articleCache
    }
  },
  methods: {
    more () {
      this.article = this.articleCache
      this.toggle()
    },
    back () {
      this.subStrarticleCache()
      this.toggle()
    },
    toggle () {
      this.seeMore = !this.seeMore
      this.takeBack = !this.takeBack
    },
    subStrarticleCache () {
      this.article = `${this.articleCache.substr(0, 60)}...`
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
  }
  .main p {
    margin-top: 5px;
    font-size: 14px;
    color: #666666;
    line-height: 22px;
    padding-bottom: 15px;
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
