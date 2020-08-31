<template>
	<view>
		<view class="content-detail">
			<parser :html="detailData"></parser>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	export default {
		name:'about',
		components:{
			parser
		},
		data(){
			return{
				detailData:'正在加载数据',
			}
		},
		methods:{
			// 获取关于我们
			async getAboutUs(){
				let res = await this.$fetch(this.$api.aboutUs,{},'GET')
				this.detailData = res.data
			}
		},
		onShow() {
			this.getAboutUs()
		}
	}
</script>

<style>
	.content-detail{
		padding: 30rpx 30rpx;
		line-height: 60rpx;
		/* 在这里调整，整体字体大小 */
		font-size: 28rpx;
	}	
</style>
