<template>
	<view>
		<!-- 条件选择 -->
		<view class="nav-tab">
			<view class="conditionTab">
				<block v-for="(item,index) in condition" :key="index" >
					<view class="tabList" @tap="choose(item.id)">
						<text :class="{chooseText: chooseId === item.id}">{{item.name}}</text>
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
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}" @tap="handleClose"></view>
	</view>
</template>

<script>
	export default{
		name:'chooseArea',
		props:['condition'],
		data(){
			return{
				chooseId:'',
				show:false,
				areaChoose:'',
				areaList: [{ dictValue: '不限', dictKey: '' }],
				cityList: [{ dictKey: '', dictValue: '不限' }],
				cityChoose:'',
			}
		},
		methods:{
			// 选择
			choose(id){
				if(this.chooseId == id){
					this.chooseId = '';
					this.show = false;
				}else{
					this.chooseId = id;
					this.show = true;
				}
			},
			// 关闭遮罩
			handleClose(){
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
			chooseCity(id){
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
		},
		created() {
			this.getChinaDict();
		},
	}
</script>

<style>
	.nav-tab{
		background: #FFFFFF;
		position: fixed;
		z-index: 99;
		width: 100%;
		height: 90rpx;
		top:106rpx;
		/* #ifdef H5 */
		margin-top: var(--window-top);
		/* #endif */
		border-bottom: 2rpx solid #F7F7F7;
	}
	.conditionTab{
		display: flex;
		justify-content:center;
		align-items: center;		
		margin: 0 45rpx;
		height: 90rpx;
		width: 660rpx;
	}
	.tabList{
		display: flex;
		align-items: center;
		color: #5B5B5B;
		font-size: 28rpx;
	}
	.select-icon{
		width: 20rpx;
		height: 20rpx;
		display: block;
		margin-left: 11.6rpx;
	}
	.chooseText{
		color: #874A89;
	}
	/* 区域选择 */
	.areaChoose{
		width: 100%;
		height: 820rpx;
		display: flex;
		flex-direction: column;
		position: fixed;
		top:190rpx;
		/* #ifdef H5 */
		margin-top: var(--window-top);
		/* #endif */
		z-index:10;
		visibility: hidden;
		transform: translateY(-100%);
		overflow: hidden;
		transition: all 0.3s ease-in-out;
	}
	.Show{
		visibility: visible !important;
		transform: translateY(0) !important;
	}
	.areaList{
		width: 100%;
		height: 720rpx;
		display: flex;
		flex-direction: row;	
	}
	.area-1{
		width: 200rpx;
		background: #F0F1F1;
		height: 720rpx;
	}
	.chooseArea{
		width: 200rpx;
		height: 90rpx;
		background: #FFFFFF;
		color: #874A98;
		font-size: 28rpx;
		text-align: left;
		line-height: 90rpx;
	}
	.chooseArea text{
		margin-left: 30rpx;
	}
	.area-2{
		width: 200rpx;
		height: 720rpx;
		background: #F8F8F8;
		display: flex;
		flex-direction: column;
	}
	.area-list{
		width: 200rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: left;
		color: #A6A6A6;
		font-size: 28rpx;
	}
	.area-list text{
		margin-left: 30rpx;
	}
	.areachoice{
		background: #FFFFFF;
		color: #874A98;
	}
	.area-3{
		width: 350rpx;
		height: 720rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.cityList{
		width: 350rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #A6A6A6;
		font-size: 28rpx;
		text-align: left;
		display: flex;
		flex-direction: row;
	}
	.cityName{
		width: 240rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #A6A6A6;
		font-size: 28rpx;
		text-align: left;		
	}
	.cityName text{
		margin-left: 30rpx;
	}
	.choiceCity{
		color: #874A98;
	}
	.choose-city{
		width: 52rpx;
		height: 52rpx;
		margin-left: 20rpx;
	}
	.choose-city image{
		width: 52rpx;
		height: 52rpx;
	}
	.button{
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
	}
	.button-tab{
		width: 690rpx;
		margin: 10rpx 30rpx;
		display: flex;
		flex-direction: row;
	}
	.resetButton{
		flex: 1;
		width: 230rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: #F0F1F1;
		font-size: 32rpx;
	}
	.confirmButton{
		margin-left: 30rpx;
		flex: 1;
		width: 230rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: #874A98;
		font-size: 32rpx;
		color: #FFFFFF;
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
	.placeholderClass{
		color: #A6A6A6;
	}
</style>
