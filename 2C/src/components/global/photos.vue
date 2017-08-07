<template>
	<swiper :options="swiperOption" ref="mySwiper">
		<swiper-slide v-for="(item, index) in photoItems" :style="{height:h}">
			<img :src="item.imgUrl">
		</swiper-slide>
		<div class="swiper-pagination"  slot="pagination"></div>
	</swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	props:['photoItems'],
	name: 'carrousel',
	data() {
		var me = this;
		return {
			h:'',
			activeIndex: 0,
			showNextBtn : true,
			swiperOption: {
				notNextTick: true,
				mousewheelControl : true,
				observeParents:true,
				autoplay: 3000,
				loop : true,
				pagination : '.swiper-pagination',
				onTransitionStart(swiper){
				},
				onSlideChangeEnd:function(swiper){
				}
			}
		}
	},
	components: {
		swiper,
		swiperSlide
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper
		}
	},
	created() {
		this.h = Math.round((window.innerWidth)*0.56)+'px'

	},
	mounted() {	
	},
	methods: {
	}
}

</script>
<style scoped>
.swiper-container{
	height: 100%;
}
.swiper-slide{
	width: 100%;
	height: 100%;
	float: left;
}
.swiper-slide img{
	width: 100%;
	height: 100%;
	object-fit: cover;
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
