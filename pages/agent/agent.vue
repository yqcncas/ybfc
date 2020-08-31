<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-bar">
			<view class="search-input">
				<view class="search-icon">
					<image src="../../static/icon/search.png"></image>
				</view>
				<view class="search-content"><input type="text" placeholder="请输入经纪人姓名" @confirm="search" v-model="content" placeholder-class="placeHolderClass" confirm-type="search"></view>
				<view class="close-icon" v-if="content.length > 0" @click="clear">
					<image src="../../static/icon/close.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 经纪人列表 -->
		<view class="agent" v-if="!isEmpty">
			<view class="agent-list" v-for="(item,index) in agentList" :key="index" @click="checkAgent(item.userId)">
				<view class="agent-img"><image :src="item.avatar" mode=""></image></view>
				<view class="agent-name"><text>{{item.userName}}</text></view>
			</view>
		</view>
		<!-- 暂无数据 -->
		<view class="noData" v-if="isEmpty">
			<u-empty text="暂无数据哦~" mode="favor"></u-empty>
		</view>
		<!-- #ifdef H5 -->
		<getApp :windowBottom="windowBottom"></getApp>
		<!-- #endif -->
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText" v-if="!isEmpty"></uni-load-more>	
	</view>
</template>

<script>
	import baseURL from '../../api/index.js'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	export default{
		name:'agent',
		components:{
			uniLoadMore
		},
		data(){
			return{
				content:'',
				agentList:[],
				page:0,
				hasFlag:true,
				isEmpty:false,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				windowBottom:0
			}
		},
		methods:{
			// 获取经纪人列表
			async getAgentList(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page
				let res = await this.$fetch(this.$api.agentList,{pageSize:10,pageNum:this.page,userName:this.content},'GET')
				uni.setNavigationBarTitle({
					title:'经纪人（共'+res.total+'人）'
				})
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				res.rows.forEach(item =>{
					item.avatar = baseURL.pro+'profile/avatar/'+item.avatar
				})
				this.agentList = [...this.agentList,...res.rows]
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
			},
			// 搜索
			search(){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.agentList = [];
				this.getAgentList()
			},
			// 清空搜索内容
			clear(){
				this.content = ''
				this.search()
			},
			// 查看经纪人详情
			checkAgent(id){
				uni.navigateTo({
					url:'agentDetail?id='+id
				})
			}
		},
		onShow() {
			this.getAgentList()
			uni.getSystemInfo({
				success: (res) => {
					this.windowBottom = res.windowBottom
				}
			})
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getAgentList()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.agentList = [];
			uni.stopPullDownRefresh()
			this.getAgentList()
		}
	}
</script>

<style lang="scss">
	.search-bar {
		width: 100%;
		height: 106rpx;
		display: flex;
		flex-direction: row;
		position: fixed;
		top: 0;
		background: #FFFFFF;
		z-index: 99;
		/* #ifdef H5 */
		top:var(--window-top);
		/* #endif */
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
	}
	
	.search-input {
		width: 690rpx;
		height: 72rpx;
		border-radius: 8rpx;
		background: #F1F2F4;
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
		color: #A6A6A6;
		font-size: 24rpx;
		letter-spacing: 0.28rpx;
		margin-top: 5rpx;
		width: 566rpx;
	}
	.close-icon{
		margin-right: 20rpx;
		width: 36rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
	}
	.close-icon image{
		width: 36rpx;
		height: 36rpx;		
	}
	/* 经纪人列表 */
	.agent{
		padding: 136rpx 0 30rpx 0;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;
	}
	.agent-list{
		width: 210rpx;
		height: 260rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		box-shadow: 0 4px 8px 0 rgba(63,55,127,0.06), 0 8px 16px 0 rgba(67,58,137,0.03);
		margin: 0 0 30rpx 30rpx;
	}
	.agent-img{
		width: 170rpx;
		height: 170rpx;
		margin: 20rpx 20rpx 10rpx 20rpx;
		border-radius: 8rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
	}
	.agent-img image{
		width: 170rpx;
		height: 170rpx;
		border-radius: 8rpx;
	}
	.agent-name{
		width: 210rpx;
		text-align: center;
		font-size: 28rpx;
		color: #5B5B5B;
		letter-spacing: 0.34rpx;
	}
	.noData{
		background: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 274rpx;
		.nodata-img{
			width: 100%;
			height: 325.6rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 274rpx;
			
			image{
				width: 300rpx;
				height: 325.6rpx;
			}
		}
		
		.nodata-content{
			width: 100%;
			margin-top: 40.4rpx;
			font-size: 24rpx;
			color: #A6A6A6;
			text-align: center;
		}
	}
</style>
