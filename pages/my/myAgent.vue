<template>
	<view>
		<view class="client">
			<view class="client-list">
				<view class="client-avatar">
					<image :src="agentInfo.avatar" mode=""></image>
				</view>
				<view class="client-info">
					<view class="client-detail">
						<text>{{agentInfo.userName}}</text>
						<text>{{agentInfo.phonenumber}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<!-- <uni-load-more :status="status" :contentText="contentText" v-if="!isEmpty"></uni-load-more>	 -->
		<!-- 暂无数据 -->
		<view v-if="isEmpty" class="noData">
			<u-empty text="暂无数据哦~" mode="favor"></u-empty>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import baseURL from '../../api/index.js'		
	export default{
		name:'myAgent',
		data(){
			return{
				isEmpty:false,
				page:0,
				agentInfo:{}
			}
		},
		methods:{
			// 获取我的经纪人
			async getMyAgent(){		
				let res = await this.$fetch(this.$api.myManagerList,{},'GET')
				console.log(res);
				if(res.data){
					this.isEmpty = false
					if(res.data.avatar){
						res.data.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
					}else{
						res.data.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
					}
					this.agentInfo = res.data
				}else{
					this.isEmpty = true
				}				
			}
			
		},
		onShow() {
			this.getMyAgent()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getMyAgent()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.agentList = [];
			uni.stopPullDownRefresh()
			this.getMyAgent();
		}		
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.noData{
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
	}
	.client{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.client-list{
		width: 720rpx;
		height: 130rpx;
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		
		.client-avatar{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
			
			image{
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
		}
		
		.client-info{
			width: 600rpx;
			margin-left: 30rpx;
			height: 130rpx;
			display: flex;
			border-bottom: 2rpx solid #F0F0F0;
			
			.client-detail{
				width: 460rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				
				& > text:first-child{
					width: 460rpx;
					font-size: 28rpx;
					color: #4A4A4A;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					margin-top: 20rpx;
				}
				
				& > text:nth-child(2){
					width: 460rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #9B9B9B;
				}
			}
		}
	}	
</style>
