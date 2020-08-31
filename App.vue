<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef H5
			let u = navigator.userAgent;
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if (isiOS) {
				this.$fetch(this.$api.getSDKSign, { url: location.href }, 'POST','form').then(res => {
					uni.setStorageSync('wx_sdk_data', res.data)
				})
			}
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			if(uni.getStorageSync('manager')){
				uni.removeStorageSync('manager')
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	.placeHolderClass{
		color: #9B9B9B;
		font-size: 28rpx;
	}
</style>
