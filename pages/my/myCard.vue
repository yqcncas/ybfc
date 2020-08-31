<template>
	<view class="container">
		<view class="content">
			<card :QrSrc="qrCode" :avatar="avatar" :userName="userName" :Width="width" :Height="height"  @success="getImage" :company="company" :postName="postName" :years="years" :visitTimes="visitTimes" :imgSrc="img"></card>
		</view>
		<view class="bottom" v-if="show">
			<view @click="download">
				<image src="../../static/icon/download-2.png" mode=""></image>
				<text>保存</text>
			</view>
			<view>
				<button open-type="share">
					<image src="../../static/icon/fenxiang.png" mode=""></image>
					<text>分享</text>
				</button>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import card from '../../components/wm-poster/card.vue'
	import baseURL from '../../api/index.js'
	export default {
		name:'myCard',
		components:{
			card
		},
		data(){
			return{
				avatar:'',
				userName:'',
				company:'',
				postName:'',
				years:'',
				visitTimes:'',
				qrCode:'',
				page:'pages/home/home',
				scene:'',
				width:'590',
				height:'1048',
				img:'https://img.bajiaostar.com/FjLlW0Jl5OuvhnYcNSR2hCuMecCL',
				show:false,
				poster:'',
				path:''
			}
		},
		methods:{
			// 获取小程序二维码
			async getQrCode(){
				let res = await this.$fetch(this.$api.getQrcodePic,{data:this.scene,page:this.page},'GET')
				console.log(res);
				this.qrCode = 'https://admin.homeyb.cn'+res.data;
				// this.qrCode = 'http://ybcs.bajiaostar.com'+res.data;
			},
			// 获取个人信息
			async getUserInfo(){
				let res = await this.$fetch(this.$api.getInfo,{},'GET')
				if(res.data.avatar){
					this.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
				}else{
					this.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
				}
				console.log(this.avatar);
				this.userName = res.data.userName
				this.company = res.data.company
				this.postName = res.data.postName
				if(res.data.years){
					this.years = res.data.years
				}else{
					this.years = '0'
				}
				if(res.data.visitTimes){
					this.visitTimes = res.data.visitTimes
				}else{
					this.visitTimes = '0'
				}
			},
			// 获取名片
			getImage(data){
				uni.hideLoading()
				this.poster = data.tempFilePath;
				this.show = true;
			},
			// 下载到本地
			download(){
				let poster = this.poster
				uni.authorize({
					scope:'scope.writePhotosAlbum',
					success() {
						uni.saveImageToPhotosAlbum({
							filePath:poster,
							success: () => {
								uni.showToast({
									icon:'none',
									title:'图片已经保存到您的手机相册'
								})
							},
							fail: () => {
								uni.showToast({
									icon:'none',
									title:'保存失败'
								})
							}
						})
					},
					fail() {
						uni.showModal({
							title:'授权提醒',
							content:'请您先开启您的相册权限',
							success: (res) => {
								if(res.confirm){
									uni.openSetting({})
								}
							}
						})
					}
				})
			}
		},
		onLoad(options) {
			this.scene = options.id
			uni.showLoading({
				title:'生成名片中'
			})
			this.getUserInfo()
			this.getQrCode()
		},
		onShareAppMessage(ops) {
			this.path = 'pages/home/home?id='+this.scene
			if(ops.from === 'button'){	
			}
			return{
				title:'我的名片',
				path:this.path,
				imageUrl:this.poster
			}
		}
	}
</script>

<style lang="less">
	.content{
		width: 590rpx;
		height: 1048rpx;
		margin: 30rpx 80rpx 0 80rpx;
		border-radius: 10rpx;
	}
	.bottom{
		width: 750rpx;
		height: 100rpx;
		position: fixed;
		display: flex;
		bottom: 0;
		
		& > view:first-child{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 28rpx;
			background-image: linear-gradient(45deg, #FFBF2F 0%, #FF9417 100%);
			
			image{
				width: 34rpx;
				height: 34rpx;
			}
			
			text{
				margin-left: 20rpx;
			}
		}
		
		& > view:last-child{
			flex: 1;
			display: flex;
			background-image: linear-gradient(45deg, #AC63C0 0%, #874A98 100%);
			
			button{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				font-size: 28rpx;
				background-image: linear-gradient(45deg, #AC63C0 0%, #874A98 100%);
				
				image{
					width: 34rpx;
					height: 34rpx;
				}
				
				text{
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
