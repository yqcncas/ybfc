(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-setting"],{"07c2":function(t,n,e){var i=e("7cd3");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("3d227656",i,!0,{sourceMap:!1,shadowMode:!1})},"0b79":function(t,n,e){"use strict";var i=e("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var a=i(e("c964")),o={name:"setting",data:function(){return{}},methods:{clear:function(){uni.showModal({title:"提示",content:"你确定清除所有缓存数据吗？",success:function(t){t.confirm&&uni.showToast({icon:"none",title:"清除缓存成功"})}})},checkConfig:function(){uni.navigateTo({url:"about"})},loginOut:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var e;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$fetch(t.$api.loginOut,{},"GET");case 2:e=n.sent,0==e.code?(uni.removeStorageSync("isAdmin"),uni.removeStorageSync("isToken"),uni.removeStorageSync("manager"),uni.removeStorageSync("token"),uni.showToast({icon:"none",title:"退出成功！",duration:1e3}),setTimeout((function(){uni.switchTab({url:"my"})}),500)):uni.showToast({icon:"none",title:e.msg});case 4:case"end":return n.stop()}}),n)})))()}}};n.default=o},1952:function(t,n,e){"use strict";var i={getApp:e("1bde").default},a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[i("v-uni-view",{staticClass:"setting"},[i("v-uni-view",{staticClass:"setting-list",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clear.apply(void 0,arguments)}}},[i("v-uni-text",[t._v("清除缓存")]),i("v-uni-image",{attrs:{src:e("fa19"),mode:""}})],1),i("v-uni-view",{staticClass:"setting-list",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.checkConfig.apply(void 0,arguments)}}},[i("v-uni-text",[t._v("关于平台")]),i("v-uni-image",{attrs:{src:e("fa19"),mode:""}})],1),i("v-uni-view",{staticClass:"setting-list"},[i("v-uni-text",[t._v("当前版本")]),i("v-uni-text",[t._v("1.1.2")])],1)],1),i("v-uni-view",{staticClass:"button",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.loginOut.apply(void 0,arguments)}}},[i("v-uni-text",[t._v("退出登录")])],1),i("getApp")],1)},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},"54b6":function(t,n,e){"use strict";e.r(n);var i=e("0b79"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},"7cd3":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,"uni-page-body[data-v-276dbafc]{background:#f0f0f0}.setting[data-v-276dbafc]{background:#fff;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.setting-list[data-v-276dbafc]{margin-left:%?30?%;width:%?720?%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?100?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.setting-list > uni-text[data-v-276dbafc]:first-child{font-size:%?28?%;color:#5b5b5b}.setting-list > uni-image[data-v-276dbafc]{width:%?16?%;height:%?26?%;margin-left:%?564?%}.setting-list > uni-text[data-v-276dbafc]:nth-child(2){font-size:%?28?%;color:#5b5b5b;margin-left:%?515?%}.button[data-v-276dbafc]{width:100%;height:%?100?%;margin-top:%?60?%;font-size:%?28?%;color:#d0021b;text-align:center;line-height:%?100?%;background:#fff}body.?%PAGE?%[data-v-276dbafc]{background:#f0f0f0}",""]),t.exports=n},"9a6a":function(t,n,e){"use strict";e.r(n);var i=e("1952"),a=e("54b6");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("f90b");var c,u=e("f0c5"),r=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"276dbafc",null,!1,i["a"],c);n["default"]=r.exports},f90b:function(t,n,e){"use strict";var i=e("07c2"),a=e.n(i);a.a},fa19:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAHJb+yRAAAABGdBTUEAALGPC/xhBQAAARxJREFUOBGdk4ENgzAMBGm7QDeo2MSjZxPEBh2hvohHTxoK9KXEb/v9CYUOQ4O4N4Vf6UizblKFSBvXBmQdWQlyTn7lilwbRGas4ca2IESI+AQEbBIKwSbggYKTQKm7bQiEEMlYxF2gWohkLA9LRBl6LsnNHcYs6i5z8gkRgm6DpgNRF9whcnEmbu9cGyCggaArQsDUrkiPuSuSIE36Ti7oiu5UG+jHojxxOUdYUuAuCAoLiogEoULGYrw6hBU2Teo8hX6kryYCHTEm1+3n5PVVIzgCBj7s+lNGGAh/GbnBX0Y9g0tGvwxOGbUfm4Y8+qfs9foHObrBmBN6vT48Z1Jf9Z7B4aDcWoPTg63B5UE36A3PekYJz0SMWJfwARHdMZ0gfb2LAAAAAElFTkSuQmCC"}}]);