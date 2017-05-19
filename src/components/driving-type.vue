<template>
  <div class="driving-type">
    <ul >
      <li class="driving-line">
        <figure class="driving-img">
          <img src="http://usr.im/200x140" alt="">
        </figure>
        <div class="content">
            <h2>A1驾照</h2>
            <p>
              <strong class="price">￥12000</strong>
              <span class="name">解放J6p</span>
            </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.driving-type{
  background: #fff;
}
.driving-line{
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: row;
}
.driving-line .content{
  display: flex;
  flex-direction: column;
  flex:1;
}
.driving-line .content h2{
  font-size: 16px;
  font-weight: bold;
  flex:1;
}
.driving-line .content p{
  height: 28px;
}
.driving-line .content .name{
  font-size: 14px;
  color: #666;
}
.driving-line .content .price{
  float: right;
  font-size: 18px;
  color: #FD4C29;
  line-height: 28px;
}
.driving-img{
  width: 100px;
  height: 70px;
  overflow: hidden;
  margin-right: 10px;
}
.driving-img img{
  width: 100px;
  height: 70px;
}
.driving-line:after{
  content: " ";
  position: absolute;
  left: 15px;
  bottom: -1px;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
