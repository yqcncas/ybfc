(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-editUserName"],{"06f6":function(e,t,n){"use strict";var a={getApp:n("1bde").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"userName"},[a("v-uni-input",{attrs:{type:"text","placeholder-class":"placeHolderClass",placeholder:"请输入姓名"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),e.userName?a("v-uni-image",{attrs:{src:n("8602"),mode:""},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clear.apply(void 0,arguments)}}}):e._e()],1),a("v-uni-view",{staticClass:"button",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.editName.apply(void 0,arguments)}}},[a("v-uni-text",[e._v("确定")])],1),a("getApp")],1)},u=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}))},"0a45":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-5fb7fc79]{background:#f0f0f0}.userName[data-v-5fb7fc79]{margin-top:%?5?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;height:%?100?%;background:#fff;line-height:%?100?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.userName > uni-input[data-v-5fb7fc79]{margin-left:%?30?%;width:%?664?%;height:%?100?%;font-size:%?34?%;color:#5b5b5b}.userName > uni-image[data-v-5fb7fc79]{width:%?36?%;height:%?36?%}.button[data-v-5fb7fc79]{width:%?690?%;height:%?90?%;line-height:%?90?%;color:#fff;background:#874a98;border-radius:%?8?%;font-size:%?28?%;margin:%?150?% %?30?% 0 %?30?%;text-align:center}body.?%PAGE?%[data-v-5fb7fc79]{background:#f0f0f0}",""]),e.exports=t},"1f23":function(e,t,n){"use strict";n.r(t);var a=n("06f6"),i=n("5dd7");for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("5a23");var o,s=n("f0c5"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"5fb7fc79",null,!1,a["a"],o);t["default"]=r.exports},"5a23":function(e,t,n){"use strict";var a=n("8a86"),i=n.n(a);i.a},"5dd7":function(e,t,n){"use strict";n.r(t);var a=n("717d"),i=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=i.a},"717d":function(e,t,n){"use strict";var a=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var i=a(n("c964")),u={name:"editUserName",data:function(){return{userName:"",isAdmin:!1}},methods:{clear:function(){this.userName=""},editName:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isAdmin){t.next=7;break}return t.next=3,e.$fetch(e.$api.agentEditInfo,{userName:e.userName},"POST","from");case 3:n=t.sent,0==n.code?(uni.showToast({icon:"none",title:n.msg}),setTimeout((function(){uni.navigateBack({delta:1})}),500)):uni.showToast({icon:"none",title:n.msg}),t.next=11;break;case 7:return t.next=9,e.$fetch(e.$api.userEditInfo,{userName:e.userName},"POST","from");case 9:a=t.sent,0==a.code?(uni.showToast({icon:"none",title:a.msg}),setTimeout((function(){uni.navigateBack({delta:1})}),500)):uni.showToast({icon:"none",title:a.msg});case 11:case"end":return t.stop()}}),t)})))()}},onLoad:function(e){uni.getStorageSync("isAdmin")&&(this.isAdmin=uni.getStorageSync("isAdmin")),this.userName=e.userName}};t.default=u},8602:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAAHeTXxYAAAABGdBTUEAALGPC/xhBQAAA1NJREFUSA2tlj1PU1EYx88ttYGJ2AWUhLFNIAECNXGtbyuDH8FNHJzwM8jkIG5+BAdXibBiLAQYiO1oUlKWOpgAacH6/x37HM69FITok9z7nPO8nuft3OucYGdnp7S1tbXM2u3u7pZ7gqOjo16tVuvlTk9PF4+Pj93IyIgX8C84PIEi/Z9skpiaC2xbGDeBYBtjgiuVSpIzYxAWFhZAHlC4UtMEnSysSbpuhEQR5UXsGqGPN/DVzefzjgeYmpoCVf3ZFTsbNz097fb39/06BFUqlVy9Xg+auSRJVhFBEk3TzimGF2JWvL5eWq8TqI8FIqfb3t7uCAeaCYOxjBG/5qVT/0KYonS73eAKHjAxMeGazaZf45kw18w61QRILWETMo8pwJNsLafXJBsDAkK5XC77dmg0GsYKOFUfjjE6OhpyhxQeZ2dnCcErkYwQtGq2LmrVcy55FQqF4szMzI+gZHKyuKwjP5PFu6JtDg0NLc3NzaXOGJQk/FbCS6YcYxnozc/PF4R9/b3SdY6GEWX1FoqknNb1sZCILJAIGyqKD5+U10yQzPXb0ZMscxQckGzC7IaOhGhtiqIpaKZTHXJ2draaUooVqU1WAb7g/gUli4GuYB6yoCMepJTiI8VHjRWVvfcME53gIXskU4yzqrSvWJ3OryWzMADLgZ8pfzx6aoBMlrSRGkLjqtCfFegD2xuWh4oU/rS5iKH3TMBwv1NWBhkxmRj3c7McG0/x483e3t7tTqfzQTTfijHvhusNpekpo2d6obRMk5y0/4MTbFexhU1z5FM3KM+0wPj4uL+WuI7szjVFw/QdDcrAtVqt1F2HDClVOh8mcsIl8toUYxwboeNjh1fxYhus5ewVH0o+TxdnJpLOGpWiGx4e/mu0kYkGk8R1eCWQNqI5OTnxKbqhE2zf4fu5qecRu0GQjYZbBqAujHg2pYNsKJgvCf8ougS/ZQWyDuL6mOx1ZJCVXNm6jmv8q5oiDDBdVCwW3eHh4aUdFzscGxtz7XbbR2h0RcI9dY8hDoblhN+UT2JUTfAfMXfWEzk7/5LFBnGoj88b0Z7HEcYyl637EbzTp/KlOTDZEJERspgaqusWRX8sx5My4LtU6wOtv4u+php8VGOEv7isDfa/AReK5s9m8mYeAAAAAElFTkSuQmCC"},"8a86":function(e,t,n){var a=n("0a45");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("39bdc6b5",a,!0,{sourceMap:!1,shadowMode:!1})}}]);