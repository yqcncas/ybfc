(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-share-share"],{"0268":function(e,t,i){"use strict";var a=i("4400"),n=i.n(a);n.a},"0f69":function(e,t,i){"use strict";var a={wmPoster:i("85bb").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"content"},[a("wm-poster",{attrs:{QrSrc:e.qrCode,backImg:e.backImg,LogoSrc:e.Logo,imgSrc:e.img,imgSrc2:e.img2,imgSrc3:e.img3,imgSrc4:e.img4,Title:e.title,Width:e.width,price:e.price,homeType:e.homeType,acreage:e.acreage},on:{success:function(t){arguments[0]=t=e.$handleEvent(t),e.getImage.apply(void 0,arguments)}}})],1),1==e.show?a("v-uni-view",{staticClass:"share-tit"},[a("v-uni-view",{staticClass:"line"}),a("v-uni-view",{staticClass:"share-title"},[a("v-uni-text",[e._v("分享到")])],1),a("v-uni-view",{staticClass:"line"})],1):e._e(),1==e.show?a("v-uni-view",{staticClass:"share-way"},[a("v-uni-view",{staticClass:"wx-share"},[a("v-uni-button",{staticClass:"share-button",attrs:{"open-type":"share"}},[a("v-uni-view",{staticClass:"share-img"},[a("v-uni-image",{attrs:{src:i("53d0"),mode:""}})],1),a("v-uni-view",{staticClass:"share-text"},[a("v-uni-text",[e._v("微信")])],1)],1)],1),a("v-uni-view",{staticClass:"save-Poster",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.download.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"share-img"},[a("v-uni-image",{attrs:{src:i("94a6"),mode:""}})],1),a("v-uni-view",{staticClass:"share-text"},[a("v-uni-text",[e._v("保存到手机")])],1)],1)],1):e._e()],1)},o=[];i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}))},"3fe9":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-7ebcf28a]{background:#f0f0f0}.content[data-v-7ebcf28a]{width:%?676?%;margin:%?40?% %?38?% 0 %?38?%;border-radius:%?10?%}\n/* 分享 */.share-tit[data-v-7ebcf28a]{width:%?676?%;margin:%?80?% %?32?% %?60?% %?32?%;display:-webkit-box;display:-webkit-flex;display:flex}.line[data-v-7ebcf28a]{width:%?262?%;height:0;border:.5px solid #e2e2e2;margin-top:%?22?%}.share-title[data-v-7ebcf28a]{font-size:%?28?%;color:#999;width:%?164?%;height:%?40?%;text-align:center;line-height:%?40?%;font-family:PingFangSC;font-weight:400}.share-way[data-v-7ebcf28a]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;margin-bottom:%?40?%}.wx-share[data-v-7ebcf28a]{width:%?140?%;height:%?150?%;margin-left:%?168?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.share-img[data-v-7ebcf28a]{margin:0 %?26?%;width:%?88?%;height:%?88?%}.share-img uni-image[data-v-7ebcf28a]{width:%?88?%;height:%?88?%}.share-text[data-v-7ebcf28a]{width:%?140?%;margin-top:%?22?%;height:%?40?%;line-height:%?40?%;text-align:center;color:#333;font-weight:400;font-family:PingFangSC;font-size:%?28?%}.share-button[data-v-7ebcf28a]{width:%?140?%;height:%?150?%;text-align:center;color:#333;font-weight:400;font-family:PingFangSC;font-size:%?28?%;background:#f0f0f0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:0;margin:0;list-style:none;outline:none}.share-button[data-v-7ebcf28a]::after{border:none}.save-Poster[data-v-7ebcf28a]{margin-left:%?94?%;width:%?140?%;height:%?150?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}body.?%PAGE?%[data-v-7ebcf28a]{background:#f0f0f0}",""]),e.exports=t},4328:function(e,t,i){"use strict";var a,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-canvas",{staticStyle:{"border-radius":"10px"},style:{width:e.canvasW+"px",height:e.canvasH+"px"},attrs:{"canvas-id":e.CanvasID}})],1)},o=[];i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}))},4400:function(e,t,i){var a=i("3fe9");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("75c4860d",a,!0,{sourceMap:!1,shadowMode:!1})},"53d0":function(e,t,i){e.exports=i.p+"static/img/wechat.e83d3798.png"},"61cb":function(e,t,i){"use strict";i.r(t);var a=i("ab9d"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"6cf5":function(e,t,i){"use strict";i.r(t);var a=i("0f69"),n=i("61cb");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("0268");var r,s=i("f0c5"),c=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"7ebcf28a",null,!1,a["a"],r);t["default"]=c.exports},"7d78":function(e,t,i){"use strict";i.r(t);var a=i("e3b2"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"85bb":function(e,t,i){"use strict";i.r(t);var a=i("4328"),n=i("7d78");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);var r,s=i("f0c5"),c=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"52fecf57",null,!1,a["a"],r);t["default"]=c.exports},"94a6":function(e,t){e.exports="data:image/png;base64,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"},ab9d:function(e,t,i){"use strict";var a=i("ee27");i("ac1f"),i("5319"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var n=a(i("c964")),o=a(i("85bb")),r=(a(i("d66d")),{name:"share",components:{wmPoster:o.default},data:function(){return{img:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img2:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img3:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img4:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",qrCode:"",title:"资讯标题，后台上传的信息，包含标题、图片、资讯正文内容等信息。信息展示全部，不省略，海报高度自适应。",width:"676",Logo:"https://img.bajiaostar.com/FoBApRntoR0fmZrzsl-nDlNQIDbr",show:!1,poster:"",id:"",type:"",time:"",code:"",path:"",page:"",scene:"",price:"",homeType:"",acreage:"",isAdmin:!1,userId:"",backImg:"https://img.bajiaostar.com/FpBP1-bGltO26j4TN20uOxzpmQaM"}},methods:{getQrCode:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.getQrcodePic,{data:e.scene,page:e.page},"GET");case 2:i=t.sent,console.log(i),e.qrCode="https://admin.homeyb.cn"+i.data;case 5:case"end":return t.stop()}}),t)})))()},getPosterInfo:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){var i,a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(1!=e.type){t.next=13;break}return t.next=3,e.$fetch(e.$api.houseInfo,{houseId:e.id},"GET");case 3:i=t.sent,e.title=i.data.oldHouse.houseName,i.data.oldHouse.picUrl&&(a=i.data.oldHouse.picUrl.split(","),a[0]&&(e.img=a[0],e.img=e.img.replace("http","https")),a[1]&&(e.img2=a[1].replace("http","https"),console.log(e.img2)),a[2]&&(e.img3=a[2],e.img3=e.img4.replace("http","https")),a[3]&&(e.img4=a[3],e.img4=e.img4.replace("http","https"))),i.data.oldHouse.rental&&(e.price=i.data.oldHouse.rental+"元/月"),i.data.oldHouse.room1&&(e.homeType=i.data.oldHouse.room1+"室"+i.data.oldHouse.room2+"厅"+i.data.oldHouse.room3+"卫"),i.data.oldHouse.acreage&&(e.acreage=i.data.oldHouse.acreage+"m²"),1==e.isAdmin?(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&userId="+e.userId+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type+"&"+e.userId):(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type),e.getQrCode(),t.next=24;break;case 13:if(2!=e.type){t.next=24;break}return t.next=16,e.$fetch(e.$api.houseInfo,{houseId:e.id},"GET");case 16:n=t.sent,e.title=n.data.oldHouse.houseName,n.data.oldHouse.picUrl&&(o=n.data.oldHouse.picUrl.split(","),o[0]&&(e.img=o[0].replace("http","https")),o[1]&&(e.img2=o[1].replace("http","https")),o[2]&&(e.img3=o[2].replace("http","https")),o[3]&&(e.img4=o[3].replace("http","https"))),n.data.oldHouse.price&&(e.price=n.data.oldHouse.price+"万"),n.data.oldHouse.room1&&(e.homeType=n.data.oldHouse.room1+"室"+n.data.oldHouse.room2+"厅"+n.data.oldHouse.room3+"卫"),n.data.oldHouse.acreage&&(e.acreage=n.data.oldHouse.acreage+"m²"),1==e.isAdmin?(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&userId="+e.userId+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type+"&"+e.userId):(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type),e.getQrCode();case 24:case"end":return t.stop()}}),t)})))()},getImage:function(e){uni.hideLoading(),this.poster=e.tempFilePath,this.show=!0},download:function(){var e=this.poster;uni.authorize({scope:"scope.writePhotosAlbum",success:function(){uni.saveImageToPhotosAlbum({filePath:e,success:function(){uni.showToast({icon:"none",title:"图片已经保存到您的手机相册"})},fail:function(){uni.showToast({icon:"none",title:"保存失败"})}})},fail:function(){uni.showModal({title:"授权提醒",content:"请您先开启您的相册权限",success:function(e){e.confirm&&uni.openSetting({})}})}})}},onLoad:function(e){uni.showLoading({title:"生成海报中"}),this.id=e.id,this.type=e.houseType,console.log(this.type),uni.getStorageSync("isAdmin")&&(this.isAdmin=uni.getStorageSync("isAdmin"),1==this.isAdmin&&(this.userId=uni.getStorageSync("userId"))),this.getPosterInfo()},onShareAppMessage:function(e){return console.log(this.path),e.from,{title:this.title,path:this.path,imageUrl:this.img}}});t.default=r},e3b2:function(e,t,i){"use strict";var a=i("ee27");i("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var n,o=a(i("c964")),r={name:"wm-poster",props:{CanvasID:{Type:String,default:"PosterCanvas"},backImg:{Type:String,default:""},imgSrc:{Type:String,default:""},imgSrc2:{Type:String,default:""},imgSrc3:{Type:String,default:""},imgSrc4:{Type:String,default:""},QrSrc:{Type:String,default:""},LogoSrc:{Type:String,default:""},Title:{Type:String,default:""},TitleColor:{Type:String,default:"#333333"},LineType:{Type:[String,Boolean],default:!1},Time:{Type:String,default:"2018/08/31"},OriginalColor:{Type:String,default:"#b8b8b8"},Width:{Type:String,default:750},Height:{Type:String,default:1684},CanvasBg:{Type:String,default:"#ffffff"},Referrer:{Type:String,default:"quitter推荐给你"},ViewDetails:{Type:String,default:"长按或扫描识别二维码"},price:{Type:String,default:"暂无售价"},homeType:{Type:String,default:"未知"},acreage:{Type:String,default:"未知"}},data:function(){return{canvasW:0,canvasH:0,canvasImgSrc:"",ctx:null}},methods:{OnCanvas:function(){var e=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var i,a,o,r,s,c,u,l,d,p,g,f,h,x,m,w,v,b,y,S;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.ctx=uni.createCanvasContext(n.CanvasID,e),i=uni.upx2px(n.Width),a=uni.upx2px(1684),o=uni.upx2px(30),r=uni.upx2px(180),uni.upx2px(198),uni.upx2px(56),s=uni.upx2px(n.Width)-uni.upx2px(60),c=uni.upx2px(1046),u=s/3-uni.upx2px(8),l=0,t.next=5,n.getImageInfo({imgSrc:n.backImg});case 5:return d=t.sent,t.next=8,n.getImageInfo({imgSrc:n.LogoSrc});case 8:return p=t.sent,t.next=11,n.getImageInfo({imgSrc:n.imgSrc});case 11:return g=t.sent,t.next=14,n.getImageInfo({imgSrc:n.imgSrc2});case 14:return f=t.sent,t.next=17,n.getImageInfo({imgSrc:n.imgSrc3});case 17:return h=t.sent,t.next=20,n.getImageInfo({imgSrc:n.imgSrc4});case 20:return x=t.sent,t.next=23,n.getImageInfo({imgSrc:n.QrSrc});case 23:m=t.sent,w=[m.width,m.height],v=i-2*o,w[0]!=r&&(w[1]=Math.floor(r/w[0]*w[1]),w[0]=r),n.canvasW=i,n.canvasH=a,n.cardHeigth=c,n.ctx.setFillStyle(n.CanvasBg),n.ctx.fillRect(0,0,i,a),n.ctx.drawImage(d.path,0,0,i,a),n.ctx.drawImage(p.path,o,uni.upx2px(44),uni.upx2px(258),uni.upx2px(84)),n.ctx.setFontSize(uni.upx2px(48)),n.ctx.setFillStyle("#FFFFFF"),n.ctx.fillText("海 量 信 息  在 线 看 房",o,uni.upx2px(188),uni.upx2px(466)),n.ctx.setFontSize(uni.upx2px(28)),n.ctx.setFillStyle("#FFFFFF"),n.ctx.fillText("最新 最快 最真实",o,uni.upx2px(236),uni.upx2px(466)),n.ctx.setFillStyle("#FFFFFF"),n.ctx.setStrokeStyle("#FFFFFF"),n.ctx.lineJoin="round",n.ctx.lineWidth=7,n.ctx.setShadow(0,0,20,"rgba(0,0,0,0.05)"),n.ctx.strokeRect(o,uni.upx2px(276),i-2*o,n.cardHeigth),n.ctx.fillRect(o,uni.upx2px(276),i-2*o,n.cardHeigth),n.ctx.drawImage(g.path,o,uni.upx2px(276),s,uni.upx2px(560)),n.ctx.drawImage(f.path,o,uni.upx2px(846),u,u),n.ctx.drawImage(h.path,o+u+uni.upx2px(12),uni.upx2px(846),u,u),n.ctx.drawImage(x.path,o+2*u+uni.upx2px(22),uni.upx2px(846),u,u),n.ctx.setFontSize(uni.upx2px(44)),n.ctx.setFillStyle(n.TitleColor),b=0,y=uni.upx2px(934)+u,1,S=0;case 57:if(!(S<n.Title.length)){t.next=70;break}if(l+=n.ctx.measureText(n.Title[S]).width,!(l+4*o+22>v)){t.next=66;break}return n.ctx.fillText(n.Title.substring(b,S+1)+"...",2*o,y),b=S,t.abrupt("break",70);case 66:S==n.Title.length-1&&(n.ctx.fillText(n.Title.substring(b,S+1),2*o,y),l=0);case 67:S++,t.next=57;break;case 70:y+=uni.upx2px(75),n.ctx.setFontSize(uni.upx2px(24)),n.ctx.setFillStyle("#A2A2A2"),n.ctx.fillText("售价",2*o,y),n.ctx.fillText("房型",9*o,y),n.ctx.fillText("面积",16*o,y),y+=uni.upx2px(60),n.ctx.setFontSize(uni.upx2px(32)),n.ctx.setFillStyle("#FE9E2E"),n.ctx.fillText(n.price,2*o,y),n.ctx.fillText(n.homeType,9*o,y),n.ctx.fillText(n.acreage,16*o,y),y+=uni.upx2px(110),n.ctx.save(),n.ctx.beginPath(),n.ctx.arc(i/2,y+r/2,r/2,0,2*Math.PI),n.ctx.clip(),n.ctx.drawImage(m.path,i/2-r/2,y,r,r),n.ctx.restore(),y+=uni.upx2px(240),n.ctx.setFontSize(uni.upx2px(24)),n.ctx.setFillStyle("#FFFFFF"),n.ctx.fillText("长按识别二维码",i/2-3*o,y),setTimeout((function(){n.ctx.draw(!0,(function(e){n.getNewImage()}))}),600);case 94:case"end":return t.stop()}}),t)})))()},getImageInfo:function(e){return(0,o.default)(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.imgSrc,t.abrupt("return",new Promise((function(e,t){uni.getImageInfo({src:i,success:function(t){console.log(t),e(t)},fail:function(e){t(e)}})})));case 2:case"end":return t.stop()}}),t)})))()},getNewImage:function(){uni.canvasToTempFilePath({canvasId:n.CanvasID,quality:1,complete:function(e){n.$emit("success",e)}},this)}},mounted:function(){n=this,setTimeout((function(){n.OnCanvas()}),1e3)}};t.default=r}}]);