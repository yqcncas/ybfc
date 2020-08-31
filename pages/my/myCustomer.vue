<template>
	<view>
		<view class="client">
			<view class="client-list" v-for="(item,index) in clientList" :key="index" @click="handleToCheckRecord(item.id)">
				<view class="client-avatar">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view class="client-info">
					<view class="client-detail">
						<view><text>{{item.name}}</text><view @click.stop="handleToEdit(item.id,index,item.name)">修改</view></view>
						<view><text>{{item.mobile}}</text></view>
					</view>
					<view class="client-status" :class="[{'blue':item.status == 1,'orange':item.status == 2,'green':item.status == 10,'red':item.status == 11}]">
						<text v-if="item.status == 1">审核中</text>
						<text v-if="item.status == 2">未注册</text>
						<text v-if="item.status == 10">已通过</text>
						<text v-if="item.status == 11">未通过</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<uni-load-more :status="status" :contentText="contentText" v-if="!isEmpty"></uni-load-more>	
		<!-- 暂无数据 -->
		<view v-if="isEmpty" class="noData">
			<u-empty text="暂无数据哦~" mode="favor"></u-empty>
		</view>
		<editModal :show="modalShow" :name="userName" @close="modalClose" @code="getCode"></editModal>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'	
	import editModal from '../../components/Modal/editModal.vue'
	export default {
		name:'myCustomer',
		components:{
			uniLoadMore,editModal
		},
		data(){
			return{
				isEmpty:false,
				page:0,
				hasFlag:true,
				status:'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				userName:'',
				modalShow:false,
				clientList:[],
				editId:'',//修改客户的id
				editIndex:'',//修改客户的index
			}
		},
		methods:{
			// 获取我的客户列表
			async getMyClient(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page
				let res = await this.$fetch(this.$api.myClientList,{pageNum:this.page,pageSize:10},'GET')
				console.log(res);
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.clientList = [...this.clientList,...res.rows]
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
			},
			// 查看跟进记录
			handleToCheckRecord(id){
				uni.navigateTo({
					url:'followUp?id='+id
				})
			},
			// 关闭弹窗
			modalClose(data){
				this.modalShow = data
			},
			// 获取输入的名称
			async getCode(data){
				console.log(data);
				if(!data){
					uni.showToast({icon:'none',title:'名称不能为空'})
				}else{
					let res = await this.$fetch(this.$api.changeClientName,{name:data,id:this.editId},'GET')
					console.log(res)
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if(res.code == 0){
						this.modalShow = false
						this.clientList[this.editIndex].name = data
					}
				}
			},
			// 唤出修改弹窗
			handleToEdit(id,index,name){
				this.editId = id
				this.editIndex = index
				this.userName = name
				this.modalShow = true
			}
		},
		onShow() {
			this.getMyClient()
		},
		onReachBottom() {
			if(this.hasFlag){
				this.getMyClient()
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
			this.getMyClient();
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
	.client{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.client-list{
		width: 720rpx;
		height: 130rpx;
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		
		.client-avatar{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
			
			image{
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
		}
		
		.client-info{
			width: 600rpx;
			margin-left: 30rpx;
			height: 130rpx;
			display: flex;
			border-bottom: 2rpx solid #F0F0F0;
			
			.client-detail{
				width: 460rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				
				& > view:first-child{
					width: 460rpx;
					font-size: 28rpx;
					color: #4A4A4A;
					display: flex;
					align-items: center;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					margin-top: 20rpx;
					view{
						width: 50rpx;
						font-size: 14px;
						color: #874A98;
						padding: 0 15rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid #874A98;
						margin-left: 30rpx;
						border-radius: 4rpx;
					}
				}
				
				& > view:nth-child(2){
					width: 460rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #9B9B9B;
				}
			}
			
			.client-status{
				width: 110rpx;
				height: 46rpx;
				line-height: 46rpx;
				font-size: 24rpx;
				text-align: center;
				margin-top: 20rpx;
				border-radius: 4rpx;
			}
			
			.blue{
				color: #4A90E2;
				border: 2rpx solid #4A90E2;
			}
			.red{
				color: #D0021B;
				border: 2rpx solid #D0021B;
			}
			.green{
				color: #55A900;
				border: 2rpx solid #55A900;
			}
			.orange{
				color: #FE7838;
				border: 2rpx solid #FE7838;
			}
		}
	}
</style>
