(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-headlines-headDetail"],{"0157":function(e,n,t){"use strict";var i=t("d665"),a=t.n(i);a.a},"0223":function(e,n,t){"use strict";var i={getApp:t("1bde").default},a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",[t("v-uni-view",{staticClass:"content-detail"},[t("parser",{attrs:{html:e.detailData}})],1),t("getApp"),t("loginModal",{attrs:{show:e.modalShow},on:{close:function(n){arguments[0]=n=e.$handleEvent(n),e.modalClose.apply(void 0,arguments)},token:function(n){arguments[0]=n=e.$handleEvent(n),e.getToken.apply(void 0,arguments)}}})],1)},o=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return i}))},"0c49":function(e,n,t){"use strict";t.r(n);var i=t("0223"),a=t("59f3");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("0157");var r,c=t("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"3685d353",null,!1,i["a"],r);n["default"]=s.exports},"249f":function(e,n,t){"use strict";var i=t("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,t("96cf");var a=i(t("c964")),o=t("e109"),r={name:"loginModal",props:["show"],data:function(){return{appId:"wx685226499ed8d55c",mobile:"",openId:"",code:"",openid:"",session_key:"",manager:""}},methods:{GetPhoneNumber:function(e){if(console.log(e),"getPhoneNumber:fail user deny"==e.detail.errMsg)uni.showModal({title:"提示",showCancel:!0,content:"您取消了授权"});else{var n=new o(this.appId,this.session_key),t=n.decryptData(e.detail.encryptedData,e.detail.iv);this.wxLogin(t.phoneNumber)}},wxLogin:function(e){var n=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(uni.getStorageSync("manager")&&(n.manager=uni.getStorageSync("manager")),console.log(n.manager),!n.manager){t.next=10;break}return t.next=5,n.$fetch(n.$api.wxLogin,{mobile:e,openId:n.openid,manager:n.manager},"GET");case 5:i=t.sent,uni.showToast({icon:"none",title:i.msg}),0!=i.code&&1001!=i.code||(n.$emit("close",!1),n.$emit("token",i.data.token)),t.next=15;break;case 10:return t.next=12,n.$fetch(n.$api.wxLogin,{mobile:e,openId:n.openid},"GET");case 12:a=t.sent,uni.showToast({icon:"none",title:a.msg}),0!=a.code&&1001!=a.code||(n.$emit("close",!1),n.$emit("token",a.data.token));case 15:case"end":return t.stop()}}),t)})))()},getCode:function(){var e=this;uni.login({provider:"weixin",success:function(n){n.code&&(e.code=n.code,e.getOpenId())}})},getOpenId:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$fetch(e.$api.getOpenId,{js_code:e.code},"GET");case 2:t=n.sent,e.openid=t.data.openid,uni.setStorageSync("openId",e.openid),e.session_key=t.data.session_key,uni.setStorageSync("session_key",e.session_key);case 7:case"end":return n.stop()}}),n)})))()}},created:function(){this.getCode()}};n.default=r},"2acf":function(e,n,t){var i=t("24fb");n=i(!1),n.push([e.i,".Modal[data-v-6cf1dbf2]{width:%?620?%;height:%?350?%;position:fixed;top:%?450?%;left:%?60?%;right:%?60?%;background:#fff;z-index:101;border-radius:%?8?%}.Modal > uni-view[data-v-6cf1dbf2]:first-child{width:%?560?%;text-align:center;font-size:%?40?%;margin:%?30?% %?30?%;color:#5b5b5b;font-weight:700;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.Modal > uni-view:first-child > uni-text[data-v-6cf1dbf2]:last-child{font-size:%?28?%;color:#a6a6a6;margin-top:%?30?%;font-weight:100}.Modal > uni-view[data-v-6cf1dbf2]:nth-child(2){width:%?620?%;margin-top:%?60?%;height:%?110?%}.Modal > uni-view:nth-child(2) uni-button[data-v-6cf1dbf2]{margin:0 %?30?%;width:%?560?%;height:%?110?%;border-radius:%?55?%;background:#874a89;font-size:%?28?%;line-height:%?110?%;color:#fff}\n/* 遮罩 */.mask[data-v-6cf1dbf2]{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:100;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;opacity:0;visibility:hidden}.maskShow[data-v-6cf1dbf2]{opacity:1;visibility:visible}",""]),e.exports=n},"495e":function(e,n,t){var i=t("2acf");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=t("4f06").default;a("92b5b7fa",i,!0,{sourceMap:!1,shadowMode:!1})},5757:function(e,n){function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}e.exports=t},"59f3":function(e,n,t){"use strict";t.r(n);var i=t("737c"),a=t.n(i);for(var o in i)"default"!==o&&function(e){t.d(n,e,(function(){return i[e]}))}(o);n["default"]=a.a},"737c":function(e,n,t){"use strict";var i=t("ee27");t("ac1f"),t("466d"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,t("96cf");var a=i(t("c964")),o=i(t("1221")),r=i(t("b83e")),c=t("d99e"),s={name:"headDetail",components:{parser:o.default,loginModal:r.default},data:function(){return{detailData:"",id:"",path:"",title:"",userId:"",modalShow:!1,manager:"",shareImg:""}},methods:{getHeadDetail:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var t,i,a,o,r,s,d;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$fetch(e.$api.bookView,{id:e.id},"GET");case 2:t=n.sent,e.detailData=t.data.content,e.title=t.data.title,e.shareImg=t.data.picUrl,uni.setNavigationBarTitle({title:e.title}),i=navigator.userAgent,a=location.href,o=!!i.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o?(r=uni.getStorageSync("wx_sdk_data"),s=e.title,d=e.shareImg,c.config({appId:e.$api.appid,timestamp:r.timestamp,nonceStr:r.noncestr,signature:r.sign,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),c.ready((function(){c.updateAppMessageShareData({title:s,desc:"温州英棒房产，为您提供真实，有效，准确真房源!",link:a,imgUrl:d,success:function(){console.log("成功设置分享到微信")}}),c.updateTimelineShareData({title:s,link:a,imgUrl:d,success:function(){console.log("成功设置分享到朋友圈")}})}))):e.getSDKSign(),console.log(t);case 12:case"end":return n.stop()}}),n)})))()},modalClose:function(e){this.modalShow=e},getToken:function(e){uni.setStorageSync("token",e),uni.setStorageSync("isAdmin",!1),uni.setStorageSync("isToken",!0),this.isToken=!0},getSDKSign:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var t,i,a,o,r,s,d;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t=location.href,n.next=3,e.$fetch(e.$api.getSDKSign,{url:t},"POST","form");case 3:i=n.sent,a=i.data.noncestr,o=i.data.timestamp,r=i.data.sign,s=e.title,d=e.shareImg,console.log(d),c.config({appId:e.$api.appid,timestamp:o,nonceStr:a,signature:r,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),c.ready((function(){c.updateAppMessageShareData({title:s,desc:"温州英棒房产，为您提供真实，有效，准确真房源!",link:t,imgUrl:d,success:function(){console.log("成功设置分享到微信")}}),c.updateTimelineShareData({title:s,link:t,imgUrl:d,success:function(){console.log("成功设置分享到朋友圈")}})}));case 12:case"end":return n.stop()}}),n)})))()}},onLoad:function(e){this.id=e.id,e.manager&&(this.manager=e.manager,uni.setStorageSync("manager",e.manager),console.log(e.manager))},onShow:function(){this.id?this.getHeadDetail():this.detailData="暂无内容",uni.getStorageSync("userId")&&(this.userId=uni.getStorageSync("userId")),uni.getStorageSync("manager")&&(this.manager=uni.getStorageSync("manager"))},onShareAppMessage:function(e){return this.path="pages/headlines/headDetail?id="+this.id+"&manager="+this.userId,e.from,{title:this.title,path:this.path}}};n.default=s},b83e:function(e,n,t){"use strict";t.r(n);var i=t("ba7e"),a=t("ca8e");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("c416");var r,c=t("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"6cf1dbf2",null,!1,i["a"],r);n["default"]=s.exports},ba7e:function(e,n,t){"use strict";var i,a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",[e.show?t("v-uni-view",{staticClass:"Modal"},[t("v-uni-view",[t("v-uni-text",[e._v("授权提醒")]),t("v-uni-text",[e._v("请点击授权，授权后可继续浏览")])],1),t("v-uni-view",[t("v-uni-button",{attrs:{"open-type":"getPhoneNumber"},on:{getphonenumber:function(n){arguments[0]=n=e.$handleEvent(n),e.GetPhoneNumber.apply(void 0,arguments)}}},[e._v("授权手机号")])],1)],1):e._e(),t("v-uni-view",{staticClass:"mask",class:{maskShow:!0===e.show},attrs:{catchtouchmove:"true"}})],1)},o=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return i}))},c416:function(e,n,t){"use strict";var i=t("495e"),a=t.n(i);a.a},ca8e:function(e,n,t){"use strict";t.r(n);var i=t("249f"),a=t.n(i);for(var o in i)"default"!==o&&function(e){t.d(n,e,(function(){return i[e]}))}(o);n["default"]=a.a},d665:function(e,n,t){var i=t("df52");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=t("4f06").default;a("46436e0c",i,!0,{sourceMap:!1,shadowMode:!1})},d99e:function(e,n,t){var i;t("c975"),t("ac1f"),t("466d"),t("5319"),t("1276");var a=t("5757");!function(a,o){i=function(){return o(a)}.call(n,t,n,e),void 0===i||(e.exports=i)}(window,(function(e,n){if(!e.jWeixin){var t,i,o={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},r=function(){var e={};for(var n in o)e[o[n]]=n;return e}(),c=e.document,s=c.title,d=navigator.userAgent.toLowerCase(),u=navigator.platform.toLowerCase(),l=!(!u.match("mac")&&!u.match("win")),f=-1!=d.indexOf("wxdebugger"),p=-1!=d.indexOf("micromessenger"),g=-1!=d.indexOf("android"),m=-1!=d.indexOf("iphone")||-1!=d.indexOf("ipad"),h=(i=d.match(/micromessenger\/(\d+\.\d+\.\d+)/)||d.match(/micromessenger\/(\d+\.\d+)/))?i[1]:"",v={initStartTime:O(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},S={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:m?1:g?2:-1,clientVersion:h,url:encodeURIComponent(location.href)},w={},y={_completes:[]},k={state:0,data:{}};E((function(){v.initEndTime=O()}));var I=!1,_=[],b=(t={config:function(n){L("config",w=n);var t=!1!==w.check;E((function(){if(t)M(o.config,{verifyJsApiList:D(w.jsApiList),verifyOpenTagList:D(w.openTagList)},function(){y._complete=function(e){v.preVerifyEndTime=O(),k.state=1,k.data=e},y.success=function(e){S.isPreVerifyOk=0},y.fail=function(e){y._fail?y._fail(e):k.state=-1};var e=y._completes;return e.push((function(){!function(){if(!(l||f||w.debug||h<"6.0.2"||S.systemType<0)){var e=new Image;S.appId=w.appId,S.initTime=v.initEndTime-v.initStartTime,S.preVerifyTime=v.preVerifyEndTime-v.preVerifyStartTime,b.getNetworkType({isInnerInvoke:!0,success:function(n){S.networkType=n.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+S.version+"&o="+S.isPreVerifyOk+"&s="+S.systemType+"&c="+S.clientVersion+"&a="+S.appId+"&n="+S.networkType+"&i="+S.initTime+"&p="+S.preVerifyTime+"&u="+S.url;e.src=t}})}}()})),y.complete=function(n){for(var t=0,i=e.length;t<i;++t)e[t]();y._completes=[]},y}()),v.preVerifyStartTime=O();else{k.state=1;for(var e=y._completes,n=0,i=e.length;n<i;++n)e[n]();y._completes=[]}})),b.invoke||(b.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,A(t),i)},b.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})},ready:function(e){0!=k.state?e():(y._completes.push(e),!p&&w.debug&&e())},error:function(e){h<"6.0.2"||(-1==k.state?e(k.data):y._fail=e)},checkJsApi:function(e){M("checkJsApi",{jsApiList:D(e.jsApiList)},(e._complete=function(e){if(g){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var t in n){var i=r[t];i&&(n[i]=n[t],delete n[t])}return e}(e)},e))},onMenuShareTimeline:function(e){P(o.onMenuShareTimeline,{complete:function(){M("shareTimeline",{title:e.title||s,desc:e.title||s,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){P(o.onMenuShareAppMessage,{complete:function(n){"favorite"===n.scene?M("sendAppMessage",{title:e.title||s,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):M("sendAppMessage",{title:e.title||s,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){P(o.onMenuShareQQ,{complete:function(){M("shareQQ",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){P(o.onMenuShareWeibo,{complete:function(){M("shareWeiboApp",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){P(o.onMenuShareQZone,{complete:function(){M("shareQZone",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){M("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){M("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){M("startRecord",{},e)},stopRecord:function(e){M("stopRecord",{},e)},onVoiceRecordEnd:function(e){P("onVoiceRecordEnd",e)},playVoice:function(e){M("playVoice",{localId:e.localId},e)},pauseVoice:function(e){M("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){M("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){P("onVoicePlayEnd",e)},uploadVoice:function(e){M("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){M("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){M("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){M("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(g){var n=e.localIds;try{n&&(e.localIds=JSON.parse(n))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){M(o.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){M("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){M("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===I?(I=!0,M("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(I=!1,0<_.length){var n=_.shift();wx.getLocalImgData(n)}},e))):_.push(e)},getNetworkType:function(e){M("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),a=n.substring(i+1);switch(a){case"wifi":case"edge":case"wwan":e.networkType=a;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){M("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},a(t,"getLocation",(function(e){M(o.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),a(t,"hideOptionMenu",(function(e){M("hideOptionMenu",{},e)})),a(t,"showOptionMenu",(function(e){M("showOptionMenu",{},e)})),a(t,"closeWindow",(function(e){M("closeWindow",{},e=e||{})})),a(t,"hideMenuItems",(function(e){M("hideMenuItems",{menuList:e.menuList},e)})),a(t,"showMenuItems",(function(e){M("showMenuItems",{menuList:e.menuList},e)})),a(t,"hideAllNonBaseMenuItem",(function(e){M("hideAllNonBaseMenuItem",{},e)})),a(t,"showAllNonBaseMenuItem",(function(e){M("showAllNonBaseMenuItem",{},e)})),a(t,"scanQRCode",(function(e){M("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(m){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e))})),a(t,"openAddress",(function(e){M(o.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),a(t,"openProductSpecificView",(function(e){M(o.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),a(t,"addCard",(function(e){for(var n=e.cardList,t=[],i=0,a=n.length;i<a;++i){var r=n[i],c={card_id:r.cardId,card_ext:r.cardExt};t.push(c)}M(o.addCard,{card_list:t},(e._complete=function(e){var n=e.card_list;if(n){for(var t=0,i=(n=JSON.parse(n)).length;t<i;++t){var a=n[t];a.cardId=a.card_id,a.cardExt=a.card_ext,a.isSuccess=!!a.is_succ,delete a.card_id,delete a.card_ext,delete a.is_succ}e.cardList=n,delete e.card_list}},e))})),a(t,"chooseCard",(function(e){M("chooseCard",{app_id:w.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),a(t,"openCard",(function(e){for(var n=e.cardList,t=[],i=0,a=n.length;i<a;++i){var r=n[i],c={card_id:r.cardId,code:r.code};t.push(c)}M(o.openCard,{card_list:t},e)})),a(t,"consumeAndShareCard",(function(e){M(o.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),a(t,"chooseWXPay",(function(e){M(o.chooseWXPay,C(e),e)})),a(t,"openEnterpriseRedPacket",(function(e){M(o.openEnterpriseRedPacket,C(e),e)})),a(t,"startSearchBeacons",(function(e){M(o.startSearchBeacons,{ticket:e.ticket},e)})),a(t,"stopSearchBeacons",(function(e){M(o.stopSearchBeacons,{},e)})),a(t,"onSearchBeacons",(function(e){P(o.onSearchBeacons,e)})),a(t,"openEnterpriseChat",(function(e){M("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),a(t,"launchMiniProgram",(function(e){M("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var n=e.split("?")[0],t=e.split("?")[1];return n+=".html",void 0!==t?n+"?"+t:n}}(e.path),envVersion:e.envVersion},e)})),a(t,"openBusinessView",(function(e){M("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(g){var n=e.extraData;if(n)try{e.extraData=JSON.parse(n)}catch(n){e.extraData={}}}},e))})),a(t,"miniProgram",{navigateBack:function(e){e=e||{},E((function(){M("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){E((function(){M("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){E((function(){M("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){E((function(){M("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){E((function(){M("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){E((function(){M("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(n){E((function(){n({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),t),T=1,x={};return c.addEventListener("error",(function(e){if(!g){var n=e.target,t=n.tagName,i=n.src;if(("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t)&&-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var a=n["wx-id"];if(a||(a=T++,n["wx-id"]=a),x[a])return;x[a]=!0,wx.ready((function(){wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}))}}}),!0),c.addEventListener("load",(function(e){if(!g){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(x[i]=!1)}}}),!0),n&&(e.wx=e.jWeixin=b),b}function M(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,A(t),(function(e){V(n,e,i)})):L(n,i)}function P(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,(function(e){i&&i.trigger&&i.trigger(e),V(n,e,t)})):L(n,i||t)}function A(e){return(e=e||{}).appId=w.appId,e.verifyAppId=w.appId,e.verifySignType="sha1",e.verifyTimestamp=w.timestamp+"",e.verifyNonceStr=w.nonceStr,e.verifySignature=w.signature,e}function C(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function V(e,n,t){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=function(e,n){var t=e,i=r[t];i&&(t=i);var a="ok";if(n){var o=n.indexOf(":");"confirm"==(a=n.substring(o+1))&&(a="ok"),"failed"==a&&(a="fail"),-1!=a.indexOf("failed_")&&(a=a.substring(7)),-1!=a.indexOf("fail_")&&(a=a.substring(5)),"access denied"!=(a=(a=a.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=a||(a="permission denied"),"config"==t&&"function not exist"==a&&(a="ok"),""==a&&(a="fail")}return t+":"+a}(e,i),n.errMsg=i),(t=t||{})._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",w.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var a=i.indexOf(":");switch(i.substring(a+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function D(e){if(e){for(var n=0,t=e.length;n<t;++n){var i=e[n],a=o[i];a&&(e[n]=a)}return e}}function L(e,n){if(!(!w.debug||n&&n.isInnerInvoke)){var t=r[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function O(){return(new Date).getTime()}function E(n){p&&(e.WeixinJSBridge?n():c.addEventListener&&c.addEventListener("WeixinJSBridgeReady",n,!1))}}))},df52:function(e,n,t){var i=t("24fb");n=i(!1),n.push([e.i,".content-detail[data-v-3685d353]{padding:%?30?% %?30?%;line-height:%?60?%;\n\t/* 在这里调整，整体字体大小 */font-size:%?28?%}",""]),e.exports=n}}]);