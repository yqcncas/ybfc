<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				房源详情
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<!--header-->
		<!-- 轮播 -->
		<uni-swiper-dot :info="swiperList" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content" v-if="loadShow">
			<swiper class="swiper-box" @change="change" :autoplay="autoplay" :circular="circular" :interval="interval" :current="current">
				<swiper-item v-for="(item ,index) in swiperList" :key="index">
					<view class="swiper-item" v-if="isVideo&&index == 0">
						<video :src="item" controls :poster="videoPic" objectFit="fill" @play="videoPlay" id="houseVideo"></video>
					</view>
					<view :class="item.colorClass" class="swiper-item" v-if="(isVideo&&index !=0) || (!isVideo) "  @click="viewImage(index)">
						<image :src="item" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
			<view class="dotsList">
				<view class="dots" v-if="isVideo" @click="goVideo">
					<view class="dots-video" :class="[current == 0 ? 'active':'']">
						<image src="../../static/icon/TriangleCopy.png" mode=""></image>
						<text>视频</text>
					</view>
				</view>
				<view class="dots" v-if="isImg" @click="goImg">
					<view class="dots-img" :class="[current > 0&& current < length-1 ? 'active':'' ]" v-if="isVideo&&islayOut">
						<text>图片</text>
					</view>
					<view class="dots-img" :class="[current > 0&& current <= length-1 ? 'active':'' ]" v-if="isVideo&&!islayOut">
						<text>图片</text>
					</view>
					<view class="dots-img" :class="[current >= 0&& current < length-1 ? 'active':'' ]" v-if="!isVideo&&islayOut">
						<text>图片</text>
					</view>
					<view class="dots-img" :class="[current >= 0&& current <= length-1 ? 'active':'' ]" v-if="!isVideo&&!islayOut">
						<text>图片</text>
					</view>
				</view>
				<view class="dots" v-if="islayOut" @click="goLayOut">
					<view class="dots-img" :class="[current == length-1 ? 'active':'']">
						<text>户型</text>
					</view>
				</view>
			</view>
		</uni-swiper-dot>
		<view class="newHouse" v-if="loadShow">
			<view class="newHosueName">
				<view>
					<text>{{houseInfo.areaName}}</text>
				</view>
				<view>
					<view class="home-tips">
						<view :class="[{ 'tips-1': labIndex == 0, 'tips-2': labIndex != 0}]" v-for="(it, labIndex) in houseInfo.label" :key="labIndex">
							<text>{{ it }}</text>
						</view>
					</view>
					<view>
						<image src="../../static/icon/9.png" mode="" v-if="isCollect == 0" @click="handleToShowFavorites"></image>
						<image src="../../static/icon/10.png" mode="" v-if="isCollect == 1" @click="handleToShowFavorites"></image>
					</view>
				</view>
			</view>
			<view class="newHouseInfo">
				<view class="detail-item">
					<view>
						<text>单价</text><text style="color:#FE9E2E;">{{houseInfo.price}}元/m²</text>					
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>开盘</text><text>{{houseInfo.publish}}开盘</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>地址</text><text style="color:#3270BD;font-weight: 100;">{{houseInfo.provinceString}}</text>
					</view>
				</view>
				<view class="checkMore" @click="checkMoreInfo">
					<text>查看更多信息</text>
				</view>
			</view>
		</view>
		<!-- 主力户型 -->
		<view class="houseTypeList" v-if="loadShow">
			<view>
				主力户型
			</view>
			<view>
				<scroll-view scroll-x="true" scroll-left="0" class="housTypeInfo">
					<view v-for="(item,index) in houseTypeList" :key="index" class="houseTypeDetail" @click="checkApartment(item.houseId)">
						<view>
							<image :src="item.picUrl" mode=""></image>
						</view>
						<view>
							<text>{{item.houseName}}</text>
							<text>{{item.acreage}}m²</text>
						</view>
						<view>
							<text v-if="item.price">约{{item.price}}万</text>
							<text v-else>暂无售价</text>
						</view>
						<view :class="[{'green':item.status == 1,'orange':item.status == 2,'gray':item.status == 3}]">
							<text v-if="item.status == 1">在售</text>
							<text v-if="item.status == 2">预售</text>
							<text v-if="item.status == 3">停售</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 经纪人信息 -->
		<view class="agent" @click="checkAgent(userId)" v-if="loadShow">
			<view class="agent-avatar">
				<image :src="avatar" mode=""></image>
			</view>
			<view class="agent-info">
				<text>{{userName}}</text>
				<text>{{company}}</text>
			</view>
			<view class="arrow-right">
				<image src="../../static/icon/DisclosureIndicator.png" mode=""></image>
			</view>
		</view>
		<!-- 房源介绍 -->
		<view class="content-detail" v-if="houseInfo.remark">
			<parser :html="houseInfo.remark"></parser>
		</view>
		<!-- 猜你喜欢 -->
		<Guess :houseList="homeList" :houseType="houseType" v-if="loadShow"></Guess>
		<view class="bottom" v-if="loadShow">
			<view class="bottom-agent" @click="checkAgent(userId)">
				<view>
					<image :src="avatar" mode=""></image>
				</view>
				<view>
					<text>{{userName}}</text>
					<text>{{postName}}</text>
				</view>
			</view>
			<view class="bottom-share" @click="goShare">
				<image src="../../static/icon/share.png" mode=""></image>
				<text>分享</text>
			</view>
			<view class="bottom-call" @click="callTel">
				<image src="../../static/icon/dianhua-2.png" mode=""></image>
				<text>电话</text>
			</view>
		</view>
		<u-popup v-model="favoritesShow" mode="bottom">
			<view class="favorites">
				<view class="favorites-title">收藏夹</view>
				<view class="close-icon" @click="handleCloseFavor"><image src="../../static/icon/new/15.png" mode=""></image></view>
				<view class="favortes-add" @click="handleShowAddFavorites"><image src="../../static/icon/new/16.png" mode=""></image><text>新建文件夹</text></view>
				<scroll-view scroll-y="true" class="favorites-list">
					<view class="favorites-item" v-for="(item,index) in favoritesList" :key="index" v-if="!isEmpty" @click="handleChoose(item.favoriteId)">
						<view>
							<text>{{item.name}}</text>
						</view>
						<view>
							<view :class="[chooseFavorites == item.favoriteId ? 'chooseIcon':'choose-box']"><view></view></view>
						</view>
					</view>
					<u-empty mode="favor" text="你还没有收藏夹" v-if="isEmpty"></u-empty>
				</scroll-view>
				<view class="favorites-button" @click="collect">
					完成
				</view>
			</view>
		</u-popup>
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
		<!-- 授权弹窗 -->
		<!-- #ifdef MP-WEIXIN -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>		
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<u-popup v-model="modalShow" mode="center"  border-radius="14" :mask-close-able="false">
			<view class="popup-modal">
				<view class="popup-title">微信授权</view>
				<view class="popup-tips">英棒房产申请以下信息:</view>
				<view class="popup-content">
					<view></view>
					<view>微信 账号信息 （昵称 、头像、地区及性别）</view>
				</view>
				<view class="popup-button">
					<view @click="handleToRefuse">拒绝</view>
					<view @click="handleToAuthorize">允许</view>
				</view>
			</view>
		</u-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef H5
	let jwx = require('jweixin-module')
	// #endif
	let timer = null
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import baseURL from '../../api/index.js'	
	import Guess from '../../components/Guess/Guess.vue'
	import uniGrid from '../../components/uni-grid/uni-grid.vue'
	import loginModal from '../../components/Modal/loginModal.vue'
	import parser from "@/components/jyf-Parser/index"
	export default {
		name:'newHouse',
		components:{
			uniSwiperDot,Guess,uniGrid,loginModal,parser
		},
		data(){
			return{
				houseId:'',
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				current: 0,
				mode: 'nav',
				dotsStyles: {
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				autoplay:false,
				interval:3000,
				circular:true,
				swiperList:[],
				isVideo:'',//判断是否有视频
				videoPic:'',//视频封面图
				isImg:'',//是否有图片
				islayOut:'',//是否有户型图
				length:'',
				houseType:'',
				houseInfo:[],
				isCollect:0,
				houseTypeList:[],
				mobile:'',
				postName:'',
				userId:'',
				avatar:'',
				userName:'',
				company:'',
				homeList:[],
				isToken:false,
				manager:'',
				loadShow:false,
				backHome:false,//是否回到首页
				isAdmin:false,
				modalShow:false,
				flag:false,
				path:'',
				shareTitle:'',//分享标题
				shareUserId:'',
				favoritesShow:false,//收藏夹列表
				isEmpty:false,
				favoritesList:[],
				chooseFavorites:'',
				favoritesName:'',
				addShow:false,
				userMobile:'',
				verCode:'',
				count:60,
				verificationFlag:false,
				from:'',
				clientName:'',
				shareImg:'https://img.bajiaostar.com/2e0268c4601672d79e140d888a1f9e40',
				share:''
			}
		},
		methods:{
			// 返回
			back(){
				// #ifdef MP-WEIXIN
				if(this.backHome){
					uni.switchTab({
						url:'../home/home'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				// #endif
				// #ifdef H5
				if(this.share){
					uni.switchTab({
						url:'../home/home'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				// #endif
			},
			change(e) {
				this.current = e.detail.current
			},
			// 获取新房详情
			async getHouseInfo(){
				this.swiperList = []
				let res = await this.$fetch(this.$api.areaInfo,{areaId:this.houseId},'GET')
				this.isCollect = res.data.collect
				if(res.data.newArea.movieUrl){
					this.videoPic = res.data.newArea.movieFirst;
					this.swiperList.push(res.data.newArea.movieUrl)
					this.isVideo = true
				}else{
					this.isVideo = false
				}
				if(res.data.newArea.picUrl){
					let data = res.data.newArea.picUrl.split(',')
					if(data[0]){
						this.shareImg = data[0]
						console.log(this.shareImg);
					}
					data.forEach(item =>{
						this.swiperList.push(item)
					})
					this.isImg = true
				}else{
					this.isImg = false
				}
				if(res.data.newArea.layoutPic){
					let data = res.data.newArea.layoutPic.split(',')
					data.forEach(item =>{
						this.swiperList.push(item)
					})
					this.islayOut = true
				}else{
					this.islayOut = false
				}
				this.length = this.swiperList.length;
				if(!this.length){
					this.swiperList[0] = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
				this.houseInfo = res.data.newArea
				// #ifdef H5
				if(uni.getStorageSync('isAdmin')){
					let u = navigator.userAgent;
					let url = location.href
					let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if(isiOS){
						let wx_sdk_data = uni.getStorageSync('wx_sdk_data')
						console.log(this.houseInfo.areaName);
						let shareTitle = this.houseInfo.areaName
						let shareImg = this.shareImg
						let shareUrl = location.href + '&shareFlag=1'
						jwx.config({
						  // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						  appId: this.$api.appid, // 必填，公众号的唯一标识
						  timestamp: wx_sdk_data.timestamp, // 必填，生成签名的时间戳
						  nonceStr: wx_sdk_data.noncestr, // 必填，生成签名的随机串
						  signature: wx_sdk_data.sign,// 必填，签名
						  jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
						}); 
						jwx.ready(function() {
							// “分享给朋友”及“分享到QQ”按钮的分享内容 
							jwx.updateAppMessageShareData({ 
							    title: shareTitle, // 分享标题
							    desc: '温州英棒房产，为您提供真实，有效，准确真房源!', // 分享描述
							    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 
							    imgUrl: shareImg, // 分享图标
							    success: function () {
							      // 设置成功 
								  console.log('成功设置分享到微信');
							    }
							})
							// “分享到朋友圈”及“分享到QQ空间”
							jwx.updateTimelineShareData({  
							    title: shareTitle, // 分享标题
							    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							    imgUrl: shareImg, // 分享图标
							    success: function () {
							      // 设置成功
								   console.log('成功设置分享到朋友圈');
							    } 
							  })
						});
					}else{
						this.getSDKSign()
					}
				}
				// #endif
				if(this.houseInfo.label){
					this.houseInfo.label = this.houseInfo.label.split(',')
				}
				this.shareTitle = res.data.newArea.areaName
				if(this.isAdmin){
					this.path = 'pages/newHouse/newHouse?houseId='+this.houseId+'&houseType='+this.houseType+'&userId='+this.shareUserId+'&share=1'
				}else{
					this.path = 'pages/newHouse/newHouse?houseId='+this.houseId+'&houseType='+this.houseType+'&share=1'
				}
				this.houseInfo.publish = this.$dayjs(this.houseInfo.publish).format('YYYY年MM月')
				res.data.newHouseList.forEach(item =>{
					if(!item.status){
						item.status = '3'
					}
					if(!item.houseName){
						item.houseName = ''
					}
					if(!item.acreage){
						item.acreage = ''
					}
				})
				this.houseTypeList = res.data.newHouseList
				let manager = res.data.manager
				// if(!this.backHome&&!this.flag){
				// 	this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
				// 	this.userName = manager.userName
				// 	this.company = manager.company
				// 	this.mobile = manager.phonenumber
				// 	this.postName = manager.postName
				// 	this.userId = manager.userId
				// }
				// #ifdef MP-WEIXIN
				if(!this.manager){
					this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
					this.userName = manager.userName
					this.company = manager.company
					this.mobile = manager.phonenumber
					this.postName = manager.postName
					this.userId = manager.userId
				}
				// #endif
				// #ifdef H5
				if(this.isAdmin){
					if(this.manager && this.share){
						console.log('不赋值');
					}else{
						this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
						this.userName = manager.userName
						this.company = manager.company
						this.mobile = manager.phonenumber
						this.postName = manager.postName
						this.userId = manager.userId
					}
				}else{
					if(!this.manager){
						this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
						this.userName = manager.userName
						this.company = manager.company
						this.mobile = manager.phonenumber
						this.postName = manager.postName
						this.userId = manager.userId
					}
				}
				// #endif
				res.data.guess.forEach(item =>{
					if (item.picUrl) {
						item.picUrl = item.picUrl.split(',');
					}else{
						item.picUrl = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'.split(',')
					}
					if (item.label) {
						item.label = item.label.split(',');
					}
				})
				this.homeList = res.data.guess
				this.loadShow = true
				uni.hideLoading()
			},
           // 显示收藏夹列表
			async handleToShowFavorites(){
				let res = await this.$fetch(this.$api.favoriteList,{},'GET')
				console.log(res);
				if(res.code == 0){
					if(res.data.length > 0){
						this.isEmpty = false
					}else{
						this.isEmpty = true
					}
					this.favoritesList = res.data
					this.favoritesShow = true			
				}else if(res.code == 401){
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1000)
				}
			},
			// 关闭收藏夹列表
			handleCloseFavor(){
				this.favoritesShow = false
				this.chooseFavorites = ''
			},
			// 选择收藏夹
			handleChoose(id){
				this.chooseFavorites = id
			},
			// 显示添加收藏夹
			handleShowAddFavorites(){
				this.favoritesShow = false
				this.addShow = true
			},
			// 关闭添加收藏夹
			handleCloseAdd(){
				this.addShow = false
				this.favoritesShow = true
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
					this.handleToShowFavorites()
				}
			},
			// 收藏
			async collect(){
				if(!this.chooseFavorites) return uni.showToast({icon:'none',title:'请选择收藏夹'})
				let res = await this.$fetch(this.$api.collect,{houseId:this.houseId,houseType:this.houseType,favoriteId:this.chooseFavorites},'GET')
				if(res.code == 0){
					this.isCollect = 1
					this.favoritesShow = false
					this.chooseFavorites = ''
				}
				uni.showToast({
					icon:'none',
					title:res.msg
				})
			},
			// 点击滑动到视频
			goVideo(){
				this.current = 0;
			},
			// 点击滑动到图片
			goImg(){
				if(this.isVideo){
					this.current = 1
				}else{
					this.current = 0
				}
			},
			// 点击滑动到户型
			goLayOut(){
				this.current = this.length-1
			},
			// 当视频播放后自动全屏
			videoPlay(){
				var videoContext = uni.createVideoContext('houseVideo')
				videoContext.requestFullScreen({direction:90})
			},
			// 拨打电话
			callTel(){
				uni.showModal({
					title:'拨打电话',
					content:'拨打经纪人号码:'+this.mobile,
					success: (res) => {
						if(res.confirm){
							uni.makePhoneCall({
								phoneNumber:this.mobile
							})
						}
					}
				})
			},
			// 查看更多楼盘信息
			checkMoreInfo(){
				uni.navigateTo({
					url:'moreInfo?houseId='+this.houseId+'&houseType=3'
				})
			},
			// 查看户型详情
			checkApartment(id){
				if(this.manager){
					uni.navigateTo({
						url:'apartment?id='+id+'&flag=1'+'&userId='+this.manager
					})
				}else{
					uni.navigateTo({
						url:'apartment?id='+id
					})
				}
			},
			// 查看经纪人详情
			checkAgent(id){
				uni.navigateTo({
					url:'../agent/agentDetail?id='+id
				})
			},
			// 分享
			goShare(){
				// #ifdef MP-WEIXIN
				if(this.isToken){
					uni.navigateTo({
						url:'../share/newShare?id='+this.houseId+'&houseType='+this.houseType
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请先登录！'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1000)
				}
				// #endif
				// #ifdef H5
				uni.showToast({
					icon:'none',
					title:'请在微信小程序生成分享海报'
				})
				// #endif
			},
			// 经纪人详情
			async getManagerInfo(){
				let res = await this.$fetch(this.$api.getAgentInfo,{userId:this.manager},'GET')
				let manager = res.data.user
				this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
				this.userName = manager.userName
				this.company = manager.company
				this.mobile = manager.phonenumber
				this.postName = manager.postName
				this.userId = manager.userId
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
			},
			// 查看图片
			viewImage(e){
				uni.previewImage({
					urls:this.swiperList,
					current:e,
					loop:true
				})
			},
			// 记录浏览记录
			async addH5Browse(){
				let res = await this.$fetch(this.$api.addH5Browse,{clientName:this.clientName,houseId:this.houseId,houseType:this.houseType,manager:this.manager},'GET')
				console.log(res);
			},
			// 调起微信公众号授权
			handleToAuthorize(){
				uni.setStorageSync('shareHouseId',this.houseId)
				uni.setStorageSync('shareHouseType',this.houseType)
				uni.setStorageSync('shareManager',this.manager)
				if(this.share){
					uni.setStorageSync('shareFrom',this.share)
				}
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$api.appid}&redirect_uri=${this.$api.redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
			},
			async getSDKSign(){
				let url = location.href
				let res =  await this.$fetch(this.$api.getSDKSign,{url:url},'POST','form')
				let noncestr = res.data.noncestr
				let timestamp = res.data.timestamp
				let sign = res.data.sign
				console.log(this.houseInfo.areaName);
				let shareTitle = this.houseInfo.areaName
				let shareImg = this.shareImg
				let shareUrl = location.href + '&shareFlag=1'
				jwx.config({
				  // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				  appId: this.$api.appid, // 必填，公众号的唯一标识
				  timestamp: timestamp, // 必填，生成签名的时间戳
				  nonceStr: noncestr, // 必填，生成签名的随机串
				  signature: sign,// 必填，签名
				  jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
				});
				jwx.ready(function() {
					// “分享给朋友”及“分享到QQ”按钮的分享内容 
					jwx.updateAppMessageShareData({ 
					    title: shareTitle, // 分享标题
					    desc: '温州英棒房产，为您提供真实，有效，准确真房源!', // 分享描述
					    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 
					    imgUrl: shareImg, // 分享图标
					    success: function () {
					      // 设置成功 
						  console.log('成功设置分享到微信');
					    }
					})
					// “分享到朋友圈”及“分享到QQ空间”
					jwx.updateTimelineShareData({  
					    title: shareTitle, // 分享标题
					    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: shareImg, // 分享图标
					    success: function () {
					      // 设置成功
						   console.log('成功设置分享到朋友圈');
					    } 
					  })
				});
			},
			// 拒绝授权
			handleToRefuse(){
				uni.showModal({
					title:'提醒',
					content:'你确定要取消授权吗？',
					success: (res) => {
						if(res.confirm){
							this.modalShow = false
						}
					}
				})
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中'
			})
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
			if(options.scene){
				this.backHome = true
				let scene = decodeURIComponent(options.scene)
				this.houseId = scene.split('&')[0]
				this.houseType = scene.split('&')[1]
				if(scene.split('&')[2]){
					this.manager = scene.split('&')[2]
					uni.setStorageSync('manager',this.manager)
				}
			}else{
				// #ifdef H5
				if(options.shareFlag){
					this.share = options.shareFlag
				}
				// #endif
				this.houseId = options.houseId
				this.houseType = options.houseType
				if(options.userId){
					this.manager = options.userId
					uni.setStorageSync('manager',this.manager)
				}
				if(options.share){
					this.backHome = true
				}else{
					this.backHome = false
				}
				if(options.flag){
					this.flag = true
				}else{
					this.flag = false
				}
			}
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
				this.shareUserId = uni.getStorageSync('userId')
			}
			if(uni.getStorageSync('isToken')){
				this.isToken = uni.getStorageSync('isToken')
			}
			if(uni.getStorageSync('manager')){
				this.manager = uni.getStorageSync('manager')
			}
			this.getHouseInfo()
			// #ifdef H5
			if(!this.isAdmin){
				if(this.manager){
					this.getManagerInfo()
				}
			}else{
				if(this.manager && this.share){
					this.getManagerInfo()
				}
			}
			// #endif
			// #ifdef MP-WEIXIN
			if(this.backHome||this.flag){
				if(this.isToken){
					if(this.manager){
						this.getManagerInfo()
					}
				}else{
					if(this.manager){
						this.getManagerInfo()
						setTimeout(()=>{
							this.modalShow = true
						},1000)
					}
				}
			}
			// #endif
			// #ifdef H5
			if(uni.getStorageSync('clientName')){
				this.clientName = uni.getStorageSync('clientName')
			}
			if(!this.isAdmin && !this.clientName){
				this.modalShow = true
			}
			if(!this.isAdmin && this.manager && this.clientName){
				this.addH5Browse()
			}
			// #endif
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
		onShareAppMessage(ops) {
			if(ops.from === 'button'){	
			}
			return{
				title:this.shareTitle,
				path:this.path,
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";
	page{
		background: #F0F0F0;
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
	swiper{
		width: 750upx;
		height: 540upx;
	}
	.swiper-box {
		height: 540upx;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx');
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	.swiper-item video{
		width: 100%;
		height: 100%;
	}
	.dotsList{
		width:340rpx ;
		height: 40rpx;
		position: absolute;
		bottom: 30rpx;
		left: 206rpx;
		display: flex;
	}
	.dots{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40rpx;
	}
	.dots-video{
		width: 100rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.70);
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #5B5B5B;
	}
	.dots-video image{
		width: 16rpx;
		height: 16rpx;
		margin-right: 5rpx;
	}
	.dots-img{
		width: 90rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		background: rgba(255,255,255,0.70);
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #5B5B5B;
	}
	.active{
		background: #874A98;
		color: #FFFFFF;
	}
	.newHouse{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.newHosueName{
		width: 690rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view:first-child{
			margin-top: 30rpx;
			width: 690rpx;
			font-size: 36rpx;
			color: #5B5B5B;
			font-weight: bold;
		}
		
		& > view:last-child{
			margin:18rpx 0 30rpx 0;
			display: flex;
			width: 690rpx;
			
			.home-tips{
				width: 648rpx;
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
			
			& > view:last-child{
				width: 42rpx;
				display: flex;
				align-items: center;
				
				image{
					width: 42rpx;
					height: 37.8rpx;
				}
			}
		}
	}
	.newHouseInfo{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		margin: 34rpx 30rpx 0 30rpx;
	}
	.detail-item{
		width: 690rpx;
		height: 40rpx;
		display: flex;
		margin-bottom: 20rpx;
		
		view{
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
	.checkMore{
		width: 690rpx;
		height: 70rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 70rpx;
		color: #3270BD;
		background: #F0F1F1;
		border-radius: 4rpx;
		margin-bottom: 30rpx;
	}
	.houseTypeList{
		margin-top: 30rpx;
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			width: 690rpx;
			margin-left: 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 28rpx;
			color: #A6A6A6;
			border-bottom: 2rpx solid #F0F0F0;
		}
		
		& > view:last-child{
			width: 100%;
			white-space: nowrap;
		}
	}
	.housTypeInfo{
		display: flex;
		flex-direction: row;
		
		& > view:last-child{
			margin-right: 30rpx;
		}
		
		.houseTypeDetail{
			width:240rpx;
			margin: 30rpx 0 30rpx 30rpx;
			display: inline-block;
			
			& > view:first-child{
				width: 240rpx;
				height: 240rpx;
				border: 2rpx solid #F0F1F1;
				
				image{
					width: 240rpx;
					height: 240rpx;
				}
			}
			
			& > view:nth-child(2){
				margin-top: 20rpx;
				display: flex;
				font-size: 28rpx;
				color: #5B5B5B;
				
				& > text:first-child{
					flex: 1;
				}
				
				& > text:last-child{
					flex: 1;
					text-align: right;
				}
			}
			
			& > view:nth-child(3){
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #FE9E2E;
				font-weight: bold;
			}
			
			& > view:last-child{
				margin-top: 10rpx;
				width: 60rpx;
				height: 36rpx;
				font-size: 20rpx;
				line-height: 36rpx;
				padding: 0 10rpx;
				border-radius: 4rpx;
				text-align: center;
			}
			
			.orange{
				background: #F2845C;
				color: #FFFFFF;
			}
			
			.green{
				background: #48D2AB;
				color: #FFFFFF;
			}
			
			.gray{
				background: #F0F1F1;
				color: #A6A6A6;
			}
		}
	}
	.agent{
		width: 100%;
		height: 148rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
	}
	.agent-avatar{
		margin: 0 30rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.bajiaostar.com/FgkVAFlA5etvApeTeLEt2P0s822H');
		
		& > image{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}
	}
	.agent-info{
		width: 554rpx;
		height: 148rpx;
		display: flex;
		flex-direction: column;
		
		& > text:first-child{
			margin-top: 30rpx;
			font-size: 28rpx;
			color: #5B5B5B;
			font-weight: bold;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		
		& > text:nth-child(2){
			font-size: 24rpx;
			margin-top: 10rpx;
			color: #5B5B5B;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	.arrow-right{
		width: 16rpx;
		height: 148rpx;
		display: flex;
		align-items: center;
		
		& > image{
			width: 16rpx;
			height: 26rpx;
		}
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
	.content-detail{
		padding: 30rpx 30rpx;
		width: 690rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
	}
	.favorites{
		width: 750rpx;
		height: 740rpx;
		display: flex;
		flex-direction: column;
		.favorites-title{
			width: 750rpx;
			height: 90rpx;
			background: #F0F0F0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 17px;
			color: #030303;
			font-weight: bold;
		}
		.close-icon{
			width: 26rpx;
			height: 26rpx;
			position: absolute;
			right: 40rpx;
			top: 30rpx;
			image{
				width: 26rpx;
				height: 26rpx;
			}
		}
		.favortes-add{
			width: 750rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #F5F5F5;
			font-size: 34rpx;
			color: #874A98;
			font-weight: bold;
			image{
				width: 24rpx;
				height: 24rpx;
				margin: 0 30rpx;
			}
		}
		.favorites-list{
			width: 750rpx;
			height: 336rpx;
			display: flex;
			flex-direction: column;
			.favorites-item{
				width: 720rpx;
				margin-left: 30rpx;
				height: 110rpx;
				border-bottom: 2rpx solid #F5F5F5;
				display: flex;
				align-items: center;
				& > view:first-child{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					& > text:first-child{
						font-size: 34rpx;
						color: #030303;
						font-weight: bold;
					}
				}
				& > view:last-child{
					flex: 1;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.choose-box{
						width: 36rpx;
						height: 36rpx;
						display: flex;
						align-items: center;
						margin-right: 30rpx;
						border: 1px solid #D9D9D9;
						border-radius: 50%;
					}
					.chooseIcon{
						width: 36rpx;
						height: 36rpx;
						display: flex;
						align-items: center;
						margin-right: 30rpx;
						border: 1px solid #874A89;
						border-radius: 50%;
						display: flex;
						align-content: center;
						justify-content: center;
						view{
							width: 24rpx;
							height: 24rpx;
							border-radius: 50%;
							background: #874A98;
						}
					}
				}
			}
		}
		.favorites-button{
			width: 690rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #FFFFFF;
			background: #874A98;
			border-radius: 2px;
			margin: 110rpx 30rpx 0 30rpx;
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
	.popup-modal{
		width: 600rpx;
		display: flex;
		flex-direction: column;
		.popup-title{
			width: 500rpx;
			display: flex;
			align-items: center;
			font-size: 40rpx;
			color: #5B5B5B;
			margin: 40rpx 50rpx;
			font-weight: bold;
		}
		.popup-tips{
			width: 500rpx;
			margin: 0 50rpx;
			padding-bottom: 30rpx;
			border-bottom: 2rpx solid #f0f1f1;
			font-size: 14px;
			color: #5B5B5B;
			letter-spacing: -0.34px;
		}
		.popup-content{
			width: 500rpx;
			margin: 50rpx 50rpx;
			display: flex;
			align-items: center;
			& > view:first-child{
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
				background: #D8D8D8;
			}
			& > view:last-child{
				font-size: 28rpx;
				color: #A2A2A2;
				letter-spacing: -0.34px;
				margin-left: 20rpx;
			}
		}
		.popup-button{
			width: 500rpx;
			margin: 0 50rpx 50rpx 50rpx;
			display: flex;
			align-items: center;
			& > view:first-child{
				width: 236rpx;
				height: 80rpx;
				background: #F0F1F1;
				border-radius: 14rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				color: #6D7278;
				letter-spacing: -0.34px;
			}
			& > view:last-child{
				margin-left: 28rpx;
				width: 236rpx;
				height: 80rpx;
				background: #874A98;
				border-radius: 14rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
		}
	}
</style>
