<template>
	<view>
		<view class="header" @click="checkUserInfo">
			<view class="user-info">
				<view>
					<image :src="avatar" mode=""></image>
				</view>
				<view class="goLogin" v-if="!isToken" @click.stop="goToLogin">
					<view>
						<text>去登录</text>
					</view>
				</view>
				<view class="user-detail" v-if="isToken">
					<view>
						<text>{{userName}}</text>
						<view v-if="isAdmin" @click.stop="checkMyCard">我的名片</view>
					</view>
					<view class="rewards">
						<view>
							<text space="nbsp">佣金</text><text class="rewards-num">{{reward}}</text>
						</view>
						<view class="button">
							<button class="moneybutton" plain="true" @click.stop="goToMoney">提现</button>
						</view>
					</view>
				</view>
				<view class="right" v-if="isToken">
					<image src="../../static/icon/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 功能列表 -->
		<view class="tools" v-if="isToken">
			<view class="tools-list" v-for="(item,index) in toolsList" :key="index" @click="jump(item.id)">
				<view class="tools-img"><image :src="item.icon" mode=""></image></view>
				<view class="tools-name">
					<text>{{item.name}}</text>
					<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp :windowBottom="windowBottom"></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import baseURL from '../../api/index.js'	
	export default{
		name:'my',
		data(){
			return{
				userName:'',
				avatar:'',
				reward:'',
				isAdmin:false,//是否为经纪人
				toolsList:[
					{id:1,name:'佣金明细',icon:'../../static/icon/yongjin.png'},
					{id:2,name:'我的推荐',icon:'../../static/icon/tuijian-2.png'},
					{id:3,name:'我的经纪人',icon:'../../static/icon/agent.png'},
					{id:4,name:'浏览记录',icon:'../../static/icon/6.png'},
					{id:5,name:'我的收藏',icon:'../../static/icon/7.png'},
					{id:6,name:'我的设置',icon:'../../static/icon/8.png'},
				],
				isToken:false,
				userId:'',
				windowBottom:0
			}
		},
		methods:{
			// 获取个人信息
			async getInfo(){
				if(this.isAdmin){
					let res = await this.$fetch(this.$api.getInfo,{},'GET')
					this.userName = res.data.userName
					if(res.data.avatar){
						this.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
					}else{
						this.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
					}
					this.reward = res.data.reward.toFixed(2)
					this.userId = res.data.userId
				}else{
					let res = await this.$fetch(this.$api.getMyInfo,{},'GET')
					this.userName = res.data.userName
					if(res.data.avatar){
						this.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
					}else{
						this.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
					}
					this.reward = res.data.reward.toFixed(2)					
				}
			},
			// 编辑个人信息
			checkUserInfo(){
				uni.navigateTo({
					url:'editUserInfo'
				})
			},
			// 跳转到提现页面
			goToMoney(){
				uni.navigateTo({
					url:'getMoney?reward='+this.reward
				})
			},
			// 跳转到各功能页
			jump(id){
				if(this.isAdmin){
					if(id == 1) uni.navigateTo({url:'rewardsList'})
					if(id == 2) uni.navigateTo({url:'myCustomer'})
					if(id == 3) uni.navigateTo({url:'myRecord?type=0'})
					if(id == 4) uni.navigateTo({url:'myFavor'})
					if(id == 5) uni.navigateTo({url:'setting'})
				}else{
					if(id == 1) uni.navigateTo({url:'rewardsList'})
					if(id == 2) uni.navigateTo({url:'myRecommend'})
					if(id == 3) uni.navigateTo({url:'myAgent'})
					if(id == 4) uni.navigateTo({url:'myRecord?type=0'})
					if(id == 5) uni.navigateTo({url:'myFavor'})
					if(id == 6) uni.navigateTo({url:'setting'})
				}
			},
			// 去登陆
			goToLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			// 查看我的名片
			checkMyCard(){
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:'myCard?id='+this.userId
				})
				// #endif
				// #ifdef H5
				uni.showToast({
					icon:'none',
					title:'请在微信小程序生成名片海报'
				})
				// #endif
			}
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					this.windowBottom = res.windowBottom
				}
			})
			this.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
			this.isToken = uni.getStorageSync('isToken')
			this.isAdmin = uni.getStorageSync('isAdmin')
			if(this.isToken){
				this.getInfo()
				if(this.isAdmin){
					this.toolsList=[
						{id:1,name:'佣金明细',icon:'../../static/icon/yongjin.png'},
						{id:2,name:'我的客户',icon:'../../static/icon/kehu.png'},
						{id:3,name:'浏览记录',icon:'../../static/icon/6.png'},
						{id:4,name:'我的收藏',icon:'../../static/icon/7.png'},
						{id:5,name:'我的设置',icon:'../../static/icon/8.png'},
					]
				}else{
					this.toolsList =[
						{id:1,name:'佣金明细',icon:'../../static/icon/yongjin.png'},
						{id:2,name:'我的推荐',icon:'../../static/icon/tuijian-2.png'},
						{id:3,name:'我的经纪人',icon:'../../static/icon/agent.png'},
						{id:4,name:'浏览记录',icon:'../../static/icon/6.png'},
						{id:5,name:'我的收藏',icon:'../../static/icon/7.png'},
						{id:6,name:'我的设置',icon:'../../static/icon/8.png'},
					]
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.header{
		width: 100%;
		height: 400rpx;
		background-image:url('https://img.bajiaostar.com/FnWTGwXf95wrQJJQVxulDUMSlPHe');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.user-info{
		width: 100%;
		height: 160rpx;
		padding-top: 174rpx;
		display: flex;
		
		& > view:first-child{
			margin-left: 30rpx;
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
			
			& > image{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
		}
	}
	.user-detail{
		margin-left: 30rpx;
		width: 484rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			width: 484rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			letter-spacing: 0.44rpx;
			font-weight: bold;
			margin-top: 10rpx;
			display: flex;
			
			& > view{
				border: 2rpx solid #FFFFFF;
				width: 120rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
				border-radius: 8rpx;
			}
		}
	}
	.rewards{
		width: 484rpx;
		display: flex;
		height: 50rpx;
		margin-top: 20rpx;
		
		& > view:first-child{
			font-size: 28rpx;
			color: #FFFFFF;
			height: 50rpx;
			line-height: 50rpx;
			letter-spacing: 0.34rpx;
			display: flex;
			align-items: center;
			white-space: nowrap;
			
			& > .rewards-num{
				margin-left: 20rpx;
				font-size: 36rpx;
				color: #F5A623;
			}
		}
		
		& > .button{
			width: 120rpx;
			height: 50rpx;
			
			& > .moneybutton{
				margin-left: 40rpx;
				width: 120rpx;
				height: 50rpx;
				border: 2rpx solid #FFFFFF;
				color: #FFFFFF;
				font-size: 24rpx;
				border-radius: 25rpx;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}
	.right{
		width: 16rpx;
		height: 160rpx;
		margin-right: 30rpx;
		display: flex;
		align-items: center;
		
		& > image{
			width: 16rpx;
			height: 26rpx;
		}
	}
	
	// 功能列表 
	.tools{
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.tools-list{
		width: 720rpx;
		display: flex;
		height: 100rpx;
		margin-left: 30rpx;
		
		& > .tools-img{
			width: 54rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			
			& > image{
				width: 54rpx;
				height: 54rpx;
			}
		}
		
		& > .tools-name{
			width: 640rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			line-height: 100rpx;
			margin-left: 30rpx;
			border-bottom: 2rpx solid #F0F0F0;
			
			& > image{
				width: 16rpx;
				height: 26rpx;
				padding-right: 30rpx;
			}
			
			& > text{
				width: 594rpx;
				font-size: 28rpx;
				color: #4A4A4A;
			}
		}
	}
	.goLogin{
		display: flex;
		align-items: center;
		
		& > view{
			margin-left: 30rpx;
			width: 120rpx;
			height: 50rpx;
			border: 2rpx solid #FFFFFF;
			color: #FFFFFF;
			font-size: 24rpx;
			border-radius: 25rpx;
			line-height: 50rpx;
			text-align: center;
		}
	}
</style>
