<template>
  <li class="main">
    <div class="userInfoArea">
      <figure>
        <img :src="commentData.avatar" alt="">
      </figure>
      <span>{{commentData.nickName}}</span>
    </div>
    <ul class="tags">
      <li v-for="(item,index) in commentData.lables" :class="index < 3 ? 'active':'' ">{{item.lableName}}</li>
    </ul>
    <p class="commentInfo">{{commentData.commentInfo}}</p>
  </li>
</template>
<script>
export default {
  // props: ['typetext', 'index'],
  data () {
    return {
      commentData: {
        commentId: "9",      // 评论Id
        shopId: "734",       // 店铺Id
        bbsId: "392484",     // 用户bbsid
        userName: "米格来宁、", // 用户名
        nickName: '卡车之宝', // 用户昵称
        avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=882642063,4115591772&fm=26&gp=0.jpg",  //用户头像
        commentInfo: "测试啊测试测试啊测试啊测策划ihcihc赛后i", // 评价内容
        date: "2017/7/14 16:34:17",  // 评价日期
        lables: [
          {
            "lableId": "1",
            "lableName": "老板态度很好"
          },
          {
            "lableId": "2",
            "lableName": "齐全"
          },
          {
            "lableId": "3",
            "lableName": "齐全"
          },
          {
            "lableId": "4",
            "lableName": "老板态度很好"
          },
          {
            "lableId": "5",
            "lableName": "齐全"
          },
          {
            "lableId": "6",
            "lableName": "齐全"
          }
        ]
      }
    }
  },
  created () {

  },
  methods: {

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
