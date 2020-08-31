<template>
	<view>
		<!-- 导航栏 -->
		<view class="header">
			<view class="search-bar">
				<view class="search-input">
					<view class="search-icon"><image src="../../static/icon/search.png"></image></view>
					<view class="search-content">
						<input type="text" placeholder="请输入小区名或地址" @confirm="searchHome" v-model="content" placeholder-class="placeHolderClass" confirm-type="search" />
					</view>
					<view class="close-icon" v-if="content.length > 0" @click="clear"><image src="../../static/icon/close.png" mode=""></image></view>
				</view>
				<view class="findHome" @click="goMapSearch"><image src="../../static/icon/location-2.png"></image></view>
			</view>
			<!-- 条件搜索 -->
			<chooseArea :condition="tab" @region="regionChoose"></chooseArea>
		</view>
		<!-- 住房列表 -->
		<mescroll-uni :down="downOption" @down="downCallback" :marginTop="top">
			<scroll-view class="homeList" scroll-y style="height: calc(100vh - 196rpx);" @scrolltolower="loadMore" v-if="!isEmpty">
				<view class="home-info" v-for="(item, index) in homeList" :key="index" @click="checkAreaInfo(item.areaId)">
					<view class="home-pic"><image :src="item.picUrl1" lazy-load="true"></image></view>
					<view class="home-detail">
						<view class="homeName">
							<text>{{ item.areaName }}</text>
						</view>
						<view class="home-address">
							<text space="nbsp">{{ item.provinceString }}</text>
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
	import chooseArea from '../../components/drop-choose/chooseArea.vue'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';	
	export default{
		name:'xiaoqu',
		components:{
			chooseArea,uniLoadMore,MescrollUni
		},
		data(){
			return{
				tab:[{id:1,name:'区域'}],
				homeList: [],
				content: '',
				top: '196rpx',
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
				province: '', //区域
			}
		},
		methods:{
			// 获取小区列表
			async getAreaList(){
				if (!this.hasFlag) return; // 说明已经没有更多
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.xiaoqu,{areaName:this.content,pageNum:this.page,pageSize:10,province:this.province},'GET')
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
					this.getAreaList();
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
				this.getAreaList();
				mescroll.endSuccess();
			},
			// 区域选择
			regionChoose(data) {
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading';
				this.homeList = [];
				this.province = data;
				this.getAreaList();
			},
			// 搜索
			searchHome() {
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading';
				this.homeList = [];
				this.getAreaList();
			},
			// 清空搜索内容
			clear() {
				this.content = '';
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading';
				this.homeList = [];
				this.getAreaList();
			},
			// 查看小区详情
			checkAreaInfo(areaId ){
				uni.navigateTo({
					url:'areaDetail?areaId='+areaId
				})
			},
			// 地图找房
			goMapSearch(){
				uni.navigateTo({
					url:'../mapSearch/mapSearch'
				})
			}
		},
		onShow() {
			this.getAreaList()
		}
	}
</script>

<style lang="scss">
.header {
	width: 100%;
	background: #ffffff;
	position: fixed;
	height: 196rpx;
	z-index: 99;
	/* #ifdef MP-WEIXIN */
	top:0;
	/* #endif */
	/* #ifdef H5 */
	top:var(--window-top);
	/* #endif */
	display: flex;
	flex-direction: column;
	box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
}
.search-bar {
	width: 100%;
	height: 106rpx;
	display: flex;
	flex-direction: row;
	position: fixed;
	/* #ifdef MP-WEIXIN */
	top:0;
	/* #endif */
	/* #ifdef H5 */
	top:var(--window-top);
	/* #endif */
	background: #ffffff;
	z-index: 99;
}

.search-input {
	width: 610rpx;
	height: 72rpx;
	border-radius: 8rpx;
	background: #f1f2f4;
	display: flex;
	flex-direction: row;
	margin-left: 30rpx;
	align-items: center;
	margin-top: 18rpx;
}

.search-icon {
	margin-left: 30rpx;
	margin-right: 10rpx;
	width: 28rpx;
	height: 28rpx;
	display: flex;
	align-items: center;
}

.search-icon image {
	width: 28rpx;
	height: 28rpx;
}

.search-content {
	color: #a6a6a6;
	font-size: 24rpx;
	letter-spacing: 0.28rpx;
	margin-top: 5rpx;
	width: 486rpx;
}
.close-icon {
	margin-right: 20rpx;
	width: 36rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
}
.close-icon image {
	width: 36rpx;
	height: 36rpx;
}
.findHome {
	margin-left: 30rpx;
	margin-top: 18rpx;
	width: 50rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	image {
		width: 50rpx;
		height: 50rpx;
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
		font-size: 24rpx;
		color: #a6a6a6;
		letter-spacing: 0;
		text-align: justify;
		margin-top: 8rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}

.noData {
	background: #ffffff;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-top: 100rpx;
}	
</style>
