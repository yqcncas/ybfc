<template>
	<view>
		<!-- 模态框 -->
		<view class="Modal" v-if="show == true">
			<view class="Modal-info">
				<view class="Modal-tit"><text>请选择贷款类型</text></view>
				<view class="Modal-list">
					<radio-group @change="RadioChange">
						<view class="type-choose" @click="RadioChoose('A')">
							<view>
								<radio class='radio purple' :class="radioType=='A'?'checked':''" :checked="radioType=='A'?true:false" value="A" style="transform: scale(0.8);" ></radio>
							</view>
							<view class="type-detail"><text>商业贷款</text></view>
						</view>
						<view class="type-choose" @click="RadioChoose('B')">
							<view>
								<radio class='radio purple' :class="radioType=='B'?'checked':''" :checked="radioType=='B'?true:false" value="B" style="transform: scale(0.8);" ></radio>
							</view>
							<view class="type-detail"><text>组合贷款</text></view>
						</view>
						<view class="type-choose" @click="RadioChoose('C')">
							<view>
								<radio class='radio purple' :class="radioType=='C'?'checked':''" :checked="radioType=='C'?true:false" value="C" style="transform: scale(0.8);" ></radio>
							</view>
							<view class="type-detail"><text>公积金贷款</text></view>
						</view>
					</radio-group>
				</view>
				<view class="Modal-button">
					<view class="cancel" @tap="handleClose">取消</view>
					<view class="confirm" @tap="confirmType">确定</view>
				</view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}"  catchtouchmove="true" @tap="handleClose"></view>
	</view>
</template>

<script>
	export default{
		name:'typeModal',
		data(){
			return{
				radioType:''
			}
		},
		props:['show','radio'],
		methods:{
			// 关闭
			handleClose(){
				if(this.radioType != this.radio){
					this.radioType = this.radio
				}
				this.$emit('close',false)
			},
			// 确认选中的类型
			confirmType(){
				this.$emit('close',false)
				this.$emit('confirm',this.radioType)
			},
			// 单选
			RadioChange(e){
				this.radioType = e.detail.value
			},
			RadioChoose(index){
				this.radioType = index
			}
		},
		mounted() {
			this.radioType = this.radio;
		},
		watch:{
			radio(){
				console.log(this.radio);
				this.radioType = this.radio
			}
		}
	}
</script>

<style>	
	/* 模态框 */
	.Modal{
		width: 620rpx;
		height: 600rpx;
		position: fixed;
		top:50%;
		margin-top: -300rpx;
		left: 60rpx;
		right: 60rpx;
		background: #FFFFFF;
		z-index: 10;
	}
	.Modal-info{
		width: 560rpx;
		height: 540rpx;
		margin: 30rpx 30rpx;
		display: flex;
		flex-direction: column;
	}
	.Modal-tit{
		width: 560rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 40rpx;
		color: #5B5B5B;
		font-weight: bold;
	}
	.Modal-list{
		width: 560rpx;
		height: 300rpx;
		display: flex;
		flex-direction: column;
	}
	.type-choose{
		width: 560rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
	}
	.type-detail{
		margin-top: 10rpx;
		height: 100rpx;
		font-size: 28rpx;
		color: #A2A2A2;
		margin-left: 30rpx;
	}
	.Modal-button{
		width:530rpx;
		margin: 30rpx 30rpx;
		height: 120rpx;
		display: flex;
	}
	.cancel{
		margin-left: 265rpx;
		width: 132.5rpx;
		height: 120rpx;
		line-height: 160rpx;
		font-size: 28rpx;
		color: #874A98;
		text-align: center;
		font-weight: bold;
	}
	.confirm{
		width: 132.5rpx;
		height: 120rpx;
		line-height: 160rpx;
		font-size: 28rpx;
		color: #874A98;
		text-align: center;
		font-weight: bold;
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
	.purple{
		color: #874A98;
	}
</style>
