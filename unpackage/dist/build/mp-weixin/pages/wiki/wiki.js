(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiki/wiki"],{"1d58":function(t,e,n){"use strict";n.r(e);var i=n("7135"),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},"3eb2":function(t,e,n){"use strict";n.r(e);var i=n("8e24"),r=n("1d58");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("bdca");var a,s=n("f0c5"),u=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=u.exports},7135:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function o(t){return c(t)||u(t)||s(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return l(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function d(t,e,n,i,r,o,a){try{var s=t[o](a),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(i,r)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var o=t.apply(e,n);function a(t){d(o,i,r,a,s,"next",t)}function s(t){d(o,i,r,a,s,"throw",t)}a(void 0)}))}}var f=function(){Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(function(){return resolve(n("7497"))}.bind(null,n)).catch(n.oe)},m=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("0be9"))}.bind(null,n)).catch(n.oe)},g=function(){Promise.all([n.e("common/vendor"),n.e("components/Modal/loginModal")]).then(function(){return resolve(n("b83e"))}.bind(null,n)).catch(n.oe)},p={name:"wiki",components:{MescrollUni:f,uniLoadMore:m,loginModal:g},data:function(){return{title:"",downOption:{auto:!1},tabList:[{id:1,name:"购房百科"},{id:2,name:"学区划分"},{id:3,name:"时事消息"},{id:4,name:"便民服务"},{id:5,name:"英棒头条"}],tabCurrentIndex:0,swiperHeight:"",page:0,artList:[],hasFlag:!0,status:"loading",contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多了"},top:"180rpx",isEmpty:!1,type:1,path:"",modalShow:!1,userId:"",isAdmin:!1,manager:""}},methods:{clear:function(){this.title="",this.page=0,this.hasFlag=!0,this.status="loading",this.artList=[],this.getWiki()},searchArt:function(){this.page=0,this.hasFlag=!0,this.status="loading",this.artList=[],this.getWiki()},changeTab:function(t){this.tabCurrentIndex!==t&&(this.tabCurrentIndex=t)},swiperChange:function(t){this.tabCurrentIndex=t.target.current,4==this.tabCurrentIndex?this.type=this.tabCurrentIndex+2:this.type=this.tabCurrentIndex+1,this.page=0,this.hasFlag=!0,this.status="loading",this.artList=[],this.getWiki()},getWiki:function(){var t=this;return h(i.default.mark((function e(){var n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.hasFlag){e.next=2;break}return e.abrupt("return");case 2:return t.page=++t.page,e.next=5,t.$fetch(t.$api.bookList,{pageNum:t.page,pageSize:10,title:t.title,type:t.type},"GET");case 5:n=e.sent,console.log(n),n.total?t.isEmpty=!1:t.isEmpty=!0,t.hasFlag=10*t.page<n.total,t.hasFlag||(t.status="noMore"),t.artList=[].concat(o(t.artList),o(n.rows));case 11:case"end":return e.stop()}}),e)})))()},loadMore:function(){this.hasFlag?this.getWiki():this.status="noMore"},downCallback:function(t){this.page=0,this.hasFlag=!0,this.status="loading",this.artList=[],this.getWiki(),t.endSuccess()},checkDetail:function(e){t.navigateTo({url:"../headlines/headDetail?id="+e})},modalClose:function(t){this.modalShow=t},getToken:function(e){t.setStorageSync("token",e),t.setStorageSync("isAdmin",!1),t.setStorageSync("isToken",!0),this.isToken=!0}},onLoad:function(e){var n=this;console.log(e),e.id&&(this.tabCurrentIndex=e.id,4==this.tabCurrentIndex?this.type=this.tabCurrentIndex+2:this.type=this.tabCurrentIndex+1),e.title&&(this.title=e.title),e.manager&&"undefined"!=e.manager&&(t.setStorageSync("manager",e.manager),t.getStorageSync("isToken")||setTimeout((function(){n.modalShow=!0}),1e3))},onShow:function(){this.getWiki(),t.getStorageSync("userId")&&(this.userId=t.getStorageSync("userId")),t.getStorageSync("isAdmin")?this.isAdmin=t.getStorageSync("isAdmin"):t.getStorageSync("manager")&&(this.manager=t.getStorageSync("manager"))},onShareAppMessage:function(t){return this.path="pages/wiki/wiki?id="+this.tabCurrentIndex+"&manager="+this.userId+"&title="+this.title,t.from,{title:"购房百科",path:this.path}}};e.default=p}).call(this,n("543d")["default"])},"8e24":function(t,e,n){"use strict";var i={mescrollUni:function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"7497"))},uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"0be9"))},uEmpty:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(n.bind(null,"e7e0"))}},r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},a10e:function(t,e,n){"use strict";(function(t){n("ceaf");i(n("66fd"));var e=i(n("3eb2"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ba25:function(t,e,n){},bdca:function(t,e,n){"use strict";var i=n("ba25"),r=n.n(i);r.a}},[["a10e","common/runtime","common/vendor"]]]);