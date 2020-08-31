<template>
	<!-- <view class="bottom-tips" :style="{bottom:bottom + 'px'}" v-if="tipsShow"> -->
	<view class="bottom-tips" v-if="tipsShow">
		<view>
			<view class="close-icon" @click="closeTips"><image src="../../static/icon/new/15.png" mode=""></image></view>
			<view class="bottom-logo"><image src="https://img.bajiaostar.com/2e0268c4601672d79e140d888a1f9e40" mode=""></image></view>
			<view class="bottom-text">
				<view>英棒房产APP</view>
				<view>查看更多温州精选房源</view>
			</view>
		</view>
		<view class="bottom-button" @click="handleToDownLoad">
			立即打开
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bottom:0,
				tipsShow:true
			};
		},
		props:['windowBottom'],
		methods:{
			handleToDownLoad(){
				location.href = 'http://privacy.homeyb.cn'
			},
			// 关闭提醒
			closeTips(){
				this.tipsShow = false
			}
		},
		watch:{
			windowBottom(){
				console.log(this.windowBottom);
				this.bottom = this.windowBottom
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.bottom =  res.windowBottom
				}
			})
		}
	}
</script>

<style lang="less">
	.bottom-tips{
		width: 100%;
		height: 100rpx;
		background: rgba(0,0,0,0.5);
		display: flex;
		align-items: center;
		position: fixed;
		// bottom: 0;
		bottom: var(--window-bottom);
		z-index: 99;
		& > view:first-child{
			width: 500rpx;
			display: flex;
			align-items: center;
			position: relative;
			.close-icon{
				width: 26rpx;
				height: 26rpx;
				position: absolute;
				top: -10rpx;
				left: 10rpx;
				image{
					width: 26rpx;
					height: 26rpx;
				}
			}
			.bottom-logo{
				width: 60rpx;
				height: 60rpx;
				margin-left: 60rpx;
				image{
					width: 60rpx;
					height: 60rpx;
				}
			}
			.bottom-text{
				width: 350rpx;
				margin-left: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				& > view:first-child{
					font-size: 17px;
					color: #FFFFFF;
					font-weight: bold;
				}
				& > view:last-child{
					font-size: 28rpx;
					color: rgba(255,255,255,0.8);
				}
			}
		}
		.bottom-button{
			width: 250rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #874A89;
			font-size: 40rpx;
			color: #FFFFFF;
			font-weight: bold;
		}
	}
</style>
