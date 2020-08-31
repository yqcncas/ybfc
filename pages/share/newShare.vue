<template>
	<view>
		<!-- 海报 -->
		<view class="content">
			<nw-poster :QrSrc="qrCode" :backImg="backImg" :LogoSrc="Logo" :imgSrc="img" :imgSrc2="img2" :imgSrc3="img3" :imgSrc4="img4" :Title="title" :Width="width"  @success="getImage" :price="price" :publish="publish" :address="address"></nw-poster>
		</view>
		<!-- 分享 -->
		<view class="share-tit" v-if="show == true">
			<view class="line"></view>
			<view class="share-title"><text>分享到</text></view>
			<view class="line"></view>
		</view>
		<view class="share-way" v-if="show == true">
			<view class="wx-share">
				<button open-type="share" class="share-button">
					<view class="share-img"><image src="../../static/icon/wechat.png" mode=""></image></view>
					<view class="share-text"><text>微信</text></view>
				</button>
			</view>
			<view class="save-Poster" @tap="download">
				<view class="share-img"><image src="../../static/icon/download.png" mode=""></image></view>
				<view class="share-text"><text>保存到手机</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import nwPoster from '@/components/wm-poster/nw-poster.vue'
	import baseURL from '../../api/index.js'	
	export default{
		name:'share',
		components:{
			nwPoster
		},
		data(){
			return{
				img:'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx',
				img2:'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx',
				img3:'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx',
				img4:'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx',
				qrCode:'',
				title:'资讯标题，后台上传的信息，包含标题、图片、资讯正文内容等信息。信息展示全部，不省略，海报高度自适应。',
				width:'676',
				Logo:'https://img.bajiaostar.com/FoBApRntoR0fmZrzsl-nDlNQIDbr',
				show:false,
				poster:'',
				id:'',
				type:'',
				time:'',
				code:'',
				path:'',
				page:'',
				scene:'',
				price:'',//售价
				publish:'',//开盘
				address:'',//地址
				isAdmin:false,//是否为经纪人
				userId:'',//分享人id
				backImg:'https://img.bajiaostar.com/FpBP1-bGltO26j4TN20uOxzpmQaM',//背景图片				
			}
		},
		methods:{
			// 获取小程序二维码
			async getQrCode(){
				let res = await this.$fetch(this.$api.getQrcodePic,{data:this.scene,page:this.page},'GET')
				this.qrCode = 'https://admin.homeyb.cn'+res.data;
				// this.qrCode = 'http://ybcs.bajiaostar.com'+res.data;
			},
			// 获取海报信息
			async getPosterInfo(){
				let res = await this.$fetch(this.$api.areaInfo,{areaId:this.id},'GET')
				this.title = res.data.newArea.areaName
				if(res.data.newArea.picUrl){
					let picUrls = res.data.newArea.picUrl.split(',')
					if(picUrls[0]){
						this.img = picUrls[0].replace('http','https')
					}
					if(picUrls[1]){
						this.img2 = picUrls[1].replace('http','https')
						console.log(this.img2);
					}
					if(picUrls[2]){
						this.img3 = picUrls[2].replace('http','https')
					}
					if(picUrls[3]){
						this.img4 = picUrls[3].replace('http','https')
					}
				}
				if(res.data.newArea.price){
					this.price = res.data.newArea.price+'元/m²'
				}
				if(res.data.newArea.publish){
					this.publish = this.$dayjs(res.data.newArea.publish).format('YYYY-MM')
				}
				if(res.data.newArea.provinceString){
					this.address = res.data.newArea.provinceString
				}
				if(this.isAdmin == true){
					this.path = 'pages/newHouse/newHouse?houseId='+this.id+'&houseType='+this.type+'&userId='+this.userId+'&share=1'
					this.page = 'pages/newHouse/newHouse'
					this.scene = this.id+'&'+this.type+'&'+this.userId
				}else{
					this.path = 'pages/newHouse/newHouse?houseId='+this.id+'&houseType='+this.type+'&share=1'
					this.page = 'pages/newHouse/newHouse'
					this.scene = this.id+'&'+this.type
				}
				this.getQrCode()
			},
			// 获取海报
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
			uni.showLoading({
				title:'生成海报中'
			})
			this.id = options.id;
			this.type = options.houseType
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
				if(this.isAdmin == true){
					this.userId = uni.getStorageSync('userId')
				}
			}
			this.getPosterInfo()
		},
		onShareAppMessage(ops) {
			console.log(this.path);
			if(ops.from === 'button'){	
			}
			return{
				title:this.title,
				path:this.path,
				imageUrl:this.img
			}
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.content{
		width: 676rpx;
		margin: 40rpx 38rpx 0 38rpx;
		border-radius: 10rpx;
	}
	/* 分享 */	
	.share-tit{
		width: 676rpx;
		margin: 80rpx 32rpx 60rpx 32rpx;
		display: flex;
	}
	.line{
		width: 262rpx;
		height: 0;
		border: 0.5px solid #E2E2E2;
		margin-top: 22rpx;
	}
	.share-title{
		font-size: 28rpx;
		color: #999999;
		width: 164rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-family: 'PingFangSC';
		font-weight: 400;
	}
	.share-way{
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-bottom: 40rpx;
	}
	.wx-share{
		width: 140rpx;
		height: 150rpx;
		margin-left: 168rpx;
		display: flex;
		flex-direction: column;
	}
	.share-img{
		margin: 0 26rpx;
		width: 88rpx;
		height: 88rpx;
	}
	.share-img image{
		width: 88rpx;
		height: 88rpx;
	}
	.share-text{
		width: 140rpx;
		margin-top: 22rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		color: #333333;
		font-weight: 400;
		font-family: 'PingFangSC';
		font-size: 28rpx;
	}
	.share-button{
		width: 140rpx;
		height: 150rpx;
		text-align: center;
		color: #333333;
		font-weight: 400;
		font-family: 'PingFangSC';
		font-size: 28rpx;
		background:#F0F0F0;
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
		list-style: none;
		outline: none;
	}
	.share-button::after{
		border: none;
	}
	.save-Poster{
		margin-left: 94rpx;
		width: 140rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
	}
</style>
