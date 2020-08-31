<template>
	<view>
		<view class="favor-list">
			<tui-swipe-action :actions="actions" @click="handlerButton" :params="item" v-for="(item,index) in favoritesList" :key="index">
				<template v-slot:content>
					<view class="favor-item" @click="handleToFavor(item.favoriteId,item.name)">
						<view>{{item.name}}</view>
						<view><image src="../../static/icon/DisclosureIndicator.png" mode=""></image></view>
					</view>
				</template>
			</tui-swipe-action>
		</view>
		<view class="add-favor" @click="handleShowAdd">
			<image src="../../static/icon/new/17.png" mode=""></image>
			<text>新建收藏夹</text>
		</view>
		<u-popup v-model="addShow" mode="bottom" @close="handleCloseAdd">
			<view class="add-favorites">
				<view class="add-favorites-title">
					<view @click="handleCloseAdd"><image src="../../static/icon/new/14.png" mode=""></image></view>
					<view>新建收藏夹</view>
					<view><text @click="handleAddFavor">完成</text></view>
				</view>
				<view class="add-input">
					<input type="text" focus="true" placeholder="请输入收藏夹名称" placeholder-class="placeHolderClass" v-model="favoritesName">
				</view>
			</view>
		</u-popup>
		<u-popup v-model="editShow" mode="bottom" @close="handleCloseEdit">
			<view class="add-favorites">
				<view class="add-favorites-title">
					<view @click="handleCloseEdit"><image src="../../static/icon/new/14.png" mode=""></image></view>
					<view>编辑收藏夹</view>
					<view><text @click="handleEditFavor">完成</text></view>
				</view>
				<view class="add-input">
					<input type="text" focus="true" placeholder="请输入收藏夹名称" placeholder-class="placeHolderClass" v-model="editFavoritesName">
				</view>
			</view>
		</u-popup>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import tuiSwipeAction from '../../components/tui-swipe-action/tui-swipe-action.vue'
	export default {
		data() {
			return {
				actions: [
					{
						name: '删除',
						color: '#fff',
						fontsize: 30, //单位rpx
						width: 70, //单位px
						background: '#FD3B31'
					},
					{
						name: '编辑',
						color: '#fff',
						fontsize: 30,
						width: 70,
						background: '#5677fc'
					},
				],
				favoritesList:[],
				addShow:false,
				favoritesName:'',
				editShow:false,
				editFavoritesName:'',
				favoriteId:'',
				manager:''
			};
		},
		components:{
			tuiSwipeAction
		},
		methods:{
			handlerButton(e) {
				console.log(e);
				let index = e.index;
				let item = e.item;
				if(index == 0){
					this.removeFavor(item.favoriteId)
				}else if(index == 1){
					this.favoriteId = item.favoriteId
					this.editFavoritesName = item.name
					this.handleShowEdit()
				}
			},
			// 获取收藏夹列表
			async getFavorList(){
				let res = await this.$fetch(this.$api.favoriteList,{},'GET')
				console.log(res);
				this.favoritesList = res.data
			},
			// 删除收藏夹
			async removeFavor(id){
				let res = await this.$fetch(this.$api.removeFavorite,{favoriteId:id},'GET')
				console.log(res);
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					this.getFavorList()
				}
			},
			// 显示新建收藏夹
			handleShowAdd(){
				this.addShow = true
				this.favoritesName = ''
			},
			// 关闭添加收藏夹
			handleCloseAdd(){
				this.addShow = false
				this.favoritesName = ''
			},
			// 添加收藏夹
			async handleAddFavor(){
				let res = await this.$fetch(this.$api.addFavorite,{name:this.favoritesName},'GET')
				console.log(res);
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					this.addShow = false
					this.favoritesName = ''
					this.getFavorList()
				}
			},
			// 显示编辑收藏夹
			handleShowEdit(){
				this.editShow = true
			},
			// 关闭编辑收藏夹
			handleCloseEdit(){
				this.editShow = false
				this.editShowedit
			},
			// 完成编辑收藏夹
			async  handleEditFavor(){
				let res = await this.$fetch(this.$api.editFavorite,{favoriteId:this.favoriteId,name:this.editFavoritesName},'GET')
				console.log(res);
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					this.editShow = false
					this.editFavoritesName = ''
					this.favoriteId = ''
					this.getFavorList()
				}
			},
			// 跳转到收藏夹详情
			handleToFavor(id,name){
				console.log(id);
				uni.navigateTo({
					url:'myRecord?type=1&name='+name+'&id='+id+'&manager='+this.manager
				})
			}
		},
		onLoad() {
			if(uni.getStorageSync('isAdmin')){
				this.manager = uni.getStorageSync('userId')
			}
			this.getFavorList()
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.favor-list{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		.favor-item{
			width: 720rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			margin-left: 30rpx;
			border-bottom: 2rpx solid #F5F5F5;
			& > view:first-child{
				width: 600rpx;
				font-size: 14px;
				color: #030303;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: bold;
			}
			& > view:last-child{
				width: 120rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				image{
					width: 16rpx;
					height: 26rpx;
					margin-right: 30rpx;
				}
			}
		}
	}
	.add-favor{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #A6A6A6;
		height: 100rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
		image{
			width: 26rpx;
			height: 26rpx;
			margin-right: 20rpx;
		}
	}
	.add-favorites{
		width: 750rpx;
		height: 560rpx;
		display: flex;
		flex-direction: column;
		.add-favorites-title{
			width: 750rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			background: #F0F0F0;
			& > view:first-child{
				flex: 1;
				display: flex;
				align-items: center;
				image{
					width: 24rpx;
					height: 42rpx;
					margin-left: 30rpx;
				}
			}
			& > view:nth-child(2){
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 17px;
				color: #030303;
				font-weight: bold;
			}
			& > view:last-child{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 14px;
				color: #007AFF;
				letter-spacing: -0.34px;
				text{
					margin-right: 30rpx;
				}
			}
		}
		.add-input{
			width: 720rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #030303;
			border-bottom: 2rpx solid #F5F5F5;
			margin-left: 30rpx;
			input{
				flex: 1;
			}
		}
	}
</style>
