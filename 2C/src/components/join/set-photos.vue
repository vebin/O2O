<template>
  <div class="main-photo">
    <div class="photo" v-if="imgItems.length" v-for="(item, index) in imgItems">
      <img :src="item.imgUrl">
      <span class="delete" @click="deletePhoto(index)"></span>
    </div>
    <div class="default-add" v-if="imgItems.length < 6"></div>
  </div>
</template>
<script>
export default {
  props: ['imgItems'],
  data: () => ({

  }),
  methods: {
    deletePhoto (index) {
      console.log(index)
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
