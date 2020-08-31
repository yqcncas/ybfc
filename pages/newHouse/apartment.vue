<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				户型详情
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<!--header-->
		<!-- 轮播 -->
		<uni-swiper-dot :info="swiperList" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content" v-if="loadShow">
			<swiper class="swiper-box" @change="change" :autoplay="autoplay" :circular="circular" :interval="interval" :current="current">
				<swiper-item v-for="(item ,index) in swiperList" :key="index">
					<view class="swiper-item" v-if="isVideo&&index == 0">
						<video :src="item" controls :poster="videoPic" objectFit="fill" @play="videoPlay" id="houseVideo"></video>
					</view>
					<view :class="item.colorClass" class="swiper-item" v-if="(isVideo&&index !=0) || (!isVideo) ">
						<image :src="item" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
			<view class="dotsList">
				<view class="dots">
					<view class="dots-img active">
						<text>图片</text>
					</view>
				</view>
			</view>
		</uni-swiper-dot>
		<view class="newHouse" v-if="loadShow">
			<view class="newHosueName">
				<view>
					<text>{{houseInfo.houseName}}</text>
				</view>
				<view>
					<view class="home-tips">
						<view :class="[{ 'tips-1': labIndex == 0, 'tips-2': labIndex != 0}]" v-for="(it, labIndex) in houseInfo.label" :key="labIndex">
							<text>{{ it }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="oldHouseInfo">
				<view>
					<text v-if="houseInfo.price">{{houseInfo.price}}万</text>
					<text v-else>暂无售价</text>
					<text>售价</text>
				</view>
				<view>
					<text>{{houseInfo.room1}}室{{houseInfo.room2}}厅{{houseInfo.room3}}卫</text>
					<text>房型</text>
				</view>
				<view>
					<text>{{houseInfo.acreage}}m²</text>
					<text>面积</text>
				</view>
			</view>
			<view class="newHouseInfo">
				<view class="detail-item">
					<view>
						<text>物业类型</text><text v-if="houseInfo.propertyType == 1">普通住宅</text>	
						<text v-if="houseInfo.propertyType == 2">商住两用</text><text v-if="houseInfo.propertyType == 3">商用</text>
					</view>
					<view>
						<text>朝向</text><text v-if="houseInfo.orientation == 1">南北</text>
						<text v-if="houseInfo.orientation == 2">东南北</text><text v-if="houseInfo.orientation == 3">西南北</text>
						<text v-if="houseInfo.orientation == 4">东西</text><text v-if="houseInfo.orientation == 5">东南</text>
						<text v-if="houseInfo.orientation == 6">东北</text><text v-if="houseInfo.orientation == 7">西南</text>
						<text v-if="houseInfo.orientation == 8">西北</text><text v-if="houseInfo.orientation == 9">南</text>
						<text v-if="houseInfo.orientation == 10">北</text><text v-if="houseInfo.orientation == 11">东</text>
						<text v-if="houseInfo.orientation == 12">西</text><text v-if="!houseInfo.orientation">未知</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>首付占比</text><text v-if="houseInfo.payProportion">{{houseInfo.payProportion}}%</text>
						<text v-else>未知</text>
					</view>
				</view>
				<view class="detail-item"> 
					<view>
						<text>所属楼盘</text><text>{{houseInfo.provinceString}} {{houseInfo.areaName}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 经纪人信息 -->
		<view class="agent" @click="checkAgent(userId)" v-if="loadShow">
			<view class="agent-avatar">
				<image :src="avatar" mode=""></image>
			</view>
			<view class="agent-info">
				<text>{{userName}}</text>
				<text>{{company}}</text>
			</view>
			<view class="arrow-right">
				<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
			</view>
		</view>
		<!-- 房源介绍 -->
		<view class="content-detail" v-if="houseInfo.remark">
			<parser :html="houseInfo.remark"></parser>
		</view>
		<!-- 猜你喜欢 -->
		<Guess :houseList="homeList" :houseType="houseType" v-if="loadShow"></Guess>
		<view class="bottom" v-if="loadShow">
			<view class="bottom-agent" @click="checkAgent(userId)">
				<view>
					<image :src="avatar" mode=""></image>
				</view>
				<view>
					<text>{{userName}}</text>
					<text>{{postName}}</text>
				</view>
			</view>
			<view class="bottom-share" @click="goShare">
				<image src="../../static/icon/share.png" mode=""></image>
				<text>分享</text>
			</view>
			<view class="bottom-call" @click="callTel">
				<image src="../../static/icon/dianhua-2.png" mode=""></image>
				<text>电话</text>
			</view>
		</view>
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import baseURL from '../../api/index.js'	
	import Guess from '../../components/Guess/Guess.vue'
	import uniGrid from '../../components/uni-grid/uni-grid.vue'
	import loginModal from '../../components/Modal/loginModal.vue'
	import parser from "@/components/jyf-Parser/index"
	export default {
		name:'apartment',
		components:{
			uniSwiperDot,Guess,uniGrid,loginModal,parser
		},
		data(){
			return{
				houseId:'',
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				current: 0,
				mode: 'nav',
				dotsStyles: {
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				autoplay:false,
				interval:3000,
				circular:true,
				swiperList:[],
				length:'',
				houseInfo:[],
				mobile:'',
				postName:'',
				userId:'',
				avatar:'',
				userName:'',
				company:'',
				homeList:[],
				houseType:4,
				isToken:false,
				manager:'',
				loadShow:false,
				backHome:false,//是否回到首页
				isAdmin:false,
				modalShow:false,
				flag:false,
				path:'',
				shareTitle:'',//分享标题
				shareUserId:'',
			}
		},
		methods:{
			// 返回
			back(){
				if(this.backHome){
					uni.switchTab({
						url:'../home/home'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
			},
			change(e) {
				this.current = e.detail.current
			},
			// 获取户型详情
			async getApartmentList(){
				this.swiperList = []
				let res = await this.$fetch(this.$api.apartment,{houseId:this.houseId},'GET')
				if(res.data.newHouse.picUrl){
					let data = res.data.newHouse.picUrl.split(',')
					data.forEach(item =>{
						this.swiperList.push(item)
					})
				}else{
					this.swiperList[0] = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
				if(!res.data.newHouse.houseName){res.data.newHouse.houseName = ''}
				if(!res.data.newHouse.acreage){res.data.newHouse.acreage = ''}
				if(!res.data.newHouse.room1){res.data.newHouse.room1 = ''}
				if(!res.data.newHouse.room2){res.data.newHouse.room2 = ''}
				if(!res.data.newHouse.room3){res.data.newHouse.room3 = ''}
				this.houseInfo = res.data.newHouse
				if(this.houseInfo.label){
					this.houseInfo.label = this.houseInfo.label.split(',')
				}
				let manager = res.data.manager
				// if(!this.backHome&&!this.flag){
				// 	this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
				// 	this.userName = manager.userName
				// 	this.company = manager.company
				// 	this.mobile = manager.phonenumber
				// 	this.postName = manager.postName
				// 	this.userId = manager.userId
				// }
				if(!this.manager){
					this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
					this.userName = manager.userName
					this.company = manager.company
					this.mobile = manager.phonenumber
					this.postName = manager.postName
					this.userId = manager.userId
				}
				if(this.isAdmin == true){
					this.path = 'pages/newHouse/apartment?id='+this.houseId+'&userId='+this.shareUserId+'&share=1'
				}else{
					this.path = 'pages/newHouse/apartment?id='+this.houseId+'&share=1'
				}
				this.shareTitle = res.data.newHouse.areaName
				res.data.guess.forEach(item =>{
					if (item.picUrl) {
						item.picUrl = item.picUrl.split(',');
					}else{
						item.picUrl = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'.split(',')
					}
					if (item.label) {
						item.label = item.label.split(',');
					}
				})
				this.homeList = res.data.guess
				this.loadShow = true
				uni.hideLoading()
			},
			// 拨打电话
			callTel(){
				uni.showModal({
					title:'拨打电话',
					content:'拨打经纪人号码:'+this.mobile,
					success: (res) => {
						if(res.confirm){
							uni.makePhoneCall({
								phoneNumber:this.mobile
							})
						}
					}
				})
			},
			// 查看经纪人详情
			checkAgent(id){
				uni.navigateTo({
					url:'../agent/agentDetail?id='+id
				})
			},
			// 分享
			goShare(){
				// #ifdef MP-WEIXIN
				if(this.isToken){
					uni.navigateTo({
						url:'../share/typeShare?id='+this.houseId
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请先登录！'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1000)
				}
				// #endif
				// #ifdef H5
				uni.showToast({
					icon:'none',
					title:'请在微信小程序生成分享海报'
				})
				// #endif
			},
			// 经纪人详情
			async getManagerInfo(){
				let res = await this.$fetch(this.$api.getAgentInfo,{userId:this.manager},'GET')
				let manager = res.data.user
				this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
				this.userName = manager.userName
				this.company = manager.company
				this.mobile = manager.phonenumber
				this.postName = manager.postName
				this.userId = manager.userId
			},
			// 关闭弹窗
			modalClose(data){
				this.modalShow = data
			},
			// 获取授权后的Token
			getToken(data){
				uni.setStorageSync('token',data)
				uni.setStorageSync('isAdmin',false)
				uni.setStorageSync('isToken',true)
				this.isToken = true
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中'
			})
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
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
				}
			})
			if(options.scene){
				this.backHome = true
				let scene = decodeURIComponent(options.scene)
				this.houseId = scene.split('&')[0]
				if(scene.split('&')[1]){
					this.manager = scene.split('&')[1]
					uni.setStorageSync('manager',this.manager)
				}
			}else{
				this.houseId = options.id
				if(options.userId){
					this.manager = options.userId
					uni.setStorageSync('manager',this.manager)
				}
				if(options.share){
					this.backHome = true
				}else{
					this.backHome = false
				}
				if(options.flag){
					this.flag = true
				}else{
					this.flag = false
				}
			}
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
			}
			if(uni.getStorageSync('isToken')){
				this.isToken = uni.getStorageSync('isToken')
			}
			if(uni.getStorageSync('manager')){
				this.manager = uni.getStorageSync('manager')
			}
			this.getApartmentList()
			if(this.backHome||this.flag){
				if(this.isToken){
					if(this.manager){
						this.getManagerInfo()
					}
				}else{
					if(this.manager){
						this.getManagerInfo()
						setTimeout(()=>{
							this.modalShow = true
						},1000)
					}
				}
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
		onShareAppMessage(ops) {
			if(ops.from === 'button'){	
			}
			return{
				title:this.shareTitle,
				path:this.path,
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";
	page{
		background: #F0F0F0;
	}
	.container {
		padding-bottom: 110upx;
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
	swiper{
		width: 750upx;
		height: 540upx;
	}
	.swiper-box {
		height: 540upx;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
		// background-repeat: no-repeat;
		// background-size: 100% 100%;
		// background-image: url('https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx');
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	.swiper-item video{
		width: 100%;
		height: 100%;
	}
	.dotsList{
		width:340rpx ;
		height: 40rpx;
		position: absolute;
		bottom: 30rpx;
		left: 206rpx;
		display: flex;
	}
	.dots{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40rpx;
	}
	.dots-video{
		width: 100rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.70);
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #5B5B5B;
	}
	.dots-video image{
		width: 16rpx;
		height: 16rpx;
		margin-right: 5rpx;
	}
	.dots-img{
		width: 90rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		background: rgba(255,255,255,0.70);
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #5B5B5B;
	}
	.active{
		background: #874A98;
		color: #FFFFFF;
	}
	.newHouse{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.newHosueName{
		width: 690rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view:first-child{
			margin-top: 30rpx;
			width: 690rpx;
			font-size: 36rpx;
			color: #5B5B5B;
			font-weight: bold;
		}
		
		& > view:last-child{
			margin:18rpx 0 30rpx 0;
			display: flex;
			width: 690rpx;
			
			.home-tips{
				width: 648rpx;
				display: flex;
				align-items: center;
				
				.tips-1{
					background: #48D2AB;
					border-radius: 8rpx;
					font-size: 20rpx;
					color: #FFFFFF;
					letter-spacing: 0;
					text-align: justify;
					margin-right: 30rpx;
					height: 36rpx;
					line-height: 36rpx;
					padding: 0 10rpx;
				}
				
				.tips-2{
					background: rgba(74,144,226,0.15);
					border-radius: 8rpx;
					font-size: 20rpx;
					color: #4A90E2;
					letter-spacing: 0;
					text-align: justify;
					margin-right: 30rpx;
					height: 36rpx;
					line-height: 36rpx;
					padding: 0 10rpx;
				}
			}
		}
	}
	.oldHouseInfo{
		width: 690rpx;
		margin: 0 30rpx;
		height: 154rpx;
		display: flex;
		border-bottom: 2rpx solid #F0F0F0;
		
		view {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: center;
			
			& > text:first-child{
				text-align: center;
				margin-top: 32rpx;
				font-size: 36rpx;
				color: #FE9E2E;
				font-weight: bold;
			}
			
			& > text:nth-child(2){
				margin-top: 10rpx;
				text-align: center;
				color: #A6A6A6;
				font-size: 24rpx;
			}
		}
	}
	.newHouseInfo{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		margin: 34rpx 30rpx 0 30rpx;
	}
	.detail-item{
		width: 690rpx;
		height: 40rpx;
		display: flex;
		margin-bottom: 20rpx;
		
		view{
			flex: 1;
			display: flex;
			
			& > text:first-child{
				font-size: 28rpx;
				color: #A6A6A6;
				margin-right: 20rpx;
				white-space: nowrap;
			}
			
			& > text:nth-child(2){
				font-size: 28rpx;
				color: #5B5B5B;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-weight: 600;
			}
		}
	}
	.agent{
		width: 100%;
		height: 148rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
	}
	.agent-avatar{
		margin: 0 30rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
		
		& > image{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}
	}
	.agent-info{
		width: 554rpx;
		height: 148rpx;
		display: flex;
		flex-direction: column;
		
		& > text:first-child{
			margin-top: 30rpx;
			font-size: 28rpx;
			color: #5B5B5B;
			font-weight: bold;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		
		& > text:nth-child(2){
			font-size: 24rpx;
			margin-top: 10rpx;
			color: #5B5B5B;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	.arrow-right{
		width: 16rpx;
		height: 148rpx;
		display: flex;
		align-items: center;
		
		& > image{
			width: 16rpx;
			height: 26rpx;
		}
	}
	.bottom{
		width: 100%;
		background: #FFFFFF;
		height: 100rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 10;
	}
	.bottom-agent{
		width: 270rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		
		& > view:first-child{
			margin: 0 20rpx 0 30rpx;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
			
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		
		& > view:nth-child(2){
			height: 100rpx;
			display: flex;
			flex-direction: column;
			
			& > text:first-child{
				margin-top: 12rpx;
				font-size: 28rpx;
				color: #5B5B5B;
				font-weight: bold;
			}
			
			& > text:nth-child(2){
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #A6A6A6;
			}
		}
	}
	.bottom-share{
		width: 240rpx;
		height: 100rpx;
		background-image: linear-gradient(45deg, #FFBF2F 0%, #FF9417 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		
		& > image{
			width: 36rpx;
			height: 36rpx;
		}
		
		& > text{
			margin-left: 10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
	.bottom-call{
		width: 240rpx;
		height: 100rpx;
		background-image: linear-gradient(45deg, #AC63C0 0%, #874A98 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		
		& > image{
			width: 36rpx;
			height: 36rpx;
		}
		
		& > text{
			margin-left: 10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
	.content-detail{
		padding: 30rpx 30rpx;
		width: 690rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
	}			
</style>
