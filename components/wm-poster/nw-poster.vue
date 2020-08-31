<template>
	<view>
		<canvas :canvas-id="CanvasID" :style="{ width: canvasW + 'px', height: canvasH + 'px'}" style="border-radius: 10px;"></canvas>
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
			backImg:{//背景图
				Type:String,
				default:''
			},
			imgSrc: { //展示图
				Type: String,
				default: ''
			},
			imgSrc2: { //展示图-2
				Type: String,
				default: ''
			},
			imgSrc3: { //展示图-3
				Type: String,
				default: ''
			},
			imgSrc4: { //展示图-4
				Type: String,
				default: ''
			},
			QrSrc: { //二维码
				Type: String,
				default: ''
			},
			LogoSrc: {
				Type: String,
				default: ''
			},
			Title: { //文本内容
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
			Time: { //时间
				Type: String,
				default: '2018/08/31'
			},
			OriginalColor: { //默认颜色
				Type: String,
				default: '#b8b8b8'
			},
			Width: { //画布宽度  (高度根据图片比例计算 单位upx)
				Type: String,
				default: 750
			},
			CanvasBg: { //canvas画布背景色
				Type: String,
				default: '#ffffff'
			},
			Referrer: { //推荐人信息
				Type: String,
				default: 'quitter推荐给你'
			},
			ViewDetails: { //描述提示文字
				Type: String,
				default: '长按或扫描识别二维码'
			},
			price:{
				Type: String,
				default: '暂无售价'
			},
			publish:{
				Type: String,
				default: '未知'
			},
			address:{
				Type: String,
				default: '未知'
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
				    C_H = uni.upx2px(1684),//canvas高度
					C_P = uni.upx2px(30), //canvas Paddng 间距
					C_Q = uni.upx2px(216), //二维码或太阳码宽高
					L_W = uni.upx2px(198),
					L_H = uni.upx2px(56),
					I_W = uni.upx2px(_this.Width) - uni.upx2px(60),//第一张图片宽度
					Card_H = uni.upx2px(1046),//卡片高度
					M_W = I_W/3 - uni.upx2px(8);
					let _strlineW = 0; //文本宽度
					let _backImg = await _this.getImageInfo({
						imgSrc: _this.backImg
					});
					let _logoSrc = await _this.getImageInfo({
						imgSrc: _this.LogoSrc
					});
					let _imgInfo = await _this.getImageInfo({
						imgSrc: _this.imgSrc
					}); //广告图
					let _imgInfo2 = await _this.getImageInfo({
						imgSrc: _this.imgSrc2
					});
					let _imgInfo3 = await _this.getImageInfo({
						imgSrc: _this.imgSrc3
					});
					let _imgInfo4 = await _this.getImageInfo({
						imgSrc: _this.imgSrc4
					});
					let _QrCode = await _this.getImageInfo({
						imgSrc: _this.QrSrc
					}); //二维码或太阳码
					// let r = [_imgInfo.width, _imgInfo.height];
					let q = [_QrCode.width, _QrCode.height];
					// let l = [L_W, L_H];
					let showWidth = C_W - C_P * 2
					let imgW = (C_W - C_P * 3)/2;
					// if (r[0] != imgW) {
					//     r[1] = Math.floor((imgW / r[0]) * r[1]);
					// 	r[0] = imgW;
					// }
					if (q[0] != C_Q) {
						q[1] = Math.floor((C_Q / q[0]) * q[1]);
						q[0] = C_Q;
					}
					_this.canvasW = C_W;
					_this.canvasH = C_H;
					_this.cardHeigth = Card_H
					_this.ctx.setFillStyle(_this.CanvasBg); //canvas背景颜色
					_this.ctx.fillRect(0, 0, C_W, C_H); //canvas画布大小
					
					//背景图
					_this.ctx.drawImage(_backImg.path, 0, 0, C_W, C_H);
					//英棒房产logo
					_this.ctx.drawImage(_logoSrc.path,C_P,uni.upx2px(44),uni.upx2px(258),uni.upx2px(84))
					//标题
					_this.ctx.setFontSize(uni.upx2px(48));//字体大小
					_this.ctx.setFillStyle('#FFFFFF');//字体颜色
					_this.ctx.fillText('海 量 信 息  在 线 看 房',C_P,uni.upx2px(188),uni.upx2px(466))
					_this.ctx.setFontSize(uni.upx2px(28));//字体大小
					_this.ctx.setFillStyle('#FFFFFF');//字体颜色
					_this.ctx.fillText('最新 最快 最真实',C_P,uni.upx2px(236),uni.upx2px(466))
					//设置卡片
					_this.ctx.setFillStyle('#FFFFFF')
					_this.ctx.setStrokeStyle('#FFFFFF')
					_this.ctx.lineJoin = 'round'
					_this.ctx.lineWidth = 7
					_this.ctx.setShadow(0,0,20,'rgba(0,0,0,0.05)')
					_this.ctx.strokeRect(C_P,uni.upx2px(276),C_W-C_P*2,_this.cardHeigth)
					_this.ctx.fillRect(C_P,uni.upx2px(276),C_W-C_P*2,_this.cardHeigth)
					
					//添加图片展示
					_this.ctx.drawImage(_imgInfo.path, C_P, uni.upx2px(276),I_W,uni.upx2px(560));
					_this.ctx.drawImage(_imgInfo2.path,C_P,uni.upx2px(846), M_W, M_W)
					_this.ctx.drawImage(_imgInfo3.path,C_P+M_W+uni.upx2px(12),uni.upx2px(846),M_W, M_W)
					_this.ctx.drawImage(_imgInfo4.path,C_P+M_W*2+uni.upx2px(22),uni.upx2px(846),M_W, M_W)
					//添加图片展示 end

					//设置文本
					_this.ctx.setFontSize(uni.upx2px(44)); //设置标题字体大小
					_this.ctx.setFillStyle(_this.TitleColor); //设置标题文本颜色
					let _strLastIndex = 0; //每次开始截取的字符串的索引
					let _strHeight = uni.upx2px(934)+M_W; //绘制字体距离canvas顶部的初始高度
					let _num = 1;
					for (let i = 0; i < _this.Title.length; i++) {
						_strlineW += _this.ctx.measureText(_this.Title[i]).width;
						if (_strlineW +C_P*4 + 22 > showWidth) {
							_this.ctx.fillText(_this.Title.substring(_strLastIndex, i + 1) + '...', C_P*2, _strHeight);
							_strLastIndex = i;
							_num++;
							break;
							// if (_num == 2 && _this.LineType) {
							// 	//文字换行数量大于二进行省略号处理
							// 	_this.ctx.fillText(_this.Title.substring(_strLastIndex, i - 8) + '...', C_P, _strHeight);
							// 	_strlineW = 0;
							// 	_strLastIndex = i;
							// 	_num++;
							// 	break;
							// } else {
							// 	if (_num == 1) {
							// 		_this.ctx.fillText(_this.Title.substring(_strLastIndex, i + 1) + '...', C_P, _strHeight);
							// 	} else {
							// 		_this.ctx.fillText(_this.Title.substring(_strLastIndex, i), C_P, _strHeight);
							// 	}
							// 	_strlineW = 0;
							// 	_strHeight += 40;
							// 	_this.cardHeigth += 40;
							// 	_strLastIndex = i;
							// 	_num++;
							// }
						} else if (i == _this.Title.length - 1) {
							_this.ctx.fillText(_this.Title.substring(_strLastIndex, i + 1), C_P*2, _strHeight);
							_strlineW = 0;
						}
					}
					//设置文本 end
				
					
					//设置时间
					// _strlineW = C_P;
					// if (_num == 1) {
					// 	_strHeight += 20; //单行标题时占位符
					// }else{
					// 	_strHeight += uni.upx2px(30);					
					// }
					//设置时间 end
					
					// 添加分割线
					// _this.ctx.setFontSize(uni.upx2px(24));
					// _this.ctx.moveTo(C_P,_strHeight)
					// _this.ctx.lineTo(showWidth+C_P,_strHeight)
					// _this.ctx.strokeStyle = '#F0F0F0'
					// _this.ctx.stroke()
					
					// 添加房源信息
					_strHeight += uni.upx2px(75);
					_this.ctx.setFontSize(uni.upx2px(24)); //设置标题字体大小
					_this.ctx.setFillStyle('#A2A2A2'); //设置标题文本颜色
					_this.ctx.fillText('单价',C_P*2,_strHeight)
					_this.ctx.fillText('开盘',C_P*9,_strHeight)
					_this.ctx.fillText('地址',C_P*15,_strHeight)
					
					_strHeight += uni.upx2px(60);
					_this.ctx.setFontSize(uni.upx2px(32)); //设置标题字体大小
					_this.ctx.setFillStyle('#FE9E2E'); //设置标题文本颜色
					_this.ctx.fillText(_this.price,C_P*2,_strHeight)
					_this.ctx.fillText(_this.publish,C_P*9,_strHeight)
					_this.ctx.fillText(_this.address,C_P*15,_strHeight)
					//添加二维码
					_strHeight += uni.upx2px(110);
					_this.ctx.save()
					_this.ctx.beginPath()
					_this.ctx.arc(C_W/2,_strHeight+C_Q/2,C_Q/2,0,2*Math.PI)
					_this.ctx.clip();
					_this.ctx.drawImage(_QrCode.path, C_W/2-C_Q/2, _strHeight, C_Q, C_Q);				
					_this.ctx.restore()
					//添加二维码 end
					
					_strHeight += uni.upx2px(260);
					_this.ctx.setFontSize(uni.upx2px(24)); //设置标题字体大小
					_this.ctx.setFillStyle('#FFFFFF'); //设置标题文本颜色
					_this.ctx.fillText('长按识别二维码', C_W/2-C_P*3, _strHeight)
					// _strHeight += uni.upx2px(60);
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle('#A6A6A6'); //设置标题文本颜色
					// _this.ctx.fillText('单价',C_P,_strHeight)
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle('#FE9E2E'); //设置标题文本颜色
					// _this.ctx.fillText(_this.price,C_P*4,_strHeight)
					// _strHeight += uni.upx2px(45);
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle('#A6A6A6'); //设置标题文本颜色
					// _this.ctx.fillText('开盘',C_P,_strHeight)
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle(_this.TitleColor); //设置标题文本颜色
					// _this.ctx.fillText(_this.publish,C_P*4,_strHeight)
					// _strHeight += uni.upx2px(45);
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle('#A6A6A6'); //设置标题文本颜色
					// _this.ctx.fillText('地址',C_P,_strHeight)
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle('#3270BD'); //设置标题文本颜色
					// _this.ctx.fillText(_this.address,C_P*4,_strHeight)
					
					// _strHeight += uni.upx2px(30);
					// _this.ctx.setFontSize(uni.upx2px(24));
					// _this.ctx.moveTo(C_P,_strHeight)
					// _this.ctx.lineTo(showWidth+C_P,_strHeight)
					// _this.ctx.strokeStyle = '#F0F0F0'
					// _this.ctx.stroke()
					
					// _strHeight += uni.upx2px(60);
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle(_this.TitleColor); //设置标题文本颜色
					// _this.ctx.fillText('长按识别二维码', showWidth/2-C_P*2.5, _strHeight)
					
					// //添加二维码
					// _strHeight += uni.upx2px(30);
					// _this.ctx.drawImage(_QrCode.path, showWidth/2-C_P*3, _strHeight, q[0], q[1]);
					// //添加二维码 end
					
					// _strHeight += q[1]+uni.upx2px(30);
					// _this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
					// _this.ctx.setFillStyle(_this.TitleColor); //设置标题文本颜色
					// _this.ctx.fillText('英棒房产 海量房源', showWidth/2-C_P*3, _strHeight)

					// _this.canvasH = _strHeight+30;
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
							resolve(image);
						},
						fail(err) {
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
