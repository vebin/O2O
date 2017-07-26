<template>
  <div class="uploadPhoto">
    <set-photos :imgItems="imgItems"></set-photos>
    <div class="submit-btn" @click="submit" v-if="imgItems.length">完成</div>
    <div class="submit-btn disabled" v-else>完成</div>
  </div>
</template>
<script>
import SetPhotos from '../components/join/set-photos.vue'
export default {
  data: () => ({
    imgItems: [
      {
        imgUrl: 'https://img9.kcimg.cn/imga/0/450/450306.jpg!180'
      },
      {
        imgUrl: 'https://img9.kcimg.cn/imga/0/450/450306.jpg!180'
      },
      {
        imgUrl: 'https://img9.kcimg.cn/imga/0/450/450306.jpg!180'
      },
      {
        imgUrl: 'https://img9.kcimg.cn/imga/0/450/450306.jpg!180'
      },
      {
        imgUrl: 'https://img9.kcimg.cn/imga/0/450/450306.jpg!180'
      }
    ]
  }),
  components: {
    SetPhotos
  },
  methods: {
    submit() {
      console.log(1)
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
