<template>
	<!-- 焦点图 -->
	<div class="price-list swiper-container clear-float swiper-container-horizontal" id="pic_list">
		<ul class="swiper-wrapper">
			<li class="swiper-slide" v-for="(item, index) in photoItems" >
      	<img :src="item.imgUrl">
			</li>
		</ul>
    <div class="swiper-pagination"></div>
	</div>
</template>

<script>
export default {
  props:['photoItems'],
  	mounted(){
	    // 焦点图
		let swiper = new Swiper('.swiper-container', {
        pagination : '.swiper-pagination',
        paginationType: 'bullets',
        autoplay: 3000,
        loop:true,
	    })
  	}
}
</script>

<style scoped>
	.price-list{
		position: relative;
		width: 100%;
		overflow: hidden;
		z-index: 10;
		background: #fff;
	}
	.swiper-wrapper{
		width: 10000%;
		height: 210px;
		overflow: hidden;
	}
	.swiper-slide{
		position: relative;
		float: left;
		width: 1%;
	}
	.swiper-slide img{
		width: 100%;
		height: 100%;
	}
  .swiper-pagination{
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    height: 6px;
    text-align: center;
  }
</style>
