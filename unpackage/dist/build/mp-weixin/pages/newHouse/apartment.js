(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/newHouse/apartment"],{"1bd9":function(e,t,n){"use strict";n.r(t);var o=n("27c4"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},"27c4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("4795")),a=i(n("d66d"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,o,a,i,r){try{var s=e[i](r),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(o,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function s(e){r(i,o,a,s,u,"next",e)}function u(e){r(i,o,a,s,u,"throw",e)}s(void 0)}))}}var u=function(){n.e("components/uni-swiper-dot/uni-swiper-dot").then(function(){return resolve(n("8735"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/Guess/Guess").then(function(){return resolve(n("5fd6"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/uni-grid/uni-grid").then(function(){return resolve(n("7954"))}.bind(null,n)).catch(n.oe)},d=function(){Promise.all([n.e("common/vendor"),n.e("components/Modal/loginModal")]).then(function(){return resolve(n("b83e"))}.bind(null,n)).catch(n.oe)},h=function(){Promise.all([n.e("common/vendor"),n.e("components/jyf-Parser/index")]).then(function(){return resolve(n("1221"))}.bind(null,n)).catch(n.oe)},f={name:"apartment",components:{uniSwiperDot:u,Guess:c,uniGrid:l,loginModal:d,parser:h},data:function(){return{houseId:"",height:64,top:0,scrollH:0,opcity:0,iconOpcity:.5,current:0,mode:"nav",dotsStyles:{backgroundColor:"rgba(0, 0, 0, .3)",border:"1px rgba(0, 0, 0, .3) solid",color:"#fff",selectedBackgroundColor:"rgba(0, 0, 0, .9)",selectedBorder:"1px rgba(0, 0, 0, .9) solid"},autoplay:!1,interval:3e3,circular:!0,swiperList:[],length:"",houseInfo:[],mobile:"",postName:"",userId:"",avatar:"",userName:"",company:"",homeList:[],houseType:4,isToken:!1,manager:"",loadShow:!1,backHome:!1,isAdmin:!1,modalShow:!1,flag:!1,path:"",shareTitle:"",shareUserId:""}},methods:{back:function(){this.backHome?e.switchTab({url:"../home/home"}):e.navigateBack({delta:1})},change:function(e){this.current=e.detail.current},getApartmentList:function(){var t=this;return s(o.default.mark((function n(){var i,r,s;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.swiperList=[],n.next=3,t.$fetch(t.$api.apartment,{houseId:t.houseId},"GET");case 3:i=n.sent,i.data.newHouse.picUrl?(r=i.data.newHouse.picUrl.split(","),r.forEach((function(e){t.swiperList.push(e)}))):t.swiperList[0]="https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",i.data.newHouse.houseName||(i.data.newHouse.houseName=""),i.data.newHouse.acreage||(i.data.newHouse.acreage=""),i.data.newHouse.room1||(i.data.newHouse.room1=""),i.data.newHouse.room2||(i.data.newHouse.room2=""),i.data.newHouse.room3||(i.data.newHouse.room3=""),t.houseInfo=i.data.newHouse,t.houseInfo.label&&(t.houseInfo.label=t.houseInfo.label.split(",")),s=i.data.manager,t.manager||(t.avatar=a.default.pro+"profile/avatar/"+s.avatar,t.userName=s.userName,t.company=s.company,t.mobile=s.phonenumber,t.postName=s.postName,t.userId=s.userId),1==t.isAdmin?t.path="pages/newHouse/apartment?id="+t.houseId+"&userId="+t.shareUserId+"&share=1":t.path="pages/newHouse/apartment?id="+t.houseId+"&share=1",t.shareTitle=i.data.newHouse.areaName,i.data.guess.forEach((function(e){e.picUrl?e.picUrl=e.picUrl.split(","):e.picUrl="https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx".split(","),e.label&&(e.label=e.label.split(","))})),t.homeList=i.data.guess,t.loadShow=!0,e.hideLoading();case 20:case"end":return n.stop()}}),n)})))()},callTel:function(){var t=this;e.showModal({title:"拨打电话",content:"拨打经纪人号码:"+this.mobile,success:function(n){n.confirm&&e.makePhoneCall({phoneNumber:t.mobile})}})},checkAgent:function(t){e.navigateTo({url:"../agent/agentDetail?id="+t})},goShare:function(){this.isToken?e.navigateTo({url:"../share/typeShare?id="+this.houseId}):(e.showToast({icon:"none",title:"请先登录！"}),setTimeout((function(){e.navigateTo({url:"../login/login"})}),1e3))},getManagerInfo:function(){var e=this;return s(o.default.mark((function t(){var n,i;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.getAgentInfo,{userId:e.manager},"GET");case 2:n=t.sent,i=n.data.user,e.avatar=a.default.pro+"profile/avatar/"+i.avatar,e.userName=i.userName,e.company=i.company,e.mobile=i.phonenumber,e.postName=i.postName,e.userId=i.userId;case 10:case"end":return t.stop()}}),t)})))()},modalClose:function(e){this.modalShow=e},getToken:function(t){e.setStorageSync("token",t),e.setStorageSync("isAdmin",!1),e.setStorageSync("isToken",!0),this.isToken=!0}},onLoad:function(t){var n=this;e.showLoading({title:"加载中"});var o={};if(o=wx.getMenuButtonBoundingClientRect(),e.getSystemInfo({success:function(e){n.width=o.left||e.windowWidth,n.height=o.top?o.top+o.height+8:e.statusBarHeight+44,n.top=o.top?o.top+(o.height-32)/2:e.statusBarHeight+6,n.scrollH=e.windowWidth}}),t.scene){this.backHome=!0;var a=decodeURIComponent(t.scene);this.houseId=a.split("&")[0],a.split("&")[1]&&(this.manager=a.split("&")[1],e.setStorageSync("manager",this.manager))}else this.houseId=t.id,t.userId&&(this.manager=t.userId,e.setStorageSync("manager",this.manager)),t.share?this.backHome=!0:this.backHome=!1,t.flag?this.flag=!0:this.flag=!1},onShow:function(){var t=this;e.getStorageSync("isAdmin")&&(this.isAdmin=e.getStorageSync("isAdmin")),e.getStorageSync("isToken")&&(this.isToken=e.getStorageSync("isToken")),e.getStorageSync("manager")&&(this.manager=e.getStorageSync("manager")),this.getApartmentList(),(this.backHome||this.flag)&&(this.isToken?this.manager&&this.getManagerInfo():this.manager&&(this.getManagerInfo(),setTimeout((function(){t.modalShow=!0}),1e3)))},onPageScroll:function(e){var t=e.scrollTop<=0?0:e.scrollTop,n=t/this.scrollH;this.opcity>=1&&n>=1||(this.opcity=n,this.iconOpcity=.5*(1-n<0?0:1-n))},onShareAppMessage:function(e){return e.from,{title:this.shareTitle,path:this.path}}};t.default=f}).call(this,n("543d")["default"])},"4e68":function(e,t,n){"use strict";n.r(t);var o=n("7394"),a=n("1bd9");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("ff7c");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=u.exports},7394:function(e,t,n){"use strict";var o={uniSwiperDot:function(){return n.e("components/uni-swiper-dot/uni-swiper-dot").then(n.bind(null,"8735"))},Guess:function(){return n.e("components/Guess/Guess").then(n.bind(null,"5fd6"))}},a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}))},"9c7a":function(e,t,n){"use strict";(function(e){n("ceaf");o(n("66fd"));var t=o(n("4e68"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},d397:function(e,t,n){},ff7c:function(e,t,n){"use strict";var o=n("d397"),a=n.n(o);a.a}},[["9c7a","common/runtime","common/vendor"]]]);