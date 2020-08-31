<template>
	<view><u-modal v-model="show" :content="content" @confirm="handleBack" ></u-modal></view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			content: '授权成功!',
			code: '',
			houseId:'',
			houseType:'',
			manager:'',
			shareFrom:''
		};
	},
	methods: {
		// 返回
		handleBack(){
			if(this.houseType != 3){
				uni.reLaunch({
					url:'../oldHouse/oldHouse?houseId='+this.houseId+'&houseType='+this.houseType+'&flag=1'+'&userId='+this.manager+'&shareFlag='+this.shareFrom
				})
			}else{
				uni.reLaunch({
					url:'../newHouse/newHouse?houseId='+this.houseId+'&houseType='+this.houseType+'&flag=1'+'&userId='+this.manager+'&shareFlag='+this.shareFrom
				})
			}
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
		// 获取微信信息
		async getWechatInfo(){
			let res = await this.$fetch(this.$api.getWechatInfo,{code:this.code},'GET')
			console.log(res);
			if(res.code == 0){
				uni.hideLoading()
				uni.setStorageSync('clientName',res.data.nickname)
				this.show = true
			}
		},
	},
	onLoad() {
		uni.showLoading({
			title:'授权中...'
		})
		this.houseId = uni.getStorageSync('shareHouseId')
		this.houseType = uni.getStorageSync('shareHouseType')
		this.manager = uni.getStorageSync('shareManager')
		if(uni.getStorageSync('shareFrom')){
			this.shareFrom = uni.getStorageSync('shareFrom')
		}else{
			this.shareFrom = 1
		}
		this.code = this.getWechatCode()
		this.getWechatInfo()
	}
};
</script>

<style lang="less">
	
</style>
