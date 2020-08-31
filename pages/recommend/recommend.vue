<template>
	<view>
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				我要推荐
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'rgba(255,255,255,0.40)',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<view class="recommend-background">
			<image src="http://img.bajiaostar.com/Fox3pvqPRwZbh56wXkw1sKrJ7VQy" mode=""></image>
		</view>
		<!-- 推荐表单 -->
		<view class="recommend">
			<view class="recommend-title">我要推荐</view>
			<view class="recommend-item">
				<view><text>客户姓名</text></view>
				<view><input type="text" placeholder="请输入客户姓名" placeholder-class="placeholderClass" v-model="name"></view>
			</view>
			<view class="recommend-item">
				<view><text>手机号码</text></view>
				<view><input type="number" placeholder="请输入手机号码" placeholder-class="placeholderClass" v-model="tel"></view>
			</view>
			<view class="recommend-item">
				<view><text>意向楼盘</text></view>
				<view><input type="text" placeholder="请输入详细地址" placeholder-class="placeholderClass" v-model="address"></view>
			</view>
			<view class="recommend-item">
				<view><text>跟办顾问</text></view>
				<view>
					<picker :range="adviserList" @change="adviserChange" :value="index" range-key="userName">
						<view class="choose">
							<view  :class="adviser == '请选择'?'work':''"><text>{{adviser}}</text></view>
						</view>
					</picker>
				</view>
			</view>
			<view class="recommend-textarea">
				<view>推荐内容</view>
				<view>
					<textarea v-model="adviserContent" placeholder="此处为推荐客户买房入口。凡是推荐提交的客户信息在英棒房产公司任意一家门店成交，即可享受英棒房产公司所得总佣金10%作为奖励"  placeholder-class="placeHolderClass"/>
				</view>
			</view>
			<view class="recommend-button">
				<view @tap="sumbitInfo">提交信息</view>
			</view>
			<!-- #ifdef H5 -->
			<getApp></getApp>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'recommend',
		data() {
			return {
				name: '',
				tel: '',
				address: '',
				adviser: '请选择',
				adviserId: '',
				adviserList: [],
				page:1,
				adviserContent:'',
				isSumbit:true,
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0,
			}
		},
		methods: {
			// 选择顾问
			adviserChange(e) {
				for (var i in this.adviserList) {
					if (i == e.target.value) {
						this.adviserId = this.adviserList[i].userId;
						this.adviser = this.adviserList[i].userName;
					}
				}
			},
			// 提交信息
			async sumbitInfo(){
				if(!this.name){
					uni.showToast({
						icon:'none',
						title:'请填写客户姓名'
					})
					return
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel))){
					uni.showToast({
						icon:'none',
						title:'手机号码有误，请确认后重新填写'
					})
					return
				}
				if(!this.address){
					uni.showToast({
						icon:'none',
						title:'请填写详细地址'
					})
					return
				}
				if(!this.adviserId){
					uni.showToast({
						icon:'none',
						title:'请选择顾问'
					})
					return
				}
				if(!this.isSumbit) return
				this.isSumbit = false
				// 调用接口
				let res = await this.$fetch(this.$api.clientAdd,{name:this.name,mobile:this.tel,area:this.address,managerId:this.adviserId,managerName:this.adviser,remark:this.adviserContent})
				console.log(res);
				setTimeout(()=>{
					this.isSumbit = true
				},500)
				if(res.code == 0){
					this.name = ''
					this.tel = ''
					this.address = ''
					this.adviserId = ''
					this.adviser = '请选择'
					this.adviserContent = ''
					uni.showToast({
						icon:'none',
						title:'推荐成功，等待审核'
					})
				}else{
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}
			},
			// 获取经纪人列表 
			async getAgentList(){
				let res = await this.$fetch(this.$api.agentList,{pageNum:this.page,pageSize:9999},'GET')
				this.adviserList = res.rows
			},
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
				}
			})
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			// this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
		onShow() {
			if(!uni.getStorageSync('isToken')){
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
			this.getAgentList()
		}
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";	
	page {
		background-image: linear-gradient(45deg, #7618EA 0%, #761CF0 100%);
	}
	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}
	
	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 11;
	}
	
	
	
	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}
	
	.tui-icon-ml {
		margin-left: 20upx;
	}
	
	.tui-icon {
		border-radius: 16px;
	}
	
	
	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}
	
	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}
	.recommend-background{
		width: 750rpx;
		height: 1024rpx;
		image{
			width: 750rpx;
			height: 1024rpx;
		}
	}
	.recommend{
		width: 690rpx;
		position: absolute;
		padding: 20rpx 0;
		top: 672rpx;
		left: 30rpx;
		z-index: 9;
		// height: 1034rpx;
		background: #FFFFFF;
		box-shadow: inset 0 1px 19px 0 rgba(121,17,199,0.50);
		border-radius: 17px;
		margin-bottom: 30rpx;
		.recommend-title{
			width: 690rpx;
			margin: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 17px;
			color: #030303;
			letter-spacing: -0.41px;
			font-weight: bold;
		}
		.recommend-item{
			width: 590rpx;
			margin: 0 50rpx 30rpx 50rpx;
			border: 4rpx solid rgba(137,0,255,0.20);
			// background: rgba(198,126,255,0.10);
			border-radius: 2px;
			height: 90rpx;
			display: flex;
			align-items: center;
			& > view:first-child{
				flex: 1;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #7000FF;
				letter-spacing: -0.34px;
				font-weight: bold;
				text{
					margin-left: 30rpx;
				}
			}
			& > view:last-child{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				text-align: right;
				font-size: 14px;
				color: #030303;
				input{
					flex: 1;
					margin-right: 30rpx;
				}
				.choose{
					flex: 1;
					margin-right: 30rpx;
					.work {
						color: #C08FFF;
					}
				}
			}
		}
		.recommend-textarea{
			width: 590rpx;
			margin: 0 50rpx 30rpx 50rpx;
			background: rgba(198,126,255,0.10);
			border-radius: 2px;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				width: 530rpx;
				margin: 26rpx 30rpx 20rpx 30rpx;
				font-size: 14px;
				color: #7000FF;
				letter-spacing: -0.34px;
				font-weight: bold;
			}
			& > view:last-child{
				width: 530rpx;
				margin: 0 30rpx;
				padding-bottom: 30rpx;
				textarea{
					width: 530rpx;
					height: 160rpx;
				}
			}
		}
		.recommend-button{
			width: 690rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 50rpx;
			view{
				width: 590rpx;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #FF57EC;
				border-radius: 4px;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
		}
	}

	.placeholderClass {
		font-size: 14px;
		color: #C08FFF;
	}
	.placeHolderClass{
		color: #C08FFF;
	}
</style>
