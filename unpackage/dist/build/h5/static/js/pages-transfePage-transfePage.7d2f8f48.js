(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-transfePage-transfePage"],{"19b7":function(e,n,t){"use strict";t.r(n);var o=t("81be"),a=t("d4a3");for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);var u,s=t("f0c5"),i=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"08af7e32",null,!1,o["a"],u);n["default"]=i.exports},"81be":function(e,n,t){"use strict";var o={uModal:t("3772").default},a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",[t("u-modal",{attrs:{content:e.content},on:{confirm:function(n){arguments[0]=n=e.$handleEvent(n),e.handleBack.apply(void 0,arguments)}},model:{value:e.show,callback:function(n){e.show=n},expression:"show"}})],1)},r=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}))},d4a3:function(e,n,t){"use strict";t.r(n);var o=t("e776"),a=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=a.a},e776:function(e,n,t){"use strict";var o=t("ee27");t("ac1f"),t("5319"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,t("96cf");var a=o(t("c964")),r={data:function(){return{show:!1,content:"授权成功!",code:"",houseId:"",houseType:"",manager:"",shareFrom:""}},methods:{handleBack:function(){3!=this.houseType?uni.reLaunch({url:"../oldHouse/oldHouse?houseId="+this.houseId+"&houseType="+this.houseType+"&flag=1&userId="+this.manager+"&shareFlag="+this.shareFrom}):uni.reLaunch({url:"../newHouse/newHouse?houseId="+this.houseId+"&houseType="+this.houseType+"&flag=1&userId="+this.manager+"&shareFlag="+this.shareFrom})},getWechatCode:function(){function e(e){var n=/(\w+)=(\w+)/gi,t={};return e.replace(n,(function(e,n,o){t[n]=o})),t}var n=window.location.href,t=e(n);return console.log(t),t.code},getWechatInfo:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$fetch(e.$api.getWechatInfo,{code:e.code},"GET");case 2:t=n.sent,console.log(t),0==t.code&&(uni.hideLoading(),uni.setStorageSync("clientName",t.data.nickname),e.show=!0);case 5:case"end":return n.stop()}}),n)})))()}},onLoad:function(){uni.showLoading({title:"授权中..."}),this.houseId=uni.getStorageSync("shareHouseId"),this.houseType=uni.getStorageSync("shareHouseType"),this.manager=uni.getStorageSync("shareManager"),uni.getStorageSync("shareFrom")?this.shareFrom=uni.getStorageSync("shareFrom"):this.shareFrom=1,this.code=this.getWechatCode(),this.getWechatInfo()}};n.default=r}}]);