<template>
	<view>
		<view class="Modal" v-if="show">
			<view><text>{{title}}</text></view>
			<view class="Modal-list">
				<radio-group @change="RadioChange">
					<view class="type-choose" @click="RadioChoose('A',1)">
						<view>
							<radio class='radio purple' :class="radioType=='A'?'checked':''" :checked="radioType=='A'?true:false" value="A" style="transform: scale(0.8);" ></radio>
						</view>
						<view class="type-detail"><text>基准利率</text></view>
					</view>
					<view class="type-choose" @click="RadioChoose('B',1.1)">
						<view>
							<radio class='radio purple' :class="radioType=='B'?'checked':''" :checked="radioType=='B'?true:false" value="B" style="transform: scale(0.8);" ></radio>
						</view>
						<view class="type-detail"><text>1.1倍利率</text></view>
					</view>
				</radio-group>	
			</view>
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
	export default{
		name:'rate',
		props:['show','loan'],
		data(){
			return{
				title:'公积金利率',
				radioType:'A',
				rate:1,
				oldRadio:'A',
				oldRate:1
			}
		},
		methods:{
			// 关闭
			handleClose(){
				if(this.radioType != this.oldRadio){
					this.radioType = this.oldRadio
				}
				if(this.rate != this.oldRate){
					this.rate = this.oldRate
				}
				this.$emit('close',false)
			},
			// 选择
			RadioChange(e){
				this.radioType = e.detail.value
				if(this.radioType == 'A'){
					this.rate = 1
				}else{
					this.rate = 1.1
				}
			},
			RadioChoose(id,value){
				this.radioType = id
				this.rate = value
			},
			// 确定选中公积金利率
			confirmRate(){
				this.oldRadio = this.radioType
				this.$emit('close',false)
				this.$emit('confirm',this.rate)
			}
		},
		watch:{
			loan(){
				this.radioType = 'A'
				this.rate = 1
				this.oldRate = 1
				this.oldRadio = 'A'
				if(this.loan == 2){
					this.title = '公积金利率'
				}else if(this.loan == 3){
					this.title = '组合公积金利率'
				}
			}
		}
	}
</script>

<style lang="less">
	.Modal{
		width: 620rpx;
		height: 400rpx;
		position: fixed;
		top:350rpx;
		left: 60rpx;
		right: 60rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		z-index: 10;
		
		& > view:first-child{
			width: 100%;
			height: 100rpx;
			font-size: 32rpx;
			padding: 0 30rpx;
			line-height: 100rpx;
			font-weight: bold;
		}
		& > .Modal-button{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			flex-direction: row;
			
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
	}
	.Modal-list{
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
	}
	.type-choose{
		width: 560rpx;
		height: 100rpx;
		display: flex;
		margin: 0 30rpx;
		align-items: center;
	}
	 .type-detail{
		font-size: 28rpx;
		color: #A2A2A2;
		margin-left: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
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
