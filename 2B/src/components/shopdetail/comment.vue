<template>
  <div class="main">
    <div class="userInfoArea">
      <figure>
        <img :src="comment.avatar">
      </figure>
      <span>{{comment.nickName}}</span>
    </div>
    <ul class="tags">
      <li v-for="(item,index) in comment.lables" :class="item.lableTag==='1' ? 'active':'' ">{{item.lableName}}</li>
    </ul>
    <p class="commentInfo" v-if="comment.commentInfo.length">{{comment.commentInfo}}</p>
  </div>
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
  .main figure {
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
    display: flex;
    align-items: center;
    padding-top: 12px;
  }
  .userInfoArea span {
    font-size: 16px;
    color: #2062A9;
    letter-spacing: 0;
    line-height: 16px;
    display: block;
    flex: 1;
    margin-left: 10px;
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
    margin-top: 12px;
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
    margin-top: 12px;
  }
</style>
