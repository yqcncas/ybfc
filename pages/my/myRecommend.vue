<template>
	<view>
		<view class="header">
			<view class="title">
				<view><text>客户姓名</text></view>
				<view><text>联系方式</text></view>
				<view><text>状态</text></view>
			</view>
		</view>
		<view class="client" v-if="!isEmpty">
			<view class="client-list">
				<view class="client-info" v-for="(item,index) in clientList" :key="index">
					<view><text>{{item.name}}</text></view>
					<view><text>{{item.mobile}}</text></view>
					<view class="green" v-if="item.status == 10"><text>审核通过</text></view>
					<view class="blue" v-if="item.status == 1"><text>审核中</text></view>
					<view class="red" v-if="item.status == 11"><text>审核不通过</text></view>
					<view class="orange" v-if="item.status == 2"><text>未注册</text></view>
				</view>
			</view>
		</view>
		<view v-if="isEmpty" class="noData">
			<u-empty text="暂无数据哦~" mode="favor"></u-empty>
		</view>
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText" v-if="!isEmpty"></uni-load-more>	
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'		
	export default {
		name:'myRecommend',
		components:{
			uniLoadMore
		},
		data(){
			return{
				clientList:[],
				page:0,
				hasFlag:true,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				isEmpty:false
			}
		},
		methods:{
			// 获取我的推荐列表
			async getMyRecommendList(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page				
				let res = await this.$fetch(this.$api.myRecommendList,{pageNum:this.page,pageSize:10},'GET')
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
				this.clientList = [...this.clientList,...res.rows]
			}
		},
		onShow() {
			this.getMyRecommendList()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getMyRecommendList()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.clientList = [];
			uni.stopPullDownRefresh()
			this.getMyRecommendList();
		}		
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.header{
		width: 100%;
		height: 90rpx;
		position: fixed;
		z-index: 10;
		top: 0;
		border-bottom: 2rpx solid #F0F0F0;
		background: #FFFFFF;
	}
	.title{
		margin-left: 30rpx;
		width: 690rpx;
		height: 90rpx;
		display: flex;
		
		& > view{
			flex: 1;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 28rpx;
			color: #A6A6A6;
			text-align: center;
		}
	}
	.client{
		width: 100%;
		background: #FFFFFF;
		margin-top: 90rpx;
	}
	.client-list{
		margin-left: 30rpx;
		width: 720rpx;
		height: 100rpx;
		border-bottom: 2rpx solid #F0F0F0;
	}
	.client-info{
		width: 690rpx;
		height: 100rpx;
		display: flex;
		
		& > view{
			flex: 1;
			height: 100rpx;
			font-size: 28rpx;
			color: #5B5B5B;
			text-align: center;
			line-height: 100rpx;
		}
		
		.green{
			color: #55A900;
		}
		.blue{
			color: #4A90E2;
		}
		.red{
			color: #D0021B;
		}
		.orange{
			color: #FE7838;
		}
	}
	.noData{
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 200rpx;
	}	
</style>
