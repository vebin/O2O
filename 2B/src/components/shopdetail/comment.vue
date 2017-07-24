<template>
  <li class="main">
    <div class="userInfoArea">
      <figure>
        <img :src="comment.avatar" alt="">
      </figure>
      <span>{{comment.nickName}}</span>
    </div>
    <ul class="tags">
      <li v-for="(item,index) in comment.lables" :class="index < 3 ? 'active':'' ">{{item.lableName}}</li>
    </ul>
    <p class="commentInfo">{{comment.commentInfo}}</p>
  </li>
</template>
<script>
export default {
  props: ['comment'],
  data () {
    return {}
  }
}
</script>
<style scoped>
  .main {
    list-style-type:none;
    background: #fff;
    padding-bottom: 15px;
    position: relative;
  }
  .main::after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    width: 100%;
    height: 1px;
    background: #E5E5E5;
    transform: scaleY(0.5);
  }
  .main figure {
    position: absolute;
    top: 15px;
    left: 0;
    width: 32px;
    height: 32px;
  }
  .main figure img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .userInfoArea {
    position: relative;
    padding-left: 42px;
  }
  .userInfoArea span {
    font-size: 16px;
    color: #2062A9;
    letter-spacing: 0;
    line-height: 16px;
    padding-top: 23px;
    padding-bottom: 20px;
    display: block;
  }
  .tags {
    font-size: 0;
    letter-spacing: 0;
  }
  .tags li {
    display: inline-block;
    padding: 0 12px;
    border-radius: 20px;
    height: 26px;
    line-height: 26px;
    color: #666;
    margin-right: 10px;
    margin-bottom: 15px;
    background-color: #eee;
    font-size: 14px;
  }
  .tags .active {
    background-color: rgb(255, 240, 229);
  }
  .commentInfo {
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 24px;
  }
</style>
