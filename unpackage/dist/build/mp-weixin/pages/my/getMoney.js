(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/getMoney"],{"0a70":function(n,e,t){"use strict";t.r(e);var r=t("b38a"),a=t.n(r);for(var o in r)"default"!==o&&function(n){t.d(e,n,(function(){return r[n]}))}(o);e["default"]=a.a},"5b53":function(n,e,t){},"5c45":function(n,e,t){"use strict";t.r(e);var r=t("6f13"),a=t("0a70");for(var o in a)"default"!==o&&function(n){t.d(e,n,(function(){return a[n]}))}(o);t("5f22");var u,c=t("f0c5"),f=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=f.exports},"5f22":function(n,e,t){"use strict";var r=t("5b53"),a=t.n(r);a.a},"6f13":function(n,e,t){"use strict";var r,a=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return r}))},"91f0":function(n,e,t){"use strict";(function(n){t("ceaf");r(t("66fd"));var e=r(t("5c45"));function r(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},b38a:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(t("4795"));function a(n){return n&&n.__esModule?n:{default:n}}function o(n,e,t,r,a,o,u){try{var c=n[o](u),f=c.value}catch(i){return void t(i)}c.done?e(f):Promise.resolve(f).then(r,a)}function u(n){return function(){var e=this,t=arguments;return new Promise((function(r,a){var u=n.apply(e,t);function c(n){o(u,r,a,c,f,"next",n)}function f(n){o(u,r,a,c,f,"throw",n)}c(void 0)}))}}var c={name:"getMoney",data:function(){return{money:"",moneyGet:"",cardBank:"",cardId:"",cardName:"",show:!1}},methods:{getMoney:function(){var n=this;return u(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$fetch(n.$api.agentGetMoney,{cardBank:n.cardBank,cardId:n.cardId,cardName:n.cardName,money:n.moneyGet});case 2:e.sent,n.show=!0;case 4:case"end":return e.stop()}}),e)})))()},handleClose:function(){this.show=!1}},onLoad:function(n){this.money=n.reward},onShow:function(){}};e.default=c}},[["91f0","common/runtime","common/vendor"]]]);