<template>
	<view>
		<view class="videList" v-for="(item,index) in videoList" :key="index">
			<view>
				<video :src="item.url" controls></video>
			</view>
			<view>{{item.name}}</view>
			<view>{{item.createTime}}</view>
		</view>
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText"></uni-load-more>	
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import loginModal from '../../components/Modal/loginModal.vue'			
	export default {
		data() {
			return {
				videoList:[],
				page:0,
				hasFlag:true,
				status: 'loading',				
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				manager:'',
				userId:'',
				path:'',
				title:'视频列表',
				modalShow:false
			};
		},
		components:{uniLoadMore,loginModal},
		methods:{
			// 获取视频列表
			async getVideoList(){
				if(!this.hasFlag) return //没有更多
				this.page = ++this.page
				let res = await this.$fetch(this.$api.getVideoList,{pageNum:this.page,pageSize:10},'GET','form')
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
				this.videoList = [...this.videoList,...res.rows]
				console.log(res);
			},
			// 回到首页
			goBackHome(){
				uni.switchTab({
					url:'../home/home'
				})
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
			if(options.userId){
				this.manager = options.userId
				uni.setStorageSync('manager',options.userId)
				if(!uni.getStorageSync('isAdmin')&& !uni.getStorageSync('isToken')){
					setTimeout(()=>{
						this.modalShow = true
					},1000)
				}
			}
			this.getVideoList()
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')&&uni.getStorageSync('userId')){
				this.userId = uni.getStorageSync('userId')
			}
		},
		onShareAppMessage() {
			this.path = 'pages/video/video?userId='+this.userId
			if(ops.from === 'button'){
			}
			return{
				title:this.title,
				path:this.path
			}
		},
		onReachBottom() {
			this.getVideoList()
		},
		onPullDownRefresh() {
			this.page = 0
			this.videoList = []
			this.status = 'loading'
			this.hasFlag = true
			this.getVideoList()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="less">
	page {
		background: #F7F7F7;
	}
	.videList{
		width: 690rpx;
		background: #FFFFFF;
		margin: 30rpx 30rpx 0 30rpx;
		display: flex;
		flex-direction: column;
		border-radius: 2px;
		& > view:first-child{
			width: 650rpx;
			height: 376rpx;
			margin: 20rpx 20rpx;
			video{
				width: 650rpx;
				height: 376rpx;
			}
		}
		& > view:nth-child(2){
			width: 650rpx;
			font-size: 17px;
			color: #030303;
			letter-spacing: -0.41px;
			margin: 0 20rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		& > view:nth-child(3){
			width: 650rpx;
			margin: 10rpx 20rpx 0 20rpx;
			padding-bottom: 20rpx;
			font-size: 12px;
			color: #A2A2A2;
			display: flex;
			justify-content: flex-end;
		}
	}
	.button{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		// align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #FFFFFF;
		background: #874A98;
		position: fixed;
		bottom: 50rpx;
		left: 30rpx;
		/* #ifdef H5 */
		margin-bottom: var(--window-top);
		/* #endif */
		box-shadow: 0 2rpx 10rpx 2rpx rgba(65, 56, 133, 0.10);
		view{
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
</style>
