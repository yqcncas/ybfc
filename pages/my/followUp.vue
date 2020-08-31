<template>
	<view>
		<view class="followList" v-if="!isEmpty" v-for="(item,index) in followList" :key="index">
			<view>{{item.content}}</view>
			<view>
				<view>{{item.managerName}}</view>
				<view>{{item.createTime}}</view>
			</view>
		</view>
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
	export default {
		data() {
			return {
				id:'',
				page:0,
				hasFlag:true,
				isEmpty:false,
				followList:[]
			};
		},
		methods:{
			// 获取跟进记录
			async getFollowList(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page
				let res = await this.$fetch(this.$api.myClientInfo,{id:this.id,pageNum:this.page,pageSize:10},'GET')
				if(res.total > 0){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.followList = [...this.followList,...res.rows]
				this.hasFlag = 10*this.page < res.total
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getFollowList()
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.followList{
		width: 750rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		& > view:first-child{
			width: 690rpx;
			margin: 30rpx 30rpx 0 30rpx;
			font-size: 28rpx;
			color: #333333;
		}
		& > view:last-child{
			width: 690rpx;
			margin: 20rpx 30rpx 30rpx 30rpx;
			display: flex;
			align-items: center;
			& > view:first-child{
				font-size: 24rpx;
				flex: 1;
				color: #9B9B9B;
			}
			& > view:last-child{
				font-size: 24rpx;
				flex: 1;
				color: #9B9B9B;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	.followList +.followList{
		border-top: 1px solid #F5F5F5;
	}
	.noData{
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
	}
</style>
