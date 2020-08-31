<template>
	<!-- #ifdef H5 -->
	<view class="container" :style="{height:windowHeight+'rpx'}">
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	<view class="container">	
	<!-- #endif -->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<view class="loginTit"> 
			<text>英棒房产中介</text>
		</view>
		<view class="loginContent">
			<text>尽我们的所能，帮你了解有用的信息；尽我们的努力，助您完成有房的美梦</text>
		</view>
		<view class="loginAgent" v-if="loginType == 2">
			<view>
				<input type="text" v-model="mobile" placeholder="请输入手机号" placeholder-class="placeholderClass"/>
			</view>
			<view>
				<input type="text" password="true" v-model="password" placeholder="请输入密码" placeholder-class="placeholderClass"/>
			</view>
			<view>
				<button v-if="!mobile || !password">登录</button>
				<button class="active" v-if="mobile&&password" @click="agentLogin">登录</button>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="login" v-if="loginType == 1">
			<button open-type="getPhoneNumber" @getphonenumber="GetPhoneNumber">授权手机号</button>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="loginUser" v-if="loginType == 1">
			<view>
				<input type="text" v-model="mobile" placeholder="请输入手机号" placeholder-class="placeholderClass"/>
			</view>
			<view>
				<view><input type="text" v-model="verCode" placeholder="请输入验证码" placeholder-class="placeholderClass"/></view>
				<view>
					<view class="cutdown" v-if="verificationFlag">已发送({{count}}s)</view>
					<view class="getCode" v-else @click="sendVerification">获取验证码</view>
				</view>
			</view>
			<view>
				<button v-if="!mobile || !verCode">登录</button>
				<button class="active" v-if="mobile&&verCode" @click="userLogin">登录</button>
			</view>
		</view>
		<!-- #endif -->
		<view class="changeType">
			<view v-if="loginType == 2" @click="changeLoginType(1)">
				<image src="../../static/icon/new/12.png" mode=""></image>
				<text>我是用户</text>
			</view>
			<view v-if="loginType == 1" @click="changeLoginType(2)">
				<image src="../../static/icon/new/13.png" mode=""></image>
				<text>我是经纪人</text>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	let timer = null	
	var WXBizDataCrypt = require('../../crypto/WXBizDataCrypt.js');	
	export default {
		name:'login',
		data(){
			return{
				loginType:1,//登录方式 1-客户 2-经纪人
				mobile:'',
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0,
				password:'',
				openId:'',
				manager:'',
				code:'',
				openid:'',
				session_key:'',
				appId:'wx685226499ed8d55c',
				verCode:'',//验证码
				count:60,
				verificationFlag:false,
				windowHeight:1334
			}
		},
		methods:{
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 改变登录方式
			changeLoginType(type){
				this.loginType = type
			},
			// 获取手机号授权
			GetPhoneNumber(e) {
				console.log(e);
				if(e.detail.errMsg == 'getPhoneNumber:fail user deny'){
					uni.showModal({
						title:'提示',
						showCancel:true,
						content:'您取消了授权'
					})
				}else{
					var pc = new WXBizDataCrypt(this.appId, this.session_key)
					var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
					this.wxLogin(data.phoneNumber)
				}
			},
			// 客户登录
			async wxLogin(phoneNumber){
				if(this.manager){
					let res = await this.$fetch(this.$api.wxLogin,{mobile:phoneNumber,openId:this.openid,manager:this.manager},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0 || res.code == 1001){
						uni.setStorageSync('isAdmin',false)
						uni.setStorageSync('isToken',true)
						uni.setStorageSync('token',res.data.token)
						// uni.clearStorageSync('manager')
						uni.navigateBack({
							delta:1
						})
					}
				}else{
					let res = await this.$fetch(this.$api.wxLogin,{mobile:phoneNumber,openId:this.openid},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0 || res.code == 1001){
						uni.setStorageSync('isAdmin',false)
						uni.setStorageSync('isToken',true)
						uni.setStorageSync('token',res.data.token)
						uni.navigateBack({
							delta:1
						})
					}
				}
			},
			// 经纪人登录
			async agentLogin(){
				let res = await this.$fetch(this.$api.login,{loginName:this.mobile,pwd:this.password},'GET')
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					uni.setStorageSync('isAdmin',true)
					uni.setStorageSync('isToken',true)
					uni.setStorageSync('token',res.data.token)
					uni.setStorageSync('userId',res.data.client.userId)
					// #ifdef MP-WEIXIN
					uni.navigateBack({
						delta:1
					})
					// #endif
					// #ifdef H5
					if(res.data.client.openId){
						uni.navigateBack({
							delta:1
						})
					}else{
						window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$api.appid}&redirect_uri=${this.$api.redirect_url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
					}
					// #endif
				}
			},
			// H5用户登录
			async userLogin(){
				let res = await this.$fetch(this.$api.h5userLogin,{mobile:this.mobile,verification:this.verCode,manager:this.manager},'GET')
				console.log(res);
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0 || res.code == 1001){
					uni.setStorageSync('isAdmin',false)
					uni.setStorageSync('isToken',true)
					uni.setStorageSync('token',res.data.token)
					uni.navigateBack({
						delta:1
					})
				}
			},
			// 发送验证码
			async sendVerification(){ 
				if(!this.$u.test.mobile(this.mobile)) return uni.showToast({icon:'none',title:'手机号码不正确或未填写'})
				this.verificationFlag = true
				let res = await this.$fetch(this.$api.sendCode,{mobile:this.mobile},'GET')
				console.log(res);
				timer = setInterval(() =>{
					if(this.count == 0){
						clearInterval(timer)
						this.verificationFlag = false
						this.count = 60
					}
					this.count = --this.count
				},1000)
			},
			// 获取微信登录code
			getCode(){
				uni.login({
					provider:'weixin',
					success: (res) => {
						if(res.code){
							this.code = res.code
							this.getOpenId()
						}
					}
				})
			},
			// 获取openId
			async getOpenId(){
				let res = await this.$fetch(this.$api.getOpenId,{js_code:this.code},'GET')
				this.openid = res.data.openid;
				uni.setStorageSync('openId', this.openid)
				this.session_key = res.data.session_key
				uni.setStorageSync('session_key', this.session_key)
			}
		},
		onLoad() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.screenHeight * 2 
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
				}
			})
		},
		onShow() {
			this.getCode()
			if(uni.getStorageSync('manager')){
				this.manager = uni.getStorageSync('manager')
			}
		},
		onUnload() {
			if(timer){
				clearInterval(timer)
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";	
	.container{
		width: 100%;
		height: 100vh;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FlenASH8rRAcPmNLb11l9wJ-NKLE');
	}
	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}
	
	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 11;
	}
	
	
	
	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}
	
	.tui-icon-ml {
		margin-left: 20upx;
	}
	
	.tui-icon {
		border-radius: 16px;
	}
	
	
	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}
	
	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}
	.loginTit{
		padding: 130rpx 30rpx 0 30rpx;
		font-size: 48rpx;
		color: #FFFFFF;
		font-weight: bold;
		letter-spacing: -1.16rpx;
	}
	.loginContent{
		width: 690rpx;
		margin: 30rpx 30rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.loginAgent{
		width: 690rpx;
		margin: 200rpx 30rpx 0 30rpx;
		
		& > view:first-child{
			width: 690rpx;
			height: 110rpx;
			background: rgba(255,255,255,0.50);
			border-radius: 55rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #FFFFFF;
			
			input{
				padding: 0 30rpx;
				width: 630rpx;
			}
		}
		
		& > view:nth-child(2){
			margin-top: 60rpx;
			width: 690rpx;
			height: 110rpx;
			background: rgba(255,255,255,0.50);
			border-radius: 55rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #FFFFFF;
			
			input{
				padding: 0 30rpx;
				width: 630rpx;
			}
		}
		
		& > view:last-child{
			width: 690rpx;
			height: 110rpx;
			margin-top: 150rpx;
			border-radius: 55rpx;
			
			button{
				width: 690rpx;
				height: 110rpx;
				border-radius: 55rpx;
				background: #D8D8D8;
				font-size:28rpx;
				line-height: 110rpx;
				color: #FFFFFF;
			}
			
			.active{
				background: #874A89;
			}
		}
	}
	.loginUser{
		width: 690rpx;
		margin: 200rpx 30rpx 0 30rpx;
		
		& > view:first-child{
			width: 690rpx;
			height: 110rpx;
			background: rgba(255,255,255,0.50);
			border-radius: 55rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #FFFFFF;
			
			input{
				padding: 0 30rpx;
				width: 630rpx;
			}
		}
		
		& > view:nth-child(2){
			margin-top: 60rpx;
			width: 690rpx;
			height: 110rpx;
			background: rgba(255,255,255,0.50);
			border-radius: 55rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #FFFFFF;
			& > view:first-child{
				flex: 1;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #FFFFFF;
				input{
					flex: 1;
					margin-left: 30rpx;
				}
			}
			& > view:nth-child(2){
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.cutdown{
					font-size: 28rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					margin-right: 30rpx;
				}
				.getCode{
					font-size: 28rpx;
					color: #874A89;
					display: flex;
					align-items: center;
					margin-right: 30rpx;
				}
			}
		}
		
		& > view:last-child{
			width: 690rpx;
			height: 110rpx;
			margin-top: 150rpx;
			border-radius: 55rpx;
			
			button{
				width: 690rpx;
				height: 110rpx;
				border-radius: 55rpx;
				background: #D8D8D8;
				font-size:28rpx;
				line-height: 110rpx;
				color: #FFFFFF;
			}
			
			.active{
				background: #874A89;
			}
		}
	}
	.placeholderClass{
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.changeType{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		/* #ifdef MP-WEIXIN */
		position: fixed;
		bottom: 50rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: 70rpx;
		/* #endif */
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			color: rgba(255,255,255,0.70);
			image{
				width: 90rpx;
				height: 90rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	.login{
		width: 690rpx;
		height: 110rpx;
		margin: 300rpx 30rpx 0 30rpx;
		
		button{
			width: 690rpx;
			height: 110rpx;
			border-radius: 55rpx;
			background: #874A89;
			font-size:28rpx;
			line-height: 110rpx;
			color: #FFFFFF;
		}
	}
</style>
