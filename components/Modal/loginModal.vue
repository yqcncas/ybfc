<template>
	<view>
		<view class="Modal" v-if="show">
			<view>
				<text>授权提醒</text>
				<text>请点击授权，授权后可继续浏览</text>
			</view>
			<view>
				<button open-type="getPhoneNumber" @getphonenumber="GetPhoneNumber">授权手机号</button>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}"  catchtouchmove="true"></view>
	</view>
</template>

<script>
	var WXBizDataCrypt = require('../../crypto/WXBizDataCrypt.js');	
	export default {
		name:'loginModal',
		props:['show'],
		data(){
			return{
				appId:'wx685226499ed8d55c',
				mobile:'',
				openId:'',
				code:'',
				openid:'',
				session_key:'',
				manager:''
			}
		},
		methods:{
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
				if(uni.getStorageSync('manager')){
					this.manager = uni.getStorageSync('manager')
				}
				console.log(this.manager);
				if(this.manager){
					let res = await this.$fetch(this.$api.wxLogin,{mobile:phoneNumber,openId:this.openid,manager:this.manager},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0 || res.code == 1001){
						// uni.clearStorageSync('manager')
						this.$emit('close',false)
						this.$emit('token',res.data.token)
					}
				}else{
					let res = await this.$fetch(this.$api.wxLogin,{mobile:phoneNumber,openId:this.openid},'GET')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0 || res.code == 1001){
						this.$emit('close',false)
						this.$emit('token',res.data.token)
					}
				}
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
		created() {
			this.getCode()
		}
	}
</script>

<style lang="less">
	.Modal{
		width: 620rpx;
		height: 350rpx;
		position: fixed;
		top:450rpx;
		left: 60rpx;
		right: 60rpx;
		background: #FFFFFF;
		z-index: 101;
		border-radius: 8rpx;
		
		& > view:first-child{
			width: 560rpx;
			text-align: center;
			font-size: 40rpx;
			margin: 30rpx 30rpx;
			color: #5B5B5B;
			font-weight: bold;
			display: flex;
			flex-direction: column;
			
			& >text:last-child{
				font-size: 28rpx;
				color: #A6A6A6;
				margin-top: 30rpx;
				font-weight: 100;
			}
		}
		
		& > view:nth-child(2){
			width: 620rpx;
			margin-top:60rpx;
			height: 110rpx;
			
			button{
				margin: 0 30rpx;
				width: 560rpx;
				height: 110rpx;
				border-radius: 55rpx;
				background: #874A89;
				font-size:28rpx;
				line-height: 110rpx;
				color: #FFFFFF;
			}
		}
	}
	/* 遮罩 */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 100;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	
	.maskShow {
		opacity: 1;
		visibility: visible;
	}
</style>
