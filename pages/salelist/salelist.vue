<template>
	<view>
		<view class="search">
			<view class="search-input">
				<image src="../../static/icon/search.png" mode="" class="search-icon"></image>
				<input type="text" placeholder="请输入近期已售的房源名称" placeholder-class="placeHolderClass" v-model="title" confirm-type="search" @confirm="search" />
				<view class="close-icon" @tap="clear" v-if="title.length > 0">
					<image src="../../static/icon/close.png" mode="" ></image>
				</view>
			</view>
		</view>
		<view class="salelist">
			<view class="sale-info" v-for="(item,index) in soleList" :key="index">
				<view class="sale-detail">
					<view class="sale-time"><text>{{item.createTime}}</text></view>
					<view class="sale-name"><text>{{item.name}}</text></view>
				</view>
				<view class="sale-price">
					<text>{{item.price}}万</text>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText"></uni-load-more>	
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'	
	export default{
		name:'salelist',
		components:{
			uniLoadMore
		},
		data(){
			return{
				title:'',
				soleList:[],
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
			// 获取已售列表
			async getSoleList(){
				if (!this.hasFlag) return // 说明已经没有更多啦
				this.page = ++this.page
				let res = await this.$fetch(this.$api.soldHouse,{pageSize:10,pageNum:this.page,name:this.title},'GET')
				if(res.code == 0){
					this.soleList = [...this.soleList,...res.rows]
					this.hasFlag = 10*this.page < res.total
					if(!this.hasFlag){
						this.status = 'noMore'
					}
				}else if(res.code == 401){
					uni.showToast({
						icon:'none',
						title:'请先登录！'
					})
					setTimeout(()=>{
						uni.redirectTo({
							url:'../login/login'
						})
					},500)
				}
			},
			// 搜索
			search(){
				this.page = 0
				this.hasFlag = true;
				this.status = 'loading'
				this.soleList = [];
				this.getSoleList()
			},
			// 清空
			clear(){
				this.title = ''
				this.page = 0
				this.hasFlag = true;
				this.status = 'loading'
				this.soleList = [];
				this.getSoleList()
			}
		},
		onShow() {
			this.page = 0
			this.hasFlag = true;
			this.status = 'loading'
			this.soleList = [];
			this.getSoleList()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getSoleList()
			}else{
				this.status = 'noMore'
			}
		},
		onPullDownRefresh() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading'
			this.soleList = [];
			uni.stopPullDownRefresh()
			this.getSoleList();
		}
	}
</script>

<style>
	.search{
		width: 100%;
		height: 78rpx;
		background: #FFFFFF;
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top:var(--window-top);
		/* #endif */
		z-index: 99;
		border-bottom: 2rpx solid #F0F0F0;
	}
	.search-input{
		width: 630rpx;
		height: 60rpx;
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
		width: 506rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #333333;
		font-size: 24rpx;
		letter-spacing: 0.28rpx;
	}
	.close-icon{
		margin-right: 30rpx;
		width: 26rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
	}
	.close-icon image{
		width: 26rpx;
		height: 26rpx;
	}
	.placeHolderClass{
		color: #9B9B9B;
		font-size: 28rpx;
	}
	.salelist{
		margin-top: 78rpx;
		width: 100%;
		background: #FFFFFF;
	}
	.sale-info{
		width: 720rpx;
		margin-left: 30rpx;
		height: 144rpx;
		display: flex;
		border-bottom: 2rpx solid #F0F0F0;
	}
	.sale-detail{
		flex: 2;
		display: flex;
		flex-direction: column;
		height: 144rpx;
	}
	.sale-time{
		margin-top: 30rpx;
		font-size: 24rpx;
		color: #A2A2A2;
		letter-spacing: 0;
	}
	.sale-name{
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #5B5B5B;
		letter-spacing: 0;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;	
	}
	.sale-price{
		font-size: 40rpx;
		height: 144rpx;
		line-height: 144rpx;
		text-align: right;
		color: #FFC900;
	}
	.sale-price text{
		padding-right: 30rpx;
	}
</style>
