<template>
	<view>
		<view class="Modal" v-if="show">
			<view><text>{{title}}</text></view>
			<scroll-view scroll-y="true"  class="Modal-list">
				<radio-group  @change="RadioChange">
					<view class="type-choose" v-for="(item,index) in rateList" :key="index" @click="RadioChoose(item.id,item.value)">
						<view>
							<radio class='radio purple' :class="radioType==item.id?'checked':''" :checked="radioType==item.id?true:false" :value='item.id' style="transform: scale(0.8);" ></radio>
						</view>
						<view class="type-detail"><text>{{item.name}}</text></view>
					</view>
				</radio-group>
			</scroll-view>
			<view class="Modal-button">
				<view @click="handleClose"><text>取消</text></view>
				<view @click="confirmRate"><text>确定</text></view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}"  catchtouchmove="true" @tap="handleClose"></view>
	</view>
</template>

<script>
	import rate from './js/rate.js'
	export default{
		data(){
			return{
				title:'商贷利率',
				radioType:'1',
				rateList:rate.rateList,
				rate:1
			}
		},
		props:['show','loan'],
		methods:{
			// 关闭
			handleClose(){
				this.radioType = '1'
				this.rate = 1
				this.$emit('close',false)
			},
			// 选择利率
			RadioChange(e){
				this.radioType = e.detail.value
				this.rateList.forEach(item =>{
					if(this.radioType == item.id){
						this.rate = item.value
					}
				})
			},
			RadioChoose(id,value){
				this.radioType = id
				this.rate = value
			},
			// 确定利率
			confirmRate(){
				this.$emit('close',false)
				this.$emit('confirm',this.rate)
			}
		},
		watch:{
			loan(){
				this.radioType = '1'
				this.rate = 1
				if(this.loan == 1){
					this.title = '商贷利率'
				}else if(this.loan == 3){
					this.title = '组合商贷利率'
				}
			}
		}
	}
</script>

<style lang="less">
	.Modal{
		width: 620rpx;
		height: 1100rpx;
		position: fixed;
		background: #FFFFFF;
		z-index: 10;
		top:50%;
		margin-top: -550rpx;
		left: 60rpx;
		right: 60rpx;
		display: flex;
		flex-direction: column;
		
		& > view:first-child{
			width: 100%;
			height: 100rpx;
			font-size: 32rpx;
			padding: 0 30rpx;
			line-height: 100rpx;
			z-index: 9;
			font-weight: bold;
			box-shadow: 0 0 4rpx 0 rgba(65, 56, 133, 0.10);
		}
		
		& > .Modal-list{
			width: 100%;
			height: 900rpx;
			display: flex;
			flex-direction: column;
		}	
	}
	.type-choose{
		width: 560rpx;
		height: 100rpx;
		display: flex;
		margin: 0 30rpx;
		align-items: center;
		
		& > .type-detail{
			font-size: 28rpx;
			color: #A2A2A2;
			margin-left: 30rpx;
			height: 100rpx;
			line-height: 100rpx;
		}
	}
	.Modal-button{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		flex-direction: row;
		box-shadow: 0 4rpx 12rpx 0 rgba(65, 56, 133, 0.10);
		
		& > view:first-child{
			margin-left: 280rpx;
			width: 280rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 28rpx;
			color: #874A98;
			text-align: center;
			font-weight: bold;
		}
		
		& > view:nth-child(2){
			width: 280rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 28rpx;
			color: #874A98;
			text-align: center;
			font-weight: bold;
		}
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
</style>
