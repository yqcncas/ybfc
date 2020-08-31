<template>
	<view>
		<view class="userInfo">
			<view class="avatar" @click="editAvatar">
				<view>
					<image :src="avatar" mode=""></image>
				</view>
				<view>
					<text>修改头像</text>
					<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
				</view>
			</view>
			<view class="info" @click="editUserName">
				<view><text>姓名</text></view>
				<view>
					<text class="name">{{userName}}</text>
					<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
				</view>
			</view>
			<picker mode="selector" :range="sexList" @change="sexChange" range-key="value" :value="sex">
				<view class="info">
					<view><text>性别</text></view>
					<view>
						<text>{{gender}}</text>
						<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
					</view>
				</view>
			</picker>
			<picker mode="date" :value="date" @change="dateChange" :start="startDate" :end="endDate">
				<view class="info">
					<view><text>生日</text></view>
					<view>
						<text>{{birthday}}</text>
						<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
					</view>
				</view>
			</picker>
		</view>
		<view class="phone">
			<view>手机号</view>
			<view>{{phone}}</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import baseURL from '../../api/index.js'		
	export default{
		name:'editUserInfo',
		data(){
			const currentDate = this.getDate({
			    format: true
			})
			return{
				avatar:'',
				birthday:'',
				sex:'',
				userName:'',
				token:'',
				sexList:[{id:1,value:'男'},{id:2,value:'女'}],
				gender:'请选择',
				date:currentDate,
				phone:'',
				isAdmin:false,
			}
		},
		computed:{
			startDate() {
			     return this.getDate('start');
			},
			endDate() {
			    return this.getDate('end');
			}
		},
		methods:{
			// 获取个人信息
			async getUserInfo(){
				if(this.isAdmin){
					let res = await this.$fetch(this.$api.getInfo,{},'GET')
					this.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
					if(res.data.avatar){
						this.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
					}else{
						this.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
					}
					this.userName = res.data.userName
					this.phone = res.data.phonenumber
					this.sex = res.data.sex
					if(this.sex == 0){
						this.gender = '男'
					}else if(this.sex == 1){
						this.gender = '女'
					}
				}else{
					let res = await this.$fetch(this.$api.getMyInfo,{},'GET')
					if(res.data.avatar){
						this.avatar = baseURL.pro+'profile/avatar/'+res.data.avatar
					}else{
						this.avatar = 'https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H'
					}
					if(res.data.birthday){
						this.birthday = this.$dayjs(res.data.birthday).format('YYYY-MM-DD')
					}
					this.userName = res.data.userName
					this.phone = res.data.phonenumber
					this.sex = res.data.sex
					if(this.sex == 0){
						this.gender = '男'
					}else if(this.sex == 1){
						this.gender = '女'
					}
				}
			},
			// 修改头像
			editAvatar(){
				if(this.isAdmin){
					uni.chooseImage({
						count:1,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						success: (res) => {
								for (var i = 0; i < res.tempFilePaths.length; i++) {
									uni.uploadFile({
										url:baseURL.pro+this.$api.agentEditInfo,
										filePath:res.tempFilePaths[i],
										name:'file',
										formData:{
											'token':this.token
										},
										success: (uploadFileRes) => {
											console.log(uploadFileRes);
											this.getUserInfo()
										}
									})
								}						
						}
					})
				}else{
					uni.chooseImage({
						count:1,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						success: (res) => {
								for (var i = 0; i < res.tempFilePaths.length; i++) {
									uni.uploadFile({
										url:baseURL.pro+this.$api.userEditInfo,
										filePath:res.tempFilePaths[i],
										name:'file',
										formData:{
											'token':this.token
										},
										success: (uploadFileRes) => {
											console.log(uploadFileRes);
											this.getUserInfo()
										}
									})
								}						
						}
					})
				}
			},
			// 修改个人信息
			async editUserInfo(){
				if(this.isAdmin){
					let res = await this.$fetch(this.$api.agentEditInfo,{birthday:this.birthday,sex:this.sex,userName:this.userName},'POST','from')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}else{
					let res = await this.$fetch(this.$api.userEditInfo,{birthday:this.birthday,sex:this.sex,userName:this.userName},'POST','from')
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}
			},
			// 性别选择
			sexChange(e){
				for(var i in this.sexList){
					if( i == e.target.value){
						this.sex = i
						this.gender = this.sexList[i].value
						this.editUserInfo()
					}
				}
			},
			dateChange(e){
				this.birthday = e.target.value
				this.editUserInfo()
			},
	        getDate(type) {
	            const date = new Date();
	            let year = date.getFullYear();
	            let month = date.getMonth() + 1;
	            let day = date.getDate();
	
	            if (type === 'start') {
	                year = year - 60;
	            } else if (type === 'end') {
	                year = year + 2;
	            }
	            month = month > 9 ? month : '0' + month;;
	            day = day > 9 ? day : '0' + day;
	            return `${year}-${month}-${day}`;
	        },
			// 修改用户名
			editUserName(){
				uni.navigateTo({
					url:'editUserName?userName='+this.userName
				})
			}
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
			}
			this.getUserInfo()
			this.token = uni.getStorageSync('token')
		}
	}
</script>

<style lang="less">
	page{
		background: #F0F0F0;
	}
	.userInfo{
		background: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.avatar{
		width: 720rpx;
		height: 220rpx;
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view:first-child{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			// background-repeat: no-repeat;
			// background-size: 100% 100%;
			// background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
			
			image{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
		}
		
		& > view:nth-child(2){
			margin-left: 370rpx;
			width: 188rpx;
			height: 220rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #9B9B9B;
			
			image{
				margin-left: 32rpx;
				width: 16rpx;
				height: 26rpx;
			}
		}
	}
	.info{
		width: 690rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view:first-child{
			flex: 1;
			height: 110rpx;
			line-height: 110rpx;
			font-size: 28rpx;
			color: #9B9B9B;
			letter-spacing: -0.68rpx;
		}
		
		& > view:nth-child(2){
			flex: 1;
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			line-height: 110rpx;
			
			text{
				height: 110rpx;
				text-align: right;
				font-size: 28rpx;
				color: #9B9B9B;
			}
			
			.name{
				font-size: 34rpx;
				color: #4A4A4A;
				font-weight: bold;
			}
			
			image{
				margin-left: 32rpx;
				width: 16rpx;
				height: 26rpx;
			}
		}
	}
	.phone{
		width: 100%;
		height: 110rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		line-height: 110rpx;
		
		& > view:first-child{
			flex: 1;
			margin-left: 30rpx;
			font-size: 28rpx;
			color: #9B9B9B;
		}
		
		& > view:nth-child(2){
			flex: 1;
			font-size: 34rpx;
			font-weight: bold;
			color: #4A4A4A;
			display: flex;
			justify-content: flex-end;
			margin-right: 30rpx;
		}
	}
</style>
