<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				{{userInfo.userName}}
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<!--header-->
		<!-- 个人信息 -->
		<view class="userInfo">
			<view>
				<view class="avatar"><image :src="userInfo.avatar" mode=""></image></view>
				<view class="infoDetail">
					<view><text>{{userInfo.userName}}</text></view>
					<view>
						<view><text>经纪人</text></view>
						<view><text>{{userInfo.postName}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 服务信息 -->
		<view class="Card">
			<view>
				<text>{{userInfo.years}}</text><text>服务年限</text>
			</view>
			<view>
				<text>{{userInfo.times}}</text><text>服务人数</text>
			</view>
			<view>
				<text>{{userInfo.visitTimes}}</text><text>带看人数</text>
			</view>
		</view>
		<!-- 主营信息 -->
		<view class="commpany">
			<view class="detail-item">
				<view>
					<text>服务公司</text><text>{{userInfo.company}}</text>
				</view>
			</view>
			<view class="detail-item">
				<view>
					<text>服务门店</text><text>{{deptName}}</text>
				</view>
			</view>
			<view class="detail-item">
				<view>
					<text>主营模块</text><text>{{userInfo.plate}}</text>
				</view>
			</view>
			<view class="detail-item">
				<view>
					<text>主营小区</text><text>{{userInfo.district}}</text>				
				</view>
			</view>
		</view>
		<!-- Ta的房源 -->
		<view class="houseTitle">
			<text>TA的房源</text>
		</view>
		<!-- 房源列表 -->
			<view class="homeList">
				<view class="home-info" v-for="(item, index) in newHouseList" :key="index" @click="checkNewDetail(item.areaId)">
					<view class="home-pic"><image :src="item.houseImg" lazy-load="true"></image></view>
					<view class="home-detail">
						<view class="homeName">
							<text>{{ item.areaName }}</text>
						</view>
						<view class="home-address">
							<text space="nbsp">{{ item.provinceString }}</text>
						</view>
						<view class="home-tips">
							<view :class="[{ tips4: labIndex == 0, tips5: labIndex !== 0 }]" v-for="(it, labIndex) in item.label" :key="labIndex">
								<text>{{ it }}</text>
							</view>
						</view>
						<view class="home-price">
							<text>{{ item.price }}元/m²(楼盘均价)</text>
						</view>
					</view>
				</view>
				<view class="home-info" v-for="(item, index) in oldHouseList" :key="index" @click="checOldkDetail(item.houseId,item.houseType)" v-if="!isNewArea">
					<view class="home-pic"><image :src="item.houseImg" lazy-load="true"></image></view>
					<view class="home-detail">
						<view class="homeName">
							<text>{{ item.houseName }}</text>
						</view>
						<view class="home-address">
							<text space="nbsp">{{ item.provinceString }} |{{ item.areaName }}</text><text v-if="isAdmin">|{{item.buildNum}}栋{{item.roomNum}}</text>
						</view>
						<view class="home-tips">
							<view :class="[{ 'tips-1': labIndex == 0, 'tips-2': labIndex == 1, 'tips-3': labIndex == 2 }]" v-for="(it, labIndex) in item.label" :key="labIndex">
								<text>{{ it }}</text>
							</view>
						</view>
						<view class="home-price" v-if="item.houseType == 2">
							<text>{{ item.price }}万({{ item.acreage }}m²|{{ item.unitPrice }}元/m²)</text>
						</view>
						<view class="home-price" v-if="item.houseType == 1">
							<text>{{ item.rental }}元/月({{ item.acreage }}m²)</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 加载 -->
			<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
		<view class="bottom">
			<view class="bottom-agent">
				<view>
					<image :src="userInfo.avatar" mode=""></image>
				</view>
				<view>
					<text>{{userInfo.userName}}</text>
					<text>{{userInfo.postName}}</text>
				</view>
			</view>
			<view class="bottom-share" @click="chatModal">
				<image src="../../static/icon/xiaoxi-4.png" mode=""></image>
				<text>聊天</text>
			</view>
			<view class="bottom-call" @click="callTel">
				<image src="../../static/icon/dianhua-2.png" mode=""></image>
				<text>电话</text>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
	</view>
</template>

<script>
	import baseURL from '../../api/index.js'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	import loginModal from '../../components/Modal/loginModal.vue'
	export default {
		name:'agentDetail',
		components:{
			uniLoadMore,loginModal
		},
		data(){
			return{
				userId:'',
				userInfo:[],
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0,
				deptName:'',
				newHouseList:[],//新房列表
				oldHouseList:[],//旧房列表
				oldPage:1,
				oldTotalPage:'',
				newPage:1,
				newTotalPage:'',
				old:[],
				new:[],
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				isNewArea:'',//是否有新房
				path:'',
				managerId:'',//分享人id
				backHome:false,//是否回到首页
				modalShow:false,
				isAdmin:false,
				flag:false
			}
		},
		methods:{
			// 返回
			back(){
				if(this.backHome){
					uni.switchTab({
						url:'../home/home'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
			},
			// 获取经纪人详情
			async getAgentInfo(){
				let res = await this.$fetch(this.$api.getAgentInfo,{userId:this.userId},'GET')
				this.userInfo = res.data.user
				this.userInfo.avatar = baseURL.pro+'profile/avatar/'+this.userInfo.avatar
				if(this.userInfo.years == null){
					this.userInfo.years = ''
				}
				if(this.userInfo.times == null){
					this.userInfo.times = ''
				}
				if(this.userInfo.visitTimes == null){
					this.userInfo.visitTimes = ''
				}
				if(this.userInfo.company == null){
					this.userInfo.company = ''
				}
				if(this.userInfo.plate == null){
					this.userInfo.plate = ''
				}
				if(this.userInfo.district == null){
					this.userInfo.district = ''
				}
				this.deptName = res.data.user.dept.deptName
				if(res.data.newArea.length){
					res.data.newArea.forEach(item =>{
						if (item.picUrl) {
							item.houseImg = item.picUrl.split(',')[0];
						}else{
							item.houseImg = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
						}
						if (item.label){
							item.label = item.label.split(',');
						}
					})
					// 计算页数
					if(res.data.newArea.length/10 > parseInt(res.data.newArea.length/10)){
						this.newTotalPage = parseInt(res.data.newArea.length/10)+1
					}else{
						this.newTotalPage = parseInt(res.data.newArea.length/10)
					}
					this.new = res.data.newArea
					for(var i in this.new){
						if(i>= 0 + (this.newPage-1)*10 && i <= 9+(this.newPage-1)*10)
						this.newHouseList.push(this.new[i])
					}
					this.isNewArea = true
				}else{
					this.isNewArea = false
				}
				if(res.data.oldHouse.length){
					res.data.oldHouse.forEach(item =>{
						if (item.picUrl) {
							item.houseImg = item.picUrl.split(',')[0];
						}else{
							item.houseImg = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
						}
						if (item.label) {
							item.label = item.label.split(',');
						}
					})
					// 计算页数
					if(res.data.oldHouse.length/10 > parseInt(res.data.oldHouse.length/10)){
						this.oldTotalPage = parseInt(res.data.oldHouse.length/10)+1
					}else{
						this.oldTotalPage = parseInt(res.data.oldHouse.length/10)
					}
					this.old = res.data.oldHouse
					for(var i in this.old){
						if(i>= 0 + (this.oldPage-1)*10 && i <= 9+(this.oldPage-1)*10)
						this.oldHouseList.push(this.old[i])
					}
					if(this.oldPage >= this.oldTotalPage){
						this.status = 'noMore'
					}
				}
			},
			// 拨打电话
			callTel(){
				uni.makePhoneCall({
					phoneNumber:this.userInfo.phonenumber
				})
			},
			// 加载更多旧房列表
			loadMoreOldHouse(){
				this.status = 'loading'
				for(var i in this.old){
					if(i>= 0 + (this.oldPage-1)*10 && i <= 9+(this.oldPage-1)*10)
					this.oldHouseList.push(this.old[i])
				}
				if(this.oldPage >= this.oldTotalPage){
					this.status = 'noMore'
				}
			},
			// 加载更多新房列表
			loadMoreNewHouse(){
				for(var i in this.new){
					if(i>= 0 + (this.newPage-1)*10 && i <= 9+(this.newPage-1)*10)
					this.newHouseList.push(this.new[i])
				}
				if(this.newPage == this.newTotalPage){
					this.isNewArea = false
					this.status = 'noMore'
				}
			},
			// 查看新房详情
			checkNewDetail(id){
				if(this.flag){
					uni.navigateTo({
						url: '../newHouse/newHouse?houseId='+id+'&houseType=3'+'&flag=1'+'&userId='+this.userId,
					});
				}else{
					uni.navigateTo({
						url: '../newHouse/newHouse?houseId='+id+'&houseType=3',
					});
				}
			},
			// 查看旧房详情
			checOldkDetail(id,houseType){
				if(this.flag){
					uni.navigateTo({
						url: '../oldHouse/oldHouse?houseId='+id+'&houseType='+houseType+'&flag=1'+'&userId='+this.userId,
					});
				}else{
					uni.navigateTo({
						url: '../oldHouse/oldHouse?houseId='+id+'&houseType='+houseType,
					});
				}
			},
			// 点击聊天时提醒
			chatModal(){
				uni.showModal({
					title: '提醒',
					content: '请在APP端进行微聊',
				});
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
			if(uni.getStorageSync('userId')){
				this.managerId = uni.getStorageSync('userId')
			}
			if(options.scene){
				this.backHome = true
				this.flag = true
				let scene = decodeURIComponent(options.scene)
				this.userId = scene
				console.log(scene)
				uni.setStorageSync('manager',this.userId)
				if(!uni.getStorageSync('isToken')){
					setTimeout(()=>{
						this.modalShow = true
					},1000)
				}
			}else{
				this.userId = options.id
				if(options.userId){
					uni.setStorageSync('manager',options.userId)
					this.flag = true
					if(!uni.getStorageSync('isToken')){
						setTimeout(()=>{
							this.modalShow = true
						},1000)
					}
				}
				if(options.share){
					this.backHome = true
				}else{
					this.backHome = false
				}
			}
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
			}
			this.getAgentInfo()
		},
		onReachBottom(){
			if(this.isNewArea){
				this.newPage++
				if(this.newPage <= this.newTotalPage){
					this.loadMoreNewHouse()
				}
			}else{
				this.oldPage++
				if(this.oldPage <= this.oldTotalPage){
					this.loadMoreOldHouse()
				}
			}
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
		onShareAppMessage(ops) {
			this.path = 'pages/agent/agentDetail?id='+this.userId+'&userId='+this.managerId+'&share=1'
			console.log(this.path);
			if(ops.from === 'button'){
			}
			return{
				title:'经纪人'+this.userInfo.userName,
				path:this.path
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";
	page{
		background: #F0F0F0;
		overflow-x: hidden;
	}
	.container {
		padding-bottom: 110upx;
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
	.userInfo{
		width: 100%;
		display: flex;
		height: 360rpx;
		justify-content: center;
		align-items: center;
		background-image:url('https://img.bajiaostar.com/FnWTGwXf95wrQJJQVxulDUMSlPHe');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		
		& > view{
			height: 120rpx;
			width: 100%;
			display: flex;
			
			.avatar{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-left: 30rpx;
				display: flex;
				align-items: center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
				
				& > image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
			
			.infoDetail{
				margin-left: 30rpx;
				height: 120rpx;
				display: flex;
				flex-direction: column;
				
				& > view:first-child{
					font-size: 28rpx;
					color: #FFFFFF;
					font-weight: bold;
				}
				
				& > view:last-child{
					display: flex;
					margin-top: 20rpx;
					font-size: 24rpx;
					
					& > view:first-child{
						height: 36rpx;
						padding: 0 10rpx;
						line-height: 36rpx;
						font-size: 24rpx;
						text-align: center;
						border: 2rpx solid #FFFFFF;
						border-radius: 4rpx;
						color: #FFFFFF;
					}
					
					& > view:last-child{
						margin-left: 30rpx;
						height: 36rpx;
						padding: 0 10rpx;
						line-height: 36rpx;
						font-size: 24rpx;
						text-align: center;
						border-radius: 4rpx;
						color: #FE9E2E;
						border: 2rpx solid #00000000;
						background: rgba(0,0,0,0.3);
					}
				}
			}
		}
	}
	.Card{
		width: 690rpx;
		height: 180rpx;
		margin: 0 30rpx;
		position: absolute;
		z-index: 8;
		top: 280rpx;
		background:#FFFFFF;
		display: flex;
		box-shadow: 0 4px 8px 0 rgba(63,55,127,0.06), 0 8px 16px 0 rgba(67,58,137,0.03);
		border-radius: 20rpx;
		
		& > view{
			flex:1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			
			& > text:first-child{
				font-size: 36rpx;
				color: #5B5B5B;
				font-weight: bold;
			}
			
			& > text:last-child{
				font-size: 24rpx;
				color: #A6A6A6;
				margin-top: 20rpx;
			}
		}
	}
	// 主营模块
	.commpany{
		width: 690rpx;
		padding:130rpx  30rpx 0 30rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.detail-item{
		width: 690rpx;
		height: 40rpx;
		display: flex;
		margin-bottom: 20rpx;
		
		& > view{
			flex: 1;
			display: flex;
			
			& > text:first-child{
				font-size: 28rpx;
				color: #A6A6A6;
				margin-right: 20rpx;
				white-space: nowrap;
			}
			
			& > text:nth-child(2){
				font-size: 28rpx;
				color: #5B5B5B;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-weight: 600;
			}
		}
	}
	.houseTitle{
		margin-top: 30rpx;
		width: 720rpx;
		height: 90rpx;
		background: #FFFFFF;
		font-size: 28rpx;
		color: #A6A6A6;
		line-height: 90rpx;
		padding-left: 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
	}
.homeList {
	width: 100%;
	background: #ffffff;
	// margin-top:266rpx;
	.home-info {
		display: flex;
		flex-direction: row;
		margin-left: 30rpx;
		// padding-top: 40rpx;
		height: 250rpx;
		// padding-bottom: 30rpx;
		border-bottom: 2rpx solid #f7f7f7;
	}
}

.home-pic {
	width: 240rpx;
	height: 180rpx;
	margin-right: 30rpx;
	margin-top: 40rpx;
	border-radius: 4rpx;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-image: url('https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx');
}

.home-pic image {
	width: 240rpx;
	height: 180rpx;
	border-radius: 4rpx;
}

.home-detail {
	margin-top: 40rpx;
	display: flex;
	flex-direction: column;

	.homeName {
		width: 420rpx;
		font-size: 28rpx;
		color: #5b5b5b;
		text-align: justify;
		letter-spacing: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-weight: bold;
	}

	.home-address {
		width: 420rpx;
		font-size: 24rpx;
		color: #a6a6a6;
		letter-spacing: 0;
		text-align: justify;
		margin-top: 8rpx;
		display: flex;
		
		& > text:first-child{
			flex: 2;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		
		& >text:nth-child(2){
			flex: 1;
		}
	}

	.home-tips {
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
		height: 36rpx;

		.tips-1 {
			background: rgba(241, 78, 44, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #f14e2c;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}

		.tips-2 {
			background: rgba(74, 144, 226, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #4a90e2;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}

		.tips-3 {
			background: rgba(211, 160, 221, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #800080;
			letter-spacing: 0;
			text-align: justify;
			height: 36rpx;
			line-height: 36rpx;
		}
		.tips4 {
			background: #48d2ab;
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #ffffff;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}

		.tips5 {
			background: rgba(74, 144, 226, 0.15);
			border-radius: 8rpx;
			font-size: 20rpx;
			color: #4a90e2;
			letter-spacing: 0;
			text-align: justify;
			margin-right: 30rpx;
			height: 36rpx;
			line-height: 36rpx;
		}
	}

	.home-price {
		font-size: 28rpx;
		color: #fe9e2e;
		letter-spacing: 0;
		text-align: justify;
		font-size: 24rpx;
		margin-top: 12rpx;
	}
}

.tips-1 text {
	margin: 0 10rpx;
}

.tips-2 text {
	margin: 0 10rpx;
}

.tips-3 text {
	margin: 0 10rpx;
}
.tips4 text {
	margin: 0 10rpx;
}
.tips5 text {
	margin: 0 10rpx;
}	
	.bottom{
		width: 100%;
		background: #FFFFFF;
		height: 100rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 10;
	}
	.bottom-agent{
		width: 270rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		
		& > view:first-child{
			margin: 0 20rpx 0 30rpx;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
			
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		
		& > view:nth-child(2){
			height: 100rpx;
			display: flex;
			flex-direction: column;
			
			& > text:first-child{
				margin-top: 12rpx;
				font-size: 28rpx;
				color: #5B5B5B;
				font-weight: bold;
			}
			
			& > text:nth-child(2){
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #A6A6A6;
			}
		}
	}
	.bottom-share{
		width: 240rpx;
		height: 100rpx;
		background-image: linear-gradient(45deg, #FFBF2F 0%, #FF9417 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		
		& > image{
			width: 36rpx;
			height: 36rpx;
		}
		
		& > text{
			margin-left: 10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
	.bottom-call{
		width: 240rpx;
		height: 100rpx;
		background-image: linear-gradient(45deg, #AC63C0 0%, #874A98 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		
		& > image{
			width: 36rpx;
			height: 36rpx;
		}
		
		& > text{
			margin-left: 10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
</style>
