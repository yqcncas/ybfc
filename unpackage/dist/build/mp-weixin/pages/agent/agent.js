(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/agent/agent"],{"0b01":function(t,n,e){"use strict";var o=e("5893"),a=e.n(o);a.a},"3ee1":function(t,n,e){"use strict";e.r(n);var o=e("6715"),a=e("8f21");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("0b01");var i,u=e("f0c5"),s=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=s.exports},5893:function(t,n,e){},6715:function(t,n,e){"use strict";var o={uEmpty:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(e.bind(null,"e7e0"))},uniLoadMore:function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"0be9"))}},a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}))},"8f21":function(t,n,e){"use strict";e.r(n);var o=e("ae07"),a=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=a.a},a4e0:function(t,n,e){"use strict";(function(t){e("ceaf");o(e("66fd"));var n=o(e("3ee1"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},ae07:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(e("4795")),a=r(e("d66d"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t){return l(t)||c(t)||s(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,n){if(t){if("string"===typeof t)return f(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?f(t,n):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return f(t)}function f(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}function d(t,n,e,o,a,r,i){try{var u=t[r](i),s=u.value}catch(c){return void e(c)}u.done?n(s):Promise.resolve(s).then(o,a)}function h(t){return function(){var n=this,e=arguments;return new Promise((function(o,a){var r=t.apply(n,e);function i(t){d(r,o,a,i,u,"next",t)}function u(t){d(r,o,a,i,u,"throw",t)}i(void 0)}))}}var g=function(){e.e("components/uni-load-more/uni-load-more").then(function(){return resolve(e("0be9"))}.bind(null,e)).catch(e.oe)},m={name:"agent",components:{uniLoadMore:g},data:function(){return{content:"",agentList:[],page:0,hasFlag:!0,isEmpty:!1,status:"loading",contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多"},windowBottom:0}},methods:{getAgentList:function(){var n=this;return h(o.default.mark((function e(){var r;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n.hasFlag){e.next=2;break}return e.abrupt("return");case 2:return n.page=++n.page,e.next=5,n.$fetch(n.$api.agentList,{pageSize:10,pageNum:n.page,userName:n.content},"GET");case 5:r=e.sent,t.setNavigationBarTitle({title:"经纪人（共"+r.total+"人）"}),r.total?n.isEmpty=!1:n.isEmpty=!0,r.rows.forEach((function(t){t.avatar=a.default.pro+"profile/avatar/"+t.avatar})),n.agentList=[].concat(i(n.agentList),i(r.rows)),n.hasFlag=10*n.page<r.total,n.hasFlag||(n.status="noMore");case 12:case"end":return e.stop()}}),e)})))()},search:function(){this.page=0,this.hasFlag=!0,this.status="loading",this.agentList=[],this.getAgentList()},clear:function(){this.content="",this.search()},checkAgent:function(n){t.navigateTo({url:"agentDetail?id="+n})}},onShow:function(){var n=this;this.getAgentList(),t.getSystemInfo({success:function(t){n.windowBottom=t.windowBottom}})},onReachBottom:function(){this.hasFlag?this.getAgentList():this.status="noMore"},onPullDownRefresh:function(){this.page=0,this.hasFlag=!0,this.status="loading",this.agentList=[],t.stopPullDownRefresh(),this.getAgentList()}};n.default=m}).call(this,e("543d")["default"])}},[["a4e0","common/runtime","common/vendor"]]]);