(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myRecord"],{"0181":function(e,t,n){"use strict";(function(e){n("ceaf");o(n("66fd"));var t=o(n("aace"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"14a1":function(e,t,n){"use strict";n.r(t);var o=n("3d48"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},"373d":function(e,t,n){"use strict";var o=n("b162"),a=n.n(o);a.a},"3d48":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("4795"));function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,o,a,i,s){try{var r=e[i](s),u=r.value}catch(l){return void n(l)}r.done?t(u):Promise.resolve(u).then(o,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var s=e.apply(t,n);function r(e){i(s,o,a,r,u,"next",e)}function u(e){i(s,o,a,r,u,"throw",e)}r(void 0)}))}}var r=function(){Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(function(){return resolve(n("7497"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("0be9"))}.bind(null,n)).catch(n.oe)},l={name:"myRecord",components:{MescrollUni:r,uniLoadMore:u},data:function(){return{downOption:{auto:!1},tabList:[{id:1,name:"二手房"},{id:2,name:"新房"},{id:3,name:"租房"}],tabCurrentIndex:0,homeList:[],page:0,houseType:2,type:"",hasFlag:!0,status:"loading",contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多了"},top:"90rpx",isEmpty:!1,isAdmin:!1,favoriteId:"",actionShow:!1,list:[{text:"取消收藏",color:"#333333",fontSize:34}],cancelId:"",shareTitle:"",path:"",manager:"",share:0}},methods:{changeTab:function(e){this.tabCurrentIndex!==e&&(this.tabCurrentIndex=e)},swiperChange:function(e){this.tabCurrentIndex=e.target.current,0==this.tabCurrentIndex?this.houseType=2:1==this.tabCurrentIndex?this.houseType=3:this.houseType=1,this.page=0,this.hasFlag=!0,this.status="loading",this.homeList=[],this.getCollectList()},handleShowAction:function(e){!this.isAdmin&&this.manager||(this.cancelId=e,this.actionShow=!0)},cancelCollect:function(t){var n=this;return s(o.default.mark((function a(){var i;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(0!=t){o.next=8;break}return console.log(n.cancelId),o.next=4,n.$fetch(n.$api.noCollect,{id:n.cancelId},"GET");case 4:i=o.sent,console.log(i),e.showToast({icon:"none",title:i.msg}),0==i.code&&(n.page=0,n.hasFlag=!0,n.status="loading",n.homeList=[],n.getCollectList());case 8:case"end":return o.stop()}}),a)})))()},getCollectList:function(){var e=this;return s(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.hasFlag){t.next=2;break}return t.abrupt("return");case 2:return e.page=++e.page,t.next=5,e.$fetch(e.$api.collectList,{pageNum:e.page,pageSize:10,houseType:e.houseType,type:e.type,favoriteId:e.favoriteId},"GET");case 5:n=t.sent,console.log(n),n.total?e.isEmpty=!1:e.isEmpty=!0,e.hasFlag=10*e.page<n.total,e.hasFlag||(e.status="noMore"),3!=e.houseType?n.rows.forEach((function(t){t.oldHouse.picUrl?t.oldHouse.showImg=t.oldHouse.picUrl.split(",")[0]:t.oldHouse.showImg="https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",t.oldHouse.label&&(t.oldHouse.label=t.oldHouse.label.split(",")),e.homeList.push(t)})):n.rows.forEach((function(t){t.newArea.picUrl?t.newArea.showImg=t.newArea.picUrl.split(",")[0]:t.newArea.showImg="https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",t.newArea.label&&(t.newArea.label=t.newArea.label.split(",")),e.homeList.push(t)}));case 11:case"end":return t.stop()}}),t)})))()},loadMore:function(){this.hasFlag?this.getCollectList():this.status="noMore"},downCallback:function(e){this.page=0,this.hasFlag=!0,this.status="loading",this.homeList=[],this.getCollectList(),e.endSuccess()},checkDetail:function(t){2==this.houseType?this.manager?e.navigateTo({url:"../oldHouse/oldHouse?houseId="+t+"&houseType=2&flag=1&userId="+this.manager}):e.navigateTo({url:"../oldHouse/oldHouse?houseId="+t+"&houseType=2"}):1==this.houseType?this.manager?e.navigateTo({url:"../oldHouse/oldHouse?houseId="+t+"&houseType=1&flag=1&userId="+this.manager}):e.navigateTo({url:"../oldHouse/oldHouse?houseId="+t+"&houseType=1"}):3==this.houseType&&(this.manager?e.navigateTo({url:"../newHouse/newHouse?houseId="+t+"&houseType=3&flag=1&userId="+this.manager}):e.navigateTo({url:"../newHouse/newHouse?houseId="+t+"&houseType=3"}))},getSDKSign:function(){var e=this;return s(o.default.mark((function t(){var n,a,i,s,r,u,l;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=location.href,t.next=3,e.$fetch(e.$api.getSDKSign,{url:n},"POST","form");case 3:a=t.sent,i=a.data.noncestr,s=a.data.timestamp,r=a.data.sign,u=e.shareTitle,l=location.href+"&share=1",jwx.config({appId:e.$api.appid,timestamp:s,nonceStr:i,signature:r,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),jwx.ready((function(){jwx.updateAppMessageShareData({title:u,desc:"温州英棒房产，为您提供真实，有效，准确真房源!",link:l,imgUrl:"https://img.bajiaostar.com/2e0268c4601672d79e140d888a1f9e40",success:function(){console.log("成功设置分享到微信")}}),jwx.updateTimelineShareData({title:u,link:l,imgUrl:"https://img.bajiaostar.com/2e0268c4601672d79e140d888a1f9e40",success:function(){console.log("成功设置分享到朋友圈")}})}));case 11:case"end":return t.stop()}}),t)})))()}},onLoad:function(t){console.log(t),this.type=t.type,0==this.type?e.setNavigationBarTitle({title:"浏览记录"}):(this.favoriteId=t.id,this.shareTitle=t.name,t.manager&&(this.manager=t.manager,e.setStorageSync("manager",this.manager)),this.manager=t.manager,t.share&&(this.share=t.share),e.setNavigationBarTitle({title:t.name})),this.getCollectList()},onShow:function(){e.getStorageSync("isAdmin")&&(this.isAdmin=e.getStorageSync("isAdmin"))},onShareAppMessage:function(e){if(0!=this.type)return this.path="pages/my/FavorShow?id="+this.favoriteId+"&name="+this.shareTitle+"&manager="+this.manager,console.log(this.path),e.from,{title:this.shareTitle,path:this.path}}};t.default=l}).call(this,n("543d")["default"])},"91c7":function(e,t,n){"use strict";var o={mescrollUni:function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"7497"))},uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"0be9"))},uEmpty:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(n.bind(null,"e7e0"))},uActionSheet:function(){return n.e("node-modules/uview-ui/components/u-action-sheet/u-action-sheet").then(n.bind(null,"710d"))}},a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}))},aace:function(e,t,n){"use strict";n.r(t);var o=n("91c7"),a=n("14a1");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("373d");var s,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=u.exports},b162:function(e,t,n){}},[["0181","common/runtime","common/vendor"]]]);