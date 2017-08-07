<template>
  <div class="uploadPhoto">
    <set-photos :photos="photos" :servers="serverItems" @getData="getData"></set-photos>
    <div class="submit-btn" @click="submit" v-if="photos.length">完成</div>
    <div class="submit-btn disabled" v-else>完成</div>
  </div>
</template>
<script>
import SetPhotos from '../components/join/set-photos.vue'
import storage from '../store/storage.js'
export default {
  data: () => ({
    photos: [],
    serverItems: []
  }),
  components: {
    SetPhotos
  },
  created () {
    let joinInfo = JSON.parse(storage.get('data'))
    if (joinInfo) {
      this.photos = joinInfo.photos
      this.serverItems = joinInfo.serverItems
    }
  },
  mounted () {
    this.settitle()
  },
  methods: {
    settitle () {     // 设置标题
      if (this.setApp()==='other') {
        window.document.title = '添加商家'
        this.hideshare()
      } else {
        this.callNativeMethod("onChangeWebTitle",{changeWebTitle:'添加商家'})
      }
    },
    submit() {
      if (this.photos.length=== 1 ) {
        this.setdata({'photos': this.photos, 'shopimg': this.serverItems,'shopimgPreview':this.photos[0].imgUrl,'serverID': this.serverItems})
      }else{
        this.setdata({'photos': this.photos, 'serverID': this.serverItems})
      }
      this.back()
    },
    getData (photos, serverItems) { // 更新数据
      this.photos = photos
      this.serverItems = serverItems
    }
  }
}
</script>
<style scoped>
  .uploadPhoto{
    background: #fff;
    width: 100%;
    height: 100%;
  }
  .submit-btn{
    margin: 20px 15px;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    background: #FF6600;
    color: #fff;
    text-align: center;
    border-radius: 5px;
  }
  .submit-btn.disabled{
    opacity: 0.6;
  }
</style>
