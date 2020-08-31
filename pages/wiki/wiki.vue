<template>
	<view>
		<view class="search">
			<view class="search-input">
				<image src="../../static/icon/search.png" mode="" class="search-icon"></image>
				<input type="text" placeholder="请输入标题" placeholder-class="placeHolderClass" v-model="title" confirm-type="search" @confirm="searchArt" />
				<view class="close-icon" @tap="clear" v-if="title.length > 0">
					<image src="../../static/icon/close.png" mode="" ></image>
				</view>
			</view>
			<!-- 选项卡 -->
			<view class="home-tab">
				<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
					<view v-for="(item,index) in tabList" :key="item.id" class="nav-item" :class="{current: index == tabCurrentIndex}"
					 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
				</scroll-view>
			</view>
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :marginTop="top">
			<swiper :current="tabCurrentIndex" duration="300" @change="swiperChange" style="height: calc(100vh - 180rpx);">
				<swiper-item v-for="(it,index) in tabList" :key="index" class="artList">
					<scroll-view class="wikiList" scroll-y style="height: calc(100vh - 180rpx);" @scrolltolower="loadMore" v-if="!isEmpty">
						<view class="art-info" v-for="(item,index) in artList" :key="index" @click="checkDetail(item.id)">
							<view class="art-content">
								<view class="art-tit"><text>{{item.title}}</text></view>
								<view class="art-time"><text>{{item.createTime}}</text></view>
							</view>
							<view class="art-img">
								<image :src="item.picUrl" mode="" lazy-load="true"></image>
							</view>
						</view>
						<!-- 加载 -->
						<uni-load-more :status="status" :contentText="contentText"></uni-load-more>	
					</scroll-view>
					<view v-if="isEmpty" class="noData">
						<u-empty text="暂无数据哦~" mode="favor"></u-empty>
					</view>
				</swiper-item>
			</swiper>
		</mescroll-uni>
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import loginModal from '../../components/Modal/loginModal.vue'
	export default{
		name:'wiki',
		components:{
			MescrollUni,uniLoadMore,loginModal
		},		
		data(){
			return{
				title:'',
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				tabList:[
					{id:1,name:'购房百科'},
					{id:2,name:'学区划分'},
					{id:3,name:'时事消息'},
					{id:4,name:'便民服务'},
					{id:5,name:'英棒头条'}
				],
				tabCurrentIndex: 0,
				swiperHeight: '',
				page:0,
				artList:[],
				hasFlag:true,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				top:'180rpx',
				isEmpty:false,
				type:1,
				path:'',
				modalShow:false,
				userId:'',//分享人id
				isAdmin:false,
				manager:''
			}
		},
		methods:{
			// 清空
			clear(){
				this.title = ''
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.artList = [];
				this.getWiki()
			},
			// 搜索文章
			searchArt(){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.artList = [];
				this.getWiki()
			},
			// 点击选项卡
			changeTab(index) {
				if(this.tabCurrentIndex !== index){
					this.tabCurrentIndex = index
				}
			},
			// 滑动切换
			swiperChange(e) {
				this.tabCurrentIndex = e.target.current;
				if(this.tabCurrentIndex == 4){
					this.type = this.tabCurrentIndex + 2
				}else{
					this.type = this.tabCurrentIndex + 1
				}
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.artList = [];
				this.getWiki()
			},
			// 获取购房百科
			async getWiki(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page				
				let res = await this.$fetch(this.$api.bookList,{pageNum:this.page,pageSize:10,title:this.title,type:this.type},'GET')
				console.log(res);
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
				this.artList = [...this.artList,...res.rows]
			},
			// 加载更多
			loadMore(){
				if(this.hasFlag){
					this.getWiki()
				}else{
					this.status = 'noMore'
				}
			},
			// 下拉刷新
			downCallback(mescroll){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.artList = [];
				this.getWiki()
				mescroll.endSuccess();
			},
			// 查看详情
			checkDetail(id){
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:'../headlines/headDetail?id='+id
				})
				// #endif
				// #ifdef H5
				if(this.manager){
					uni.navigateTo({
						url:'../headlines/headDetail?id='+id+'&manager='+this.manager
					})
				}else{
					uni.navigateTo({
						url:'../headlines/headDetail?id='+id
					})
				}
				// #endif
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
			console.log(options);
			if(options.id){
				this.tabCurrentIndex = options.id
				if(this.tabCurrentIndex == 4){
					this.type = this.tabCurrentIndex + 2
				}else{
					this.type = this.tabCurrentIndex + 1
				}
			}
			if(options.title){
				this.title = options.title
			}
			if(options.manager&&options.manager != 'undefined'){
				uni.setStorageSync('manager',options.manager)
				if(!uni.getStorageSync('isToken')){
					setTimeout(()=>{
						this.modalShow = true
					},1000)
				}
			}
		},
		onShow() {
			this.getWiki()
			if(uni.getStorageSync('userId')){
				this.userId = uni.getStorageSync('userId')
			}
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
				// #ifdef H5
				this.manager  = uni.getStorageSync('userId')			
				// #endif
			}else{
				if(uni.getStorageSync('manager')){
					this.manager = uni.getStorageSync('manager')
				}
			}
		},
		onShareAppMessage(ops) {
			this.path = 'pages/wiki/wiki?id='+this.tabCurrentIndex+'&manager='+this.userId+'&title='+this.title
			if(ops.from === 'button'){
			}
			return{
				title:'购房百科',
				path:this.path
			}
		}
	}
</script>

<style lang="scss">
	.search{
		width: 100%;
		height: 180rpx;
		background: #FFFFFF;
		position: fixed;
		top:0;
		z-index: 99;
		/* #ifdef H5 */
		top:var(--window-top);
		/* #endif */
		border-bottom: 2rpx solid #F0F0F0;
	}
	.search-input{
		width: 630rpx;
		height: 72rpx;
		border-radius: 8rpx;
		background: #F1F2F4;
		display: flex;
		flex-direction: row;
		margin: 0 60rpx;
		align-items: center;
	}
	.search-icon{
		width: 28rpx;
		height: 28rpx;
		margin: 0 10rpx 0 30rpx;
	}
	.search-input input{
		width: 496rpx;
		height: 72rpx;
		line-height: 72rpx;
		color: #333333;
		font-size: 24rpx;
		letter-spacing: 0.28rpx;
	}
	.close-icon{
		margin-right: 30rpx;
		width: 36rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
	}
	.close-icon image{
		width: 36rpx;
		height: 36rpx;
	}
	.placeholderClass{
		color: #A6A6A6;
	}
	.home-tab{
		width: 100%;
		margin-top: 18rpx;
		height: 90rpx;
		background: #FFFFFF;
		position: relative;
		z-index: 10;
		// border-bottom: 2rpx solid #F0F0F0;
	}
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		background-color: #fff;
		
		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 28upx;
			color: #A6A6A6;
			position: relative;
		
			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6upx solid #874A98;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		
		.current {
			color: #874A98;
			font-size: 28upx;
			font-weight: bold;
		
			&:after {
				width: 50%;
			}
		}
	}
	.artList{
		width: 100%;
		background: #FFFFFF;
		
		.wikiList{
			width: 100%;
			background: #FFFFFF;
		}
		
		.art-info{
			display: flex;
			margin-left: 30rpx;
			width: 720rpx;
			height: 164rpx;
			border-bottom:2rpx solid #F0F0F0;
		}
	}
	.art-content{
		width: 480rpx;
		margin: 20rpx 30rpx 20rpx 0;
		display: flex;
		flex-direction: column;
		
		.art-tit{
			width: 480rpx;
			font-size: 28rpx;
			color: #5B5B5B;
			letter-spacing: 0;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;	
		}
		.art-time{
			width: 480rpx;
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #A6A6A6;
			letter-spacing: 0;
			white-space: nowrap;
		}
	}
	.art-img{
		margin: 20rpx 30rpx 20rpx 0;
		width: 180rpx;
		height: 124rpx;
		border-radius: 8rpx;
		// background-repeat: no-repeat;
		// background-size: 100% 100%;
		// background-image: url('https://img.bajiaostar.com/FlXN-1C7D__XlO8sDe8EBQWFWSe4');
	}
	.art-img image{
		width: 180rpx;
		height: 124rpx;
		border-radius: 8rpx;
	}
	.noData{
		background: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 250rpx;
	}	
</style>
