(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recommend/recommend"],{"02a9":function(t,e,n){},5316:function(t,e,n){"use strict";var r=n("02a9"),i=n.n(r);i.a},"5e00":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("4795"));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,r,i,a,o){try{var s=t[a](o),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(r,i)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function s(t){a(o,r,i,s,u,"next",t)}function u(t){a(o,r,i,s,u,"throw",t)}s(void 0)}))}}var s={name:"recommend",data:function(){return{name:"",tel:"",address:"",adviser:"请选择",adviserId:"",adviserList:[],page:1,adviserContent:"",isSumbit:!0,height:64,top:0,scrollH:0,opcity:0,iconOpcity:0}},methods:{adviserChange:function(t){for(var e in this.adviserList)e==t.target.value&&(this.adviserId=this.adviserList[e].userId,this.adviser=this.adviserList[e].userName)},sumbitInfo:function(){var e=this;return o(r.default.mark((function n(){var i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.name){n.next=3;break}return t.showToast({icon:"none",title:"请填写客户姓名"}),n.abrupt("return");case 3:if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.tel)){n.next=6;break}return t.showToast({icon:"none",title:"手机号码有误，请确认后重新填写"}),n.abrupt("return");case 6:if(e.address){n.next=9;break}return t.showToast({icon:"none",title:"请填写详细地址"}),n.abrupt("return");case 9:if(e.adviserId){n.next=12;break}return t.showToast({icon:"none",title:"请选择顾问"}),n.abrupt("return");case 12:if(e.isSumbit){n.next=14;break}return n.abrupt("return");case 14:return e.isSumbit=!1,n.next=17,e.$fetch(e.$api.clientAdd,{name:e.name,mobile:e.tel,area:e.address,managerId:e.adviserId,managerName:e.adviser,remark:e.adviserContent});case 17:i=n.sent,console.log(i),setTimeout((function(){e.isSumbit=!0}),500),0==i.code?(e.name="",e.tel="",e.address="",e.adviserId="",e.adviser="请选择",e.adviserContent="",t.showToast({icon:"none",title:"推荐成功，等待审核"})):t.showToast({icon:"none",title:i.msg});case 21:case"end":return n.stop()}}),n)})))()},getAgentList:function(){var t=this;return o(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$fetch(t.$api.agentList,{pageNum:t.page,pageSize:9999},"GET");case 2:n=e.sent,t.adviserList=n.rows;case 4:case"end":return e.stop()}}),e)})))()},back:function(){t.navigateBack({delta:1})}},onLoad:function(){var e=this,n={};n=wx.getMenuButtonBoundingClientRect(),t.getSystemInfo({success:function(t){e.width=n.left||t.windowWidth,e.height=n.top?n.top+n.height+8:t.statusBarHeight+44,e.top=n.top?n.top+(n.height-32)/2:t.statusBarHeight+6,e.scrollH=t.windowWidth}})},onPageScroll:function(t){var e=t.scrollTop<=0?0:t.scrollTop,n=e/this.scrollH;this.opcity>=1&&n>=1||(this.opcity=n)},onShow:function(){t.getStorageSync("isToken")||(t.showToast({icon:"none",title:"请先登录！"}),setTimeout((function(){t.redirectTo({url:"../login/login"})}),500)),this.getAgentList()}};e.default=s}).call(this,n("543d")["default"])},"6f7c":function(t,e,n){"use strict";(function(t){n("ceaf");r(n("66fd"));var e=r(n("b925"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"779a":function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))},b925:function(t,e,n){"use strict";n.r(e);var r=n("779a"),i=n("f0ed");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("5316");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=u.exports},f0ed:function(t,e,n){"use strict";n.r(e);var r=n("5e00"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a}},[["6f7c","common/runtime","common/vendor"]]]);