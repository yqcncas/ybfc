(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-share-typeShare"],{"03f5":function(e,t,i){"use strict";i.r(t);var n=i("3df7"),a=i.n(n);for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},"0691":function(e,t,i){"use strict";var n={wmPoster:i("85bb").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"content"},[n("wm-poster",{attrs:{QrSrc:e.qrCode,backImg:e.backImg,LogoSrc:e.Logo,imgSrc:e.img,imgSrc2:e.img2,imgSrc3:e.img3,imgSrc4:e.img4,Title:e.title,Width:e.width,price:e.price,homeType:e.homeType,acreage:e.acreage},on:{success:function(t){arguments[0]=t=e.$handleEvent(t),e.getImage.apply(void 0,arguments)}}})],1),1==e.show?n("v-uni-view",{staticClass:"share-tit"},[n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"share-title"},[n("v-uni-text",[e._v("分享到")])],1),n("v-uni-view",{staticClass:"line"})],1):e._e(),1==e.show?n("v-uni-view",{staticClass:"share-way"},[n("v-uni-view",{staticClass:"wx-share"},[n("v-uni-button",{staticClass:"share-button",attrs:{"open-type":"share"}},[n("v-uni-view",{staticClass:"share-img"},[n("v-uni-image",{attrs:{src:i("53d0"),mode:""}})],1),n("v-uni-view",{staticClass:"share-text"},[n("v-uni-text",[e._v("微信")])],1)],1)],1),n("v-uni-view",{staticClass:"save-Poster",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.download.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"share-img"},[n("v-uni-image",{attrs:{src:i("94a6"),mode:""}})],1),n("v-uni-view",{staticClass:"share-text"},[n("v-uni-text",[e._v("保存到手机")])],1)],1)],1):e._e()],1)},r=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return n}))},2527:function(e,t,i){var n=i("5bca");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("50ca63b5",n,!0,{sourceMap:!1,shadowMode:!1})},"3df7":function(e,t,i){"use strict";var n=i("ee27");i("ac1f"),i("5319"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var a=n(i("c964")),r=n(i("85bb")),o=(n(i("d66d")),{name:"share",components:{wmPoster:r.default},data:function(){return{img:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img2:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img3:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img4:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",qrCode:"",title:"资讯标题，后台上传的信息，包含标题、图片、资讯正文内容等信息。信息展示全部，不省略，海报高度自适应。",width:"676",Logo:"https://img.bajiaostar.com/FoBApRntoR0fmZrzsl-nDlNQIDbr",show:!1,poster:"",id:"",type:"",time:"",code:"",path:"",page:"",scene:"",price:"",homeType:"",acreage:"",isAdmin:!1,userId:"",backImg:"https://img.bajiaostar.com/FpBP1-bGltO26j4TN20uOxzpmQaM"}},methods:{getQrCode:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.getQrcodePic,{data:e.scene,page:e.page},"GET");case 2:i=t.sent,console.log(i),e.qrCode="https://admin.homeyb.cn"+i.data;case 5:case"end":return t.stop()}}),t)})))()},getPosterInfo:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.apartment,{houseId:e.id},"GET");case 2:i=t.sent,e.title=i.data.newHouse.houseName,i.data.newHouse.picUrl&&(n=i.data.newHouse.picUrl.split(","),n[0]&&(e.img=n[0],e.img=e.img.replace("http","https")),n[1]&&(e.img2=n[1].replace("http","https"),console.log(e.img2)),n[2]&&(e.img3=n[2],e.img3=e.img4.replace("http","https")),n[3]&&(e.img4=n[3],e.img4=e.img4.replace("http","https"))),i.data.newHouse.price?e.price=i.data.newHouse.price+"万":e.price="暂无售价",i.data.newHouse.room1&&(e.homeType=i.data.newHouse.room1+"室"+i.data.newHouse.room2+"厅"+i.data.newHouse.room3+"卫"),i.data.newHouse.acreage&&(e.acreage=i.data.newHouse.acreage+"m²"),1==e.isAdmin?(e.path="pages/newHouse/apartment?id="+e.id+"&userId="+e.userId+"&share=1",e.page="pages/newHouse/apartment",e.scene=e.id+"&"+e.userId):(e.path="pages/newHouse/apartment?id="+e.id+"&share=1",e.page="pages/newHouse/apartment",e.scene=e.id),e.getQrCode();case 10:case"end":return t.stop()}}),t)})))()},getImage:function(e){uni.hideLoading(),this.poster=e.tempFilePath,this.show=!0},download:function(){var e=this.poster;uni.authorize({scope:"scope.writePhotosAlbum",success:function(){uni.saveImageToPhotosAlbum({filePath:e,success:function(){uni.showToast({icon:"none",title:"图片已经保存到您的手机相册"})},fail:function(){uni.showToast({icon:"none",title:"保存失败"})}})},fail:function(){uni.showModal({title:"授权提醒",content:"请您先开启您的相册权限",success:function(e){e.confirm&&uni.openSetting({})}})}})}},onLoad:function(e){uni.showLoading({title:"生成海报中"}),this.id=e.id},onShow:function(){uni.getStorageSync("isAdmin")&&(this.isAdmin=uni.getStorageSync("isAdmin"),1==this.isAdmin&&(this.userId=uni.getStorageSync("userId"))),this.getPosterInfo()},onShareAppMessage:function(e){return e.from,{title:this.title,path:this.path,imageUrl:this.img}}});t.default=o},4328:function(e,t,i){"use strict";var n,a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-canvas",{staticStyle:{"border-radius":"10px"},style:{width:e.canvasW+"px",height:e.canvasH+"px"},attrs:{"canvas-id":e.CanvasID}})],1)},r=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return n}))},"53d0":function(e,t,i){e.exports=i.p+"static/img/wechat.e83d3798.png"},"5bca":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-3ab51518]{background:#f0f0f0}.content[data-v-3ab51518]{width:%?676?%;margin:%?40?% %?38?% 0 %?38?%;border-radius:%?10?%}\n/* 分享 */.share-tit[data-v-3ab51518]{width:%?676?%;margin:%?80?% %?32?% %?60?% %?32?%;display:-webkit-box;display:-webkit-flex;display:flex}.line[data-v-3ab51518]{width:%?262?%;height:0;border:.5px solid #e2e2e2;margin-top:%?22?%}.share-title[data-v-3ab51518]{font-size:%?28?%;color:#999;width:%?164?%;height:%?40?%;text-align:center;line-height:%?40?%;font-family:PingFangSC;font-weight:400}.share-way[data-v-3ab51518]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;margin-bottom:%?40?%}.wx-share[data-v-3ab51518]{width:%?140?%;height:%?150?%;margin-left:%?168?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.share-img[data-v-3ab51518]{margin:0 %?26?%;width:%?88?%;height:%?88?%}.share-img uni-image[data-v-3ab51518]{width:%?88?%;height:%?88?%}.share-text[data-v-3ab51518]{width:%?140?%;margin-top:%?22?%;height:%?40?%;line-height:%?40?%;text-align:center;color:#333;font-weight:400;font-family:PingFangSC;font-size:%?28?%}.share-button[data-v-3ab51518]{width:%?140?%;height:%?150?%;text-align:center;color:#333;font-weight:400;font-family:PingFangSC;font-size:%?28?%;background:#f0f0f0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:0;margin:0;list-style:none;outline:none}.share-button[data-v-3ab51518]::after{border:none}.save-Poster[data-v-3ab51518]{margin-left:%?94?%;width:%?140?%;height:%?150?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}body.?%PAGE?%[data-v-3ab51518]{background:#f0f0f0}",""]),e.exports=t},7953:function(e,t,i){"use strict";var n=i("2527"),a=i.n(n);a.a},"7d78":function(e,t,i){"use strict";i.r(t);var n=i("e3b2"),a=i.n(n);for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},"85bb":function(e,t,i){"use strict";i.r(t);var n=i("4328"),a=i("7d78");for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);var o,c=i("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"52fecf57",null,!1,n["a"],o);t["default"]=s.exports},"8e09":function(e,t,i){"use strict";i.r(t);var n=i("0691"),a=i("03f5");for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);i("7953");var o,c=i("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"3ab51518",null,!1,n["a"],o);t["default"]=s.exports},"94a6":function(e,t){e.exports="data:image/png;base64,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"},e3b2:function(e,t,i){"use strict";var n=i("ee27");i("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var a,r=n(i("c964")),o={name:"wm-poster",props:{CanvasID:{Type:String,default:"PosterCanvas"},backImg:{Type:String,default:""},imgSrc:{Type:String,default:""},imgSrc2:{Type:String,default:""},imgSrc3:{Type:String,default:""},imgSrc4:{Type:String,default:""},QrSrc:{Type:String,default:""},LogoSrc:{Type:String,default:""},Title:{Type:String,default:""},TitleColor:{Type:String,default:"#333333"},LineType:{Type:[String,Boolean],default:!1},Time:{Type:String,default:"2018/08/31"},OriginalColor:{Type:String,default:"#b8b8b8"},Width:{Type:String,default:750},Height:{Type:String,default:1684},CanvasBg:{Type:String,default:"#ffffff"},Referrer:{Type:String,default:"quitter推荐给你"},ViewDetails:{Type:String,default:"长按或扫描识别二维码"},price:{Type:String,default:"暂无售价"},homeType:{Type:String,default:"未知"},acreage:{Type:String,default:"未知"}},data:function(){return{canvasW:0,canvasH:0,canvasImgSrc:"",ctx:null}},methods:{OnCanvas:function(){var e=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var i,n,r,o,c,s,u,l,p,g,d,f,x,m,h,w,v,b,y,S;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a.ctx=uni.createCanvasContext(a.CanvasID,e),i=uni.upx2px(a.Width),n=uni.upx2px(1684),r=uni.upx2px(30),o=uni.upx2px(180),uni.upx2px(198),uni.upx2px(56),c=uni.upx2px(a.Width)-uni.upx2px(60),s=uni.upx2px(1046),u=c/3-uni.upx2px(8),l=0,t.next=5,a.getImageInfo({imgSrc:a.backImg});case 5:return p=t.sent,t.next=8,a.getImageInfo({imgSrc:a.LogoSrc});case 8:return g=t.sent,t.next=11,a.getImageInfo({imgSrc:a.imgSrc});case 11:return d=t.sent,t.next=14,a.getImageInfo({imgSrc:a.imgSrc2});case 14:return f=t.sent,t.next=17,a.getImageInfo({imgSrc:a.imgSrc3});case 17:return x=t.sent,t.next=20,a.getImageInfo({imgSrc:a.imgSrc4});case 20:return m=t.sent,t.next=23,a.getImageInfo({imgSrc:a.QrSrc});case 23:h=t.sent,w=[h.width,h.height],v=i-2*r,w[0]!=o&&(w[1]=Math.floor(o/w[0]*w[1]),w[0]=o),a.canvasW=i,a.canvasH=n,a.cardHeigth=s,a.ctx.setFillStyle(a.CanvasBg),a.ctx.fillRect(0,0,i,n),a.ctx.drawImage(p.path,0,0,i,n),a.ctx.drawImage(g.path,r,uni.upx2px(44),uni.upx2px(258),uni.upx2px(84)),a.ctx.setFontSize(uni.upx2px(48)),a.ctx.setFillStyle("#FFFFFF"),a.ctx.fillText("海 量 信 息  在 线 看 房",r,uni.upx2px(188),uni.upx2px(466)),a.ctx.setFontSize(uni.upx2px(28)),a.ctx.setFillStyle("#FFFFFF"),a.ctx.fillText("最新 最快 最真实",r,uni.upx2px(236),uni.upx2px(466)),a.ctx.setFillStyle("#FFFFFF"),a.ctx.setStrokeStyle("#FFFFFF"),a.ctx.lineJoin="round",a.ctx.lineWidth=7,a.ctx.setShadow(0,0,20,"rgba(0,0,0,0.05)"),a.ctx.strokeRect(r,uni.upx2px(276),i-2*r,a.cardHeigth),a.ctx.fillRect(r,uni.upx2px(276),i-2*r,a.cardHeigth),a.ctx.drawImage(d.path,r,uni.upx2px(276),c,uni.upx2px(560)),a.ctx.drawImage(f.path,r,uni.upx2px(846),u,u),a.ctx.drawImage(x.path,r+u+uni.upx2px(12),uni.upx2px(846),u,u),a.ctx.drawImage(m.path,r+2*u+uni.upx2px(22),uni.upx2px(846),u,u),a.ctx.setFontSize(uni.upx2px(44)),a.ctx.setFillStyle(a.TitleColor),b=0,y=uni.upx2px(934)+u,1,S=0;case 57:if(!(S<a.Title.length)){t.next=70;break}if(l+=a.ctx.measureText(a.Title[S]).width,!(l+4*r+22>v)){t.next=66;break}return a.ctx.fillText(a.Title.substring(b,S+1)+"...",2*r,y),b=S,t.abrupt("break",70);case 66:S==a.Title.length-1&&(a.ctx.fillText(a.Title.substring(b,S+1),2*r,y),l=0);case 67:S++,t.next=57;break;case 70:y+=uni.upx2px(75),a.ctx.setFontSize(uni.upx2px(24)),a.ctx.setFillStyle("#A2A2A2"),a.ctx.fillText("售价",2*r,y),a.ctx.fillText("房型",9*r,y),a.ctx.fillText("面积",16*r,y),y+=uni.upx2px(60),a.ctx.setFontSize(uni.upx2px(32)),a.ctx.setFillStyle("#FE9E2E"),a.ctx.fillText(a.price,2*r,y),a.ctx.fillText(a.homeType,9*r,y),a.ctx.fillText(a.acreage,16*r,y),y+=uni.upx2px(110),a.ctx.save(),a.ctx.beginPath(),a.ctx.arc(i/2,y+o/2,o/2,0,2*Math.PI),a.ctx.clip(),a.ctx.drawImage(h.path,i/2-o/2,y,o,o),a.ctx.restore(),y+=uni.upx2px(240),a.ctx.setFontSize(uni.upx2px(24)),a.ctx.setFillStyle("#FFFFFF"),a.ctx.fillText("长按识别二维码",i/2-3*r,y),setTimeout((function(){a.ctx.draw(!0,(function(e){a.getNewImage()}))}),600);case 94:case"end":return t.stop()}}),t)})))()},getImageInfo:function(e){return(0,r.default)(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.imgSrc,t.abrupt("return",new Promise((function(e,t){uni.getImageInfo({src:i,success:function(t){console.log(t),e(t)},fail:function(e){t(e)}})})));case 2:case"end":return t.stop()}}),t)})))()},getNewImage:function(){uni.canvasToTempFilePath({canvasId:a.CanvasID,quality:1,complete:function(e){a.$emit("success",e)}},this)}},mounted:function(){a=this,setTimeout((function(){a.OnCanvas()}),1e3)}};t.default=o}}]);