<template>
	<view>
		<view class="tab">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation>
				<view v-for="(item,index) in tabList" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
				 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
			</scroll-view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<map :latitude="lat" :longitude="lng" :scale="scale" :markers="markers" :circles="circles" @regionchange="changeRegion" id="mapSearch" @labeltap="clickLabel" enable-rotate="true"></map>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<baidu-map class="bm-view" :center="{lng: lng, lat: lat}" :zoom="scale" @zoomend="changeZoom" :dragging="drag" @touchmove="touchMove" @touchend="touchEnd">
		  <my-overlay
		  v-for="(item,index) in labelList" :key="index"
		    :position="item.position"
			:dictValue="item.dictValue"
			:count="item.count"
			:flag="item.flag"
			:areaName="item.areaName"
			:areaId="item.areaId"
			:labelIndex="index"
			@labelClick="labelClick"
			@checkMore="checkMore">
		  </my-overlay>
		</baidu-map>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef H5
	import myOverlay from '../../components/myOverlay/myOverlay.vue'		
	// #endif
	export default{
		name:'mapSearch',
		data(){
			return{
				lat:27.992827,
				lng:120.649701,
				scale:11,
				tabCurrentIndex:0,
				tabList:[
					{id:1,name:'二手房'},
					{id:2,name:'租房'},
					{id:3,name:'新房'}
				],
				houseType:2,
				markers:[],
				size:1,
				oldHouseList:[],
				newHosueList:[],
				flag1:true,//控制缩放时只调用一次接口
				flag2:true,
				flag3:true,
				flag4:true,
				markers1:[],
				markers2:[],
				markers3:[],
				markers4:[],
				circles:[],
				isUpdate:false,
				labelList:[],
				label1:[],
				label2:[],
				label3:[],
				label4:[],
				drag:false
			}
		},
		// #ifdef H5
		components:{
			myOverlay
		},
		// #endif
		methods:{
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
			// 点击选项卡
			changeTab(index) {
				this.tabCurrentIndex = index
				this.flag1 = true
				this.flag2 = true 
				this.flag3 = true
				this.flag4 = true
				this.scale = 11
				if(this.tabCurrentIndex == 0){
					this.markers = []
					this.houseType = 2
					this.searchHouse()
					this.searchxyProvince()
					this.searchxyHouse(this.lat,this.lng)
					this.markers = this.markers1
				}else if(this.tabCurrentIndex == 1){
					this.markers = []
					this.houseType = 1
					this.searchHouse()
					this.searchxyProvince()
					this.searchxyHouse(this.lat,this.lng)
					this.markers = this.markers1
				}else if(this.tabCurrentIndex == 2){
					this.markers = []
					this.houseType = 3
					this.searchNewHouse()
					this.searchNewxyProvince()
					this.searchNewxyHouse(this.lat,this.lng)
					this.markers = this.markers1
				}
			},
			// 点击房源
			clickLabel(e){
				console.log(e);
				let id = e.markerId
				if(this.scale >=17){
					if(this.houseType !=3){
						uni.navigateTo({
							url:'../xiaoqu/areaHouse?areaId='+id+'&houseType='+this.houseType
						})
					}else{
						uni.navigateTo({
							url:'../newHouse/newHouse?houseId='+id+'&houseType='+this.houseType
						})
					}
				}else if(this.scale <= 12){
					this.markers = []
					this.markers1.forEach(item =>{
						if(item.id == id){
							this.lat = item.latitude
							this.lng = item.longitude
						}
					})
					this.isUpdate = true
					this.scale = 13
				}else if(this.scale >= 13&&this.scale <=14){
					this.markers = []
					this.isUpdate = true
					this.scale = 17
					this.markers2.forEach(item =>{
						if(item.id == id){
							this.lat = item.latitude
							this.lng = item.longitude
						}
					})
				}
			},
			// #ifdef H5
			// 点击查看房源
			checkMore(data){
				console.log(data);
				if(this.scale <= 12){
					this.labelList = []
					this.label1.forEach((item,index) =>{
						if(index == data){
							this.lat = item.latitude
							this.lng = item.longitude
						}
					})
					this.isUpdate = true
					this.scale = 13
				}else if(this.scale >= 13 && this.scale <= 14){
					this.labelList = []
					this.isUpdate = true
					this.scale = 17
					this.label2.forEach((item,index) =>{
						if(index == data){
							console.log(item.latitude,item.longitude);
							this.lat = item.latitude
							this.lng = item.longitude
						}
					})
				}
			},
			// 查看房源详情
			labelClick(id){
				if(this.scale >=17){
					if(this.houseType !=3){
						uni.navigateTo({
							url:'../xiaoqu/areaHouse?areaId='+id+'&houseType='+this.houseType
						})
					}else{
						uni.navigateTo({
							url:'../newHouse/newHouse?houseId='+id+'&houseType='+this.houseType
						})
					}
				}
			},
			// 监听缩放
			changeZoom(e){
				// console.log(e.target.getZoom());
				// console.log(e.target.getCenter());
				this.scale = e.target.getZoom()
				console.log(this.isUpdate);
				if(this.isUpdate){
					if(this.scale >= 13 && this.scale <= 14 && this.flag2){
						this.labelList = []
						this.flag1 = true
						this.flag2 = false
						this.flag3 = true
						this.flag4 = true
						this.isUpdate = false
						this.labelList = this.label2
						console.log(this.isUpdate);
					}else if(this.scale >= 17&&this.flag4){
						this.labelList = []
						this.flag1 = true
						this.flag2 = true
						this.flag3 = true
						this.flag4 = false
						this.isUpdate = false
						this.labelList = this.label4
					}
				}else{
					if(this.scale < 13 &&this.flag1){
						this.labelList = []
						this.flag1 = false
						this.flag2 = true
						this.flag3 = true
						this.flag4 = true
						this.labelList = this.label1
					}else if(this.scale >= 13&&this.flag2&&this.scale <=14){
						this.labelList = []
						this.flag1 = true
						this.flag2 = false
						this.flag3 = true
						this.flag4 = true
						this.labelList = this.label2
					}else if(this.scale >=15 &&this.flag3&&this.scale <=16){
						this.labelList = []
						this.flag1 = true
						this.flag2 = true
						this.flag3 = false
						this.flag4 = true
						this.labelList = this.label3
					}else if(this.scale >= 17 && this.flag4){
						console.log('触发');
						this.labelList = []
						this.flag1 = true
						this.flag2 = true
						this.flag3 = true
						this.flag4 = false
						this.labelList = this.label4
					}
				}
			},
			// 监听拖动
			dragStart(e){
				uni.showToast({
					icon:'none',
					title:e.type
				})
			},
			// 监听地图拖动-控制drag
			touchMove(){
				this.drag = true
			},
			touchEnd(){
				this.drag = false
			},
			//
			// #endif
			// 缩放等级变化
			changeRegion(e){
				console.log(e);
				this.mapCtx = uni.createMapContext('mapSearch')
				console.log(this.mapCtx);
				this.mapCtx.getCenterLocation({
					success: (res) => {
						console.log(res);
						this.lat = res.latitude
						this.lng = res.longitude
					}
				})
				this.mapCtx.getScale({
					success: (res) => {
						console.log(res.scale);
					}
				})
				if(this.isUpdate){
					if(this.scale >= 13 && this.scale <= 14 && this.flag2){
						this.markers = []
						this.flag1 = true
						this.flag2 = false
						this.flag3 = true
						this.flag4 = true
						this.isUpdate = false
						this.markers = this.markers2
					}else if(this.scale >= 17&&this.flag4){
						this.markers = []
						this.flag1 = true
						this.flag2 = true
						this.flag3 = true
						this.flag4 = false
						this.isUpdate = false
						this.markers = this.markers4
					}
				}else{
					if(e.causedBy == 'scale'){
						this.mapCtx.getScale({
							success: (res) => {
								console.log(res.scale);
								if(res.scale < 13 &&this.flag1){
									this.markers = []
									this.flag1 = false
									this.flag2 = true
									this.flag3 = true
									this.flag4 = true
									this.markers = this.markers1
									this.scale = res.scale
								}else if(res.scale >= 13&&this.flag2&&res.scale <=14){
									this.markers = []
									this.flag1 = true
									this.flag2 = false
									this.flag3 = true
									this.flag4 = true
									this.markers = this.markers2
									this.scale = res.scale 
								}else if(res.scale >=15 &&this.flag3&&res.scale <=16){
									this.markers = []
									this.flag1 = true
									this.flag2 = true
									this.flag3 = false
									this.flag4 = true
									this.markers = this.markers3
									this.scale = res.scale
								}else if(res.scale >= 17 && this.flag4){
									this.markers = []
									this.flag1 = true
									this.flag2 = true
									this.flag3 = true
									this.flag4 = false
									this.markers = this.markers4
									this.scale = res.scale
								}
							}
						})
					}
				}
			},
			// 地图找旧房县级
			async searchHouse(){
				this.markers1 = []
				let res = await this.$fetch(this.$api.jiufang,{houseType:this.houseType},'GET')
				// #ifdef MP-WEIXIN
				let mapInfo = res.data
				mapInfo.forEach(item =>{
					var p = new Object();
					p = this.bMapToTxMap(item.latitude,item.longitude)
					item.latitude = p.latitude;
					item.longitude = p.longitude
				})
				for(var i in mapInfo){
					this.markers1.push({
						id:i+1,latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
						label:{
							content:mapInfo[i]['dictValue']+'\n'+mapInfo[i]['count'],fontSize:12,anchorX:-30,anchorY:-30,
							bgColor:'#874A98BB',padding:10,textAlign:'center',color:'#FFFFFF',borderRadius:99999
						}
					})
				}
				// #endif
				// #ifdef H5
				let houserInfo = []
				res.data.forEach(item =>{
					item.position = {lng:item.longitude,lat:item.latitude},
					item.flag = 1
				})
				this.label1 = res.data
				this.labelList = res.data
				// #endif
				
			},
			// 地图找旧房区域
			async searchxyProvince(){
				this.markers2 = []
				let res = await this.$fetch(this.$api.jiufangProvince,{houseType:this.houseType},'GET')
				this.oldHouseList = JSON.parse(JSON.stringify(res.data))
				// #ifdef MP-WEIXIN
				let mapInfo = res.data
				mapInfo.forEach(item =>{
					var p = new Object();
					p = this.bMapToTxMap(item.latitude,item.longitude)
					item.latitude = p.latitude;
					item.longitude = p.longitude
				})
				for(var i in mapInfo){
					if(mapInfo[i]['dictValue'] != '下吕浦'){
						this.markers2.push({
							id:i+1,latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
							label:{
								content:mapInfo[i]['dictValue']+'\n'+mapInfo[i]['count'],fontSize:12,anchorX:-30,anchorY:-30,
								bgColor:'#874A98BB',padding:10,textAlign:'center',color:'#FFFFFF',borderRadius:99999
							}
						})
					}
				}
				for(var i in mapInfo){
					if(mapInfo[i]['dictValue'] == '下吕浦'){
						this.markers2.push({
							id:i+1,latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
							label:{
								content:mapInfo[i]['dictValue']+'\n'+mapInfo[i]['count'],fontSize:12,anchorX:-30,anchorY:-30,
								bgColor:'#FE9E2E',padding:10,textAlign:'center',color:'#FFFFFF',borderRadius:99999
							}
						})
					}
				}
				// #endif
				// #ifdef H5
				let houserInfo = []
				res.data.forEach(item =>{
					item.position = {lng:item.longitude,lat:item.latitude},
					item.flag = 2
				})
				this.label2 = res.data
				// #endif
			},
			// 地图找旧房 小区
			async searchxyHouse(lat,lng){
				this.markers3 = []
				this.markers4 = []
				let res = await this.$fetch(this.$api.jiufangHouse,{lat:lat,lng:lng,size:20,houseType:this.houseType},'GET')
				// #ifdef MP-WEIXIN
				let mapInfo = res.data
				mapInfo.forEach(item =>{
					var p = new Object();
					p = this.bMapToTxMap(item.latitude,item.longitude)
					item.latitude = p.latitude;
					item.longitude = p.longitude
				})
				for(var i in mapInfo){
					this.markers4.push({
						id:mapInfo[i]['areaId'],latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
						label:{
							content:mapInfo[i]['areaName']+'|'+mapInfo[i]['count']+'套',fontSize:14,anchorX:-40,anchorY:-40,
							bgColor:'#874A98',padding:5,textAlign:'center',color:'#FFFFFF',borderRadius:20
						}
					})
					this.markers3.push({
						id:mapInfo[i]['areaId'],latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:25,height:19,iconPath:'../../static/icon/222.png',
					})
				}
				// #endif
				// #ifdef H5
				let houserInfo = []
				res.data.forEach(item =>{
					item.position = {lng:item.longitude,lat:item.latitude}
				})
				this.label3 = JSON.parse(JSON.stringify(res.data))
				this.label4 = JSON.parse(JSON.stringify(res.data))
				this.label3.forEach(item =>{
					item.flag = 3
				})
				this.label4.forEach(item =>{
					item.flag = 4
				})
				// #endif
			},
			// 地图找新房 县级
			async searchNewHouse(){
				this.markers1 = []
				let res = await this.$fetch(this.$api.xinfang,{},'GET')
				// #ifdef MP-WEIXIN
				let mapInfo = res.data
				mapInfo.forEach(item =>{
					var p = new Object();
					p = this.bMapToTxMap(item.latitude,item.longitude)
					item.latitude = p.latitude;
					item.longitude = p.longitude
				})
				for(var i in mapInfo){
					this.markers1.push({
						id:i+1,latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
						label:{
							content:mapInfo[i]['dictValue']+'\n'+mapInfo[i]['count'],fontSize:12,anchorX:-30,anchorY:-30,
							bgColor:'#874A98BB',padding:10,textAlign:'center',color:'#FFFFFF',borderRadius:99999
						}
					})
				}
				// #endif
				// #ifdef H5
				let houserInfo = []
				res.data.forEach(item =>{
					item.position = {lng:item.longitude,lat:item.latitude}
					item.flag = 1
				})
				this.label1 = res.data
				this.labelList = res.data
				// #endif
			},
			// 地图找新房 区域
			async searchNewxyProvince(){
				this.markers2 = []
				let res = await this.$fetch(this.$api.xinfangProvince,{},'GET')
				this.newHosueList = JSON.parse(JSON.stringify(res.data))
				// #ifdef MP-WEIXIN
				let mapInfo = res.data
				mapInfo.forEach(item =>{
					var p = new Object();
					p = this.bMapToTxMap(item.latitude,item.longitude)
					item.latitude = p.latitude;
					item.longitude = p.longitude
				})
				for(var i in mapInfo){
					if(mapInfo[i]['dictValue'] != '下吕浦'){
						this.markers2.push({
							id:i+1,latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
							label:{
								content:mapInfo[i]['dictValue']+'\n'+mapInfo[i]['count'],fontSize:12,anchorX:-30,anchorY:-30,
								bgColor:'#874A98BB',padding:10,textAlign:'center',color:'#FFFFFF',borderRadius:99999
							}
						})
					}
				}
				for(var i in mapInfo){
					if(mapInfo[i]['dictValue'] == '下吕浦'){
						this.markers2.push({
							id:i+1,latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
							label:{
								content:mapInfo[i]['dictValue']+'\n'+mapInfo[i]['count'],fontSize:12,anchorX:-30,anchorY:-30,
								bgColor:'#FE9E2E',padding:10,textAlign:'center',color:'#FFFFFF',borderRadius:99999
							}
						})
					}
				}
				// #endif
				// #ifdef H5
				let houserInfo = []
				res.data.forEach(item =>{
					item.position = {lng:item.longitude,lat:item.latitude},
					item.flag = 2
				})
				this.label2 = res.data
				// #endif
			},
			// 地图找新房 楼盘
			async searchNewxyHouse(lat,lng){
				this.markers3 = []
				this.markers4 = []
				let res = await this.$fetch(this.$api.xinfangHouse,{lat:lat,lng:lng,size:20},'GET')
				// #ifdef MP-WEIXIN
				let mapInfo = res.data
				mapInfo.forEach(item =>{
					var p = new Object();
					p = this.bMapToTxMap(item.latitude,item.longitude)
					item.latitude = p.latitude;
					item.longitude = p.longitude
				})
				for(var i in mapInfo){
					this.markers4.push({
						id:mapInfo[i]['areaId'],latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:5,height:5,iconPath:'../../static/icon/5.png',
						label:{
							content:mapInfo[i]['areaName']+'|'+mapInfo[i]['count']+'套',fontSize:14,anchorX:-40,anchorY:-40,
							bgColor:'#874A98',padding:5,textAlign:'center',color:'#FFFFFF',borderRadius:20
						}
					})
					this.markers3.push({
						id:mapInfo[i]['areaId'],latitude:mapInfo[i]['latitude'],longitude:mapInfo[i]['longitude'],alpha:1,width:25,height:19,iconPath:'../../static/icon/222.png',
					})
				}
				// #endif
				// #ifdef H5
				let houserInfo = []
				res.data.forEach(item =>{
					item.position = {lng:item.longitude,lat:item.latitude}
				})
				this.label3 = JSON.parse(JSON.stringify(res.data))
				this.label4 = JSON.parse(JSON.stringify(res.data))
				this.label3.forEach(item =>{
					item.flag = 3
				})
				this.label4.forEach(item =>{
					item.flag = 4
				})
				// #endif
			}
		},
		onLoad(options) {
			this.searchHouse()
			this.searchxyProvince()
			this.searchxyHouse(this.lat,this.lng)
			this.markers = this.markers1
			// #ifdef H5
			this.labelList = this.label1
			// #endif
		}
	}
</script>

<style lang="scss">
	map{
		width: 750rpx;
		height: 100vh;
	}
	.tab{
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		position: relative;
		z-index: 10;
	}
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		background-color: #fff;
		
		.nav-item {
			display: inline-block;
			width: 250upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 28upx;
			color: #A6A6A6;
			position: relative;
		
			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6upx solid #874A98;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		
		.current {
			color: #874A98;
			font-size: 32upx;
			font-weight: bold;
		
			&:after {
				width: 50%;
			}
		}
	}
	.bm-view {
	  width: 100%;
	  height: 100vh;
	}
</style>
