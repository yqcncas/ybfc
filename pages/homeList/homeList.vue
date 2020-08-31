<template>
	<view>
		<!-- 导航栏 -->
		<view class="header">
			<view class="search-bar">
				<view class="search-input">
					<view class="search-icon"><image src="../../static/icon/search.png"></image></view>
					<view class="search-content">
						<input type="text" placeholder="请输入小区名或地址" @confirm="searchHome" v-model="content" placeholder-class="placeHolderClass" confirm-type="search" />
					</view>
					<view class="close-icon" v-if="content.length > 0" @click="clear"><image src="../../static/icon/close.png" mode=""></image></view>
				</view>
				<view class="findHome" @click="goMapSearch"><image src="../../static/icon/location-2.png"></image></view>
			</view>
			<!-- 条件搜索 -->
			<dropChoose :condition="tab" @region="regionChoose" @price="priceChoose" @type="typeChoose" @size="sizeChoose" @more="moreChoose" :hType="houseType" :areaId="area" :cityId="city" @sort="sortChoose"></dropChoose>
		</view>
		<!-- 住房列表 -->
		<mescroll-uni :down="downOption" @down="downCallback" :marginTop="top">
			<scroll-view class="homeList" scroll-y style="height: calc(100vh - 196rpx);" @scrolltolower="loadMore" v-if="!isEmpty">
				<view class="home-info" v-for="(item, index) in homeList" :key="index" @click="checkDetail(item.houseId)" v-if="houseType != 2">
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
						<view class="home-price" v-if="houseType == 1">
							<text>{{ item.price }}万({{ item.acreage }}m²|{{ item.unitPrice }}元/m²)</text>
						</view>
						<view class="home-price" v-if="houseType == 3">
							<text>{{ item.rental }}元/月({{ item.acreage }}m²)</text>
						</view>
					</view>
				</view>
				<view class="home-info" v-for="(item, index) in homeList" :key="index" v-if="houseType == 2" @click="checkDetail(item.areaId)">
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
				<!-- 加载 -->
				<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
			</scroll-view>
			<view v-if="isEmpty" class="noData">
				<u-empty text="暂无数据哦~" mode="favor"></u-empty>
			</view>
		</mescroll-uni>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
	</view>
</template>

<script>
	// #ifdef H5
	let jwx = require('jweixin-module')
	// #endif
import dropChoose from '../../components/drop-choose/drop-choose.vue';
import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import loginModal from '../../components/Modal/loginModal.vue'
export default {
	name: 'homeList',
	components: {
		dropChoose,
		uniLoadMore,
		MescrollUni,
		loginModal
	},
	data() {
		return {
			content: '',
			top: '196rpx',
			hasFlag: true,
			status: 'loading',
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			downOption: {
				auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
			},
			isEmpty: false,
			page: 0,
			tab: [
				{
					id: 1,
					name: '区域'
				},
				{
					id: 2,
					name: '售价'
				},
				{
					id: 3,
					name: '房型'
				},
				{
					id: 4,
					name: '面积'
				},
				{
					id:6,
					name:'排序'
				}
			],
			homeType: '',
			houseType: '',
			homeList: [],
			areaId: '', //小区id
			beginAcreage: '', //最小面积
			beginBuildNum: '', //最小栋座
			beginLevel: '', //最小楼层
			beginPrice: '', //最低价
			endAcreage: '', //最大面积
			endBuildNum: '', //最大栋座
			endLevel: '', //最大楼层
			endPrice: '', //最高价
			province: '', //区域
			roomNum: '', //房号
			room1: '', //房型（室）
			beginUnitPrice: '', //最低单价
			endUnitPrice: '' ,//最高单价
			area:'',
			city:'',
			isAdmin:false,
			title:'',
			path:'',
			userId:'',//分享人id
			modalShow:false,
			manager:'',
			sortUnitPrice:'',//单价升降序
			sortPublish:'',//发布时间升降序
			sortPrice:'',//总价升降序
			sortLevel:'',//楼层升降序
			sortAcreage:'',//面积升降序
			renovation:'',//装修类型  1-精装修 2- 毛坯房 3-普通装修
			type:'',//物业类型 1-住宅，2-商住，3-商业 4-公寓 5-酒店 6-店连屋 7-车库 8-别墅
			elevator:'',//是否有电梯 1-有 2-无
			sdistrict:0,//
			shareImg:'https://img.bajiaostar.com/2e0268c4601672d79e140d888a1f9e40',
		};
	},
	methods: {
		// 设置标题
		setTitle() {
			if (this.homeType == 1) {
				this.title = '二手房'
				uni.setNavigationBarTitle({
					title: '二手房'
				});
			}
			if (this.homeType == 2) {
				this.title = '新房'
				uni.setNavigationBarTitle({
					title: '新房'
				});
			}
			if (this.homeType == 3) {
				this.title = '租房'
				uni.setNavigationBarTitle({
					title: '租房'
				});
			}
			if (this.homeType == 4) {
				this.title = '学区房'
				uni.setNavigationBarTitle({
					title: '学区房'
				});
			}
			// #ifdef H5
			this.setShareContent()
			// #endif
		},
		// 设置转发内容
		setShareContent(){
			let u = navigator.userAgent;
				let url = location.href
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isiOS){
					let wx_sdk_data = uni.getStorageSync('wx_sdk_data')
					let shareTitle = this.title
					let shareImg = this.shareImg
					let shareUrl = location.href +'&areaId='+this.areaId+'&beginAcreage='+this.beginAcreage+'&beginBuildNum='+this.beginBuildNum
			+'&beginLevel='+this.beginLevel+'&beginPrice='+this.beginPrice+'&endAcreage='+this.endAcreage+'&endBuildNum='+this.endBuildNum+'&endLevel='+this.endLevel+'&endPrice='+this.endPrice
			+'&province='+this.province+'&roomNum='+this.roomNum+'&houseName='+this.content+'&room1='+this.room1+'&beginUnitPrice='+this.beginUnitPrice+'&endUnitPrice='+this.endUnitPrice
			+'&areaName='+this.content+'&manager='+this.manager+'&sortUnitPrice='+this.sortUnitPrice+'&sortPrice='+this.sortPrice+'&sortPublish='+this.sortPublish+'&sortLevel='+this.sortLevel
			+'&sortAcreage='+this.sortAcreage+'&renovation='+this.renovation+'&elevator='+this.elevator+'&type='+this.type+'&sdistrict='+this.sdistrict
			console.log(shareUrl);
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
		},
		// 获取jsapi-ticket
		async getSDKSign(){
			let url = location.href
			let res =  await this.$fetch(this.$api.getSDKSign,{url:url},'POST','form')
			let noncestr = res.data.noncestr
			let timestamp = res.data.timestamp
			let sign = res.data.sign
			let shareTitle = this.title
			let shareImg = this.shareImg
			let shareUrl = location.href +'&areaId='+this.areaId+'&beginAcreage='+this.beginAcreage+'&beginBuildNum='+this.beginBuildNum
		+'&beginLevel='+this.beginLevel+'&beginPrice='+this.beginPrice+'&endAcreage='+this.endAcreage+'&endBuildNum='+this.endBuildNum+'&endLevel='+this.endLevel+'&endPrice='+this.endPrice
		+'&province='+this.province+'&roomNum='+this.roomNum+'&houseName='+this.content+'&room1='+this.room1+'&beginUnitPrice='+this.beginUnitPrice+'&endUnitPrice='+this.endUnitPrice
		+'&areaName='+this.content+'&manager='+this.manager+'&sortUnitPrice='+this.sortUnitPrice+'&sortPrice='+this.sortPrice+'&sortPublish='+this.sortPublish+'&sortLevel='+this.sortLevel
		+'&sortAcreage='+this.sortAcreage+'&renovation='+this.renovation+'&elevator='+this.elevator+'&type='+this.type+'&sdistrict='+this.sdistrict
		console.log(shareUrl);
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
		// 获取二手房列表
		async getOnlyEntrust() {
			if (!this.hasFlag) return; // 说明已经没有更多
			this.page = ++this.page;
			let res = await this.$fetch(
				this.$api.oldHouseCondition2,
				{
					areaId: this.areaId,
					beginAcreage: this.beginAcreage,
					beginBuildNum: this.beginBuildNum,
					beginLevel: this.beginLevel,
					beginPrice: this.beginPrice,
					endAcreage: this.endAcreage,
					endBuildNum: this.endBuildNum,
					endLevel: this.endLevel,
					endPrice: this.endPrice,
					pageNum: this.page,
					province: this.province,
					roomNum: this.roomNum,
					houseName: this.content,
					room1: this.room1,
					sortUnitPrice:this.sortUnitPrice,
					sortPublish:this.sortPublish,
					sortPrice:this.sortPrice,
					sortLevel:this.sortLevel,
					sortAcreage:this.sortAcreage,
					renovation:this.renovation,
					type:this.type,
					elevator:this.elevator,
					pageSize: 10,
					sdistrict:this.sdistrict
				},
				'GET'
			);
			res.rows.forEach(item => {
				if (item.picUrl) {
					item.houseImg = item.picUrl.split(',')[0];
				}else{
					item.houseImg = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
				if (item.label) {
					item.label = item.label.split(',');
				}
			});
			if (res.total) {
				this.isEmpty = false;
			} else {
				this.isEmpty = true;
			}
			this.homeList = [...this.homeList, ...res.rows];
			this.hasFlag = 10 * this.page < res.total;
			if (!this.hasFlag) {
				this.status = 'noMore';
			}
		},
		// 获取新房列表
		async getNewHouseList() {
			if (!this.hasFlag) return; // 说明已经没有更多
			this.page = ++this.page;
			let res = await this.$fetch(
				this.$api.areaCondition,
				{
					beginAcreage: this.beginAcreage,
					beginUnitPrice: this.beginUnitPrice,
					endAcreage: this.endAcreage,
					endUnitPrice: this.endUnitPrice,
					pageNum: this.page,
					province: this.province,
					areaName: this.content,
					room1: this.room1,
					pageSize: 10
				},
				'GET'
			);
			res.rows.forEach(item => {
				if (item.picUrl) {
					item.houseImg = item.picUrl.split(',')[0];
				}else{
					item.houseImg = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
				if (item.label) {
					item.label = item.label.split(',');
				}
			});
			if (res.total) {
				this.isEmpty = false;
			} else {
				this.isEmpty = true;
			}
			this.homeList = [...this.homeList, ...res.rows];
			this.hasFlag = 10 * this.page < res.total;
			if (!this.hasFlag) {
				this.status = 'noMore';
			}
		},
		// 获取租房列表
		async getOldHouseList() {
			if (!this.hasFlag) return; // 说明已经没有更多
			this.page = ++this.page;
			let res = await this.$fetch(
				this.$api.oldHouseCondition1,
				{
					beginAcreage: this.beginAcreage,
					beginBuildNum: this.beginBuildNum,
					beginLevel: this.beginLevel,
					beginRental: this.beginUnitPrice,
					endAcreage: this.endAcreage,
					endBuildNum: this.endBuildNum,
					endLevel: this.endLevel,
					endRental: this.endUnitPrice,
					pageNum: this.page,
					province: this.province,
					roomNum: this.roomNum,
					houseName: this.content,
					room1: this.room1,
					sortUnitPrice:this.sortUnitPrice,
					sortPublish:this.sortPublish,
					sortPrice:this.sortPrice,
					sortLevel:this.sortLevel,
					sortAcreage:this.sortAcreage,
					renovation:this.renovation,
					type:this.type,
					elevator:this.elevator,
					pageSize: 10
				},
				'GET'
			);
			res.rows.forEach(item => {
				if (item.picUrl) {
					item.houseImg = item.picUrl.split(',')[0];
				}else{
					item.houseImg = 'https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx'
				}
				if (item.label) {
					item.label = item.label.split(',');
				}
			});
			if (res.total) {
				this.isEmpty = false;
			} else {
				this.isEmpty = true;
			}
			this.homeList = [...this.homeList, ...res.rows];
			this.hasFlag = 10 * this.page < res.total;
			if (!this.hasFlag) {
				this.status = 'noMore';
			}
		},
		// 加载更多
		loadMore() {
			if (this.hasFlag) {
				if (this.houseType == 1) {
					this.getOnlyEntrust();
				} else if (this.houseType == 2) {
					this.getNewHouseList();
				} else if (this.houseType == 3) {
					this.getOldHouseList();
				}
			} else {
				this.status = 'noMore';
			}
		},
		// 下拉刷新
		downCallback(mescroll) {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			mescroll.endSuccess();
		},
		// 区域选择
		regionChoose(data) {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			this.province = data;
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 售价选择
		priceChoose(data) {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			if (this.houseType == 1) {
				this.beginPrice = data[0];
				this.endPrice = data[1];
			} else {
				this.beginUnitPrice = data[0];
				this.endUnitPrice = data[1];
			}
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 房型选择
		typeChoose(data) {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			this.room1 = data;
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 面积选择
		sizeChoose(data) {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			this.beginAcreage = data[0];
			this.endAcreage = data[1];
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 搜索
		searchHome() {
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 清空搜索内容
		clear() {
			this.content = '';
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 更多选择
		moreChoose(data) {
			console.log(data);
			this.beginBuildNum = data[0];
			this.endBuildNum = data[1];
			this.beginLevel = data[2];
			this.endLevel = data[3];
			this.roomNum = data[4];
			this.renovation = data[5];
			this.elevator = data[6];
			this.type = data[7];
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			if (this.houseType == 1) {
				this.getOnlyEntrust();
			} else if (this.houseType == 2) {
				this.getNewHouseList();
			} else if (this.houseType == 3) {
				this.getOldHouseList();
			}
			this.setShareContent()
		},
		// 查看房源详情
		checkDetail(id){
			if(this.houseType == 1){
				if(this.manager){
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2&flag=1'+'&userId='+this.manager
					})
				}else{
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2'
					})
				}
			}else if(this.houseType == 3){
				if(this.manager){
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=1&flag=1'+'&userId='+this.manager
					})
				}else{
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=1'
					})
				}
			}else if(this.houseType == 2){
				if(this.manager){
					uni.navigateTo({
						url:'../newHouse/newHouse?houseId='+id+'&houseType=3&flag=1'+'&userId='+this.manager
					})
				}else{
					uni.navigateTo({
						url:'../newHouse/newHouse?houseId='+id+'&houseType=3'
					})
				}
			}
		},
		// 地图找房
		goMapSearch(){
			if(this.houseType == 1){
				uni.navigateTo({
					url:'../mapSearch/mapSearch?index=0'
				})
			}else if(this.houseType == 2){
				uni.navigateTo({
					url:'../mapSearch/mapSearch?index=2'
				})
			}else if(this.houseType == 3){
				uni.navigateTo({
					url:'../mapSearch/mapSearch?index=1'
				})
			}
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
		// 排序选择
		sortChoose(data){
			this.page = 0;
			this.hasFlag = true;
			this.status = 'loading';
			this.homeList = [];
			if(data == 1){
				this.sortAcreage = ''
				this.sortLevel = ''
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}else if(data == 2){
				this.sortAcreage = ''
				this.sortLevel = ''
				this.sortPrice = ''
				this.sortUnitPrice = ''
				this.sortPublish = 'desc'
			}else if(data == 3){
				this.sortAcreage = ''
				this.sortLevel = ''
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = 'asc'
			}else if(data == 4){
				this.sortAcreage = ''
				this.sortLevel = ''
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = 'desc'
			}else if(data == 5){
				this.sortAcreage = 'asc'
				this.sortLevel = ''
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}else if(data == 6){
				this.sortAcreage = 'desc'
				this.sortLevel = ''
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}else if(data == 7){
				this.sortAcreage = ''
				this.sortLevel = ''
				this.sortPrice = 'asc'
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}else if(data == 8){
				this.sortAcreage = ''
				this.sortLevel = ''
				this.sortPrice = 'desc'
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}else if(data == 9){
				this.sortAcreage = ''
				this.sortLevel = 'asc'
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}else if(data == 10){
				this.sortAcreage = ''
				this.sortLevel = 'desc'
				this.sortPrice = ''
				this.sortPublish = ''
				this.sortUnitPrice = ''
			}
			if(this.houseType == 1){
				this.getOnlyEntrust()
			}else if(this.houseType == 2){
				this.getNewHouseList();
			}else if(this.houseType == 3){
				this.getOldHouseList();
			}
			this.setShareContent()
		}
	},
	onLoad(options) {
		this.homeType = options.id;
		if(options.areaId){this.areaId = options.areaId}
		if(options.beginAcreage){this.beginAcreage = options.beginAcreage}
		if(options.beginBuildNum){this.beginBuildNum = options.beginBuildNum}
		if(options.beginLevel){this.beginLevel = options.beginLevel}
		if(options.beginPrice){this.beginPrice = options.beginPrice}
		if(options.endAcreage){this.endAcreage = options.endAcreage}
		if(options.endBuildNum){this.endBuildNum = options.endBuildNum}
		if(options.endLevel){this.endLevel = options.endLevel}
		if(options.endPrice){this.endPrice = options.endPrice}
		if(options.province){this.province = options.province}
		if(options.roomNum){this.roomNum = options.roomNum}
		if(options.houseName){this.content = options.houseName}
		if(options.room1){this.room1 = options.room1}
		if(options.beginUnitPrice){this.beginUnitPrice = options.beginUnitPrice}
		if(options.endUnitPrice){this.endUnitPrice = options.endUnitPrice}
		if(options.sortAcreage){this.sortAcreage = options.sortAcreage}
		if(options.sortLevel){this.sortLevel = options.sortLevel}
		if(options.sortUnitPrice){this.sortUnitPrice = options.sortUnitPrice}
		if(options.sortPrice){this.sortPrice = options.sortPrice}
		if(options.sortPublish){this.sortPublish = options.sortPublish}
		if(options.renovation){this.renovation = options.renvation}
		if(options.elevator){this.elevator = options.elevator}
		if(options.type){this.type = options.type}
		if(options.sdistrict){this.sdistrict = options.sdistrict}
		if(options.areaName){
			this.content = options.areaName
		}
		if(options.manager){
			console.log(options.manager);
			uni.setStorageSync('manager',options.manager)
			if(!uni.getStorageSync('isAdmin')){
				this.manager = options.manager
			}
			// #ifdef MP-WEIXIN
			if(!uni.getStorageSync('isToken')){
				setTimeout(()=>{
					this.modalShow = true
				},1000)
			}
			// #endif
		}else{
			if(uni.getStorageSync('manager') && !uni.getStorageSync('isAdmin')){
				this.manager = uni.getStorageSync('manager')
				console.log(this.manager);
			}
		}
		if (this.homeType == 4) {
			this.houseType = 1;
			this.sdistrict = 1
			this.area = '330302'
			this.city = '33030201'
			this.province = '33030201'
		} else {
			this.houseType = options.id;
		}
		this.setTitle();
	},
	onShow() {
		if (this.houseType == 1) {
			this.getOnlyEntrust();
		} else if (this.houseType == 2) {
			this.getNewHouseList();
		} else if (this.houseType == 3) {
			this.getOldHouseList();
		}
		if(!uni.getStorageSync('manager')){
			this.manager = ''
		}
		if(uni.getStorageSync('isAdmin')){
			this.isAdmin = uni.getStorageSync('isAdmin')
			// #ifdef H5
			this.manager  = uni.getStorageSync('userId')			
			// #endif
			if(this.isAdmin){
				if(this.houseType != 2){
					this.tab =  [{id: 1,name: '区域'}, {id: 2,name: '售价'}, {id: 3,name: '房型'},
					{id: 4,name: '面积'},{id:5,name:'更多'},{id:6,name:'排序'}]
				}else{
					this.tab =  [{id: 1,name: '区域'}, {id: 2,name: '售价'}, {id: 3,name: '房型'},
					{id: 4,name: '面积'}]
				}
			}else{
				if(this.houseType != 2){
					this.tab = [{id: 1,name: '区域'}, {id: 2,name: '售价'}, {id: 3,name: '房型'}, {id: 4,name: '面积'},{id:6,name:'排序'}]
				}else{
					this.tab = [{id: 1,name: '区域'}, {id: 2,name: '售价'}, {id: 3,name: '房型'}, {id: 4,name: '面积'}]				
				}
			}
		}
		if(uni.getStorageSync('userId')){
			this.userId = uni.getStorageSync('userId')
		}
		// #ifdef H5
		if(this.title){
			this.setShareContent()
		}	
		// #endif
	},
	onShareAppMessage(ops) {
		this.path = 'pages/homeList/homeList?id='+this.homeType+'&areaId='+this.areaId+'&beginAcreage='+this.beginAcreage+'&beginBuildNum='+this.beginBuildNum
		+'&beginLevel='+this.beginLevel+'&beginPrice='+this.beginPrice+'&endAcreage='+this.endAcreage+'&endBuildNum='+this.endBuildNum+'&endLevel='+this.endLevel+'&endPrice='+this.endPrice
		+'&province='+this.province+'&roomNum='+this.roomNum+'&houseName='+this.content+'&room1='+this.room1+'&beginUnitPrice='+this.beginUnitPrice+'&endUnitPrice='+this.endUnitPrice
		+'&areaName='+this.content+'&manager='+this.userId+'&sortUnitPrice='+this.sortUnitPrice+'&sortPrice='+this.sortPrice+'&sortPublish='+this.sortPublish+'&sortLevel='+this.sortLevel
		+'&sortAcreage='+this.sortAcreage+'&renovation='+this.renovation+'&elevator='+this.elevator+'&type='+this.type+'&sdistrict='+this.sdistrict
		console.log(this.path);
		if(ops.from === 'button'){	
		}
		return{
			title:this.title,
			path:this.path
		}
	}
};
</script>

<style lang="scss">
.header {
	width: 100%;
	background: #ffffff;
	position: fixed;
	top: 0;
	height: 196rpx;
	z-index: 99;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
}
.search-bar {
	width: 100%;
	height: 106rpx;
	display: flex;
	flex-direction: row;
	position: fixed;
	/* #ifdef MP-WEIXIN */
	top: 0;
	/* #endif */
	/* #ifdef H5 */
	top:var(--window-top);
	/* #endif */
	background: #ffffff;
	z-index: 99;
}

.search-input {
	width: 610rpx;
	height: 72rpx;
	border-radius: 8rpx;
	background: #f1f2f4;
	display: flex;
	flex-direction: row;
	margin-left: 30rpx;
	align-items: center;
	margin-top: 18rpx;
}

.search-icon {
	margin-left: 30rpx;
	margin-right: 10rpx;
	width: 28rpx;
	height: 28rpx;
	display: flex;
	align-items: center;
}

.search-icon image {
	width: 28rpx;
	height: 28rpx;
}

.search-content {
	color: #a6a6a6;
	font-size: 24rpx;
	letter-spacing: 0.28rpx;
	margin-top: 5rpx;
	width: 486rpx;
}
.close-icon {
	margin-right: 20rpx;
	width: 36rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
}
.close-icon image {
	width: 36rpx;
	height: 36rpx;
}
.findHome {
	margin-left: 30rpx;
	margin-top: 18rpx;
	width: 50rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	image {
		width: 50rpx;
		height: 50rpx;
	}
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
.noData {
	background: #ffffff;
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 100rpx;
}
</style>
