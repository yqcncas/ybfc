<template>
	<view><u-modal v-model="show" :content="content" @confirm="handleBack" ></u-modal></view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			content: '授权成功!',
			code: ''
		};
	},
	methods: {
		// 返回
		handleBack(){
			uni.switchTab({
				url:'../my/my'
			})
		},
		// 解析 code
		getWechatCode() {
			function parse_url(url) {
				// 定义函数
				var pattern = /(\w+)=(\w+)/gi; // 定义正则表达式
				var parames = {}; // 定义数组
				url.replace(pattern, function(a, b, c) {
					parames[b] = c;
				});
				return parames; // 返回这个数组.
			}
			// 获取当前url   取到code
			let url = window.location.href;
			let params = parse_url(url);
			console.log(params);
			return params.code;
		},
		// 获取openId
		async getClientOpenId(){
			let res = await this.$fetch(this.$api.getClientOpenId,{code:this.code},'GET')
			console.log(res);
			if(res.data.openid){
				this.saveOpenId(res.data.openid)
			}
		},
		// 绑定openId
		async saveOpenId(openId){
			let res =  await this.$fetch(this.$api.saveOpenId,{openId:openId},'POST','form')
			console.log(res);
			if(res.code == 0){
				uni.hideLoading()
				this.show = true
			}
		}
	},
	onLoad() {
		uni.showLoading({
			title:'授权中...'
		})
		this.code = this.getWechatCode()
		this.getClientOpenId()
	}
};
</script>

<style lang="less">
	
</style>
