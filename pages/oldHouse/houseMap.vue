<template>
	<view>
		<map :latitude="lat" :longitude="lng" :markers="markers"></map>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name:'houseMap',
		data(){
			return{
				lat:'',
				lng:'',
				markers:[]
			}
		},
		onLoad(options) {
			this.lat = options.lat
			this.lng = options.lng
			console.log(this.lat,this.lng);
			this.markers.push({
				id:1,latitude:this.lat,longitude:this.lng,alpha:1,iconPath:'../../static/icon/Group23.png'
			})
		}
	}
</script>

<style lang="less">
	map{
		width: 750rpx;
		height: 100vh;
	}
</style>
