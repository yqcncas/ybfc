<template>
	<view>
		<view class="header">
			<!-- 本息本金切换 -->
			<view class="header-top">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" :backgroundColor="activeBgColor" @clickItem="onClickItem" />
			</view>
			<!-- 计算结果 -->
			<view class="header-mid" v-if="current == 0">
				<view class="mid-left">
					<view class="mid-left-tit"><text>每月月供参考（元）</text></view>
					<view class="mid-left-content"><text>{{yg1}}</text></view>
				</view>
			</view>			
			<view class="header-mid" v-if="current == 1">
				<view class="mid-left">
					<view class="mid-left-tit"><text>每月月供参考（元）</text></view>
					<view class="mid-left-content"><text>{{yg2}}</text></view>
				</view>
				<view class="mid-right">
					<view class="mid-right-tit"><text>每月递减（元）</text></view>
					<view class="mid-left-content"><text>{{dijian}}</text></view>
				</view>
			</view>
			<view class="header-bottom">
				<view class="bottom-left">
					<view class="bottom-left-tit"><text>支付利息（元）</text></view>
					<view class="bottom-left-content" v-if="current == 0"><text>{{lx1}}</text></view>
					<view class="bottom-left-content" v-if="current == 1"><text>{{lx2}}</text></view>
				</view>
				<view class="bottom-right">
					<view class="bottom-right-tit"><text>还款总额（元）</text></view>
					<view class="bottom-right-content" v-if="current == 0"><text>{{zong1}}</text></view>
					<view class="bottom-right-content" v-if="current == 1"><text>{{zong2}}</text></view>
				</view>
			</view>
		</view>
		<!-- 还款详情 -->
		<view class="Detail-tit">
			<text v-if="current == 0">等额本息还款详情</text>
			<text v-if="current == 1">等额本金还款详情</text>
		</view>
		<view class="Detail-info">
			<view class="info-list" @click="chooseLoan">
				<view class="info-tit"><text>贷款类型</text></view>
				<view class="info-content"><text>{{loanType}}</text></view>
				<view class="info-right"><image src="../../static/icon/DisclosureIndicator.png"></image></view>
			</view>
			<view class="info-list" v-if="loanTypeId !=2">
				<view class="info-tit-2"><text>商贷金额（万）</text></view>
				<view class="info-content-2"><input type="text" placeholder="请输入金额" placeholder-class="placeholderClass" v-model="money1"></view>
			</view>
			<view class="info-list" v-if="loanTypeId !=1">
				<view class="info-tit-2"><text>公积金贷款金额（万）</text></view>
				<view class="info-content-2"><input type="text" placeholder="请输入金额" placeholder-class="placeholderClass" v-model="money2"></view>
			</view>			
			<view class="info-list" @click="chooseYear">
				<view class="info-tit"><text>期限（年）</text></view>
				<view class="info-content">{{year}}</view>
				<view class="info-right"><image src="../../static/icon/DisclosureIndicator.png"></image></view>
			</view>
			<view class="info-list" v-if="loanTypeId !=2" @click="chooseRate">
				<view class="info-tit"><text>商贷利率（%）</text></view>
				<view class="info-content"><text>{{rate1}}</text></view>
				<view class="info-right"><image src="../../static/icon/DisclosureIndicator.png"></image></view>
			</view>
			<view class="info-list" v-if="loanTypeId !=1" @click="choiceRate">
				<view class="info-tit"><text>公积金贷款利率（%）</text></view>
				<view class="info-content"><text>{{rate2}}</text></view>
				<view class="info-right"><image src="../../static/icon/DisclosureIndicator.png"></image></view>
			</view>			
		</view>
		<view class="tip">
			<view class="tip-content"><text>以上为央行2016年最新公布的贷款基准利率</text></view>
		</view>
		<!-- 贷款类型 -->
		<typeModal :show="typeShow" :radio="typeId" @close="typeClose" @confirm="typeConfirm"></typeModal>
		<!-- 年限选择 -->
		<yearModal :show="yearShow" @close="yearClose" :loan="loanTypeId" :year="year" @choose="yearChoose"></yearModal>
		<!-- 商贷利率选择 -->
		<rateModal :show="rateShow" @close="rateClose" @confirm="rateChoose" :loan="loanTypeId"></rateModal>
		<!-- 公积金利率选择 -->
		<Rate :show="showRate" @close="closeRate" @confirm="rateChoice" :loan="loanTypeId"></Rate>
		<!-- 计算按钮 -->
		<view class="button" @click="compute">
			<text>计算</text>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import typeModal from '@/components/Modal/typeModal.vue'
	import yearModal from '@/components/Modal/yearModal.vue'
	import rateModal from '@/components/Modal/rateModal.vue'
	import Rate from '@/components/Modal/rate.vue'
	export default {
		name: 'calculator',
		components: {
			uniSegmentedControl,typeModal,yearModal,rateModal,Rate
		},
		data() {
			return {
				items: [
					'等额本息',
					'等额本金',
				],
				current: 0,
				styleType: 'button'	,
				activeColor:'#A65ABC',
				activeBgColor:'#FFFFFF',
				yg1:'0.00',
				yg2:'0.00',
				dijian:'0.00',
				lx1:'0.00',
				lx2:'0.00',
				zong1:'0.00',
				zong2:'0.00',
				loanType:'商业贷款',
				loanTypeId:1,
				year:5,
				rate1:4.75,
				rate2:2.75,
				typeShow:false,//贷款类型选择模态框
				typeId:'A',
				yearShow:false,//年限选择模态框
				rateShow:false,//商贷利率选择模态框
				showRate:false,//公积金利率选择模态框
				money1:'',
				money2:''
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
			},
			// 选择贷款类型
			chooseLoan(){
				this.typeShow = true
			},
			// 关闭贷款类型选择
			typeClose(data){
				this.typeShow = data;
			},
			// 确认贷款类型
			typeConfirm(data){
				this.typeId = data
				if(this.typeId == 'A'){
					this.loanType = '商业贷款'
					this.loanTypeId = 1
				}else if(this.typeId == 'B'){
					this.loanType = '组合贷款'
					this.loanTypeId = 3
				}else{
					this.loanType = '公积金贷款'
					this.loanTypeId = 2
				}
			},
			// 选择年限
			chooseYear(){
				this.yearShow = true
			},
			// 关闭年限选择模态框
			yearClose(data){
				this.yearShow = data
			},
			// 确认选中年限
			yearChoose(data){
				this.year = data
				this.rate1 = ''
				this.rate2 = ''
			},
			// 选择商贷利率
			chooseRate(){
				this.rateShow = true
			},
			// 关闭商贷利率选择
			rateClose(data){
				this.rateShow = data
			},
			// 确认选中的商贷利率
			rateChoose(data){
				if(this.year  == 1){
					this.rate1 = 4.35 * data
				}else if(this.year > 1 && this.year <= 5){
					this.rate1 = 4.75 * data
				}else if(this.year > 5){
					this.rate1 = 4.90 * data
				}
				this.rate1 = this.rate1.toFixed(2)
			},
			//选择公积金利率
			choiceRate(){
				this.showRate = true
			},
			// 关闭公积金利率选择
			closeRate(data){
				this.showRate = data
			},
			// 确认选中的公积金利率
			rateChoice(data){
				if(this.year >= 1 && this.year <= 5){
					this.rate2 = 2.75 * data
				}else if(this.year > 5){
					this.rate2 = 3.25 * data
				}
				this.rate2 = this.rate2.toFixed(2)
			},
			// 计算
			compute(){
				if(this.loanTypeId == 1){
					if(this.money1 && this.rate1){
						/**
						 * 等额本息
						 */
						//每月月供额=〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数-1〕
						var mouth = parseInt(this.year)*12, //总月份
						    mouthRate = parseFloat(this.rate1)/1200, //月利率
							dkNum = parseFloat(this.money1)*10000; //贷款总额
						// 每月月供
						var yuegong = dkNum * mouthRate * Math.pow((1 + mouthRate),mouth)/(Math.pow((1 + mouthRate),mouth)-1);
						// 总利息=还款月数×每月月供 - 贷款本金
						var totalLixi =mouth * yuegong - dkNum
						// 还款总额=总利息+贷款本金
						var totalPrice = totalLixi + dkNum
						this.yg1 = yuegong.toFixed(2)
						this.lx1 = totalLixi.toFixed(2)
						this.zong1 = totalPrice.toFixed(2)
						
						/**
						 * 等额本金
						 */
						var yhbenjin = 0;//首月还款已还本金金额是0
						//每月应还本金 = 贷款本金÷还款月数
						var everymonthyh = dkNum/mouth
						// 每月月供额 = (贷款本金÷还款月数)+(贷款本金-已归还本金累计)×月利率
						var yuegong2 = everymonthyh + (dkNum -yhbenjin)*mouthRate;
						//每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
						var yuegongdijian = everymonthyh * mouthRate;
						//总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
						var totalLixi2 = ((everymonthyh + dkNum * mouthRate) + dkNum / mouth * (1 + mouthRate)) / 2 * mouth - dkNum;
						//还款总额 总利息+贷款本金
						var totalPrice2 = totalLixi2 + dkNum
						
						this.yg2 = yuegong2.toFixed(2)
						this.lx2 = totalLixi2.toFixed(2)
						this.zong2 = totalPrice2.toFixed(2)
						this.dijian = yuegongdijian.toFixed(2)
					}else{
						uni.showToast({
							icon:'none',
							title:'请填写完整数据'
						})
					}
				}else if(this.loanTypeId == 2){
					if(this.money2 && this.rate2){
						/**
						 * 等额本息
						 */
						//每月月供额=〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数-1〕
						var mouth = parseInt(this.year)*12, //总月份
						    mouthRate = parseFloat(this.rate2)/1200, //月利率
							dkNum = parseFloat(this.money2)*10000; //贷款总额
						// 每月月供
						var yuegong = dkNum * mouthRate * Math.pow((1 + mouthRate),mouth)/(Math.pow((1 + mouthRate),mouth)-1);
						// 总利息=还款月数×每月月供 - 贷款本金
						var totalLixi =mouth * yuegong - dkNum
						// 还款总额=总利息+贷款本金
						var totalPrice = totalLixi + dkNum
						this.yg1 = yuegong.toFixed(2)
						this.lx1 = totalLixi.toFixed(2)
						this.zong1 = totalPrice.toFixed(2)
						
						/**
						 * 等额本金
						 */
						var yhbenjin = 0;//首月还款已还本金金额是0
						//每月应还本金 = 贷款本金÷还款月数
						var everymonthyh = dkNum/mouth
						// 每月月供额 = (贷款本金÷还款月数)+(贷款本金-已归还本金累计)×月利率
						var yuegong2 = everymonthyh + (dkNum -yhbenjin)*mouthRate;
						//每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
						var yuegongdijian = everymonthyh * mouthRate;
						//总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
						var totalLixi2 = ((everymonthyh + dkNum * mouthRate) + dkNum / mouth * (1 + mouthRate)) / 2 * mouth - dkNum;
						//还款总额 总利息+贷款本金
						var totalPrice2 = totalLixi2 + dkNum
						
						this.yg2 = yuegong2.toFixed(2)
						this.lx2 = totalLixi2.toFixed(2)
						this.zong2 = totalPrice2.toFixed(2)
						this.dijian = yuegongdijian.toFixed(2)
					}else{
						uni.showToast({
							icon:'none',
							title:'请填写完整数据'
						})
					}
				}else{
					if(this.money1 && this.rate1 && this.money2 && this.rate2){
						/**
						 * 等额本息
						 */
						//每月月供额=〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数-1〕
						var mouth = parseInt(this.year)*12, //总月份
						    mouthRate = parseFloat(this.rate1)/1200, //商贷月利率
							dkNum = parseFloat(this.money1)*10000, //商贷总额
							mouthRate2 = parseFloat(this.rate2)/1200, //公积金月利率
							dkNum2 = parseFloat(this.money1)*10000;//公积金总额
						// 每月月供
						var yuegong1 = dkNum * mouthRate * Math.pow((1 + mouthRate),mouth)/(Math.pow((1 + mouthRate),mouth)-1);
						var yuegong2 = dkNum2 * mouthRate2 * Math.pow((1 + mouthRate2),mouth)/(Math.pow((1 + mouthRate2),mouth)-1);
						var yuegong = yuegong1 + yuegong2
						// 总利息=还款月数×每月月供 - 贷款本金
						var totalLixi =mouth * yuegong - dkNum - dkNum2
						// 还款总额=总利息+贷款本金
						var totalPrice = totalLixi + dkNum + dkNum2
						this.yg1 = yuegong.toFixed(2)
						this.lx1 = totalLixi.toFixed(2)
						this.zong1 = totalPrice.toFixed(2)
						
						/**
						 * 等额本金
						 */
						var yhbenjin = 0;//首月还款已还本金金额是0
						//每月应还本金 = 贷款本金÷还款月数
						var everymonthyh = dkNum/mouth
						var everymonthyh2 = dkNum2/mouth
						// 每月月供额 = (贷款本金÷还款月数)+(贷款本金-已归还本金累计)×月利率
						var yuegong3 = everymonthyh + (dkNum -yhbenjin)*mouthRate + everymonthyh2 + (dkNum2 -yhbenjin)*mouthRate2
						//每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
						var yuegongdijian = everymonthyh * mouthRate + everymonthyh2 * mouthRate2;
						//总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
						var totalLixi2 = ((everymonthyh + dkNum * mouthRate) + dkNum / mouth * (1 + mouthRate)) / 2 * mouth - dkNum + ((everymonthyh2 + dkNum2 * mouthRate2) + dkNum2 / mouth * (1 + mouthRate2)) / 2 * mouth - dkNum2;
						//还款总额 总利息+贷款本金
						var totalPrice2 = totalLixi2 + dkNum + dkNum2
						
						this.yg2 = yuegong3.toFixed(2)
						this.lx2 = totalLixi2.toFixed(2)
						this.zong2 = totalPrice2.toFixed(2)
						this.dijian = yuegongdijian.toFixed(2)
					}else{
						uni.showToast({
							icon:'none',
							title:'请填写完整数据'
						})
					}
				}
			}
		},
		watch:{
			loanTypeId(){
				this.year = 5
				this.rate1 = ''
				this.rate2 = ''
			}
		}
	}
</script>

<style>
	@import "../../common/main.css";	
	page {
		background: #F7F7F7;
	}
	.header {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 410rpx;
		background-image: url('https://img.bajiaostar.com/FnWTGwXf95wrQJJQVxulDUMSlPHe');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.header-top{
		margin-top: 30rpx;
	}
	/* 计算结果 */
	.header-mid{
		width: 690rpx;
		height: 110rpx;
		margin: 30rpx 30rpx;
		display: flex;
		flex-direction: row;
	}
	.mid-left{
		width: 344rpx;
		height: 110rpx;
		display: flex;
		flex-direction: column;
	}
	.mid-left-tit{
		width: 344rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		letter-spacing: -0.58rpx;
		/* font-weight: 100; */
	}
	.mid-left-content{
		margin-top: 20rpx;
		width: 344rpx;
		height: 66rpx;
		font-size: 48rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
	.mid-right{
		width: 314rpx;
		height: 110rpx;
		display: flex;
		flex-direction: column;
		margin-left: 32rpx;
	}
	.mid-right-tit{
		width: 314rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		letter-spacing: -0.58rpx;
	}
	.mid-right-content{
		margin-top: 20rpx;
		width: 314rpx;
		height: 66rpx;
		font-size: 48rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
	.header-bottom{
		width: 690rpx;
		height: 162rpx;
		display: flex;
		flex-direction: row;
		margin: 0 30rpx;
	}
	.bottom-left{
		width: 344rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		border-right: 2rpx solid #FFFFFF;
	}
	.bottom-left-tit{
		width: 344rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		letter-spacing: -0.58rpx;
	}
	.bottom-left-content{
		margin-top: 20rpx;
		width: 344rpx;
		height: 56rpx;
		font-size: 40rpx;
		letter-spacing: -0.96rpx;
		color: #FFFFFF;
	}
	.bottom-right{
		width: 314rpx;
		height: 100rpx;
		display: flex;
		margin-left: 32rpx;
		flex-direction: column;
	}
	.bottom-right-tit{
		width: 314rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		letter-spacing: -0.58rpx;
	}
	.bottom-right-content{
		margin-top: 20rpx;
		width: 314rpx;
		height: 56rpx;
		font-size: 40rpx;
		letter-spacing: -0.96rpx;
		color: #FFFFFF;
	}
	/* 还款详情 */
	.Detail-tit{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #A2A2A2;
		letter-spacing: -0.68rpx;
		text-align: center;
	}
	.Detail-info{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.info-list{
		display: flex;
		flex-direction: row;
		width: 720rpx;
		margin-left: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.info-tit{
		width: 512rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #A2A2A2;
		font-size: 28rpx;
		letter-spacing: -0.68rpx;
	}
	.info-list+.info-list{
		border-top:2rpx solid #F7F7F7;
	}
	.info-content{
		width: 138rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #5B5B5B;
		letter-spacing: -0.68rpx;
		text-align: right;
	}
	.info-right{
		margin-left: 26rpx;
		width: 14.2rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.info-right image{
		width: 14.2rpx;
		height: 28.4rpx;
	}
	.info-tit-2{
		width: 274rpx;
		height: 100rpx;
		font-size: 28rpx;
		line-height: 100rpx;
		color: #A2A2A2;
		white-space: nowrap;
	}
	.info-content-2{
		width: 416rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-right: 30rpx;
		font-size: 28rpx;
		color: #5B5B5B;
		letter-spacing: -0.68rpx;
		text-align: right;
	}
	.info-content-2 input{
		width: 416rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.placeholderClass{
		font-size: 14px;
		color: #A2A2A2;
	}
	.tip{
		width: 100%;
		margin-bottom: 90rpx;
	}
	.tip-content{
		width: 690rpx;
		margin: 20rpx 30rpx;
		font-size: 24rpx;
		color: #A2A2A2;
		letter-spacing: -0.58rpx;
	}
	/* 计算按钮 */
	.button{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #874A98;
		text-align: center;
		position: fixed;
		bottom: 0;
	}
</style>
