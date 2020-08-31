<template>
	<view>
		<view v-if="!isEmpty" class="rewardList">
			<view class="reward-info" v-for="(item,index) in rewardList" :key="index">
				<view class="reward-detail">
					<view><text>{{item.createTime}}</text></view>
					<view><text>{{item.childName}}</text></view>
				</view>
				<view class="reward-num">
					<text v-if="item.type == 1" class="reward-tit">分佣</text><text v-if="item.type == 11" class="reward-tit">提现失败</text>
					<text v-if="item.type == 1 ||item.type ==11" class="reward-add">+{{item.money}}</text><text v-if="item.type ==2 || item.type==10" class="reward-reduce">-{{item.money}}</text>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText" v-if="!isEmpty"></uni-load-more>	
		<!-- 暂无数据 -->
		<view v-if="isEmpty" class="noData">
			<u-empty text="暂无数据哦~" mode="favor"></u-empty>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'		
	export default{
		name:'rewardsList',
		components:{
			uniLoadMore
		},
		data(){
			return{
				isEmpty:false,
				page:0,
				hasFlag:true,
				rewardList:[],
				status:'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
			}
		},
		methods:{
			async getRewardList(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page
				let res = await this.$fetch(this.$api.rewardList,{pageNum:this.page,pageSize:10},'GET')
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.rewardList = [...this.rewardList,res.rows]
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
			}
		},
		onShow() {
			this.getRewardList()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getRewardList()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.rewardList = [];
			uni.stopPullDownRefresh()
			this.getRewardList();
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.noData{
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
	}
	.rewardList{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.reward-info{
		margin-left: 30rpx;
		width: 720rpx;
		height: 110rpx;
		display: flex;
		border-bottom: 2rpx solid #F0F0F0;
	}
	.reward-detail{
		flex: 1;
		height: 110rpx;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #828282;
		}
		
		& > view:nth-child(2){
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #4A4A4A;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	.reward-num{
		flex: 1;
		height: 110rpx;
		line-height: 110rpx;
		text-align: right;
		
		& > .reward-tit{
			font-size: 24rpx;
			color: #A6A6A6;
			margin-right: 20rpx;
		}
		
		
		& > .reward-add{
			font-size: 36rpx;
			color: #55A900;
			padding-right: 30rpx;
		}
		
		& > .reward-reduce{
			font-size: 36rpx;
			color: #D0021B;
			padding-right: 30rpx;
		}
	}
</style>
