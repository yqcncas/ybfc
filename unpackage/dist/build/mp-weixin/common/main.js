(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{2233:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide"),e.getStorageSync("manager")&&e.removeStorageSync("manager")}};t.default=n}).call(this,n("543d")["default"])},"572b":function(e,t,n){"use strict";(function(e){n("ceaf");var t=l(n("66fd")),o=l(n("874e")),r=l(n("676c")),u=l(n("d66d")),c=l(n("8106")),a=l(n("c4a0"));n("21b4");var f=l(n("0274"));function l(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){n.e("components/getApp/getApp").then(function(){return resolve(n("1bde"))}.bind(null,n)).catch(n.oe)};t.default.config.productionTip=!1,t.default.component("getApp",s),t.default.prototype.$fetch=r.default,t.default.prototype.$api=u.default,c.default.locale("zh-cn"),c.default.extend(a.default),t.default.prototype.$dayjs=c.default,t.default.use(f.default),o.default.mpType="app";var b=new t.default(p({},o.default));e(b).$mount()}).call(this,n("543d")["createApp"])},"6a72":function(e,t,n){"use strict";var o=n("6e51"),r=n.n(o);r.a},"6e51":function(e,t,n){},"874e":function(e,t,n){"use strict";n.r(t);var o=n("f5fe");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("6a72");var u,c,a,f,l=n("f0c5"),i=Object(l["a"])(o["default"],u,c,!1,null,null,null,!1,a,f);t["default"]=i.exports},f5fe:function(e,t,n){"use strict";n.r(t);var o=n("2233"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a}},[["572b","common/runtime","common/vendor"]]]);