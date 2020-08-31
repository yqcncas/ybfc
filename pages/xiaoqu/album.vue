<template>
	<view>
		<view class="pic1" v-if="isPic1">
			<view>
				<text>分布图({{pic1Num}})</text>
			</view>
			<view>
				<view v-for="(item,index) in pic1" :key="index" @click="checkPic1(index)">
					<image :src="item" mode=""></image>
				</view>
			</view>
		</view>
		<view class="pic1" v-if="isPic2">
			<view>
				<text>户型图({{pic2Num}})</text>
			</view>
			<view>
				<view v-for="(item,index) in pic2" :key="index" @click="checkPic2(index)">
					<image :src="item" mode=""></image>
				</view>
			</view>
		</view>
		<view class="pic1" v-if="isPic3">
			<view>
				<text>环境图({{pic3Num}})</text>
			</view>
			<view>
				<view v-for="(item,index) in pic3" :key="index" @click="checkPic3(index)">
					<image :src="item" mode=""></image>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name:'album',
		data(){
			return{
				areaId:'',
				pic1Num:'',
				pic2Num:'',
				pic3Num:'',
				pic1:[],
				pic2:[],
				pic3:[],
				isPic1:'',
				isPic2:'',
				isPic3:''
			}
		},
		methods:{
			// 获取相册
			async getAlbum(){
				let res = await this.$fetch(this.$api.areaDetail,{areaId:this.areaId},'GET')
				if(res.data.picUrl1){
					let data = res.data.picUrl1.split(',')
					this.pic1Num = data.length
					data.forEach(item =>{
						this.pic1.push(item)
					})
					this.isPic1 = true
				}else{
					this.isPic1 = false
				}
				if(res.data.picUrl2){
					let data = res.data.picUrl2.split(',')
					this.pic2Num = data.length
					data.forEach(item =>{
						this.pic2.push(item)
					})
					this.isPic2 = true
				}else{
					this.isPic2 = false
				}
				if(res.data.picUrl3){
					let data = res.data.picUrl3.split(',')
					this.pic3Num = data.length
					data.forEach(item =>{
						this.pic3.push(item)
					})
					this.isPic3 = true
				}else{
					this.isPic3 = false
				}
			},
			// 查看分布图
			checkPic1(e){
				uni.previewImage({
					urls:this.pic1,
					current:e,
					loop:true
				})
			},
			// 查看户型图
			checkPic2(e){
				uni.previewImage({
					urls:this.pic2,
					current:e,
					loop:true
				})
			},
			// 查看环境图
			checkPic3(e){
				uni.previewImage({
					urls:this.pic3,
					current:e,
					loop:true
				})
			},
		},
		onLoad(options) {
			this.areaId = options.id
			this.getAlbum()
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.pic1{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding: 30rpx 30rpx;
		margin-bottom: 30rpx;
		
		& > view:first-child{
			width: 690rpx;
			font-size: 28rpx;
			color: #5B5B5B;
		}
		
		& > view:nth-child(2){
			width: 690rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			
			& > view{
				margin-left: 15rpx;
				width: 210rpx;
				height: 210rpx;
				border-radius: 4rpx;
				margin-top: 18rpx;
				
				& > image{
					width: 210rpx;
					height: 210rpx;
					border-radius: 4rpx;
				}
			}
		}
	}
</style>
