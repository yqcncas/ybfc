(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/calculator/calculator"],{"3be8":function(t,e,o){"use strict";var n=o("d53d"),i=o.n(n);i.a},6920:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){o.e("components/uni-segmented-control/uni-segmented-control").then(function(){return resolve(o("81ea"))}.bind(null,o)).catch(o.oe)},i=function(){o.e("components/Modal/typeModal").then(function(){return resolve(o("d9e6"))}.bind(null,o)).catch(o.oe)},a=function(){o.e("components/Modal/yearModal").then(function(){return resolve(o("5ac4"))}.bind(null,o)).catch(o.oe)},s=function(){Promise.all([o.e("common/vendor"),o.e("components/Modal/rateModal")]).then(function(){return resolve(o("8fee"))}.bind(null,o)).catch(o.oe)},r=function(){o.e("components/Modal/rate").then(function(){return resolve(o("a460"))}.bind(null,o)).catch(o.oe)},h={name:"calculator",components:{uniSegmentedControl:n,typeModal:i,yearModal:a,rateModal:s,Rate:r},data:function(){return{items:["等额本息","等额本金"],current:0,styleType:"button",activeColor:"#A65ABC",activeBgColor:"#FFFFFF",yg1:"0.00",yg2:"0.00",dijian:"0.00",lx1:"0.00",lx2:"0.00",zong1:"0.00",zong2:"0.00",loanType:"商业贷款",loanTypeId:1,year:5,rate1:4.75,rate2:2.75,typeShow:!1,typeId:"A",yearShow:!1,rateShow:!1,showRate:!1,money1:"",money2:""}},methods:{onClickItem:function(t){this.current!==t&&(this.current=t)},chooseLoan:function(){this.typeShow=!0},typeClose:function(t){this.typeShow=t},typeConfirm:function(t){this.typeId=t,"A"==this.typeId?(this.loanType="商业贷款",this.loanTypeId=1):"B"==this.typeId?(this.loanType="组合贷款",this.loanTypeId=3):(this.loanType="公积金贷款",this.loanTypeId=2)},chooseYear:function(){this.yearShow=!0},yearClose:function(t){this.yearShow=t},yearChoose:function(t){this.year=t,this.rate1="",this.rate2=""},chooseRate:function(){this.rateShow=!0},rateClose:function(t){this.rateShow=t},rateChoose:function(t){1==this.year?this.rate1=4.35*t:this.year>1&&this.year<=5?this.rate1=4.75*t:this.year>5&&(this.rate1=4.9*t),this.rate1=this.rate1.toFixed(2)},choiceRate:function(){this.showRate=!0},closeRate:function(t){this.showRate=t},rateChoice:function(t){this.year>=1&&this.year<=5?this.rate2=2.75*t:this.year>5&&(this.rate2=3.25*t),this.rate2=this.rate2.toFixed(2)},compute:function(){if(1==this.loanTypeId)if(this.money1&&this.rate1){var e=12*parseInt(this.year),o=parseFloat(this.rate1)/1200,n=1e4*parseFloat(this.money1),i=n*o*Math.pow(1+o,e)/(Math.pow(1+o,e)-1),a=e*i-n,s=a+n;this.yg1=i.toFixed(2),this.lx1=a.toFixed(2),this.zong1=s.toFixed(2);var r=0,h=n/e,c=h+(n-r)*o,l=h*o,u=(h+n*o+n/e*(1+o))/2*e-n,d=u+n;this.yg2=c.toFixed(2),this.lx2=u.toFixed(2),this.zong2=d.toFixed(2),this.dijian=l.toFixed(2)}else t.showToast({icon:"none",title:"请填写完整数据"});else if(2==this.loanTypeId)if(this.money2&&this.rate2){e=12*parseInt(this.year),o=parseFloat(this.rate2)/1200,n=1e4*parseFloat(this.money2),i=n*o*Math.pow(1+o,e)/(Math.pow(1+o,e)-1),a=e*i-n,s=a+n;this.yg1=i.toFixed(2),this.lx1=a.toFixed(2),this.zong1=s.toFixed(2);r=0,h=n/e,c=h+(n-r)*o,l=h*o,u=(h+n*o+n/e*(1+o))/2*e-n,d=u+n;this.yg2=c.toFixed(2),this.lx2=u.toFixed(2),this.zong2=d.toFixed(2),this.dijian=l.toFixed(2)}else t.showToast({icon:"none",title:"请填写完整数据"});else if(this.money1&&this.rate1&&this.money2&&this.rate2){e=12*parseInt(this.year),o=parseFloat(this.rate1)/1200,n=1e4*parseFloat(this.money1);var f=parseFloat(this.rate2)/1200,y=1e4*parseFloat(this.money1),p=n*o*Math.pow(1+o,e)/(Math.pow(1+o,e)-1);c=y*f*Math.pow(1+f,e)/(Math.pow(1+f,e)-1),i=p+c,a=e*i-n-y,s=a+n+y;this.yg1=i.toFixed(2),this.lx1=a.toFixed(2),this.zong1=s.toFixed(2);r=0,h=n/e;var m=y/e,F=h+(n-r)*o+m+(y-r)*f;l=h*o+m*f,u=(h+n*o+n/e*(1+o))/2*e-n+(m+y*f+y/e*(1+f))/2*e-y,d=u+n+y;this.yg2=F.toFixed(2),this.lx2=u.toFixed(2),this.zong2=d.toFixed(2),this.dijian=l.toFixed(2)}else t.showToast({icon:"none",title:"请填写完整数据"})}},watch:{loanTypeId:function(){this.year=5,this.rate1="",this.rate2=""}}};e.default=h}).call(this,o("543d")["default"])},"7e65":function(t,e,o){"use strict";(function(t){o("ceaf");n(o("66fd"));var e=n(o("f24a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"91da":function(t,e,o){"use strict";o.r(e);var n=o("6920"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},c179:function(t,e,o){"use strict";var n={uniSegmentedControl:function(){return o.e("components/uni-segmented-control/uni-segmented-control").then(o.bind(null,"81ea"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}))},d53d:function(t,e,o){},f24a:function(t,e,o){"use strict";o.r(e);var n=o("c179"),i=o("91da");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("3be8");var s,r=o("f0c5"),h=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=h.exports}},[["7e65","common/runtime","common/vendor"]]]);