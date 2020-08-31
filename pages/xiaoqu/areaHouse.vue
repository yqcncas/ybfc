<template>
	<view>
		<!-- 住房列表 -->
		<mescroll-uni :down="downOption" @down="downCallback" :marginTop="top">
			<scroll-view class="homeList" scroll-y style="height: calc(100vh);" @scrolltolower="loadMore" v-if="!isEmpty">
				<view class="home-info" v-for="(item, index) in homeList" :key="index" @click="checkDetail(item.houseId)">
					<view class="home-pic"><image :src="item.picUrl" lazy-load="true"></image></view>
					<view class="home-detail">
						<view class="homeName">
							<text>{{ item.houseName }}</text>
						</view>
						<view class="home-address">
							<text space="nbsp">{{ item.provinceString }} |{{ item.areaName }}</text><text v-if="isAdmin">|{{item.buildNum}}栋{{item.roomNum}}</text>
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
		</mescroll-uni>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
	export default {
		name:'areaHouse',
		components:{
			uniLoadMore,MescrollUni
		},
		data(){
			return{
				content: '',
				top: '0rpx',
				hasFlag: true,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				isEmpty: false,
				page: 0,
				houseType:'',
				areaId:'',
				homeList:[],
				isAdmin:false
			}
		},
		methods:{
			// 获取小区下房源列表
			async getAreaHouse(){
				if (!this.hasFlag) return; // 说明已经没有更多
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.areaHouseList,{areaId:this.areaId,houseType:this.houseType,pageSize:10,pageNum:this.page},'GET')
				uni.setNavigationBarTitle({
					title:res.rows[0].areaName+'('+res.total+'套)'
				})
				res.rows.forEach(item => {
					if (item.picUrl) {
						item.picUrl = item.picUrl.split(',')[0];
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
					this.getAreaHouse()
				} else {
					this.status = 'noMore';
				}
			},
			// 下拉刷新
			downCallback(mescroll) {
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading';
				this.homeList = [];
				this.getAreaHouse()
				mescroll.endSuccess();
			},
			// 查看房源详情
			checkDetail(id){
				if(this.houseType == 2){
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2'
					})
				}else if(this.houseType == 1){
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=1'
					})
				}
			},
		},
		onLoad(options) {
			this.areaId = options.areaId
			this.houseType = options.houseType
			this.getAreaHouse()
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
			}
		}
	}
</script>

<style lang="less">
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
			display: flex;
			
			& > text:first-child{
				flex: 2;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			
			& >text:nth-child(2){
				flex: 1;
			}
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
	.noData {
		background: #ffffff;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
	}
</style>
