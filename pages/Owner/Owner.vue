<template>
	<view>
		<!-- 头部宣传语 -->
		<view class="Owner-header">
			<view class="header-img">
				<image src="https://img.bajiaostar.com/Fic8cuQLgmwN3vpBtg1A56fAY8hG" mode=""></image>
				<view class="header-tit"><text>你想要的都在这里!</text></view>
				<view class="header-content"><text>源于真诚，行于务实，止于满意！</text></view>
			</view>
		</view>
		<!-- 业主信息表单 -->
		<view class="info-form">
			<view class="info-input">
				<view class="input-tit"><text>业主姓名</text></view>
				<view class="input-content"><input type="text" placeholder="请输入业主姓名" placeholder-class="placeholderClass" v-model="name"></view>
			</view>
			<view class="info-input">
				<view class="input-tit"><text>手机号码</text></view>
				<view class="input-content"><input type="text" placeholder="请输入手机号码" placeholder-class="placeholderClass" v-model="tel"></view>
			</view>
			<view class="info-input">
				<view class="input-tit"><text>物业地址</text></view>
				<view class="input-content"><input type="text" placeholder="请填写详细地址" placeholder-class="placeholderClass" v-model="address"></view>
			</view>
			<view class="info-input">
				<view class="input-tit"><text>物业门牌</text></view>
				<view class="input-content"><input type="text" placeholder="请填写物业门牌" placeholder-class="placeholderClass" v-model="doorNo"></view>
			</view>
			<view class="info-input">
				<view class="input-tit"><text>业务分类</text></view>
				<view class="input-content" @click="chooseWork">
					<view class="work"><text>{{workType}}</text></view>
					<view class="down"><image src="../../static/icon/Group.png" ></image></view>
				</view>
			</view>
		</view>
		<!-- 确认按钮 -->
		<view class="bottom">
			<button @tap="submitInfo">提交信息</button>
		</view>
		<!-- 底部弹层 -->
		<view class="popup" :class="[show ? 'popupShow':'']">
			<view class="popup-content" v-for="(item,index) in workList" :key="index" @tap="workTypeChoose(item.id,item.name)">
				<view class="popup-tit">
					<text :class="{choiceWork:workChoose == item.id}">{{item.name}}</text>
				</view>
				<view class="popup-img">
					<image src="../../static/icon/choose.png" v-if="workChoose == item.id"></image>
				</view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}" @tap="handleClose"></view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'Owner',
		data() {
			return {
				name:'',
				tel:'',
				address:'',
				doorNo:'',
				workType:'请选择',
				workChoose:'',
				workList:[{id:1,name:'出售'},{id:2,name:'出租'}],
				show:false
			}
		},
		methods: {
			handleClose(){
				this.show = false;
			},
			// 显示业务列表
			chooseWork(){
				this.show = true;
			},
			// 选择业务
			workTypeChoose(id,name){
				this.workChoose = id;
				this.workType = name;
				this.show = false;
			},
			// 提交信息
			async submitInfo(){
				if(!this.name){
					uni.showToast({
						icon:'none',
						title:'请填写业主姓名'
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
				if(!this.doorNo){
					uni.showToast({
						icon:'none',
						title:'请填写物业门牌'
					})
					return
				}
				if(!this.workChoose){
					uni.showToast({
						icon:'none',
						title:'请选择业务类型'
					})
					return
				}
				// 调用接口
				let res = await this.$fetch(this.$api.ownerAdd,{address:this.address,name:this.name,mobile:this.tel,doorplate:this.doorNo,type:this.workChoose})
				console.log(res);
				if(res.code == 0){
					this.address = ''
					this.name = ''
					this.tel = ''
					this.doorNo = ''
					this.workChoose = ''
					this.workType = '请选择'
				}
				uni.showToast({
					icon:'none',
					title:res.msg
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F1F1F1;
	}

	/* 头部宣传语 */
	.Owner-header {
		width: 100%;
		height: 360rpx;
	}

	.header-img {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.header-img image {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.header-img .header-tit {
		position: absolute;
		top: -44rpx;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		line-height: 360rpx;
		-webkit-backface-visibility: hidden;
		/* 隐藏旋转元素的背面*/
		backface-visibility: hidden;
		color: #494949;
		text-shadow: 0 2rpx 2rpx rgba(0, 0, 0, 0.50);
		font-size: 34rpx;
		font-weight: bold;
		letter-spacing: -0.82rpx;
	}

	.header-img .header-content {
		position: absolute;
		top: 30rpx;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		line-height: 360rpx;
		-webkit-backface-visibility: hidden;
		/* 隐藏旋转元素的背面*/
		backface-visibility: hidden;
		color: #FFFFFF;
		font-size: 28rpx;
		letter-spacing: -0.68rpx;
	}

	/* 业主信息表单 */
	.info-form {
		margin-top: 30rpx;
		width: 100%;
		height: 500rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}

	.info-input {
		width: 700rpx;
		height: 100rpx;
		margin-left: 30rpx;
		display: flex;
		flex-direction: row;
	}

	.info-input+.info-input {
		border-top: 2rpx solid #F7F7F7;
	}

	.input-tit {
		width: 110rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #A6A6A6;
		letter-spacing: -0.68rpx;
		font-size: 28rpx;
		white-space: nowrap;
	}

	.input-content {
		margin-left: 60rpx;
		width: 550rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #5B5B5B;
		letter-spacing: -0.68rpx;
		font-size: 28rpx;
		display: flex;
	}

	.input-content input {
		width: 550rpx;
		height: 100rpx;
		line-height: 100rpx;
		caret-cloror:#874A98;
	}
	.placeholderClass {
		font-size: 14px;
		color: #A6A6A6;
	}
	.work{
		color: #A6A6A6;
	}
	.down{
		margin-left: 17.8rpx;
		width: 20rpx;
		height: 17.8rpx;
	}
	.down image{
		width: 20rpx;
		height: 17.8rpx;	
	}
	/* 按钮 */
	.bottom{
		width: 690rpx;
		height: 90rpx;
		position: fixed;
		bottom: 40rpx;
		left:30rpx;
		right: 30rpx;
	}
	.bottom button{
		width: 690rpx;
		height: 90rpx;
		background: #874A98;
		border-radius: 8rpx;
		color: #FFFFFF;
		line-height: 90rpx;
		font-size: 28rpx;
	}
	/* 底部弹层 */
	.popup{
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0;
		z-index: 10;
		background: #FFFFFF;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
	}
	.popupShow{
		visibility: visible;
		transform: translate3d(0, 0, 0);
	}
	.popup-content{
		width: 100%;
		height: 100rpx;
		display: flex;
	}
	.popup-tit{
		width: 406rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: right;
		color: #A6A6A6;
		letter-spacing: -0.68rpx;
		font-size: 28rpx;
	}
	.choiceWork{
		color: #874A98;
	}
	.popup-content+.popup-content{
		border-top: 2rpx solid #F7F7F7;
	}
	.popup-img{
		margin-left: 10rpx;
		width: 26rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.popup-img image{
		width: 26rpx;
		height: 26rpx;
	}
	/* 遮罩 */
	.mask{
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
	.maskShow{
		opacity: 1;
		visibility: visible;
	}	
</style>
