<template>
	<view>
		<!-- 导航栏 -->
		<view class="header">
			<view class="search-bar">
				<view class="search-input">
					<view class="search-icon">
						<image src="../../static/icon/search.png"></image>
					</view>
					<view class="search-content"><input type="text" placeholder="请输入小区名或地址" @confirm="searchHome" v-model="content" placeholder-class="placeHolderClass" confirm-type="search"></view>
					<view class="close-icon" v-if="content.length > 0" @click="clear">
						<image src="../../static/icon/close.png" mode=""></image>
					</view>
				</view>
				<view class="findHome" @click="goMapSearch">
					<image src="../../static/icon/location-2.png"></image>
				</view>
			</view>
			<!-- 条件搜索 -->
			<dropChoose :condition="tab" @region="regionChoose" @price="priceChoose" @type="typeChoose" @size="sizeChoose" @more="moreChoose"  @sort="sortChoose"></dropChoose>
		</view>
		<view class="soleNum">
			<text class="soleNum-text">独家委托（{{soleNum}}套）</text>
		</view>
		<!-- 住房列表 -->
		<mescroll-uni :down="downOption" @down="downCallback" :marginTop="top">
			<scroll-view class="homeList" scroll-y style="height: calc(100vh - 266rpx);" @scrolltolower="loadMore" v-if="!isEmpty">
				<view class="home-info" v-for="(item,index) in homeList" :key="index" @click="checkDetail(item.houseId)">
					<view class="home-pic">
						<image :src="item.picUrl[0]" lazy-load="true"></image>
					</view>
					<view class="home-detail">
						<view class="homeName"><text>{{item.houseName}}</text></view>
						<view class="home-address"><text space="nbsp">{{item.provinceString}} |{{item.areaName}}</text><text v-if="isAdmin">|{{item.buildNum}}栋{{item.roomNum}}</text></view>
						<view class="home-tips">
							<view :class="[{'tips-1':labIndex == 0,'tips-2':labIndex == 1,'tips-3':labIndex == 2}]" v-for="(it,labIndex) in item.label" :key="labIndex"><text>{{it}}</text></view>
						</view>
						<view class="home-price"><text>{{item.price}}万({{item.acreage}}m²|{{item.unitPrice}}元/m²)</text></view>
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
		<getApp :windowBottom="windowBottom"></getApp>
		<!-- #endif -->
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
	</view>
</template>

<script>
	import dropChoose from '../../components/drop-choose/drop-choose.vue'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import loginModal from '../../components/Modal/loginModal.vue'	
	export default{
		name:'sole',
		components:{
			dropChoose,uniLoadMore,MescrollUni,loginModal
		},
		data(){
			return{
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				top:'266rpx',
				hasFlag: true,
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				tab: [{
					id: 1,
					name: '区域'
				}, {
					id: 2,
					name: '售价'
				}, {
					id: 3,
					name: '房型'
				}, {
					id: 4,
					name: '面积'
				}],
				content:'',
				homeList: [],
				areaId:'',//小区id
				beginAcreage:'',//最小面积
				beginBuildNum:'',//最小栋座
				beginLevel:'',//最小楼层
				beginPrice:'',//最低价
				endAcreage:'',//最大面积
				endBuildNum:'',//最大栋座
				endLevel:'',//最大楼层
				endPrice:'',//最高价
				page:0,
				province:'',//区域
				roomNum:'',//房号
				room1:'',//房型（室）
				soleNum:'0',
				isEmpty:false,
				isAdmin:false,//是否为经纪人
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
				windowBottom:0
			}
		},
		methods:{
			// 获取独家委托列表
			async getOnlyEntrust(){
				if (!this.hasFlag) return // 说明已经没有更多
				this.page = ++this.page
				let res = await this.$fetch(this.$api.oldHouseCondition2,{
					areaId:this.areaId,beginAcreage:this.beginAcreage,beginBuildNum:this.beginBuildNum,beginLevel:this.beginLevel,beginPrice:this.beginPrice,
					endAcreage:this.endAcreage,endBuildNum:this.endBuildNum,endLevel:this.endLevel,endPrice:this.endPrice,pageNum:this.page,entrust:1,province:this.province,
					roomNum:this.roomNum,houseName:this.content,room1:this.room1,pageSize:10,sortUnitPrice:this.sortUnitPrice,
					sortPublish:this.sortPublish,
					sortPrice:this.sortPrice,
					sortLevel:this.sortLevel,
					sortAcreage:this.sortAcreage,
					renovation:this.renovation,
					type:this.type,
					elevator:this.elevator,
					},'GET')
				res.rows.forEach(item =>{
					if(item.picUrl){
						item.picUrl = item.picUrl.split(',')
					}
					if(item.label){
						item.label = item.label.split(',')
					}
				})
				this.soleNum = res.total;
				if(this.soleNum){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.homeList = [...this.homeList,...res.rows]
				this.hasFlag = 10*this.page < res.total
				if(!this.hasFlag){
					this.status = 'noMore'
				}
			},
			// 加载更多
			loadMore(){
				if(this.hasFlag){
					this.getOnlyEntrust()
				}else{
					this.status = 'noMore'
				}
			},
			// 下拉刷新
			downCallback(mescroll){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.getOnlyEntrust();
				mescroll.endSuccess();
			},
			// 区域选择
			regionChoose(data){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.province = data;
				this.getOnlyEntrust()
			},
			// 售价选择
			priceChoose(data){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.beginPrice = data[0];
				this.endPrice = data[1];
				this.getOnlyEntrust()
			},
			// 房型选择
			typeChoose(data){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.room1 = data;
				this.getOnlyEntrust()
			},
			// 面积选择
			sizeChoose(data){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.beginAcreage = data[0]
				this.endAcreage = data[1]
				this.getOnlyEntrust()
			},
			// 搜索
			searchHome(){
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.getOnlyEntrust()
			},
			// 清空搜索内容
			clear(){
				this.content = ''
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.getOnlyEntrust()
			},
			// 更多选择
			moreChoose(data){
				console.log(data);
				this.beginBuildNum = data[0]
				this.endBuildNum = data[1]
				this.beginLevel = data[2]
				this.endLevel = data[3]
				this.roomNum = data[4]
				this.renovation = data[5];
				this.elevator = data[6];
				this.type = data[7];
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading'
				this.homeList = [];
				this.getOnlyEntrust()
			},
			// 查看房源详情
			checkDetail(id){
				if(this.manager){
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2'+'&flag=1&userId='+this.manager
					})
				}else{
					uni.navigateTo({
						url:'../oldHouse/oldHouse?houseId='+id+'&houseType=2'
					})
				}
			},
			// 地图找房
			goMapSearch(){
				uni.navigateTo({
					url:'../mapSearch/mapSearch'
				})
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
				console.log(data)	;
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
				this.getOnlyEntrust()
			}
		},
		onShow() {
			this.isAdmin = false
			uni.getSystemInfo({
				success: (res) => {
					this.windowBottom = res.windowBottom
				}
			})
			if(uni.getStorageSync('isAdmin')){
				this.isAdmin = uni.getStorageSync('isAdmin')
				// #ifdef H5
				this.manager = uni.getStorageSync('userId')
				// #endif
				if(this.isAdmin){
					this.tab =  [{id: 1,name: '区域'}, {id: 2,name: '售价'}, {id: 3,name: '房型'}, 
					{id: 4,name: '面积'},{id:5,name:'更多'},{id:6,name:'排序'}]
				}
			}else{
				if(uni.getStorageSync('manager')){
					this.manager = uni.getStorageSync('manager')
				}
				this.beginBuildNum = ''
				this.endBuildNum = ''
				this.beginLevel = ''
				this.endLevel = ''
				this.roomNum = ''
				this.renovation = ''
				this.elevator = ''
				this.type = ''
				this.page = 0;
				this.hasFlag = true;
				this.status = 'loading';
				this.homeList = [];
				this.tab = [{id: 1,name: '区域'}, {id: 2,name: '售价'}, {id: 3,name: '房型'}, {id: 4,name: '面积'},{id:6,name:'排序'}]
			}
			if(uni.getStorageSync('userId')){
				this.userId = uni.getStorageSync('userId')
			}
			this.getOnlyEntrust()
		},
		onLoad(options) {
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
			if(options.sortAcreage){this.sortAcreage = options.sortAcreage}
			if(options.sortLevel){this.sortLevel = options.sortLevel}
			if(options.sortUnitPrice){this.sortUnitPrice = options.sortUnitPrice}
			if(options.sortPrice){this.sortPrice = options.sortPrice}
			if(options.sortPublish){this.sortPublish = options.sortPublish}
			if(options.renovation){this.renovation = options.renvation}
			if(options.elevator){this.elevator = options.elevator}
			if(options.type){this.type = options.type}
			if(options.manager){
				uni.setStorageSync('manager',options.manager)
				this.manager = options.manager
				if(!uni.getStorageSync('isToken')){
					setTimeout(()=>{
						this.modalShow = true
					},1000)
				}
				console.log(options.manager);
			}
		},
		onShareAppMessage(ops) {
			this.path = 'pages/sole/sole?areaId='+this.areaId+'&beginAcreage='+this.beginAcreage+'&beginBuildNum='+this.beginBuildNum
			+'&beginLevel='+this.beginLevel+'&beginPrice='+this.beginPrice+'&endAcreage='+this.endAcreage+'&endBuildNum='+this.endBuildNum+'&endLevel='+this.endLevel+'&endPrice='+this.endPrice
			+'&province='+this.province+'&roomNum='+this.roomNum+'&houseName='+this.content+'&room1='+this.room1+'&manager='+this.userId+'&sortUnitPrice='+this.sortUnitPrice+'&sortPrice='+this.sortPrice+'&sortPublish='+this.sortPublish+'&sortLevel='+this.sortLevel
		+'&sortAcreage='+this.sortAcreage+'&renovation='+this.renovation+'&elevator='+this.elevator+'&type='+this.type
			if(ops.from === 'button'){	
			}
			return{
				title:'独家委托',
				path:this.path
			}
		}
	}
</script>

<style lang="scss">
	.header{
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		top: 0;
		height: 196rpx;
		z-index: 99;
		display: flex;
		flex-direction: column;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
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
		background: #FFFFFF;
		z-index: 99;
	}
	
	.search-input {
		width: 610rpx;
		height: 72rpx;
		border-radius: 8rpx;
		background: #F1F2F4;
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
		color: #A6A6A6;
		font-size: 24rpx;
		letter-spacing: 0.28rpx;
		margin-top: 5rpx;
		width: 486rpx;
	}
	.close-icon{
		margin-right: 20rpx;
		width: 36rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
	}
	.close-icon image{
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
	.placeHolderClass{
		color: #9B9B9B;
		font-size: 28rpx;
	}
	.soleNum{
		background: #FFFFFF;
		width: 100%;
		height: 70rpx;
		font-size: 28rpx;
		color: #030303;
		letter-spacing: -0.68rpx;
		line-height: 70rpx;
		position: fixed;
		z-index: 10;
		margin-top: 196rpx;
		/* #ifdef H5 */
		top: var(--window-top);	
		/* #endif */
		.soleNum-text{
			margin-left: 30rpx;
		}
	}
	.homeList {
		width: 100%;
		background: #FFFFFF;
		// margin-top:266rpx;
		.home-info {
			display: flex;
			flex-direction: row;
			margin-left: 30rpx;
			// padding-top: 40rpx;
			height: 250rpx;
			// padding-bottom: 30rpx;
			border-bottom: 2rpx solid #F7F7F7;
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
			color: #5B5B5B;
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
			color: #A6A6A6;
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
	
			.tips-1 {
				background: rgba(241, 78, 44, 0.15);
				border-radius: 8rpx;
				font-size: 20rpx;
				color: #F14E2C;
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
				color: #4A90E2;
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
		}
	
		.home-price {
			font-size: 28rpx;
			color: #FE9E2E;
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
	.noData{
		background: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
	}
</style>
