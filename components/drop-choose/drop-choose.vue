<template>
	<view>
		<!-- 条件选择 -->
		<view class="nav-tab">
			<view class="conditionTab">
				<block v-for="(item, index) in condition" :key="index" style="flex: 1;">
					<view class="tabList" @tap="choose(item.id)">
						<text :class="{ chooseText: chooseId === item.id }">{{ item.name }}</text>
						<image src="../../static/icon/down.png" class="select-icon" v-if="chooseId != item.id"></image>
						<image src="../../static/icon/up.png" class="select-icon" v-if="chooseId == item.id"></image>
					</view>
				</block>
			</view>
		</view>
		<!-- 区域选择 -->
		<view class="areaChoose" :class="{Show:chooseId == 1}">
			<view class="areaList">
				<view class="area-1">
					<view class="chooseArea"><text>区域</text></view>
				</view>
				<view class="area-2">
					<view class="area-list" :class="{ areachoice: areaChoose === item.dictKey }" v-for="(item, index) in areaList" :key="index" @tap="chooseArea(item.dictKey)">
						<text>{{ item.dictValue }}</text>
					</view>
				</view>
				<scroll-view class="area-3" scroll-y="true">
					<view class="cityList" v-for="(item, index) in cityList" :key="index" @tap="chooseCity(item.dictKey)">
						<view class="cityName" :class="{ choiceCity: cityChoose == item.dictKey }">
							<text>{{ item.dictValue }}</text>
						</view>
						<view class="choose-city" v-if="cityChoose == item.dictKey"><image src="../../static/icon/choose.png" mode=""></image></view>
					</view>
				</scroll-view>
			</view>
			<view class="button">
				<view class="button-tab">
					<view class="resetButton" @click="resetRegion"><text>重置</text></view>
					<view class="confirmButton" @click="confirmRegion"><text>确定</text></view>
				</view>
			</view>
		</view>
		<!-- 售价 -->
		<view class="priceChoose" :class="[chooseId == 2 ?'Show':'']">
			<view class="priceList">
				<view class="price" v-for="(item, index) in priceList" :key="index" @tap="choosePrice(item.id,item.minprice,item.maxprice)">
					<view class="priceDetail" :class="{ choicePrice: priceChoose == item.id }">
						<text>{{ item.name }}</text>
					</view>
					<view class="choosePrice" v-if="priceChoose == item.id"><image src="../../static/icon/choose.png"></image></view>
				</view>
			</view>
			<view class="priceBottom" v-if="chooseId == 2">
				<view class="price-tit"><text>价格区间 (万元)</text></view>
				<view class="range">
					<view class="min"><input type="text" placeholder="最低价" v-model="minPrice" placeholder-class="placeholderClass" /></view>
					<view class="range-icon"><text>-</text></view>
					<view class="max"><input type="text" placeholder="最高价" v-model="maxPrice" placeholder-class="placeholderClass" /></view>
					<view class="rangebutton" @click="confirmPrice"><button>确定</button></view>
				</view>
			</view>
		</view>
		<!-- 房型 -->
		<view class="typChoose" :class="[chooseId == 3 ?'Show':'']">
			<view class="typeList">
				<view v-for="(item, index) in typeList" :key="index" class="type" @tap="chooseType(item.id)">
					<view class="typeDetail" :class="{ choiceType: typeChoose == item.id }">{{ item.name }}</view>
					<view class="chooseType" v-if="typeChoose == 1 && item.id == 1"><image src="../../static/icon/choose.png"></image></view>
					<view class="chooseType-2" v-if="item.id != 1" :class="{ hideBorder: typeChoose === item.id }">
						<image :animation="animationData" src="../../static/icon/Group6.png" class="chooseType-2-img" v-if="typeChoose == item.id"></image>
					</view>
				</view>
			</view>
			<view class="typeBottom">
				<view class="typeButton" @click="confirmType"><button>确定</button></view>
			</view>
		</view>
		<!-- 面积 -->
		<view class="priceChoose" :class="[chooseId == 4 ?'Show':'']">
			<view class="priceList">
				<view class="price" v-for="(item, index) in sizeList" :key="index" @tap="chooseSize(item.id)">
					<view class="priceDetail" :class="{ choicePrice: sizeChoose == item.id }">
						<text>{{ item.name }}</text>
					</view>
					<view class="choosePrice" v-if="sizeChoose == item.id"><image src="../../static/icon/choose.png"></image></view>
				</view>
			</view>
			<view class="priceBottom" v-if="chooseId == 4">
				<view class="price-tit"><text>面积区间 (m²)</text></view>
				<view class="range">
					<view class="min"><input type="text" placeholder="最小面积" v-model="minSize" placeholder-class="placeholderClass" /></view>
					<view class="range-icon"><text>-</text></view>
					<view class="max"><input type="text" placeholder="最大面积" v-model="maxSize" placeholder-class="placeholderClass" /></view>
					<view class="rangebutton" @click="confirmSize"><button>确定</button></view>
				</view>
			</view>
		</view>
		<!-- 更多 -->
		<view class="moreChoose" :class="[chooseId == 5 ?'Show':'']">
			<view class="more-input" v-if="chooseId == 5">
				<view class="input-tit"><text>栋座</text></view>
				<view class="input-content-2"><input type="text" placeholder="最小栋座" v-model="minBuildNum" placeholder-class="placeholderClass" /></view>
				<view class="input-line"><text>-</text></view>
				<view class="input-content-2"><input type="text" placeholder="最大栋座" v-model="maxBuildNum" placeholder-class="placeholderClass" /></view>
			</view>
			<view class="more-input" v-if="chooseId == 5">
				<view class="input-tit"><text>楼层</text></view>
				<view class="input-content-2"><input type="text" placeholder="最小楼层" v-model="minLevel" placeholder-class="placeholderClass" /></view>
				<view class="input-line"><text>-</text></view>
				<view class="input-content-2"><input type="text" placeholder="最大楼层" v-model="maxLevel" placeholder-class="placeholderClass" /></view>
			</view>
			<view class="more-input" v-if="chooseId == 5">
				<view class="input-tit"><text>房号</text></view>
				<view class="input-content"><input type="text" placeholder="请输入房号" v-model="roomNum" placeholder-class="placeholderClass" /></view>
			</view>
			<view class="more-input" v-if="hType != 2 && chooseId == 5">
				<view class="input-tit"><text>装修</text></view>
				<view class="input-content">
					<picker mode="selector" :range="renovationList" @change="renovationChoose" :value="index" range-key="name">
						<view :class="chooseRenovation == '请选择'?'font-gray':'font-black'">{{chooseRenovation}}</view>
					</picker>
				</view>
			</view>
			<view class="more-input" v-if="hType != 2 && chooseId == 5">
				<view class="input-tit"><text>电梯</text></view>
				<view class="input-content">
					<picker mode="selector" :range="elevatorList" @change="chooseElevator" :value="index" range-key="name">
						<view :class="elevatorChoose == '请选择'?'font-gray':'font-black'">{{elevatorChoose}}</view>
					</picker>
				</view>
			</view>
			<view class="more-input" v-if="hType != 2 && chooseId == 5">
				<view class="input-tit" style="width: 144rpx;"><text>物业类型</text></view>
				<view class="input-content" style="width: 454rpx;">
					<picker mode="selector" :range="proList" @change="choosePro" :value="index" range-key="name">
						<view style="width: 454rpx;" :class="proChoose == '请选择'?'font-gray':'font-black'">{{proChoose}}</view>
					</picker>
				</view>
			</view>
			<view class="moreBottom" v-if="chooseId == 5">
				<view class="moreCofirm" @click="confirmMore"><text>确定</text></view>
				<view class="moreReset" @click="resetMore"><text>重置</text></view>
			</view>
		</view>
		<!-- 排序 -->
		<view class="priceChoose" :class="[chooseId == 6 ?'Show':'']">
			<view class="priceList">
				<view class="price" v-for="(item, index) in sortList" :key="index" @tap="chooseSort(item.id)">
					<view class="priceDetail" :class="{ choicePrice: sortChoose == item.id }">
						<text>{{ item.name }}</text>
					</view>
					<view class="choosePrice" v-if="sortChoose == item.id"><image src="../../static/icon/choose.png"></image></view>
				</view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{ maskShow: show === true }" @tap="handleClose"></view>
	</view>
</template>

<script>
export default {
	props: ['condition', 'hType','areaId','cityId'],
	data() {
		return {
			chooseId: '',
			show: false,
			areaChoose: '',
			areaList: [{ dictValue: '不限', dictKey: '' }],
			cityList: [{ dictKey: '', dictValue: '不限' }],
			cityChoose: '',
			priceChoose: 1,
			minPrice: '',
			maxPrice: '',
			priceList: [
				{ id: 1, name: '不限',minprice:'',maxprice:'' },
				{ id: 2, name: '100万元以下',minprice:'0',maxprice:'100' },
				{ id: 3, name: '100-120万元',minprice:'100',maxprice:'120' },
				{ id: 4, name: '120-160万元',minprice:'120',maxprice:'160' },
				{ id: 5, name: '160-200万元',minprice:'160',maxprice:'200'},
				{ id: 6, name: '200-250万元',minprice:'200',maxprice:'250'},
				{ id: 7, name: '250-300万元',minprice:'250',maxprice:'300'},
				{ id: 8, name: '300万元以上',minprice:'300',maxprice:''}
			],
			typeChoose: 1,
			typeList: [{ id: 1, name: '不限' }, { id: 2, name: '一室' }, { id: 3, name: '二室' }, { id: 4, name: '三室' }, { id: 5, name: '四室' }, { id: 6, name: '四室以上' }],
			animationData: {},
			sizeChoose: 1,
			sizeList: [
				{ id: 1, name: '不限' },
				{ id: 2, name: '60m²以内' },
				{ id: 3, name: '60-80m²' },
				{ id: 4, name: '80-100m²' },
				{ id: 5, name: '100-130m²' },
				{ id: 6, name: '130-150m²' },
				{ id: 7, name: '150m²以上' }
			],
			minSize: '',
			maxSize: '',
			minLevel: '',
			maxLevel: '',
			minBuildNum: '',
			maxBuildNum: '',
			roomNum: '',
			sortList:[
				{id:1,name:'综合排序'},{id:2,name:'最新发布'},{id:3,name:'单价(从低到高)'},
				{id:4,name:'单价(从高到低)'},{id:5,name:'面积(从小到大)'},{id:6,name:'面积(从大到小)'},
				{id:7,name:'总价(从低到高)'},{id:8,name:'总价(从高到低)'},{id:9,name:'楼层(从低到高)'},
				{id:10,name:'楼层(从高到低)'}
			],
			sortChoose:1,
			chooseRenovation:'请选择',
			chooseRenvationId:'',
			renovationList:[{id:1,name:'取消选择'},{id:2,name:'精装修'},{id:3,name:'毛坯房'},{id:4,name:'普通装修'}],
			elevatorChoose:'请选择',
			elevatorId:'',
			elevatorList:[{id:1,name:'取消选择'},{id:2,name:'有'},{id:3,name:'无'}],
			proChoose:'请选择',
			proId:'',
			proList:[
				{id:1,name:'取消选择'},{id:2,name:'住宅'},{id:3,name:'商住'},{id:4,name:'商业'},
				{id:5,name:'公寓'},{id:6,name:'酒店'},{id:7,name:'店连屋'},{id:8,name:'车库'},{id:9,name:'别墅'}
			]
		};
	},
	methods: {
		// 选择
		choose(id) {
			if (this.chooseId == id) {
				this.chooseId = '';
				this.show = false;
			} else {
				this.chooseId = id;
				this.show = true;
			}
		},
		// 关闭遮罩
		handleClose() {
			this.chooseId = '';
			this.show = false;
		},
		// 获取一级地区列表
		async getChinaDict() {
			let res = await this.$fetch(this.$api.getChinaDict, {}, 'GET');
			res.data.forEach(item => {
				if (item.level == 3) {
					this.areaList.push(item);
				}
			});
		},
		// 一级地区选择
		async chooseArea(dictKey) {
			this.areaChoose = dictKey;
			this.cityChoose = '';
			this.cityList = [{ dictKey: '', dictValue: '不限' }];
			let res = await this.$fetch(this.$api.getChinaDict, {}, 'GET');
			res.data.forEach(item => {
				if (item.level == 4 && item.parent == dictKey) {
					this.cityList.push(item);
				}
			});
		},
		// 二级地区选择
		chooseCity(id) {
			this.cityChoose = id;
		},
		// 确认地区
		confirmRegion() {
			if (this.cityChoose) {
				this.$emit('region', this.cityChoose);
			} else {
				this.$emit('region', this.areaChoose);
			}
			this.chooseId = '';
			this.show = false;
		},
		// 重置地区
		resetRegion() {
			this.areaChoose = '';
			this.cityChoose = '';
			this.$emit('region', this.areaChoose);
			this.chooseId = '';
			this.show = false;
		},
		// 售价选择
		choosePrice(id,minprice,maxprice) {
			this.priceChoose = id;
			this.minPrice = minprice;
			this.maxPrice = maxprice
		},
		// 确定售价
		confirmPrice() {
			let data = [];
			data.push(this.minPrice);
			data.push(this.maxPrice);
			this.$emit('price', data);
			this.chooseId = '';
			this.show = false;
		},
		// 房型选择
		chooseType(id) {
			let animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
				delay: 0
			});
			this.animation = animation;
			animation
				.opacity(0.5)
				.scale(0.7, 0.7)
				.step();
			this.animationData = animation.export();
			setTimeout(() => {
				animation
					.opacity(1)
					.scale(1, 1)
					.step();
				this.animationData = animation.export();
			}, 100);
			this.typeChoose = id;
		},
		// 确定房型
		confirmType() {
			if (this.typeChoose == 1) {
				this.$emit('type', '');
			} else {
				let data = this.typeChoose - 1;
				this.$emit('type', data);
			}
			this.chooseId = '';
			this.show = false;
		},
		// 面积选择
		chooseSize(id) {
			this.sizeChoose = id;
			if (id == 1) {
				this.minSize = '';
				this.maxSize = '';
			}
			if (id == 2) {
				this.minSize = 0;
				this.maxSize = 60;
			}
			if (id == 3) {
				this.minSize = 60;
				this.maxSize = 80;
			}
			if (id == 4) {
				this.minSize = 80;
				this.maxSize = 100;
			}
			if (id == 5) {
				this.minSize = 100;
				this.maxSize = 130;
			}
			if (id == 6) {
				this.minSize = 130;
				this.maxSize = 150;
			}
			if (id == 7) {
				this.minSize = 150;
				this.maxSize = '';
			}
		},
		// 确认面积
		confirmSize() {
			let data = [];
			data.push(this.minSize);
			data.push(this.maxSize);
			this.$emit('size', data);
			this.chooseId = '';
			this.show = false;
		},
		// 确认更多
		confirmMore() {
			let data = [];
			data.push(this.minBuildNum);
			data.push(this.maxBuildNum);
			data.push(this.minLevel);
			data.push(this.maxLevel);
			data.push(this.roomNum);
			data.push(this.chooseRenvationId)
			data.push(this.elevatorId)
			data.push(this.proId)
			this.$emit('more', data);
			this.chooseId = '';
			this.show = false;
		},
		// 重置更多
		resetMore() {
			this.minBuildNum = '';
			this.maxBuildNum = '';
			this.minLevel = '';
			this.maxLevel = '';
			this.roomNum = '';
			this.chooseRenovation = '请选择'
			this.chooseRenvationId = ''
			this.elevatorChoose = '请选择'
			this.elevatorId = ''
			this.proChoose = '请选择'
			this.proId = ''
			this.confirmMore();
		},
		// 选择排序 
		chooseSort(id){
			this.sortChoose = id
			this.$emit('sort',this.sortChoose)
			this.chooseId = '';
			this.show = false
		},
		// 选择装修
		renovationChoose(e){
			let index = e.detail.value
			if(index >0){
				this.chooseRenovation = this.renovationList[index].name
				this.chooseRenvationId = index
			}else{
				this.chooseRenovation = '请选择'
				this.chooseRenvationId = ''
			}
		},
		// 选择电梯
		chooseElevator(e){
			let index = e.detail.value
			if(index > 0){
				this.elevatorChoose = this.elevatorList[index].name
				this.elevatorId = index
			}else{
				this.elevatorChoose = '请选择'
				this.elevatorId = ''
			}
		},
		// 选择物业类型
		choosePro(e){
			let index = e.detail.value
			if(index > 0){
				this.proChoose = this.proList[index].name
				this.proId = index
			}else{
				this.proChoose = '请选择'
				this.proId = ''
			}
		}
	},
	created() {
		this.getChinaDict();
	},
	mounted() {
		if(this.hType == 2){
			this.priceList = [
				{ id: 1, name: '不限',minprice:'',maxprice:'' },
				{ id: 2, name: '8千以下',minprice:'0',maxprice:'8000' },
				{ id: 3, name: '8千-1万元',minprice:'8000',maxprice:'10000' },
				{ id: 4, name: '1万-1.5万元',minprice:'10000',maxprice:'15000' },
				{ id: 5, name: '1.5万-2万元',minprice:'15000',maxprice:'20000'},
				{ id: 6, name: '2万-2.5万元',minprice:'20000',maxprice:'25000'},
				{ id: 7, name: '2.5万-3万元',minprice:'25000',maxprice:'30000'},
				{ id: 8, name: '3万元以上',minprice:'30000',maxprice:''}
			]
		}else if(this.hType == 3){
			this.priceList = [
				{ id: 1, name: '不限',minprice:'',maxprice:'' },
				{ id: 2, name: '500元以下',minprice:'0',maxprice:'500' },
				{ id: 3, name: '500-1000元',minprice:'500',maxprice:'1000' },
				{ id: 4, name: '1000-1500元',minprice:'1000',maxprice:'1500' },
				{ id: 5, name: '1500-2000元',minprice:'1500',maxprice:'2000'},
				{ id: 6, name: '2000-3000元',minprice:'2000',maxprice:'3000'},
				{ id: 7, name: '3000-4500元',minprice:'3000',maxprice:'4500'},
				{ id: 8, name: '4500元以上',minprice:'4500',maxprice:''}
			]
		}
		if(this.areaId && this.cityId){
			this.chooseArea(this.areaId)
			this.chooseCity(this.cityId)
		}
	}
};
</script>

<style>
.nav-tab {
	background: #ffffff;
	position: fixed;
	z-index: 99;
	width: 100%;
	height: 90rpx;
	top: 106rpx;
	/* #ifdef H5 */
	margin-top: var(--window-top);
	/* #endif */
	/* border-bottom: 2rpx solid #F7F7F7; */
}
.conditionTab {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 45rpx;
	height: 90rpx;
	width: 660rpx;
}
.tabList {
	display: flex;
	align-items: center;
	color: #5b5b5b;
	font-size: 28rpx;
}
.select-icon {
	width: 20rpx;
	height: 20rpx;
	display: block;
	margin-left: 11.6rpx;
}
.chooseText {
	color: #874a89;
}
/* 区域选择 */
.areaChoose {
	width: 100%;
	height: 820rpx;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 190rpx;
	/* #ifdef H5 */
	margin-top: var(--window-top);
	/* #endif */
	z-index: 10;
	visibility: hidden;
	transform: translateY(-100%);
	overflow: hidden;
	transition: all 0.3s ease-in-out;
}
.Show{
	visibility: visible !important;
	transform: translateY(0) !important;
}
.areaList {
	width: 100%;
	height: 720rpx;
	display: flex;
	flex-direction: row;
}
.area-1 {
	width: 200rpx;
	background: #f0f1f1;
	height: 720rpx;
}
.chooseArea {
	width: 200rpx;
	height: 90rpx;
	background: #ffffff;
	color: #874a98;
	font-size: 28rpx;
	text-align: left;
	line-height: 90rpx;
}
.chooseArea text {
	margin-left: 30rpx;
}
.area-2 {
	width: 200rpx;
	height: 720rpx;
	background: #f8f8f8;
	display: flex;
	flex-direction: column;
}
.area-list {
	width: 200rpx;
	height: 90rpx;
	line-height: 90rpx;
	text-align: left;
	color: #a6a6a6;
	font-size: 28rpx;
}
.area-list text {
	margin-left: 30rpx;
}
.areachoice {
	background: #ffffff;
	color: #874a98;
}
.area-3 {
	width: 350rpx;
	height: 720rpx;
	background: #ffffff;
	display: flex;
	flex-direction: column;
}
.cityList {
	width: 350rpx;
	height: 90rpx;
	line-height: 90rpx;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: left;
	display: flex;
	flex-direction: row;
}
.cityName {
	width: 240rpx;
	height: 90rpx;
	line-height: 90rpx;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: left;
}
.cityName text {
	margin-left: 30rpx;
}
.choiceCity {
	color: #874a98;
}
.choose-city {
	width: 52rpx;
	height: 52rpx;
	margin-left: 20rpx;
}
.choose-city image {
	width: 52rpx;
	height: 52rpx;
}
.button {
	width: 100%;
	height: 100rpx;
	background: #ffffff;
}
.button-tab {
	width: 690rpx;
	margin: 10rpx 30rpx;
	display: flex;
	flex-direction: row;
}
.resetButton {
	flex: 1;
	width: 230rpx;
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	background: #f0f1f1;
	font-size: 32rpx;
}
.confirmButton {
	margin-left: 30rpx;
	flex: 1;
	width: 230rpx;
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	background: #874a98;
	font-size: 32rpx;
	color: #ffffff;
}
/* 售价和面积*/
.priceChoose {
	width: 100%;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 190rpx;
	z-index: 10;
	/* #ifdef H5 */
	margin-top: var(--window-top);
	/* #endif */
	visibility: hidden;
	transform: translateY(-100%);
	overflow: hidden;
	transition: all 0.3s ease-in-out;
}
.priceList {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.price {
	width: 690rpx;
	height: 90rpx;
	margin: 0 30rpx;
	line-height: 90rpx;
	display: flex;
	flex-direction: row;
}
.priceDetail {
	width: 664rpx;
	height: 90rpx;
	line-height: 90rpx;
	color: #a6a6a6;
	font-size: 28rpx;
}
.choicePrice {
	color: #874a98;
}
.choosePrice {
	width: 52rpx;
	height: 52rpx;
}
.choosePrice image {
	width: 52rpx;
	height: 52rpx;
}
.priceBottom {
	width: 100%;
	height: 180rpx;
	display: flex;
	flex-direction: column;
}
.price-tit {
	margin-top: 30rpx;
	margin-left: 30rpx;
	font-size: 28rpx;
	color: #030303;
	letter-spacing: 0;
}
.range {
	width: 690rpx;
	margin: 20rpx 30rpx;
	display: flex;
	flex-direction: row;
}
.min {
	width: 200rpx;
	height: 70rpx;
	background: #f5f5f9;
	border-radius: 4rpx;
	font-size: 28rpx;
	color: #5b5b5b;
	letter-spacing: 0;
	line-height: 70rpx;
	text-align: center;
}
.min input {
	width: 200rpx;
	height: 70rpx;
	line-height: 70rpx;
	text-align: center;
}
.range-icon {
	width: 78rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	color: #030303;
}
.max {
	width: 200rpx;
	height: 70rpx;
	background: #f5f5f9;
	border-radius: 4rpx;
	font-size: 28rpx;
	color: #5b5b5b;
	letter-spacing: 0;
	line-height: 70rpx;
	text-align: center;
}
.max input {
	width: 200rpx;
	height: 70rpx;
	line-height: 70rpx;
	text-align: center;
}
.rangebutton {
	width: 140rpx;
	height: 70rpx;
	margin-left: 72rpx;
}
.rangebutton button {
	width: 140rpx;
	height: 70rpx;
	background: #874a98;
	border-radius: 35rpx;
	line-height: 70rpx;
	font-size: 28rpx;
	color: #ffffff;
}
/* 房型 */
.typChoose {
	width: 100%;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 190rpx;
	z-index: 10;
	/* #ifdef H5 */
	margin-top: var(--window-top);
	/* #endif */
	visibility: hidden;
	transform: translateY(-100%);
	overflow: hidden;
	transition: all 0.3s ease-in-out;
}
.typeList {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.type {
	width: 690rpx;
	height: 90rpx;
	margin: 0 30rpx;
	display: flex;
	flex-direction: row;
}
.typeDetail {
	width: 654rpx;
	height: 90rpx;
	text-align: left;
	line-height: 90rpx;
	color: #a6a6a6;
	letter-spacing: 0;
	font-size: 28rpx;
}
.choiceType {
	color: #874a98;
}
.chooseType {
	width: 52rpx;
	height: 52rpx;
	margin-top: 12rpx;
}
.chooseType image {
	width: 52rpx;
	height: 52rpx;
	margin-left: 10rpx;
}
.chooseType-2 {
	width: 36rpx;
	height: 36rpx;
	margin-top: 28rpx;
	border: 2rpx solid #d9d9d9;
	border-radius: 4rpx;
	font-size: 0;
}
.hideBorder {
	border: 2rpx solid #ffffff;
}
.chooseType-2 .chooseType-2-img {
	width: 100%;
	height: 100%;
	display: block;
	vertical-align: bottom;
	opacity: 0;
}
.typeBottom {
	width: 100%;
	height: 130rpx;
}
.typeButton {
	width: 690rpx;
	height: 80rpx;
	margin: 24rpx 30rpx;
}
.typeButton button {
	width: 690rpx;
	height: 80rpx;
	line-height: 80rpx;
	color: #ffffff;
	background: #874a98;
	border-radius: 4rpx;
	font-size: 28rpx;
}
/* 更多 */
.moreChoose {
	width: 100%;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 190rpx;
	/* #ifdef H5 */
	margin-top: var(--window-top);
	/* #endif */
	/* height: 470rpx; */
	z-index: 10;
	visibility: hidden;
	transform: translateY(-100%);
	overflow: hidden;
	transition: all 0.3s ease-in-out;
}
.more-input {
	width: 690rpx;
	height: 80rpx;
	margin: 30rpx 30rpx 0 30rpx;
	display: flex;
	flex-direction: row;
}
.input-tit {
	width: 96rpx;
	height: 80rpx;
	line-height: 80rpx;
	color: #a6a6a6;
	font-size: 28rpx;
}
.input-content {
	width: 502rpx;
	height: 80rpx;
	background: #f5f5f9;
	border-radius: 4rpx;
	line-height: 80rpx;
	font-size: 28rpx;
	color: #5b5b5b;
}
.input-content input {
	width: 502rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 30rpx;
}
.font-gray{
	width: 502rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #9B9B9B;
}
.font-black{
	width: 502rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #5b5b5b;
}
.input-content-2 {
	width: 200rpx;
	height: 80rpx;
	background: #f5f5f9;
	border-radius: 4rpx;
	line-height: 80rpx;
	font-size: 28rpx;
	color: #5b5b5b;
}
.input-content-2 input {
	width: 200rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 30rpx;
}
.input-line {
	width: 102rpx;
	height: 80rpx;
	line-height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}
.moreBottom {
	width: 400rpx;
	height: 70rpx;
	display: flex;
	flex-direction: row;
	margin: 30rpx 176rpx;
}
.moreCofirm {
	width: 200rpx;
	height: 70rpx;
	line-height: 70rpx;
	color: #ffffff;
	font-size: 28rpx;
	text-align: center;
	border-radius: 35rpx 0 0 35rpx;
	background: #874a98;
	border: 2rpx solid #874a98;
}
.moreReset {
	background: #ffffff;
	width: 200rpx;
	height: 70rpx;
	line-height: 70rpx;
	color: #a2a2a2;
	font-size: 28rpx;
	text-align: center;
	border: 2rpx solid #d8d8d8;
	border-radius: 0 35rpx 35rpx 0;
}
/* 遮罩 */
.mask {
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
.maskShow {
	opacity: 1;
	visibility: visible;
}
.placeholderClass {
	color: #a6a6a6;
	font-size: 28rpx;
}
</style>
