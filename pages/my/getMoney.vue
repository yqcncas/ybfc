<template>
	<view>
		<!-- 卡号信息 -->
		<view class="card-info">
			<view class="card-content">
				<view class="card-tit"><text>开户姓名</text></view>
				<view class="card-input"><input type="text"  placeholder="请输入开户姓名" placeholder-class="placeholderClass" v-model="cardName"/></view>
			</view>
			<view class="card-content">
				<view class="card-tit"><text>卡号</text></view>
				<view class="card-input"><input type="text"  placeholder="请输入卡号" placeholder-class="placeholderClass" v-model="cardId"/></view>
			</view>
			<view class="card-content">
				<view class="card-tit"><text>支行名称</text></view>
				<view class="card-input"><input type="text"  placeholder="请输入支行名称" placeholder-class="placeholderClass" v-model="cardBank"/></view>
			</view>
		</view>
		<!-- 金额与规则 -->
		<view class="moneyAndRule">
			<view class="getMoney">
				<view class="getMoney-tit"><text>提现金额</text></view>
				<view class="Get">
					<view class="getMoney-input"><input type="number" v-model="moneyGet" adjust-position="true"/></view>
				</view>
			</view>
			<view class="Rule">
				<view class="isGet">
					<view class="get-icon"><image src="../../static/icon/zhuyi.png" mode=""></image></view>
					<view class="canGet"><text class="isGet-tit">可提现金额</text><text class="isGet-Money">¥{{money}}</text></view>
				</view>
			</view>
		</view>
		<!-- 提现按钮 -->
		<view class="bottom-button">
			<button @click="getMoney">确认提现</button>
		</view>
		<!-- 提现成功 -->
		<view class="Modal" v-if="show">
			<view class="Modal-img"><image src="http://img.bajiaostar.com/FrRbpoiY3E3_RYsf1UnPdUtUwTSB" mode="widthFix"></image></view>
			<view class="Modal-tit"><text>提现申请提交成功</text></view>
			<view class="Modal-content"><text>提现金额将在3-5个工作日内到账</text></view>
			<view class="Modal-button" @tap="handleClose"><text>确定</text></view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}"  catchtouchmove="true" @tap="handleClose"></view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		name:'getMoney',
		data(){
			return{
				money:'',
				moneyGet:'',
				cardBank:'',
				cardId:'',
				cardName:'',
				show:false
			}
		},
		methods:{
			// 提现
			async getMoney(){
				let res = await this.$fetch(this.$api.agentGetMoney,{cardBank:this.cardBank,cardId:this.cardId,cardName:this.cardName,money:this.moneyGet})
				this.show = true
			},
			// 关闭提现成功弹窗
			handleClose(){
				this.show = false
			}
		},
		onLoad(options) {
			this.money = options.reward
		},
		onShow() {
			
		}
	}
</script>

<style>
	page{
		background: #F1F1F1;
	}
	.card-info{
		margin-top: 10rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.card-content{
		margin-left: 30rpx;
		width: 720rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
	}
	.card-content+.card-content{
		border-top: 2rpx solid #F1F1F1;
	}
	.card-tit{
		font-size: 28rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #A6A6A6;
		letter-spacing: -0.68rpx;
		text-align: justify;
		width: 110rpx;
	}
	.card-input{
		width: 572rpx;
		height: 100rpx;
		font-size: 32rpx;
		color: #5B5B5B;
		letter-spacing: -0.78rpx;
		text-align: left;
		margin-left: 40rpx;
		line-height: 100rpx;
	}
	.card-input input{
		width: 572rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.placeholderClass{
		font-size: 28rpx;
		color: #A6A6A6;
		letter-spacing: -0.68rpx;
		text-align: left;
	}
	/* 提现与规则 */
	.moneyAndRule{
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
	}
	.getMoney{
		margin-left: 30rpx;
		margin-top: 30rpx;
		width: 690rpx;
		/* height: 218rpx; */
		border-bottom: 2rpx solid #F1F1F1;
	}
	.getMoney-tit{
		font-size: 28rpx;
		color: #5B5B5B;
		letter-spacing: -0.78rpx;
		text-align: justify;
		color: #A6A6A6;
	}
	.Get{
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		margin-bottom: 20rpx;
	}
	.money-icon{
		font-size: 48rpx;
		color: #5B5B5B;
		letter-spacing: -1.16rpx;
		margin-right: 20rpx;
	}
	.getMoney-input{
		width: 600rpx;
		height: 60rpx;
		margin-top: 20rpx;
		font-size: 60rpx;
		color: #5B5B5B;
		letter-spacing: -1.44rpx;
	}
	.getMoney-input input{
		width: 600rpx;
		height: 60rpx;
	}
	.Rule{
/* 		margin-top: 20rpx; */
		margin-left: 30rpx;
		display: flex;
		height: 90rpx;
		flex-direction: column;
	}
	.isGet{
		display: flex;
		height: 90rpx;
		flex-direction: row;
	}
	.canGet{
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		flex-direction: row;
	}
	.get-icon{
		width: 30rpx;
		height: 90rpx;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
	}
	.get-icon image{
		width: 30rpx;
		height: 30rpx;
	}
	.isGet-tit{
		font-size: 24rpx;
		color: #5B5B5B;
		letter-spacing: -0.58rpx;
		text-align: justify;
		margin-right: 10rpx;
	}
	.isGet-Money{
		font-size: 28rpx;
		color: #FE9E2E;
		letter-spacing: 0;
		text-align: justify;
	}
	/* 提现按钮 */
	.bottom-button{
		margin-top: 150rpx;
		width: 690rpx;
		height: 90rpx;
		margin-left: 30rpx;
	}
	.bottom-button button{
		background-color: #874A98;
		border-radius: 8rpx;
		width: 690rpx;
		height: 90rpx;
		font-size: 28rpx;
		line-height: 90rpx;
		color: #FFFFFF;
	}
	/* 提现成功 */
	.Modal{
		width: 600rpx;
		height: 710rpx;
		position: fixed;
		z-index: 10;
		top: 190rpx;
		left: 76rpx;
		right: 74rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.Modal-img{
		margin-top: 80rpx;
		width: 600rpx;
		height: 244rpx;
		display: flex;
		align-items: center;
	}
	.Modal-img image{
		width: 600rpx;
		height: 244rpx;
	}
	.Modal-tit{
		margin-top: 30rpx;
		width: 600rpx;
		text-align: center;
		font-size: 40rpx;
		color: #5B5B5B;
		font-weight: bold;
	}
	.Modal-content{
		margin-top: 20rpx;
		font-size: 28rpx;
		width: 600rpx;
		text-align: center;
		color: #848484;
	}
	.Modal-button{
		width: 360rpx;
		height: 90rpx;
		margin: 50rpx 120rpx 80rpx 120rpx;
		font-size: 28rpx;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		background: #FE9E2E;
		border-radius: 45rpx;
	}
	/* 遮罩 */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	
	.maskShow {
		opacity: 1;
		visibility: visible;
	}
</style>
