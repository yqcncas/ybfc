(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/share/share"],{"048c":function(e,t,o){"use strict";(function(e){o("ceaf");a(o("66fd"));var t=a(o("6cf5"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},"61cb":function(e,t,o){"use strict";o.r(t);var a=o("d606"),s=o.n(a);for(var n in a)"default"!==n&&function(e){o.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},"6cf5":function(e,t,o){"use strict";o.r(t);var a=o("ea68"),s=o("61cb");for(var n in s)"default"!==n&&function(e){o.d(t,e,(function(){return s[e]}))}(n);o("c105");var i,r=o("f0c5"),u=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=u.exports},c105:function(e,t,o){"use strict";var a=o("d41e"),s=o.n(a);s.a},d41e:function(e,t,o){},d606:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=s(o("4795"));s(o("d66d"));function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t,o,a,s,n,i){try{var r=e[n](i),u=r.value}catch(d){return void o(d)}r.done?t(u):Promise.resolve(u).then(a,s)}function i(e){return function(){var t=this,o=arguments;return new Promise((function(a,s){var i=e.apply(t,o);function r(e){n(i,a,s,r,u,"next",e)}function u(e){n(i,a,s,r,u,"throw",e)}r(void 0)}))}}var r=function(){o.e("components/wm-poster/wm-poster").then(function(){return resolve(o("85bb"))}.bind(null,o)).catch(o.oe)},u={name:"share",components:{wmPoster:r},data:function(){return{img:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img2:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img3:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",img4:"https://img.bajiaostar.com/FnwyfqiIK3_RD5UR1k66KQ_y0VFx",qrCode:"",title:"资讯标题，后台上传的信息，包含标题、图片、资讯正文内容等信息。信息展示全部，不省略，海报高度自适应。",width:"676",Logo:"https://img.bajiaostar.com/FoBApRntoR0fmZrzsl-nDlNQIDbr",show:!1,poster:"",id:"",type:"",time:"",code:"",path:"",page:"",scene:"",price:"",homeType:"",acreage:"",isAdmin:!1,userId:"",backImg:"https://img.bajiaostar.com/FpBP1-bGltO26j4TN20uOxzpmQaM"}},methods:{getQrCode:function(){var e=this;return i(a.default.mark((function t(){var o;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.getQrcodePic,{data:e.scene,page:e.page},"GET");case 2:o=t.sent,console.log(o),e.qrCode="https://admin.homeyb.cn"+o.data;case 5:case"end":return t.stop()}}),t)})))()},getPosterInfo:function(){var e=this;return i(a.default.mark((function t(){var o,s,n,i;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(1!=e.type){t.next=13;break}return t.next=3,e.$fetch(e.$api.houseInfo,{houseId:e.id},"GET");case 3:o=t.sent,e.title=o.data.oldHouse.houseName,o.data.oldHouse.picUrl&&(s=o.data.oldHouse.picUrl.split(","),s[0]&&(e.img=s[0],e.img=e.img.replace("http","https")),s[1]&&(e.img2=s[1].replace("http","https"),console.log(e.img2)),s[2]&&(e.img3=s[2],e.img3=e.img4.replace("http","https")),s[3]&&(e.img4=s[3],e.img4=e.img4.replace("http","https"))),o.data.oldHouse.rental&&(e.price=o.data.oldHouse.rental+"元/月"),o.data.oldHouse.room1&&(e.homeType=o.data.oldHouse.room1+"室"+o.data.oldHouse.room2+"厅"+o.data.oldHouse.room3+"卫"),o.data.oldHouse.acreage&&(e.acreage=o.data.oldHouse.acreage+"m²"),1==e.isAdmin?(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&userId="+e.userId+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type+"&"+e.userId):(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type),e.getQrCode(),t.next=24;break;case 13:if(2!=e.type){t.next=24;break}return t.next=16,e.$fetch(e.$api.houseInfo,{houseId:e.id},"GET");case 16:n=t.sent,e.title=n.data.oldHouse.houseName,n.data.oldHouse.picUrl&&(i=n.data.oldHouse.picUrl.split(","),i[0]&&(e.img=i[0].replace("http","https")),i[1]&&(e.img2=i[1].replace("http","https")),i[2]&&(e.img3=i[2].replace("http","https")),i[3]&&(e.img4=i[3].replace("http","https"))),n.data.oldHouse.price&&(e.price=n.data.oldHouse.price+"万"),n.data.oldHouse.room1&&(e.homeType=n.data.oldHouse.room1+"室"+n.data.oldHouse.room2+"厅"+n.data.oldHouse.room3+"卫"),n.data.oldHouse.acreage&&(e.acreage=n.data.oldHouse.acreage+"m²"),1==e.isAdmin?(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&userId="+e.userId+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type+"&"+e.userId):(e.path="pages/oldHouse/oldHouse?houseId="+e.id+"&houseType="+e.type+"&share=1",e.page="pages/oldHouse/oldHouse",e.scene=e.id+"&"+e.type),e.getQrCode();case 24:case"end":return t.stop()}}),t)})))()},getImage:function(t){e.hideLoading(),this.poster=t.tempFilePath,this.show=!0},download:function(){var t=this.poster;e.authorize({scope:"scope.writePhotosAlbum",success:function(){e.saveImageToPhotosAlbum({filePath:t,success:function(){e.showToast({icon:"none",title:"图片已经保存到您的手机相册"})},fail:function(){e.showToast({icon:"none",title:"保存失败"})}})},fail:function(){e.showModal({title:"授权提醒",content:"请您先开启您的相册权限",success:function(t){t.confirm&&e.openSetting({})}})}})}},onLoad:function(t){e.showLoading({title:"生成海报中"}),this.id=t.id,this.type=t.houseType,console.log(this.type),e.getStorageSync("isAdmin")&&(this.isAdmin=e.getStorageSync("isAdmin"),1==this.isAdmin&&(this.userId=e.getStorageSync("userId"))),this.getPosterInfo()},onShareAppMessage:function(e){return console.log(this.path),e.from,{title:this.title,path:this.path,imageUrl:this.img}}};t.default=u}).call(this,o("543d")["default"])},ea68:function(e,t,o){"use strict";var a={wmPoster:function(){return o.e("components/wm-poster/wm-poster").then(o.bind(null,"85bb"))}},s=function(){var e=this,t=e.$createElement;e._self._c},n=[];o.d(t,"b",(function(){return s})),o.d(t,"c",(function(){return n})),o.d(t,"a",(function(){return a}))}},[["048c","common/runtime","common/vendor"]]]);