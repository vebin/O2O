<template>
  <div class="main-photo">
    <div class="photo" v-if="photos.length" v-for="(item, index) in photos">
      <img :src="item.imgUrl">
      <span class="delete" @click="deletePhoto(index)"></span>
    </div>
    <div class="default-add" v-if="photos.length < 6" @click="uploadImgs"></div>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  props: ['photos','servers'],
  data: () => ({
    urls: null,
    uploadIndex:0,
    count:null,
    serverItems:[]
  }),
  created(){
    this.count = 6-this.photos.length
    this.serverItems=this.servers
    // for (var i = 0; i < this.photos.length; i++) {
    //   this.serverItems.push(this.photos[i].imgUrl)
    // }
  },
  methods: {
    deletePhoto (index) {
      this.photos.splice(index, 1)
      this.serverItems.splice(index, 1)
    },
    uploadImgs () {
      wx.chooseImage({
        count: (6-this.photos.length), // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.urls = res.localIds;
          this.uploadIndex = 0;
          this.uploadItems()
        }
      })
    },
    uploadItems () {   // 上传图片
      let url = this.urls[this.uploadIndex]
      if(!url) return;
      wx.uploadImage({
        localId: url,
        isShowProgressTips: 1,
        success: (el) => {
          this.uploadIndex += 1
          let preview = {imgUrl:url}
          this.photos.push(preview)
          this.serverItems.push(el.serverId)
          this.$emit('getData', this.photos, this.serverItems)
          this.uploadItems()
        }
      })
    }
  }
}
</script>
<style scoped>
  .main-photo{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 15px;
    padding-left: 15px;
  }
  .photo{
    position: relative;
    width: 80px;
    height: 80px;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .photo img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
  .delete{
    position: absolute;
    right: -5px;
    top: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
  }
  .delete:before{
    content: '';
    position: absolute;
    width: 12px;
    height: 1px;
    top: 50%;
    left: 50%;
    margin-top: -1px;
    margin-left: -6px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }
  .delete:after{
    content: '';
    position: absolute;
    width: 12px;
    height: 1px;
    top: 50%;
    left: 50%;
    margin-top: -1px;
    margin-left: -6px;
    background-color: #fff;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
  }
  .default-add{
    position: relative;
    width: 78px;
    height: 78px;
    border: 1px dashed #eee;
  }
  .default-add:before{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 30px;
    height: 2px;
    background-color: #999;
  }
  .default-add:after{
    content: '';
    position: absolute;
    top: 50%;
    left: 24px;
    width: 30px;
    height: 2px;
    background-color: #999;
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
  }
</style>
