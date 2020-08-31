<template>
	<view>
		<view class="content-detail">
			<parser :html="detailData"></parser>
		</view>
		<!-- #ifdef H5 -->
		<getApp></getApp>
		<!-- #endif -->
		<!-- 授权弹窗 -->
		<loginModal :show="modalShow" @close="modalClose" @token="getToken"></loginModal>
	</view>
</template>

<script>
	// // #ifdef H5
	// import parser from "@/components/jyf-Parser/index"	
	// // #endif
	// // #ifdef MP-WEIXIN
	// import parser from "@/components/Parser/index"	
	// // #endif
	// #ifdef H5
	let jwx = require('jweixin-module')
	// #endif
	import parser from "@/components/jyf-Parser/index"
	import loginModal from '../../components/Modal/loginModal.vue'
	export default{
		name:'headDetail',
		components:{
			parser,loginModal
		},
		data(){
			return{
				detailData:'',
				id:'',
				path:'',
				title:'',
				userId:'',//分享人id
				modalShow:false,
				manager:'',
				shareImg:''
			}
		},
		methods:{
			// 获取头条详情
			async getHeadDetail(){
				let res = await this.$fetch(this.$api.bookView,{id:this.id},'GET')
				this.detailData = res.data.content
				this.title = res.data.title
				this.shareImg = res.data.picUrl
				uni.setNavigationBarTitle({
					title:this.title
				})
				// #ifdef H5
				let u = navigator.userAgent;
				let url = location.href
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isiOS){
					let wx_sdk_data = uni.getStorageSync('wx_sdk_data')
					let shareTitle = this.title
					let shareImg = this.shareImg
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
						    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 
						    imgUrl: shareImg, // 分享图标
						    success: function () {
						      // 设置成功 
							  console.log('成功设置分享到微信');
						    }
						})
						// “分享到朋友圈”及“分享到QQ空间”
						jwx.updateTimelineShareData({  
						    title: shareTitle, // 分享标题
						    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
				// #endif
				console.log(res);
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
			// 获取jsapi-ticket
			async getSDKSign(){
				let url = location.href
				let res =  await this.$fetch(this.$api.getSDKSign,{url:url},'POST','form')
				let noncestr = res.data.noncestr
				let timestamp = res.data.timestamp
				let sign = res.data.sign
				let shareTitle = this.title
				let shareImg = this.shareImg
				console.log(shareImg);
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
					    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 
					    imgUrl: shareImg, // 分享图标
					    success: function () {
					      // 设置成功 
						  console.log('成功设置分享到微信');
					    }
					})
					// “分享到朋友圈”及“分享到QQ空间”
					jwx.updateTimelineShareData({  
					    title: shareTitle, // 分享标题
					    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: shareImg, // 分享图标
					    success: function () {
					      // 设置成功
						   console.log('成功设置分享到朋友圈');
					    } 
					  })
				});
			}
		},
		onLoad(options) {
			this.id = options.id
			if(options.manager){
				this.manager = options.manager
				uni.setStorageSync('manager',options.manager)
				// #ifdef MP-WEIXIN
				if(!uni.getStorageSync('isToken')){
					setTimeout(()=>{
						this.modalShow = true
					},1000)
				}
				// #endif
				console.log(options.manager);
			}
		},
		onShow() {
			if(this.id){
				this.getHeadDetail()
			}else{
				this.detailData = '暂无内容'
			}
			if(uni.getStorageSync('userId')){
				this.userId = uni.getStorageSync('userId')
			}
			if(uni.getStorageSync('manager')){
				this.manager = uni.getStorageSync('manager')
			}
		},
		onShareAppMessage(ops) {
			this.path = 'pages/headlines/headDetail?id='+this.id+'&manager='+this.userId
			if(ops.from === 'button'){
			}
			return{
				title:this.title,
				path:this.path
			}
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
