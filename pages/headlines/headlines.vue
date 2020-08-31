<template>
	<view>
		<view class="artList">
			<view class="art-info" v-for="(item,index) in headlinesList" :key="index" @click="checkHeadDetail(item.id)">
				<view class="art-content">
					<view class="art-tit"><text>{{item.title}}</text></view>
					<view class="art-time"><text>{{item.createTime}}</text></view>
				</view>
				<view class="art-img">
					<image :src="item.picUrl" mode=""></image>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText"></uni-load-more>		
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'	
	export default{
		naem:'headlines',
		components:{
			uniLoadMore
		},
		data(){
			return{
				headlinesList:[],
				page:0,
				hasFlag: true,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
			}
		},
		methods:{
			// 获取头条列表
			async getHeadlines(){
				if (!this.hasFlag) return // 说明已经没有更多啦
				this.page = ++this.page
				let res = await this.$fetch(this.$api.headlines,{pageSize:10,pageNum:this.page},'GET')
				this.headlinesList = [...this.headlinesList,...res.rows]
				this.hasFlag = 10*this.page < res.total
				if (!this.hasFlag) {
					this.status = 'noMore';
				}
			},
			// 查看头条详情
			checkHeadDetail(id){
				uni.navigateTo({
					url:'headDetail?id='+id
				})
			}
		},
		onShow() {
			this.getHeadlines()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getHeadlines()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.headlinesList = [];
			uni.stopPullDownRefresh()
			this.getHeadlines();
		}
	}
</script>

<style lang="scss">
	.artList{
		width: 100%;
		background: #FFFFFF;
		
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
			font-weight: bold;
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
	}
	.art-img image{
		width: 180rpx;
		height: 124rpx;
		border-radius: 8rpx;
	}
</style>
