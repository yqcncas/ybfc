(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/headlines/headDetail"],{"000b":function(e,t,n){"use strict";(function(e){n("ceaf");a(n("66fd"));var t=a(n("0c49"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"0c49":function(e,t,n){"use strict";n.r(t);var a=n("123b"),i=n("59f3");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("77fd");var r,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=s.exports},"0d02":function(e,t,n){},"123b":function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},"59f3":function(e,t,n){"use strict";n.r(t);var a=n("9b9a"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"77fd":function(e,t,n){"use strict";var a=n("0d02"),i=n.n(a);i.a},"9b9a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("4795"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,i,o,r){try{var c=e[o](r),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(a,i)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(a,i){var r=e.apply(t,n);function c(e){o(r,a,i,c,s,"next",e)}function s(e){o(r,a,i,c,s,"throw",e)}c(void 0)}))}}var c=function(){Promise.all([n.e("common/vendor"),n.e("components/jyf-Parser/index")]).then(function(){return resolve(n("1221"))}.bind(null,n)).catch(n.oe)},s=function(){Promise.all([n.e("common/vendor"),n.e("components/Modal/loginModal")]).then(function(){return resolve(n("b83e"))}.bind(null,n)).catch(n.oe)},u={name:"headDetail",components:{parser:c,loginModal:s},data:function(){return{detailData:"",id:"",path:"",title:"",userId:"",modalShow:!1,manager:"",shareImg:""}},methods:{getHeadDetail:function(){var t=this;return r(a.default.mark((function n(){var i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$fetch(t.$api.bookView,{id:t.id},"GET");case 2:i=n.sent,t.detailData=i.data.content,t.title=i.data.title,t.shareImg=i.data.picUrl,e.setNavigationBarTitle({title:t.title}),console.log(i);case 8:case"end":return n.stop()}}),n)})))()},modalClose:function(e){this.modalShow=e},getToken:function(t){e.setStorageSync("token",t),e.setStorageSync("isAdmin",!1),e.setStorageSync("isToken",!0),this.isToken=!0},getSDKSign:function(){var e=this;return r(a.default.mark((function t(){var n,i,o,r,c,s,u;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=location.href,t.next=3,e.$fetch(e.$api.getSDKSign,{url:n},"POST","form");case 3:i=t.sent,o=i.data.noncestr,r=i.data.timestamp,c=i.data.sign,s=e.title,u=e.shareImg,console.log(u),jwx.config({appId:e.$api.appid,timestamp:r,nonceStr:o,signature:c,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),jwx.ready((function(){jwx.updateAppMessageShareData({title:s,desc:"温州英棒房产，为您提供真实，有效，准确真房源!",link:n,imgUrl:u,success:function(){console.log("成功设置分享到微信")}}),jwx.updateTimelineShareData({title:s,link:n,imgUrl:u,success:function(){console.log("成功设置分享到朋友圈")}})}));case 12:case"end":return t.stop()}}),t)})))()}},onLoad:function(t){var n=this;this.id=t.id,t.manager&&(this.manager=t.manager,e.setStorageSync("manager",t.manager),e.getStorageSync("isToken")||setTimeout((function(){n.modalShow=!0}),1e3),console.log(t.manager))},onShow:function(){this.id?this.getHeadDetail():this.detailData="暂无内容",e.getStorageSync("userId")&&(this.userId=e.getStorageSync("userId")),e.getStorageSync("manager")&&(this.manager=e.getStorageSync("manager"))},onShareAppMessage:function(e){return this.path="pages/headlines/headDetail?id="+this.id+"&manager="+this.userId,e.from,{title:this.title,path:this.path}}};t.default=u}).call(this,n("543d")["default"])}},[["000b","common/runtime","common/vendor"]]]);