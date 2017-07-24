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
  // props: ['typetext', 'index'],
  data () {
    return {
      article: '',
      articleCache: `我公司是河北省衡水市交通局指定的卡车专业维修的企业，公司拥有轿车各种维修设备及各种重卡专用维修设施。技术精湛、价格合理。 我公司是河北省衡水市交通局指定的三类汽车维修企业，公司拥有轿车各种维修设备及各种重卡专用维修设施。技术精湛、价格合理。 我公司是河北省衡水市交通局指定的三类汽车维修企业，公司拥有轿车各种维修设备及各种重卡专用维修设施。技术精湛、价格合理。 我公司是河北省衡水市交通局指定的三类汽车维修企业，公司拥有轿车各种维修设备及各种重卡专用维修设施。技术精湛、价格合理。 我公司是河北省衡水市交通局指定的三类汽车维修企业，公司拥有轿车各种维修设备及各种重卡专用维修设施。技术精湛、价格合理。`,
      seeMore: false,
      takeBack: false,
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
    margin-bottom: 10px;
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
