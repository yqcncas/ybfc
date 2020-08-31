<template>
	<view>
		<view class="userName">
			<input type="text"  v-model="userName" placeholder-class="placeHolderClass" placeholder="请输入姓名"/>
			<image src="../../static/icon/close.png" mode="" v-if="userName" @click="clear"></image>
		</view>
		<view class="button" @click="editName">
			<text>确定</text>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		name:'editUserName',
		data(){
			return{
				userName:'',
				isAdmin:false
			}
		},
		methods:{
			// 清空
			clear(){
				this.userName = ''
			},
			// 修改姓名
			async editName(){
				if(this.isAdmin){
					let res = await this.$fetch(this.$api.agentEditInfo,{userName:this.userName},'POST','from')
					if(res.code == 0){
						uni.showToast({
							icon:'none',
							title:res.msg
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				}else{
					let res = await this.$fetch(this.$api.userEditInfo,{userName:this.userName},'POST','from')
					if(res.code == 0){
						uni.showToast({
							icon:'none',
							title:res.msg
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
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
		},
		onLoad(options) {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
			}
			this.userName = options.userName
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.userName{
		margin-top: 5rpx;
		width: 100%;
		display: flex;
		height: 100rpx;
		background: #FFFFFF;
		line-height: 100rpx;
		align-items: center;
		
		& > input{
			margin-left: 30rpx;
			width: 664rpx;
			height: 100rpx;
			font-size: 34rpx;
			color: #5B5B5B;
		}
		
		& > image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	
	.button{
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #FFFFFF;
		background: #874A98;
		border-radius: 8rpx;
		font-size: 28rpx;
		margin: 150rpx 30rpx 0 30rpx;
		text-align: center;
	}
</style>
