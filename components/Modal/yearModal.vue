<template>
	<view>
		<!-- 模态框 -->
		<view class="Modal" v-if="show">
			<view class="Modal-info">
				<view><text>{{title}}</text></view>
				<picker-view  :value="value" @change="bindChange" class="year-list"  :indicator-style="indicatorStyle">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
				<view class="confirm">
					<text @click="confirmYear">确定</text>
				</view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask" :class="{maskShow:show === true}"  catchtouchmove="true" @tap="handleClose"></view>
	</view>
</template>

<script>
	export default{
		name:'yearModal',
		data(){
			const years = []
			for(let i = 1; i <= 50;i++){
				years.push(i)
			}
			return{
				title:'商贷年限选择',
				years,
				value:[4],
				chooseYear:'',
				oldYear:'',
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		props:['show','loan','year'],
		methods:{
			// 关闭
			handleClose(){
				this.$emit('close',false)
			},
			bindChange(e){
				const val = e.detail.value;
				this.chooseYear = this.years[val[0]]
				// this.$emit('choose',this.chooseYear)
			},
			// 确认选中年限
			confirmYear(){
				this.$emit('close',false)
				this.$emit('choose',this.chooseYear)
			},
		},
		mounted() {
			this.value[0] = this.year - 1
			this.chooseYear = this.year
		},
		watch:{
			loan(){
				if(this.loan == 1){
					this.title = '商贷年限选择'
				}else if(this.loan == 2){
					this.title = '公积金年限选择'
				}else{
					this.title = '组合年限选择'
				}
			},
			year(){
				this.value[0] = this.year - 1
				this.chooseYear = this.year
				this.oldYear =  this.year
			}
		}
	}
</script>

<style lang="less">
	// 模态框
	.Modal{
		width: 620rpx;
		height: 600rpx;
		position: fixed;
		top: 50%;
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
		
		& > view:first-child{
			width: 560rpx;
			height: 120rpx;
			line-height: 120rpx;
			font-size: 40rpx;
			color: #5B5B5B;
			font-weight: bold;
		}
		
		& > .year-list{
			width: 560rpx;
			height: 300rpx;
		}
		
		& > .confirm{
			width: 560rpx;
			height: 120rpx;
			line-height: 180rpx;
			font-size: 32rpx;
			font-weight: bold;
			color:#874A98;
			text-align: right;
			
			& > text{
				margin-right: 30rpx;
			}
		}
	}
	.indicatorClass{
		height: 100rpx;
		width: 560rpx;
	}
	.indicatorClass::before{
		border: none;
	}
	.indicatorClass::after{
		border: none;
	}
	.item{
		// width: 560rpx;
		// height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 40rpx;
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
</style>
