<template>
	<view>
		<view class="followUp">
			<view class="followUpList" v-for="(item,index) in followUpList" :key="index">
				<view class="followUpInfo">
					<view>
						<text>{{item.content}}</text>
					</view>
					<view>
						<text>经纪人{{item.uName}}</text>
						<text>{{item.createTime}}</text>
					</view>
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
	export default {
		name:'followList',
		components:{
			uniLoadMore
		},
		data(){
			return{
				followUpList:[],
				oldHouseId:'',
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
			// 获取跟进记录
			async getOldHouseLog(){
				if (!this.hasFlag) return // 说明已经没有更多啦
				this.page = ++this.page
				let res = await this.$fetch(this.$api.getOldHouseLog,{oldHouseId:this.oldHouseId,pageNum:this.page,pageSize:10},'GET')
				this.followUpList = [...this.followUpList,...res.rows]
				this.hasFlag = 10*this.page < res.total
				if (!this.hasFlag) {
					this.status = 'noMore';
				}
			}
		},
		onLoad(options) {
			this.oldHouseId = options.id
			this.getOldHouseLog()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getOldHouseLog()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.followUpList = [];
			uni.stopPullDownRefresh()
			this.getOldHouseLog();
		}
	}
</script>

<style lang="less">
	.followUp{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.followUpList{
		width: 720rpx;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
	}
	.followUpInfo{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			margin-top: 18rpx;
			width: 690rpx;
			font-size: 28rpx;
			color: #4A4A4A;
			letter-spacing: 0.34rpx;
		}
		
		& > view:nth-child(2){
			margin-top: 10rpx;
			display: flex;
			width: 690rpx;
			font-size: 24rpx;
			color: #9B9B9B;
			letter-spacing: 0.28rpx;
			margin-bottom: 18rpx;
			
			& > text:first-child{
				flex: 1;
			}
			
			& > text:nth-child(2){
				text-align: right;
			}
		}
	}
</style>
