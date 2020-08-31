<template>
	<view>
		<canvas :canvas-id="CanvasID" :style="{ width: canvasW + 'px', height: canvasH + 'px'}" style="border-radius: 10px;">
			
		</canvas>
	</view>
</template>

<script>
	var _this;
	export default {
		name: 'wm-poster',
		props: {
			CanvasID: { //CanvasID 等同于 canvas-id
				Type: String,
				default: 'PosterCanvas'
			},
			imgSrc: { //展示图
				Type: String,
				default: ''
			},
			QrSrc: { //二维码
				Type: String,
				default: ''
			},
			TitleColor: { //标题颜色
				Type: String,
				default: '#333333'
			},
			LineType: { //标题显示行数		
				Type: [String, Boolean],
				default: false
			},
			OriginalColor: { //默认颜色
				Type: String,
				default: '#b8b8b8'
			},
			Width: { //画布宽度  (高度根据图片比例计算 单位upx)
				Type: String,
				default: 750
			},
			Height:{
				Type:String,
				default:'1048'
			},
			CanvasBg: { //canvas画布背景色
				Type: String,
				default: '#ffffff'
			},
			avatar:{
				Type:String,
				default:''
			},
			userName:{
				Type:String,
				default:''
			},
			company:{
				Type:String,
				default:''
			},
			postName:{
				Type:String,
				default:''
			},
			years:{
				Type:String,
				default:''
			},
			visitTimes:{
				Type:String,
				default:''
			}
		},
		data() {
			return {
				canvasW: 0,
				canvasH: 0,
				canvasImgSrc: '',
				ctx: null
			};
		},
		methods: {
			async OnCanvas() {
				_this.ctx = uni.createCanvasContext(_this.CanvasID, this);
				const C_W = uni.upx2px(_this.Width), //canvas宽度
				      C_H = uni.upx2px(_this.Height),//canvas高度
					  C_P = uni.upx2px(30), //canvas Paddng 间距
					  B_W = uni.upx2px(530),//名片宽度
					  B_H = uni.upx2px(924),//名片高度
					  C_Q = uni.upx2px(216), //二维码或太阳码宽高
					  A_V = uni.upx2px(145),//头像宽高
					  L_W = uni.upx2px(198),
					  L_H = uni.upx2px(56);
				    let _strlineW = 0; //文本宽度
					let _imgInfo = await _this.getImageInfo({
						imgSrc: _this.imgSrc
					}); //广告图
					let _QrCode = await _this.getImageInfo({
						imgSrc: _this.QrSrc
					}); //二维码或太阳码
					let _avatar = await _this.getImageInfo({
						imgSrc: _this.avatar
					});
					let r = [_imgInfo.width, _imgInfo.height];
					let q = [_QrCode.width, _QrCode.height];
					let l = [L_W, L_H];
					let imgW = C_W - C_P * 2;
					if (r[0] != imgW) {
					    r[1] = Math.floor((imgW / r[0]) * r[1]);
						r[0] = imgW;
					}
					if (q[0] != C_Q) {
						q[1] = Math.floor((C_Q / q[0]) * q[1]);
						q[0] = C_Q;
					}
					_this.canvasW = C_W;
					_this.canvasH = C_H;
					_this.ctx.setFillStyle(_this.CanvasBg); //canvas背景颜色
					_this.ctx.fillRect(0, 0, C_W, _this.canvasH); //canvas画布大小

					//添加图片展示
					_this.ctx.drawImage(_imgInfo.path, 0, 0, C_W, C_H);
					//添加图片展示 end
					
					// 设置名片大小
					let _strHeight = uni.upx2px(62)
					_this.ctx.setFillStyle('#FFFFFF')
					_this.ctx.setStrokeStyle('#FFFFFF')
					_this.ctx.lineJoin = 'round'
					_this.ctx.lineWidth = 5
					_this.ctx.setShadow(0,0,20,'rgba(0,0,0,0.05)')
					_this.ctx.strokeRect(C_P,_strHeight,B_W,B_H)
					_this.ctx.fillRect(C_P,_strHeight,B_W,B_H)
	
	
					//绘制圆形图片
					_strHeight += uni.upx2px(30)
					_this.ctx.save()
					_this.ctx.beginPath()
					_this.ctx.arc(C_W/2,_strHeight+A_V/2,A_V/2,0,2*Math.PI)
					_this.ctx.clip();
					_this.ctx.drawImage(_avatar.path,C_W/2-A_V/2,_strHeight,A_V,A_V)
					_this.ctx.restore()
					
					//经纪人姓名
					_strHeight += A_V
					_strHeight += uni.upx2px(60)
					_this.ctx.setFontSize(uni.upx2px(40))
					_this.ctx.setFillStyle('#333333')
					_this.ctx.setTextAlign('center')
					_this.ctx.fillText(_this.userName,C_W/2,_strHeight)
					
					// 公司
					_strHeight += uni.upx2px(40)
					_this.ctx.setFontSize(uni.upx2px(28))
					_this.ctx.setFillStyle('#9B9B9B')
					_this.ctx.setTextAlign('center')
					_this.ctx.fillText(_this.company,C_W/2,_strHeight)
					
					// 职位
					_strHeight += uni.upx2px(20)
					let postNameWidth = uni.upx2px(98)
					let postNameHeight = uni.upx2px(34)
					_this.ctx.setFillStyle('rgba(135,74,152,0.1)')
					_this.ctx.lineJoin = 'round'
					_this.ctx.fillRect(C_W/2-postNameWidth/2,_strHeight,postNameWidth,postNameHeight)
					
					_strHeight += uni.upx2px(25)
					_this.ctx.setFontSize(uni.upx2px(24))
					_this.ctx.setFillStyle('#874A98')
					_this.ctx.setTextAlign('center')
					_this.ctx.fillText(_this.postName,C_W/2,_strHeight)
					
					//分割线
					_strHeight += uni.upx2px(60)
					_this.ctx.setFontSize(uni.upx2px(2));
					_this.ctx.lineWidth = 1
					_this.ctx.moveTo(uni.upx2px(90),_strHeight)
					_this.ctx.lineTo(uni.upx2px(500),_strHeight)
					_this.ctx.strokeStyle = '#F6F6F6'
					_this.ctx.stroke()
					
					// 服务年限,带看人数
					_strHeight += uni.upx2px(60)
					_this.ctx.setFontSize(uni.upx2px(28))
					_this.ctx.setFillStyle('#9B9B9B')
					_this.ctx.fillText('服务年限',uni.upx2px(180),_strHeight)
					_this.ctx.fillText('带看人数',uni.upx2px(410),_strHeight)
					
					_strHeight += uni.upx2px(60)
					_this.ctx.setFontSize(uni.upx2px(34))
					_this.ctx.setFillStyle('#333333')
					_this.ctx.setTextAlign('center')
					_this.ctx.fillText(_this.years,uni.upx2px(180),_strHeight)
					_this.ctx.fillText(_this.visitTimes,uni.upx2px(410),_strHeight)
					
					//分割线
					_strHeight += uni.upx2px(40)
					_this.ctx.setFontSize(uni.upx2px(2));
					_this.ctx.lineWidth = 1
					_this.ctx.moveTo(uni.upx2px(90),_strHeight)
					_this.ctx.lineTo(uni.upx2px(500),_strHeight)
					_this.ctx.strokeStyle = '#F6F6F6'
					_this.ctx.stroke()
					
					// 文本
					_strHeight += uni.upx2px(60)
					_this.ctx.setFontSize(uni.upx2px(28))
					_this.ctx.setFillStyle('#9B9B9B')
					_this.ctx.setTextAlign('center')
					_this.ctx.fillText('长按识别二维码，海量房源任你选',C_W/2,_strHeight)
					
					// 二维码
					_strHeight += uni.upx2px(60)
					_this.ctx.drawImage(_QrCode.path,C_W/2 -C_Q/2,_strHeight,q[0],q[1])
					
					
					//延迟后渲染至canvas上
					setTimeout(function() {
						_this.ctx.draw(true, (ret) => {
							_this.getNewImage();
						});
					}, 600);
			},
			async getImageInfo({
				imgSrc
			}) {
				return new Promise((resolve, errs) => {
					uni.getImageInfo({
						src: imgSrc,
						success: function(image) {
							console.log(imgSrc,image);
							resolve(image);
						},
						fail(err) {
							console.log(imgSrc,err);
							errs(err);
						}
					});
				});
			},
			getNewImage() {
				uni.canvasToTempFilePath({
					canvasId: _this.CanvasID,
					quality: 1,
					complete: (res) => {
						_this.$emit('success', res);
					}
				}, this);
			}

		},
		mounted() {
			_this = this;
			setTimeout(() =>{
				_this.OnCanvas();
			},1000)
		}
	};
</script>

<style></style>
