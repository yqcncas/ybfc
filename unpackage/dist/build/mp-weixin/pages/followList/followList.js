(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/followList/followList"],{3798:function(t,n,e){"use strict";(function(t){e("ceaf");o(e("66fd"));var n=o(e("503e"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"3cec":function(t,n,e){"use strict";var o=e("b192"),r=e.n(o);r.a},"503e":function(t,n,e){"use strict";e.r(n);var o=e("76d7"),r=e("f713");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("3cec");var a,i=e("f0c5"),c=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=c.exports},"76d7":function(t,n,e){"use strict";var o={uniLoadMore:function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"0be9"))}},r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}))},"86e2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(e("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t){return s(t)||c(t)||i(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,n){if(t){if("string"===typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,n):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return l(t)}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}function f(t,n,e,o,r,u,a){try{var i=t[u](a),c=i.value}catch(s){return void e(s)}i.done?n(c):Promise.resolve(c).then(o,r)}function d(t){return function(){var n=this,e=arguments;return new Promise((function(o,r){var u=t.apply(n,e);function a(t){f(u,o,r,a,i,"next",t)}function i(t){f(u,o,r,a,i,"throw",t)}a(void 0)}))}}var h=function(){e.e("components/uni-load-more/uni-load-more").then(function(){return resolve(e("0be9"))}.bind(null,e)).catch(e.oe)},p={name:"followList",components:{uniLoadMore:h},data:function(){return{followUpList:[],oldHouseId:"",page:0,hasFlag:!0,status:"loading",contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多"}}},methods:{getOldHouseLog:function(){var t=this;return d(o.default.mark((function n(){var e;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.hasFlag){n.next=2;break}return n.abrupt("return");case 2:return t.page=++t.page,n.next=5,t.$fetch(t.$api.getOldHouseLog,{oldHouseId:t.oldHouseId,pageNum:t.page,pageSize:10},"GET");case 5:e=n.sent,t.followUpList=[].concat(u(t.followUpList),u(e.rows)),t.hasFlag=10*t.page<e.total,t.hasFlag||(t.status="noMore");case 9:case"end":return n.stop()}}),n)})))()}},onLoad:function(t){this.oldHouseId=t.id,this.getOldHouseLog()},onReachBottom:function(){this.hasFlag?this.getOldHouseLog():this.status="noMore"},onPullDownRefresh:function(){this.page=0,this.hasFlag=!0,this.status="loading",this.followUpList=[],t.stopPullDownRefresh(),this.getOldHouseLog()}};n.default=p}).call(this,e("543d")["default"])},b192:function(t,n,e){},f713:function(t,n,e){"use strict";e.r(n);var o=e("86e2"),r=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=r.a}},[["3798","common/runtime","common/vendor"]]]);