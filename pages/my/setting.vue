<template>
	<view>
		<view class="setting">
			<view class="setting-list" @click="clear">
				<text>清除缓存</text>
				<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
			</view>
			<view class="setting-list" @click="checkConfig">
				<text>关于平台</text>
				<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>				
			</view>
			<view class="setting-list">
				<text>当前版本</text>
				<text>1.1.2</text>
			</view>
		</view>
		<view class="button" @click="loginOut">
			<text>退出登录</text>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name:'setting',
		data(){
			return{
				
			}
		},
		methods:{
			// 清除缓存
			clear(){
				uni.showModal({
					title:'提示',
					content:'你确定清除所有缓存数据吗？',
					success: (res) => {
						if(res.confirm){
							uni.showToast({
								icon:'none',
								title:'清除缓存成功'
							})
						}
					}
				})
			},
			// 查看关于我们
			checkConfig(){
				uni.navigateTo({
					url:'about'
				})
			},
			// 登出
			async loginOut(){
				let res = await this.$fetch(this.$api.loginOut,{},'GET')
				if(res.code == 0){
					uni.removeStorageSync('isAdmin')
					uni.removeStorageSync('isToken')
					uni.removeStorageSync('manager')
					uni.removeStorageSync('token')
					uni.showToast({
						icon:'none',
						title:'退出成功！',
						duration:1000
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'my'
						})
					},500)
				}else{
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.setting{
		background: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.setting-list{
		margin-left: 30rpx;
		width: 720rpx;
		height: 100rpx;
		display: flex;
		line-height: 100rpx;
		align-items: center;
		
		& > text:first-child{
			font-size: 28rpx;
			color: #5B5B5B;
		}
		
		& > image{
			width: 16rpx;
			height: 26rpx;
			margin-left: 564rpx;
		}
		
		& >text:nth-child(2){
			font-size: 28rpx;
			color: #5B5B5B;
			margin-left: 515rpx;
		}
	}
	.button{
		width: 100%;
		height: 100rpx;
		margin-top: 60rpx;
		font-size: 28rpx;
		color: #D0021B;
		text-align: center;
		line-height: 100rpx;
		background: #FFFFFF;
	}
</style>
