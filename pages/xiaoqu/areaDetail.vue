<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				{{areaInfo.areaName}}
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<!--header-->
		<!-- 轮播 -->
		<uni-swiper-dot :info="swiperList" :current="current">
			<swiper class="swiper-box" @change="change" :autoplay="autoplay" :circular="circular" :interval="interval" :current="current">
				<swiper-item v-for="(item ,index) in swiperList" :key="index">
					<view :class="item.colorClass" class="swiper-item" @click="viewImage(index)">
						<image :src="item" mode="aspectFill"  />
					</view>
				</swiper-item>
			</swiper>
			<view class="dotsList" @click="checkAlbum(areaId)">
				<view class="dots"  v-if="isPic1&&current >= 0 && current < pic1Num">
					<view class="dots-img">
						<text>分布图</text>
					</view>
				</view>
				<view class="dots"  v-if="isPic2&&current >= pic1Num && current < pic1Num+pic2Num">
					<view class="dots-img">
						<text>户型图</text>
					</view>
				</view>
				<view class="dots" v-if="isPic3&&current >= pic1Num+pic2Num && current < length">
					<view class="dots-img">
						<text>环境图</text>
					</view>
				</view>
			</view>
		</uni-swiper-dot>
		<view class="oldHouse">
			<view class="oldHouseName">
				<view>
					<text>{{areaInfo.areaName}}</text>
				</view>
			</view>
			<view class="oldHouseInfo">
				<view>
					<text>{{areaInfo.price1}}/m²</text>
					<text>商业评估价</text>
				</view>
				<view>
					<text>{{areaInfo.price2}}/m²</text>
					<text>公积金评估价</text>
				</view>
				<view>
					<text>{{areaInfo.price3}}/m²</text>
					<text>缴税评估价</text>
				</view>
			</view>
			<view class="oldHouseDetail">
				<view class="detail-item">
					<view>
						<text>总栋数</text><text>{{areaInfo.allBuild}}</text>
					</view>
					<view>
						<text>容积率</text><text>{{areaInfo.volume}}%</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>总户数</text><text>{{areaInfo.allRoom}}</text>
					</view>
					<view>
						<text>绿化率</text><text>{{areaInfo.greeningRate}}%</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>建筑类型</text><text>{{areaInfo.buildType}}</text>
					</view>
					<view>
						<text>物业费</text><text>{{areaInfo.propertyFee}}元/m²</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>交付时间</text><text>{{areaInfo.overTime}}</text>
					</view>
					<view>
						<text>物业类型</text>
						<text>{{typeList[areaInfo.type].name}}</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>教育资源</text><text>{{areaInfo.study1}},{{areaInfo.study2}},{{areaInfo.study3}}</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>户型</text><text>{{areaInfo.apartment}}</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>物业电话</text><text>{{areaInfo.propertyMobile}}</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>物业地址</text><text>{{areaInfo.propertyAddress}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 小区的房源信息 -->
		<view class="areaTab" :class="[isScroll == true ?'tabFixed':'']">
			<view>
				<view :class="[houseType == 2 ? 'active':'']" @click="changeHouseType(2)"><text>二手房</text></view>
				<view :class="[houseType == 1 ? 'active':'']" @click="changeHouseType(1)"><text>租房</text></view>
			</view>
		</view>
		<scroll-view class="homeList" :scroll-y="isScroll" style="height: calc(100vh - 100rpx);" @scrolltolower="loadMore" :class="[isScroll == true ?'homeTop':'']" v-if="isEmpty == false">
			<view class="home-info" v-for="(item, index) in homeList" :key="index" @click="checkDetail(item.houseId)">
				<view class="home-pic"><image :src="item.houseImg" lazy-load="true"></image></view>
				<view class="home-detail">
					<view class="homeName">
						<text>{{ item.houseName }}</text>
					</view>
					<view class="home-address">
						<text space="nbsp">{{ item.provinceString }} |{{ item.areaName }}|{{item.buildNum}}栋{{item.roomNum}}</text>
					</view>
					<view class="home-tips">
						<view :class="[{ 'tips-1': labIndex == 0, 'tips-2': labIndex == 1, 'tips-3': labIndex == 2 }]" v-for="(it, labIndex) in item.label" :key="labIndex">
							<text>{{ it }}</text>
						</view>
					</view>
					<view class="home-price" v-if="houseType == 2">
						<text>{{ item.price }}万({{ item.acreage }}m²|{{ item.unitPrice }}元/m²)</text>
					</view>
					<view class="home-price" v-if="houseType == 1">
						<text>{{ item.rental }}元/月({{ item.acreage }}m²)</text>
					</view>
				</view>
			</view>
			<!-- 加载 -->
			<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
		</scroll-view>
		<view v-if="isEmpty" class="noData">
			<u-empty text="暂无数据哦~" mode="favor"></u-empty>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	import baseURL from '../../api/index.js'	
	export default {
		name:'areaDetail',
		components:{
			uniSwiperDot,uniLoadMore
		},
		data(){
			return{
				areaId:'',
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				current: 0,
				autoplay:false,
				interval:3000,
				circular:true,
				swiperList:[],
				length:'',
				isPic1:'',//是否有分布图
				isPic2:'',//是否有户型图
				isPic3:'',//是否有环境图
				pic1Num:'',
				pic2Num:'',
				pic3Num:'',
				areaInfo:[],
				houseType:2,
				page:0,
				hasFlag: true,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				homeList:[],
				isScroll:false,
				fixedTop:611,
				isEmpty:'',
				typeList:[
					{id:1,name:'未知'},{id:2,name:'住宅'},{id:3,name:'商住'},{id:4,name:'商业'},{id:5,name:'公寓'},
					{id:6,name:'酒店'},{id:7,name:'店连屋'},{id:8,name:'车库'},{id:9,name:'别墅'}
				],
				manager:'',
				isAdmin:false,
			}
		},
		methods:{
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			change(e) {
				this.current = e.detail.current
				console.log(this.current);
			},
			// 获取小区详情
			async getAreaDetail(){
				let res = await this.$fetch(this.$api.areaDetail,{areaId:this.areaId},'GET')
				if(res.data.picUrl1){
					let data = res.data.picUrl1.split(',')
					this.pic1Num = data.length
					data.forEach(item =>{
						this.swiperList.push(item)
					})
					this.isPic1 = true
				}else{
					this.isPic1 = false
				}
				if(res.data.picUrl2){
					let data = res.data.picUrl2.split(',')
					this.pic2Num = data.length
					data.forEach(item =>{
						this.swiperList.push(item)
					})
					this.isPic2 = true
				}else{
					this.isPic2 = false
				}
				if(res.data.picUrl3){
					let data = res.data.picUrl3.split(',')
					this.pic3Num = data.length
					data.forEach(item =>{
						this.swiperList.push(item)
					})
					this.isPic3 = true
				}else{
					this.isPic3 = false
				}
				if(!res.data.type){
					res.data.type = 0
				}
				this.length = this.swiperList.length;
				this.areaInfo = res.data
				if(!this.areaInfo.price1){
					this.areaInfo.price1 = '0.0'
				}
				if(!this.areaInfo.price2){
					this.areaInfo.price2 = '0.0'
				}
				if(!this.areaInfo.price3){
					this.areaInfo.price3 = '0.0'
				}
				if(!this.areaInfo.price3){
					this.areaInfo.price3 = '0.0'
				}
				if(!this.areaInfo.allBuild){
					this.areaInfo.allBuild = '0'
				}
				if(!this.areaInfo.volume){
					this.areaInfo.volume = '0.0'
				}
				if(!this.areaInfo.allRoom){
					this.areaInfo.allRoom = '0'
				}
				if(!this.areaInfo.greeningRate){
					this.areaInfo.greeningRate = '0.0'
				}
				if(!this.areaInfo.buildType){
					this.areaInfo.buildType = ''
				}
				if(!this.areaInfo.propertyFee){
					this.areaInfo.propertyFee = '0.0'
				}
				if(!this.areaInfo.overTime){
					this.areaInfo.overTime = ''
				}else{
					this.areaInfo.overTime = this.$dayjs(this.areaInfo.overTime).format('YYYY年MM月')
				}
				if(!this.areaInfo.study1){
					this.areaInfo.study1 = ''
				}
				if(!this.areaInfo.study2){
					this.areaInfo.study2 = ''
				}
				if(!this.areaInfo.study3){
					this.areaInfo.study3 = ''
				}
				if(!this.areaInfo.apartment){
					this.areaInfo.apartment = ''
				}
				if(!this.areaInfo.propertyMobile){
					this.areaInfo.propertyMobile = ''
				}
				if(!this.areaInfo.propertyAddress){
					this.areaInfo.propertyAddress = ''
				}
				this.getAreaHouseList()
				if(!this.length){
					this.swiperList[0] = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
			},
			// 改变房源类型
			changeHouseType(type){
				if(this.houseType != type){
					this.houseType = type
				}
				this.page = 0 
				this.homeList = []
				this.hasFlag = true;
				this.status = 'loading';
				this.getAreaHouseList()
			},
			// 获取小区下的房源列表
			async getAreaHouseList(){
				if (!this.hasFlag) return; // 说明已经没有更多
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.areaHouseList,{areaId:this.areaInfo.areaId,hoseType:this.houseType,pageNum:this.page,pageSize:10},'GET')
				res.rows.forEach(item => {
					if (item.picUrl) {
						item.houseImg = item.picUrl.split(',')[0];
					}else{
						item.houseImg = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
					}
					if (item.label) {
						item.label = item.label.split(',');
					}
				});
				if (res.total) {
					this.isEmpty = false;
				} else {
					this.isEmpty = true;
				}
				this.homeList = [...this.homeList, ...res.rows];
				this.hasFlag = 10 * this.page < res.total;
				if (!this.hasFlag) {
					this.status = 'noMore';
				}
			},
			// 加载更多
			loadMore() {
				if (this.hasFlag) {
					this.getAreaHouseList()
				} else {
					this.status = 'noMore';
				}
			},
			// 查看房源详情
			checkDetail(id){
				if(this.houseType == 2){
					if(this.manager){
						uni.navigateTo({
							url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2&flag=1'+'&userId='+this.manager
						})
					}else{
						uni.navigateTo({
							url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2'
						})
					}
				}else if(this.houseType == 1){
					if(this.manager){
						uni.navigateTo({
							url:'../oldHouse/oldHouse?houseId='+id+'&houseType=1&flag=1'+'&userId='+this.manager
						})
					}else{
						uni.navigateTo({
							url:'../oldHouse/oldHouse?houseId='+id+'&houseType=1'
						})
					}
				}
			},
			// 查看相册
			checkAlbum(id){
				uni.navigateTo({
					url:'album?id='+id
				})
			},
			// 查看图片
			viewImage(e){
				uni.previewImage({
					urls:this.swiperList,
					current:e,
					loop:true
				})
			},
		},
		onLoad(options) {
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
			this.areaId = options.areaId
			this.getAreaDetail()
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
				// #ifdef H5
				this.manager  = uni.getStorageSync('userId')			
				// #endif
			}
			if(uni.getStorageSync('manager')){
				this.manager = uni.getStorageSync('manager')
			}
		},
		onPageScroll(e) {
			if(e.scrollTop >= this.fixedTop){
				this.isScroll = true
			}else{
				this.isScroll = false
			}
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
		onReady() {
			const query = uni.createSelectorQuery().select('.oldHouse')
			query.boundingClientRect(data => {
				console.log(JSON.stringify(data));
				this.fixedTop = data.top+data.height-50
				console.log(this.fixedTop);
			}).exec();
		}
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";
	page{
		background: #F0F0F0;
	}
	.container {
		// padding-bottom: 110upx;
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
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx');
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
		bottom: 20rpx;
		left: 500rpx;
		display: flex;
	}
	.dots{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40rpx;
	}
	.dots-img{
		width: 90rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		background: rgba(0,0,0,0.40);
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.oldHouse{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.oldHouseName{
		width: 690rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view {
			display: flex;
			align-items:flex-end;
			margin: 30rpx 0;
			
			text{
				width: 648rpx;
				font-size: 36rpx;
				color: #5B5B5B;
				font-weight: bold;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			
			image{
				width: 42rpx;
				height: 37.8rpx;
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
				margin-top: 28rpx;
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
	.oldHouseDetail{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		margin: 34rpx 30rpx 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
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
				font-size: 24rpx;
				color: #A6A6A6;
				margin-right: 20rpx;
				white-space: nowrap;
			}
			
			& > text:nth-child(2){
				font-size: 24rpx;
				color: #5B5B5B;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-weight: 600;
			}
		}
	}
	.areaTab{
		background: #FFFFFF;
		margin-top: 30rpx;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		
		& > view{
			width: 692rpx;
			height: 70rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			display: flex;
			background: #FFFFFF;
			border: 2rpx solid #D8D8D8;
			font-size: 28rpx;
			color: #A2A2A2;
			
			& > view:first-child{
				flex: 1;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border-radius: 8rpx 0 0 8rpx;
			}
			
			& > view:last-child{
				flex: 1;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border-radius: 0 8rpx 8rpx 0;
			}
			
			.active{
				background: #874A98;
				color: #FFFFFF;
			}
		}
	}
.homeList {
	width: 100%;
	background: #ffffff;
	.home-info {
		display: flex;
		flex-direction: row;
		margin-left: 30rpx;
		height: 250rpx;
		border-bottom: 2rpx solid #f7f7f7;
	}
}

.home-pic {
	width: 240rpx;
	height: 180rpx;
	margin-right: 30rpx;
	margin-top: 40rpx;
	border-radius: 4rpx;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-image: url('https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx');
}

.home-pic image {
	width: 240rpx;
	height: 180rpx;
	border-radius: 4rpx;
}

.home-detail {
	margin-top: 40rpx;
	display: flex;
	flex-direction: column;

	.homeName {
		width: 420rpx;
		font-size: 28rpx;
		color: #5b5b5b;
		text-align: justify;
		letter-spacing: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-weight: bold;
	}

	.home-address {
		width: 420rpx;
		font-size: 24rpx;
		color: #a6a6a6;
		letter-spacing: 0;
		text-align: justify;
		margin-top: 8rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.home-tips {
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
		height: 36rpx;

		.tips-1 {
			background: rgba(241, 78, 44, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #f14e2c;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}

		.tips-2 {
			background: rgba(74, 144, 226, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #4a90e2;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}

		.tips-3 {
			background: rgba(211, 160, 221, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #800080;
			letter-spacing: 0;
			text-align: justify;
			height: 36rpx;
			line-height: 36rpx;
		}
		.tips4 {
			background: #48d2ab;
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #ffffff;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}

		.tips5 {
			background: rgba(74, 144, 226, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #4a90e2;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}
	}

	.home-price {
		font-size: 28rpx;
		color: #fe9e2e;
		letter-spacing: 0;
		text-align: justify;
		font-size: 24rpx;
		margin-top: 12rpx;
	}
}

.tips-1 text {
	margin: 0 10rpx;
}

.tips-2 text {
	margin: 0 10rpx;
}

.tips-3 text {
	margin: 0 10rpx;
}
.tips4 text {
	margin: 0 10rpx;
}
.tips5 text {
	margin: 0 10rpx;
}
.tabFixed{
	top:48px;
	/* #ifdef H5 */
	top:32px;
	/* #endif */
	z-index: 10;
	position: fixed;
	box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
}
.homeTop{
	margin-top: 110rpx;
}
.noData {
	background: #ffffff;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-top: 100rpx;
}
</style>
