(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/getApp/getApp"],{"0700":function(t,n,o){"use strict";var e,c=function(){var t=this,n=t.$createElement;t._self._c},i=[];o.d(n,"b",(function(){return c})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return e}))},"1bde":function(t,n,o){"use strict";o.r(n);var e=o("0700"),c=o("3fde");for(var i in c)"default"!==i&&function(t){o.d(n,t,(function(){return c[t]}))}(i);o("2a0e");var u,a=o("f0c5"),r=Object(a["a"])(c["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],u);n["default"]=r.exports},"2a0e":function(t,n,o){"use strict";var e=o("4866"),c=o.n(e);c.a},"3fde":function(t,n,o){"use strict";o.r(n);var e=o("bd7e"),c=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,(function(){return e[t]}))}(i);n["default"]=c.a},4866:function(t,n,o){},bd7e:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{bottom:0,tipsShow:!0}},props:["windowBottom"],methods:{handleToDownLoad:function(){location.href="http://privacy.homeyb.cn"},closeTips:function(){this.tipsShow=!1}},watch:{windowBottom:function(){console.log(this.windowBottom),this.bottom=this.windowBottom}},created:function(){var n=this;t.getSystemInfo({success:function(t){console.log(t),n.bottom=t.windowBottom}})}};n.default=o}).call(this,o("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/getApp/getApp-create-component',
    {
        'components/getApp/getApp-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1bde"))
        })
    },
    [['components/getApp/getApp-create-component']]
]);
