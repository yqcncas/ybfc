<template>
	<view>
		<view class="guess">
			<view class="guess-tit" v-if="houseType == 1 || houseType == 2">猜你喜欢</view>
			<view class="guess-tit" v-if="houseType == 3 || houseType == 4">看了该楼盘的人还看了</view>
			<view class="homeList">
				<view class="home-info" v-for="(item, index) in houseList" :key="index" @click="checkDetail(item.houseId)" v-if="houseType == 1 || houseType == 2">
					<view class="home-pic"><image :src="item.picUrl[0]" lazy-load="true"></image></view>
					<view class="home-detail">
						<view class="homeName">
							<text>{{ item.houseName }}</text>
						</view>
						<view class="home-address">
							<text space="nbsp">{{ item.provinceString }} |{{ item.areaName }}</text><text v-if="isAdmin">|{{item.buildNum}}栋{{item.roomNum}}</text>
						</view>
						<view class="home-tips">
							<view :class="[{ 'tips-1': labIndex == 0, 'tips-2': labIndex == 1, 'tips-3': labIndex == 2 }]" v-for="(it, labIndex) in item.label" :key="labIndex">
								<text>{{ it }}</text>
							</view>
						</view>
						<view class="home-price" v-if="houseType == 2">
							<text>{{ item.price }}万({{ item.acreage }}m²|{{ item.unitPrice }}元/m²)</text>
						</view>
						<view class="home-price" v-if="houseType == 1">
							<text>{{ item.rental }}元/月({{ item.acreage }}m²)</text>
						</view>
					</view>
				</view>
				<view class="home-info" v-for="(item, index) in houseList" :key="index" @click="checkNewDetail(item.areaId,item.houseId)" v-if="houseType == 3 || houseType == 4">
					<view class="home-pic"><image :src="item.picUrl[0]" lazy-load="true" mode="scaleToFill"></image></view>
					<view class="home-detail">
						<view class="homeName">
							<text v-if="houseType == 3">{{ item.areaName }}</text>
							<text v-if="houseType == 4">{{item.houseName}}</text>
						</view>
						<view class="home-address">
							<text space="nbsp" v-if="item.provinceString">{{ item.provinceString }}</text>
						</view>
						<view class="home-tips">
							<view :class="[{ tips4: labIndex == 0, tips5: labIndex !== 0 }]" v-for="(it, labIndex) in item.label" :key="labIndex">
								<text>{{ it }}</text>
							</view>
						</view>
						<view class="home-price">
							<text v-if="houseType == 3">{{ item.price }}元/m²(楼盘均价)</text>
							<text v-if="houseType == 4 && item.price">{{item.price}}万</text>
							<text v-if="houseType == 4 && !item.price">暂无售价</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'Guess',
		data(){
			return{
				isAdmin:false,
				managerId:''
			}
		},
		props:["houseList","houseType"],
		methods:{
			checkDetail(id){
				if(this.managerId){
					uni.navigateTo({
						url:'../../pages/oldHouse/oldHouse?houseId='+id+'&houseType='+this.houseType+'&flag=1&userId='+this.managerId
					})
				}else{
					uni.navigateTo({
						url:'../../pages/oldHouse/oldHouse?houseId='+id+'&houseType='+this.houseType
					})
				}
			},
			checkNewDetail(id,houseId){
				if(this.houseType == 3){
					if(this.managerId){
						uni.navigateTo({
							url:'../../pages/newHouse/newHouse?houseId='+id+'&houseType='+this.houseType+'&flag=1&userId='+this.managerId
						})
					}else{
						uni.navigateTo({
							url:'../../pages/newHouse/newHouse?houseId='+id+'&houseType='+this.houseType
						})
					}
				}else{
					if(this.managerId){
						uni.navigateTo({
							url:'../../pages/newHouse/apartment?id='+houseId+'&flag=1&userId='+this.managerId
						})
					}else{
						uni.navigateTo({
							url:'../../pages/newHouse/apartment?id='+houseId
						})
					}
				}
			}
		},
		created() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
			}
			if(uni.getStorageSync('manager')){
				this.managerId = uni.getStorageSync('manager')
			}
		}
	}
</script>

<style lang="less">
	.guess{
			margin-top: 30rpx;
			width: 100%;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.guess-tit{
				width: 690rpx;
				height: 90rpx;
				font-size: 28rpx;
				line-height: 90rpx;
				color: #A6A6A6;
				border-bottom: 2rpx solid #F0F0F0;
				padding-left: 30rpx;
			}
		}
	.homeList {
		width: 100%;
		background: #ffffff;
		.home-info {
			display: flex;
			flex-direction: row;
			margin-left: 30rpx;
			height: 250rpx;
			border-bottom: 2rpx solid #f7f7f7;
		}
	}
	
	.home-pic {
		width: 240rpx;
		height: 180rpx;
		margin-right: 30rpx;
		margin-top: 40rpx;
		border-radius: 4rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx');
	}
	
	.home-pic image {
		width: 240rpx;
		height: 180rpx;
		border-radius: 4rpx;
	}
	
	.home-detail {
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
	
		.homeName {
			width: 420rpx;
			font-size: 28rpx;
			color: #5b5b5b;
			text-align: justify;
			letter-spacing: 0;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-weight: bold;
		}
	
		.home-address {
			width: 420rpx;
			height: 34rpx;
			font-size: 24rpx;
			color: #a6a6a6;
			letter-spacing: 0;
			text-align: justify;
			margin-top: 8rpx;
			display: flex;
			
			& > text:first-child{
				flex: 2;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			
			& >text:nth-child(2){
				flex: 1;
			}
		}
	
		.home-tips {
			display: flex;
			flex-direction: row;
			margin-top: 10rpx;
			height: 36rpx;
	
			.tips-1 {
				background: rgba(241, 78, 44, 0.15);
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #f14e2c;
				letter-spacing: 0;
				text-align: justify;
				margin-right: 30rpx;
				height: 36rpx;
				line-height: 36rpx;
			}
	
			.tips-2 {
				background: rgba(74, 144, 226, 0.15);
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #4a90e2;
				letter-spacing: 0;
				text-align: justify;
				margin-right: 30rpx;
				height: 36rpx;
				line-height: 36rpx;
			}
	
			.tips-3 {
				background: rgba(211, 160, 221, 0.15);
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #800080;
				letter-spacing: 0;
				text-align: justify;
				height: 36rpx;
				line-height: 36rpx;
			}
			.tips4 {
				background: #48d2ab;
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #ffffff;
				letter-spacing: 0;
				text-align: justify;
				margin-right: 30rpx;
				height: 36rpx;
				line-height: 36rpx;
			}
			
			.tips5 {
				background: rgba(74, 144, 226, 0.15);
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #4a90e2;
				letter-spacing: 0;
				text-align: justify;
				margin-right: 30rpx;
				height: 36rpx;
				line-height: 36rpx;
			}
		}
	
		.home-price {
			font-size: 28rpx;
			color: #fe9e2e;
			letter-spacing: 0;
			text-align: justify;
			font-size: 24rpx;
			margin-top: 12rpx;
		}
	}
	
	.tips-1 text {
		margin: 0 10rpx;
	}
	
	.tips-2 text {
		margin: 0 10rpx;
	}
	
	.tips-3 text {
		margin: 0 10rpx;
	}
	.tips4 text {
		margin: 0 10rpx;
	}
	.tips5 text {
		margin: 0 10rpx;
	}
</style>
