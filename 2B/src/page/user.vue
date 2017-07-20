<template>
  <div class="wraper">
    <div class="tabs">
      <span :class="[tab=='1' ? 'select' : '']" @click="tabs(1)">待审核 {{audit.length}}</span>
      <span :class="[tab=='2' ? 'select' : '']" @click="tabs(2)">已通过 {{passed.length}}</span>
      <span :class="[tab=='3' ? 'select' : '']" @click="tabs(3)">已驳回 {{refuse.length}}</span>
    </div>
    <div class="content" v-show="tab==1">
        <ul class="shops-list" v-if="audit.length">
          <li v-for="shop in audit">
            <nearby-list :shopData="shop" :type="'0'"></nearby-list>
          </li>
        </ul>
        <div v-else class="data-null">
          <data-null :title='title' :text="text"></data-null>
        </div>
    </div>

    <div class="content" v-show="tab==2">
      <ul class="shops-list" v-if="passed.length">
        <li v-for="shop in passed">
          <nearby-list :shopData="shop" :type="'1'"></nearby-list>
        </li>
      </ul>
      <div v-else class="data-null">
        <data-null :title='title' :text="text"></data-null>
      </div>
    </div>

    <div class="content" v-show="tab==3">
      <ul class="shops-list" v-if="refuse.length">
        <li v-for="shop in refuse">
          <nearby-list :shopData="shop" :type="'0'"></nearby-list>
        </li>
      </ul>
      <div v-else class="data-null">
        <data-null :title='title' :text="text"></data-null>
      </div>
    </div>
    <a href="JavaScript:history.back(-1)"><go-back></go-back></a>
    <div v-if="loading">
      <loading :end="list_end" :loading="loading"></loading>
    </div>
  </div>

</template>

<script>
import XHR from '../api'
import NearbyList from '../components/global/nearby-list.vue'
import DataNull from '../components/global/data-null.vue'
import GoBack from '../components/global/go-back.vue'
import Loading from '../components/global/loading.vue'
export default {
  components: { NearbyList, DataNull, GoBack, Loading},
  created () {
    var userid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)
    var Cookieuid = document.cookie.match(/ForHelp_ajaxuid=([^;$]+)/);
    if (userid) {
      this.uid = userid[1]
      this.setdata({'bbsid': `${userid[1]}`, 'bbsname': ``})
    } else if(Cookieuid) {
      this.uid = Cookieuid[1]
      this.setdata({'bbsid': `${Cookieuid[1]}`, 'bbsname': ``})
    }
    XHR.myUploadShop({'bbsid':this.uid}).then((res) => {
      this.loading = false
      this.audit = res.data.audit
      this.passed = res.data.passed
      this.refuse = res.data.refuse
    })
  },
  data () {
    return {
      title: '暂无数据',
      text: '',
      tab: 1,    // 状态切换
      audit: [],  // 审核中
      passed: [], // 已通过
      refuse: [],  // 已驳回
      loading: true,
      list_end: false,
      uid:''
    }
  },
  mounted (){
    this.settitle()
  },
  methods: {
    tabs (n) {
      this.tab = n
    },
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '我的上传'
        this.getWxconfig()
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'我的上传'})
      }
    }
  }
}
</script>

<style scoped>
.wraper{display: flex;flex-direction: column;flex: 1}
.tabs{margin:15px; box-sizing: border-box;display: flex;border-radius: 0 2.5px 2.5px 0;border: 1px solid #848484;}
.tabs span{
  border-right: 1px solid #848484;height: 30px;
  flex:1;
  font-size: 12px;
  color: #333333;
  line-height: 14px;
  text-align: center;line-height: 30px;
}
.tabs .select{
  background: #848484;
  color: #fff
}
.tabs span:last-child{
  border-right:none;
}
.shops-list{background: #fff;overflow:auto;width:100%;}
.content{
  flex: 1;
  overflow-y: scroll;
  display: flex;
}
.data-null{background: #fff;flex:1;}
</style>
