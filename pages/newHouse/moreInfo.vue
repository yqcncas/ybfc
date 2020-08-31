<template>
	<view>
		<!-- 头部 -->
		<view class="header">
			<view>
				<text>{{houseInfo.areaName}}</text>
			</view>
			<view>
				<view :class="[{ 'tips-1': labIndex == 0, 'tips-2': labIndex != 0}]" v-for="(it, labIndex) in houseInfo.label" :key="labIndex">
					<text>{{it}}</text>
				</view>
			</view>
			<view class="infolist">
				<view>
					<text>销售状态</text><text v-if="houseInfo.salesStatus == 1">在售</text>
					<text v-if="houseInfo.salesStatus == 2">预售</text><text v-if="houseInfo.salesStatus == 3">停售</text><text v-if="!houseInfo.salesStatus">未知</text>
				</view>
				<view>
					<text>最新开盘</text><text v-if="houseInfo.publish">{{houseInfo.publish}}开盘</text><text v-else>未知</text>
				</view>
				<view>
					<text>交房时间</text><text v-if="houseInfo.handTime">预计{{houseInfo.handTime}}交房</text><text v-else>未知</text>
				</view>
				<view>
					<text>楼盘地址</text><text v-if="houseInfo.address">{{houseInfo.address}}</text><text v-else>未知</text>
				</view>
			</view>
		</view>
		<!-- 销售信息 -->
		<view class="saleInfo">
			<view class="title">
				<text>销售信息</text>
			</view>
			<view class="infolist">
				<view>
					<text>参考单价</text><text v-if="houseInfo.price">住宅均价{{houseInfo.price}}/m²</text><text v-else></text>
				</view>
				<view>
					<text>在售户型</text>
					<text v-if="houseInfo.houseType">{{houseInfo.houseType}}</text>
					<text v-else></text>
				</view>
				<view>
					<text>售楼地址</text>
					<text v-if="houseInfo.salesAddress">{{houseInfo.salesAddress}}</text>
					<text v-else></text>
				</view>
			</view>
		</view>
		<!-- 建筑规划 -->
		<view class="saleInfo">
			<view class="title"><text>建筑规划</text></view>
			<view class="infolist">
				<view>
					<text>建筑类型</text><text v-if="houseInfo.buildingType">{{houseInfo.buildingType}}</text><text v-else></text>
				</view>
				<view>
					<text>产权年限</text><text v-if="houseInfo.premisesPermit">{{houseInfo.premisesPermit}}</text><text v-else></text>
				</view>
				<view>
					<text>装修标准</text><text v-if="houseInfo.renovation == 1">精装修</text><text v-if="houseInfo.renovation == 2">毛坯房</text>
					<text v-if="!houseInfo.renovation">未知</text><text v-if="houseInfo.renovation == 3">普通装修</text>
				</view>
				<view>
					<text style="letter-spacing: 13.8rpx;">开发商</text><text v-if="houseInfo.developers">{{houseInfo.developers}}</text><text v-else></text>
				</view>
				<view>
					<text style="letter-spacing: 13.8rpx;">容积率</text><text v-if="houseInfo.plotRatio">{{houseInfo.plotRatio}}%</text><text v-else></text>
				</view>
				<view>
					<text style="letter-spacing: 13.8rpx;">绿化率</text><text v-if="houseInfo.greeningRate">{{houseInfo.greeningRate}}%</text><text v-else></text>
				</view>
				<view>
					<text>规划用户</text><text v-if="houseInfo.planningUnit">{{houseInfo.planningUnit}}户</text><text v-else></text>
				</view>
				<view>
					<text>占地面积</text><text v-if="houseInfo.areaCovered">{{houseInfo.areaCovered}}m²</text><text v-else></text>
				</view>
				<view>
					<text>建筑面积</text><text v-if="houseInfo.builtArea">{{houseInfo.builtArea}}m²</text><text v-else></text>
				</view>
				<view>
					<text>工程进度</text><text v-if="houseInfo.jobSchedule">{{houseInfo.jobSchedule}}</text><text v-else></text>
				</view>
				<view>
					<text style="letter-spacing: 55rpx;">层高</text><text v-if="houseInfo.floorHeight">{{houseInfo.floorHeight}}米</text>
					<text v-else>未知</text>
				</view>
			</view>
		</view>
		<!-- 物业公司 -->
		<view class="saleInfo">
			<view class="title">物业公司</view>
			<view class="infolist">
				<view>
					<text>物业公司</text><text v-if="houseInfo.proCompany">{{houseInfo.proCompany}}</text><text v-else></text>
				</view>
				<view>
					<text>物业类型</text><text v-if="houseInfo.type">{{houseInfo.type}}</text><text v-else></text>
				</view>
				<view>
					<text style="letter-spacing: 15rpx;">车位数</text><text v-if="houseInfo.parkNum">{{houseInfo.parkNum}}</text><text v-else></text>
				</view>
				<view>
					<text style="letter-spacing: 15rpx;">物业费</text><text v-if="houseInfo.propertyFee">{{houseInfo.propertyFee}}元/年</text><text v-else></text>
				</view>
			</view>
		</view>
		<!-- 许可证 -->
		<view class="saleInfo">
			<view class="title">预售许可证</view>
			<view class="infolist">
				<view>
					<text>预售证号</text><text v-if="houseInfo.cert">{{houseInfo.cert}}</text><text v-else></text>
				</view>
				<view>
					<text>发证时间</text><text v-if="houseInfo.certTime">{{houseInfo.certTime}}</text><text v-else></text>
				</view>
				<view>
					<text>绑定楼栋</text><text v-if="houseInfo.boundBuilding">{{houseInfo.boundBuilding}}</text><text v-else></text>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
		<!-- 猜你喜欢 -->
		<Guess :houseList="homeList" :houseType="houseType"></Guess>
	</view>
</template>

<script>
	import Guess from '../../components/Guess/Guess.vue'	
	export default {
		name:'moreInfo',
		components:{
			Guess
		},
		data(){
			return{
				houseInfo:[],
				homeList:[],
				houseType:''
			}
		},
		methods:{
			// 获取新房详情
			async getHouseInfo(){
				let res = await this.$fetch(this.$api.areaInfo,{areaId:this.houseId},'GET')
				if(res.data.newArea.publish){
					res.data.newArea.publish = this.$dayjs(res.data.newArea.publish).format('YYYY年MM月')
				}
				if(res.data.newArea.handTime){
					res.data.newArea.handTime = this.$dayjs(res.data.newArea.handTime).format('YYYY年MM月')
				}
				if(res.data.newArea.certTime){
					res.data.newArea.certTime = this.$dayjs(res.data.newArea.certTime).format('YYYY-MM-DD')
				}
				this.houseInfo = res.data.newArea
				if(this.houseInfo.label){
					this.houseInfo.label = this.houseInfo.label.split(',')
				}
				// this.houseInfo.publish = this.$dayjs(this.houseInfo.publish).format('YYYY年MM月')
				// this.houseInfo.handTime = this.$dayjs(this.houseInfo.handTime).format('YYYY年MM月')
				// this.houseInfo.certTime = this.$dayjs(this.houseInfo.certTime).format('YYYY-MM-DD')
				res.data.guess.forEach(item =>{
					if (item.picUrl) {
						item.picUrl = item.picUrl.split(',');
					}
					if (item.label) {
						item.label = item.label.split(',');
					}
				})
				this.homeList = res.data.guess
			},
		},
		onLoad(options) {
			this.houseId = options.houseId
			this.houseType = options.houseType
			this.getHouseInfo()
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.header{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			margin: 30rpx 30rpx 0 30rpx;
			width: 690rpx;
			font-size: 36rpx;
			color: #5B5B5B;
			font-weight: bold;
		}
		
		& > view:nth-child(2){
			margin: 30rpx 30rpx 10rpx 30rpx;
			width: 690rpx;
			display: flex;
			align-items: center;
			
			.tips-1{
				background: #48D2AB;
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: justify;
				margin-right: 30rpx;
				height: 36rpx;
				line-height: 36rpx;
				padding: 0 10rpx;
			}
			
			.tips-2{
				background: rgba(74,144,226,0.15);
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #4A90E2;
				letter-spacing: 0;
				text-align: justify;
				margin-right: 30rpx;
				height: 36rpx;
				line-height: 36rpx;
				padding: 0 10rpx;
			}
		}
	}
	.infolist{
		margin: 30rpx 30rpx 0 30rpx;
		width: 690rpx;
		display: flex;
		flex-direction: column;
		
		view{
			width: 690rpx;
			display: flex;
			margin-bottom: 20rpx;
			
			& > text:first-child{
				width: 112rpx;
				font-size: 28rpx;
				color: #A6A6A6;
				margin-right: 20rpx;
				letter-spacing: 0;
				white-space: nowrap;
			}
			
			& > text:nth-child(2){
				width: 558rpx;
				font-size: 28rpx;
				color: #5B5B5B;
				font-weight: bold;
			}
		}
	}
	.saleInfo{
		width: 100%;
		background: #FFFFFF;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
	}
	.title{
		width: 720rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 28rpx;
		color: #A6A6A6;
		border-bottom: 2rpx solid #F0F0F0;
		margin-left: 30rpx;
	}
</style>
