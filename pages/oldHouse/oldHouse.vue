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
						<video :src="item" controls :poster="videoPic" objectFit="fill"  @play="videoPlay" id="houseVideo"></video>
					</view>
					<view :class="item.colorClass" class="swiper-item" v-if="(isVideo&&index !=0) || (!isVideo) " @click="viewImage(index)">
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
		<!-- 房源详情 -->
		<view class="oldHouse" v-if="loadShow">
			<view class="oldHouseName" v-if="houseType == 2">
				<view>
					<text>{{oldHouseInfo.houseName}}</text>
					<image src="../../static/icon/9.png" mode="" v-if="isCollect == 0" @click="handleToShowFavorites"></image>
					<image src="../../static/icon/10.png" mode="" v-if="isCollect == 1" @click="handleToShowFavorites"></image>
				</view>
			</view>
			<view class="rentHouse" v-if="houseType == 1">
				<view>
					<text>{{oldHouseInfo.houseName}}</text>					
				</view>
				<view>
					<text v-if="oldHouseInfo.rentType == 1">整租/</text><text v-if="oldHouseInfo.rentType == 2">合租/</text>
					<text v-if="oldHouseInfo.elevator == 2">无电梯</text><text v-if="oldHouseInfo.elevator == 1">有电梯</text>
					<image src="../../static/icon/9.png" mode="" v-if="isCollect == 0" @click="handleToShowFavorites"></image>
					<image src="../../static/icon/10.png" mode="" v-if="isCollect == 1" @click="handleToShowFavorites"></image>
				</view>
			</view>
			<view class="oldHouseInfo">
				<view>
					<text v-if="houseType == 2">{{oldHouseInfo.price}}万</text>
					<text v-if="houseType == 1">{{oldHouseInfo.rental}}元/月</text>
					<text>售价</text>
				</view>
				<view>
					<text>{{oldHouseInfo.room1}}室{{oldHouseInfo.room2}}厅{{oldHouseInfo.room3}}卫</text>
					<text>房型</text>
				</view>
				<view>
					<text>{{oldHouseInfo.acreage}}m²</text>
					<text>面积</text>
				</view>
			</view>
			<view class="oldHouseDetail" v-if="houseType == 2">
				<view class="detail-item">
					<view>
						<text>单价</text><text>{{oldHouseInfo.unitPrice}}元/m²</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">朝向</text><text v-if="oldHouseInfo.orientation == 1">南北</text>
						<text v-if="oldHouseInfo.orientation == 2">东南北</text><text v-if="oldHouseInfo.orientation == 3">西南北</text>
						<text v-if="oldHouseInfo.orientation == 4">东西</text><text v-if="oldHouseInfo.orientation == 5">东南</text>
						<text v-if="oldHouseInfo.orientation == 6">东北</text><text v-if="oldHouseInfo.orientation == 7">西南</text>
						<text v-if="oldHouseInfo.orientation == 8">西北</text><text v-if="oldHouseInfo.orientation == 9">南</text>
						<text v-if="oldHouseInfo.orientation == 10">北</text><text v-if="oldHouseInfo.orientation == 11">东</text>
						<text v-if="oldHouseInfo.orientation == 12">西</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>装修</text><text v-if="oldHouseInfo.renovation == 1">精装修</text>
						<text v-if="oldHouseInfo.renovation == 2">毛坯房</text><text v-if="oldHouseInfo.renovation == 3">普通装修</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">年代</text><text>{{oldHouseInfo.years}}年</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>类型</text><text v-if="!oldHouseInfo.type">未知</text>
						<text v-if="oldHouseInfo.type == 1">住宅</text><text v-if="oldHouseInfo.type == 2">商住</text>
						<text v-if="oldHouseInfo.type == 3">商业</text><text v-if="oldHouseInfo.type == 4">公寓</text>
						<text v-if="oldHouseInfo.type == 5">酒店</text><text v-if="oldHouseInfo.type == 6">店连屋</text>
						<text v-if="oldHouseInfo.type == 7">车库</text><text v-if="oldHouseInfo.type == 8">别墅</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">房本年限</text><text v-if="!oldHouseInfo.premisesPermit">未知</text>
						<text v-if="oldHouseInfo.premisesPermit == 1">满五唯一</text><text v-if="oldHouseInfo.premisesPermit == 2">满二</text>
						<text v-if="oldHouseInfo.premisesPermit == 3">不满二</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>电梯</text><text v-if="!oldHouseInfo.elevator">未知</text>
						<text v-if="oldHouseInfo.elevator == 1">有</text><text v-if="oldHouseInfo.elevator == 2">无</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">唯一住房</text><text v-if="!oldHouseInfo.onlyHouse">未知</text>
						<text v-if="oldHouseInfo.onlyHouse == 1">是</text><text v-if="oldHouseInfo.onlyHouse == 2">否</text>
					</view>
				</view>
				<view class="detail-item" v-if="isAdmin">
					<view>
						<text>栋座</text><text v-if="oldHouseInfo.buildNum">{{oldHouseInfo.buildNum}}</text>
						<text v-else>未知</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">房号</text><text v-if="oldHouseInfo.roomNum">{{oldHouseInfo.roomNum}}</text>
						<text v-else>未知</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>楼层</text><text>{{oldHouseInfo.level}}层/{{oldHouseInfo.allLevel}}层</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>预算</text><text v-if="!oldHouseInfo.budget">未知</text>
						<text v-else>{{oldHouseInfo.budget}}</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>小区</text><text style="color: #4A90E2;" @click="goArea(oldHouseInfo.areaId)">{{oldHouseInfo.areaName}}</text>
					</view>
				</view>
			</view>
			<view class="oldHouseDetail" v-if="houseType == 1">
				<view class="detail-item">
					<view>
						<text>付款</text><text>{{oldHouseInfo.payMethod}}</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">发布</text><text>{{oldHouseInfo.createTime}}</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>朝向</text><text v-if="oldHouseInfo.orientation == 1">南北</text>
						<text v-if="oldHouseInfo.orientation == 2">东南北</text><text v-if="oldHouseInfo.orientation == 3">西南北</text>
						<text v-if="oldHouseInfo.orientation == 4">东西</text><text v-if="oldHouseInfo.orientation == 5">东南</text>
						<text v-if="oldHouseInfo.orientation == 6">东北</text><text v-if="oldHouseInfo.orientation == 7">西南</text>
						<text v-if="oldHouseInfo.orientation == 8">西北</text><text v-if="oldHouseInfo.orientation == 9">南</text>
						<text v-if="oldHouseInfo.orientation == 10">北</text><text v-if="oldHouseInfo.orientation == 11">东</text>
						<text v-if="oldHouseInfo.orientation == 12">西</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">楼层</text><text>{{oldHouseInfo.level}}层/{{oldHouseInfo.allLevel}}层</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>装修</text><text v-if="oldHouseInfo.renovation == 1">精装修</text>
						<text v-if="oldHouseInfo.renovation == 2">毛坯房</text><text v-if="oldHouseInfo.renovation == 3">普通装修</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">类型</text><text v-if="!oldHouseInfo.type">未知</text>
						<text v-if="oldHouseInfo.type == 1">住宅</text><text v-if="oldHouseInfo.type == 2">商住</text>
						<text v-if="oldHouseInfo.type == 3">商业</text><text v-if="oldHouseInfo.type == 4">公寓</text>
						<text v-if="oldHouseInfo.type == 5">酒店</text>
					</view>
				</view>
				<view class="detail-item">
					<view>
						<text>小区</text><text style="color: #4A90E2;" @click="goArea(oldHouseInfo.areaId)">{{oldHouseInfo.areaName}}</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">年代</text><text>{{oldHouseInfo.years}}</text>
					</view>
				</view>
				<view class="detail-item" v-if="isAdmin">
					<view>
						<text>栋座</text><text v-if="oldHouseInfo.buildNum">{{oldHouseInfo.buildNum}}</text>
						<text v-else>未知</text>
					</view>
					<view>
						<text style="margin-left: 30rpx;">房号</text><text v-if="oldHouseInfo.roomNum">{{oldHouseInfo.roomNum}}</text>
						<text v-else>未知</text>
					</view>
				</view>
			</view>
			<view class="oldHouseSpecial">
				<view class="special-list">
					<view v-if="oldHouseInfo.special1" class="special">
						<text>房源特色</text>
						<image src="../../static/icon/Group20.png" mode="" v-if="oldHouseInfo.special1 == 1"></image>
						<image src="../../static/icon/11.png" mode="" v-if="oldHouseInfo.special1 == 2"></image>
						<image src="../../static/icon/Group20Copy.png" mode="" v-if="oldHouseInfo.special1 == 3"></image>
					</view>
					<view v-if="oldHouseInfo.special2">
						<text>房源特点</text><text>{{oldHouseInfo.special2}}</text>
					</view>
					<view v-if="oldHouseInfo.special3">
						<text>户型介绍</text><text>{{oldHouseInfo.special3}}</text>
					</view>
					<view v-if="oldHouseInfo.special4">
						<text>交通出行</text><text>{{oldHouseInfo.special4}}</text>
					</view>
				</view>
				<!-- 地图 -->
				<map :latitude="lat" :longitude="lng" :markers="markers" scale="13" show-scale="true" enable-zoom = "true" @tap="checkMap"></map>
			</view>
			<!-- 跟进记录 -->
			<view class="followUp" v-if="isAdmin" @click="checkFollow">
				<image src="../../static/icon/genjinjilu.png" mode=""></image>
				<text>查看跟进记录</text>
				<image src="../../static/icon/DisclosureIndicator.png" mode="" class="right"></image>
			</view>
		</view>
		<!-- 房间配置 -->
		<view class="roomConfig" v-if="houseType == 1 && loadShow">
			<view class="config-tit"><text>房屋配置</text></view>
			<view>
				<uni-grid :show-border="false" column-num="5" :options="roomConfig" @click="jump"></uni-grid>
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
	export default {
		name:'oldHouse',
		components:{
			uniSwiperDot,Guess,uniGrid,loginModal
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
				oldHouseInfo:{},//房源信息
				lat:'',
				lng:'',
				markers:[],
				avatar:'',
				userName:'',
				company:'',
				homeList:[],
				houseType:'',
				isCollect:'',
				mobile:'',//房东手机号
				postName:'',
				userId:'',
				isAdmin:false,
				roomConfig:[
					{image:'../../static/icon/bed-off.png',text:'床',have:false},{image:'../../static/icon/bingxiang-off.png',text:'冰箱',have:false},
					{image:'../../static/icon/kongtiao-off.png',text:'空调',have:false},{image:'../../static/icon/xiyi-off.png',text:'洗衣机',have:false},
					{image:'../../static/icon/tv-off.png',text:'电视',have:false},{image:'../../static/icon/wifi-off.png',text:'宽带',have:false},
					{image:'../../static/icon/sofa-off.png',text:'沙发',have:false},{image:'../../static/icon/zuofan-off.png',text:'可做饭',have:false},
					{image:'../../static/icon/yigui-off.png',text:'衣柜',have:false},{image:'../../static/icon/yangtai-off.png',text:'阳台',have:false},
					{image:'../../static/icon/nuanqi-off.png',text:'暖气',have:false},{image:'../../static/icon/reshui-off.png',text:'热水器',have:false},
					{image:'../../static/icon/wc-off.png',text:'卫生间',have:false}
				],
				isToken:false,
				manager:'',
				loadShow:false,
				backHome:false,//是否回到首页
				phone:'',//经纪人手机号
				modalShow:false,
				flag:true,
				ownerName:'',//房东名字
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
			// 百度地图转腾讯地图
			bMapToTxMap(bd_lat,bd_lng){
				var point = new Object();
				var x_pi = 3.14159265358979324 * 3000.0 / 180.0; 
				var x = bd_lng - 0.0065;
				var y = bd_lat - 0.006;
				var z = Math.sqrt(x*x+y*y)- 0.00002 * Math.sin(y * x_pi); 
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi); 
				var Mars_lng = z * Math.cos(theta);
				var Mars_lat = z * Math.sin(theta);
				point.longitude = Mars_lng;
				point.latitude = Mars_lat;
				return point;
			},
			// 获取房源详情
			async getHouseInfo(){
				this.swiperList = []
				let res = await this.$fetch(this.$api.houseInfo,{houseId:this.houseId},'GET')
				this.isCollect = res.data.collect
				if(res.data.oldHouse.movieUrl){
					this.videoPic = res.data.oldHouse.movieFirst;
					this.swiperList.push(res.data.oldHouse.movieUrl)
					this.isVideo = true
				}else{
					this.isVideo = false
				}
				if(res.data.oldHouse.picUrl){
					let data = res.data.oldHouse.picUrl.split(',')
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
				if(res.data.oldHouse.layoutPic){
					let data = res.data.oldHouse.layoutPic.split(',')
					data.forEach(item =>{
						this.swiperList.push(item)
					})
					this.islayOut = true
				}else{
					this.islayOut = false
				}
				this.length = this.swiperList.length;
				res.data.oldHouse.createTime = this.$dayjs(res.data.oldHouse.createTime).format('YYYY-MM-DD')
				this.oldHouseInfo = res.data.oldHouse;
				// #ifdef H5
				let u = navigator.userAgent;
				let url = location.href
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isiOS){
					let wx_sdk_data = uni.getStorageSync('wx_sdk_data')
					console.log(this.oldHouseInfo.houseName);
					let shareTitle = this.oldHouseInfo.houseName
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
				// #endif
				let points = this.bMapToTxMap(this.oldHouseInfo.latitude,this.oldHouseInfo.longitude)
				this.lat = points.latitude
				this.lng = points.longitude
				this.markers.push({
					id:1,latitude:this.lat,longitude:this.lng,alpha:1,iconPath:'../../static/icon/Group23.png',
				})
				let manager = res.data.manager
				// if(!this.backHome&&!this.flag){
				// 	this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
				// 	this.userName = manager.userName
				// 	this.company = manager.company
				// 	this.phone = manager.loginName
				// 	this.postName = manager.postName
				// 	this.userId = manager.userId
				// }
				// #ifdef MP-WEIXIN
				if(!this.manager){
					this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
					this.userName = manager.userName
					this.company = manager.company
					this.phone = manager.loginName
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
						this.phone = manager.loginName
						this.postName = manager.postName
						this.userId = manager.userId
					}
				}else{
					if(!this.manager){
						this.avatar = baseURL.pro+'profile/avatar/'+manager.avatar
						this.userName = manager.userName
						this.company = manager.company
						this.phone = manager.loginName
						this.postName = manager.postName
						this.userId = manager.userId
					}
				}
				// #endif
				if(this.isAdmin == true){
					this.path = 'pages/oldHouse/oldHouse?houseId='+this.houseId+'&houseType='+this.houseType+'&userId='+this.shareUserId+'&share=1'
				}else{
					this.path = 'pages/oldHouse/oldHouse?houseId='+this.houseId+'&houseType='+this.houseType+'&share=1'
				}
				this.shareTitle = res.data.oldHouse.houseName
				this.mobile = manager.phonenumber
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
				let houseSet = res.data.oldHouse.houseSet
				if(houseSet.indexOf('101') !=-1 ){
					this.roomConfig[0].image = '../../static/icon/bed.png'
					this.roomConfig[0].have = true
				}
				if(houseSet.indexOf('102') !=-1 ){
					this.roomConfig[1].image = '../../static/icon/bingxiang.png'
					this.roomConfig[1].have = true
				}
				if(houseSet.indexOf('103') !=-1 ){
					this.roomConfig[2].image = '../../static/icon/kongtiao.png'
					this.roomConfig[2].have = true
				}
				if(houseSet.indexOf('104') !=-1 ){
					this.roomConfig[3].image = '../../static/icon/xiyi.png'
					this.roomConfig[3].have = true
				}
				if(houseSet.indexOf('105') !=-1 ){
					this.roomConfig[4].image = '../../static/icon/tv.png'
					this.roomConfig[4].have = true
				}
				if(houseSet.indexOf('106') !=-1 ){
					this.roomConfig[5].image = '../../static/icon/wifi.png'
					this.roomConfig[5].have = true
				}
				if(houseSet.indexOf('107') !=-1 ){
					this.roomConfig[6].image = '../../static/icon/sofa.png'
					this.roomConfig[6].have = true
				}
				if(houseSet.indexOf('108') !=-1 ){
					this.roomConfig[7].image = '../../static/icon/zuofan.png'
					this.roomConfig[7].have = true
				}
				if(houseSet.indexOf('109') !=-1 ){
					this.roomConfig[8].image = '../../static/icon/yigui.png'
					this.roomConfig[8].have = true
				}
				if(houseSet.indexOf('110') !=-1 ){
					this.roomConfig[9].image = '../../static/icon/yangtai.png'
					this.roomConfig[9].have = true
				}
				if(houseSet.indexOf('111') !=-1 ){
					this.roomConfig[10].image = '../../static/icon/nuanqi.png'
					this.roomConfig[10].have = true
				}
				if(houseSet.indexOf('112') !=-1 ){
					this.roomConfig[11].image = '../../static/icon/reshui.png'
					this.roomConfig[11].have = true
				}
				if(houseSet.indexOf('113') !=-1 ){
					this.roomConfig[12].image = '../../static/icon/wc.png'
					this.roomConfig[12].have = true
				}
				if(this.swiperList.length == 0){
					this.swiperList[0] = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
				this.loadShow = true
				uni.hideLoading()
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
				if(this.isAdmin){
					uni.showModal({
						title:'拨打电话',
						content:'拨打'+this.oldHouseInfo.ownerName+'电话:'+this.mobile,
						success: (res) => {
							if(res.confirm){
								uni.makePhoneCall({
									phoneNumber:this.mobile
								})
							}
						}
					})
				}else{
					uni.showModal({
						title:'拨打电话',
						content:'拨打经纪人电话:'+this.phone,
						success: (res) => {
							if(res.confirm){
								uni.makePhoneCall({
									phoneNumber:this.phone
								})
							}
						}
					})
				}
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
			// 查看跟进记录
			checkFollow(){
				uni.navigateTo({
					url:'../followList/followList?id='+this.houseId
				})
			},
			// 查看地图
			checkMap(){
				uni.navigateTo({
					url:'houseMap?lat='+this.lat+'&lng='+this.lng
				})
			},
			// 查看小区详情
			goArea(id){
				uni.navigateTo({
					url:'../xiaoqu/areaDetail?areaId='+id
				})
			},
			// 查看经纪人详情
			checkAgent(id){
				uni.navigateTo({
					url:'../agent/agentDetail?id='+id
				})
			},
			// 查看图片
			viewImage(e){
				uni.previewImage({
					urls:this.swiperList,
					current:e,
					loop:true
				})
			},
			// 分享
			goShare(){
				// #ifdef MP-WEIXIN
				if(this.isToken){
					uni.navigateTo({
						url:'../share/share?id='+this.houseId+'&houseType='+this.houseType
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
				this.phone = manager.phonenumber
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
			// 获取jsapi-ticket
			async getSDKSign(){
				let url = location.href
				let res =  await this.$fetch(this.$api.getSDKSign,{url:url},'POST','form')
				let noncestr = res.data.noncestr
				let timestamp = res.data.timestamp
				let sign = res.data.sign
				console.log(this.oldHouseInfo.houseName);
				let shareTitle = this.oldHouseInfo.houseName
				let shareUrl = location.href + '&shareFlag=1'
				let shareImg = this.shareImg
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
			console.log(options);
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
					console.log(this.manager);
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
			this.getHouseInfo()
		},
		onShow() {
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
				this.shareUserId = uni.getStorageSync('userId')
			}
			if(uni.getStorageSync('isToken')){
				this.isToken = uni.getStorageSync('isToken')
			}
			if(!uni.getStorageSync('manager')){
				this.manager = ''
			}
			// #ifdef H5
			if(uni.getStorageSync('clientName')){
				this.clientName = uni.getStorageSync('clientName')
			}
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
			if(this.backHome || this.flag){
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
		},
		onUnload() {
			if(timer){
				clearInterval(timer)
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
		width: 750rpx;
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
	.oldHouse{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.rentHouse{
		width: 690rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			margin-top: 30rpx;
			width: 690rpx;
			font-size: 36rpx;
			height: #5B5B5B;
			font-weight: bold;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		
		& > view:last-child{
			margin:20rpx 0 30rpx 0;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #A6A6A6;
			
			image{
				margin-left: 480rpx;
				width: 42rpx;
				height: 37.8rpx;
			}
		}
	}
	.oldHouseName{
		width: 690rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view {
			display: flex;
			align-items:flex-end;
			margin: 30rpx 0;
			
			text{
				width: 648rpx;
				font-size: 36rpx;
				color: #5B5B5B;
				font-weight: bold;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			
			image{
				width: 42rpx;
				height: 37.8rpx;
			}
		}
	}
	.oldHouseInfo{
		width: 690rpx;
		margin: 0 30rpx;
		height: 154rpx;
		display: flex;
		border-bottom: 2rpx solid #F0F0F0;
		
		view {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: center;
			
			& > text:first-child{
				text-align: center;
				margin-top: 32rpx;
				font-size: 36rpx;
				color: #FE9E2E;
				font-weight: bold;
			}
			
			& > text:nth-child(2){
				margin-top: 10rpx;
				text-align: center;
				color: #A6A6A6;
				font-size: 24rpx;
			}
		}
	}
	.oldHouseDetail{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		margin: 34rpx 30rpx 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
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
	.oldHouseSpecial{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		margin: 40rpx 30rpx 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
	}
	.special-list{
		width: 690rpx;
		display: flex;
		flex-direction: column;
		
		view{
			width: 690rpx;
			display: flex;
			margin-bottom: 20rpx;
			
			& > text:first-child{
				font-size: 28rpx;
				color: #A6A6A6;
				margin-right: 30rpx;
				width: 112rpx;
				white-space: nowrap;
			}
			& > image{
				width: 150rpx;
				height: 50rpx;
			}
			
			& > text:nth-child(2){
				font-size: 28rpx;
				color: #5B5B5B;
				font-weight: 600;
				width: 548rpx;
			}
		}
		.special{
			align-items: center;
		}
	}
	map{
		width: 690rpx;
		height: 260rpx;
		margin-bottom: 30rpx;
	}
	.followUp{
		width: 690rpx;
		margin: 0 30rpx;
		display: flex;
		align-items: center;
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > image:first-child{
			width: 34rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}
		
		& > text{
			font-size: 28rpx;
			color: #874A98;
		}
		
		.right{
			width: 16rpx;
			height: 26rpx;
			margin-left: 452rpx;
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
		width: 750rpx;
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
	.roomConfig{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
	}
	.config-tit{
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		color: #A6A6A6;
		font-size: 28rpx;
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
