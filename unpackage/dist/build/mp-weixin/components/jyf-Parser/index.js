(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jyf-Parser/index"],{1221:function(t,e,n){"use strict";n.r(e);var o=n("74b9"),r=n("31ad");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("d2da");var a,s=n("f0c5"),u=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=u.exports},"1ab9":function(t,e,n){},"31ad":function(t,e,n){"use strict";n.r(e);var o=n("c58b"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},"74b9":function(t,e,n){"use strict";var o,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))},c58b:function(t,e,n){"use strict";(function(t){function o(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=r(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i,a=!0,s=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var t=o.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==o.return||o.return()}finally{if(s)throw i}}}}function r(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,s=function(){n.e("components/jyf-Parser/trees").then(function(){return resolve(n("10f77"))}.bind(null,n)).catch(n.oe)},u=n("5029"),c=n("3a16").versionHigherThan("1.9.3"),l={name:"parser",data:function(){return{nodes:[],showAnimation:{}}},components:{trees:s},props:{html:{type:null,default:""},autocopy:{type:Boolean,default:!0},autopause:{type:Boolean,default:!0},autopreview:{type:Boolean,default:!0},autosetTitle:{type:Boolean,default:!0},imgMode:{type:String,default:"default"},lazyLoad:{type:Boolean,default:!1},selectable:{type:Boolean,default:!1},tagStyle:{type:Object,default:function(){return{}}},showWithAnimation:{type:Boolean,default:!1},animationDuration:{type:Number,default:400}},mounted:function(){this.execHtml(this.html),this.videoContext=[]},methods:{execHtml:function(e){var n=this,o={};if(this.showWithAnimation&&(o=t.createAnimation({duration:this.animationDuration,timingFunction:"ease"}).opacity(1).step().export()),e)if("string"==typeof e)u(e,this.tagStyle,this.imgMode).then((function(e){n.nodes=e.nodes,n.showAnimation=o,n.imgList=e.imgList,a&&(n.document=new a("nodes",e.nodes,n)),e.title&&n.autosetTitle&&t.setNavigationBarTitle({title:e.title}),n.$emit("parser",e),n.ready()})).catch((function(t){n.$emit("error",{source:"parse",errMsg:t})}));else if(e.constructor==Array)this.showAnimation=o,this.imgList=[],a&&(this.document=new a("html",e,this)),this.ready();else if("object"==typeof e){if(!e.nodes||e.nodes.constructor!=Array){if(e.name&&e.children&&e.attrs||"text"==e.type)return;return void this.$emit("error",{source:"parse",errMsg:"传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是："+typeof e.nodes})}this.showAnimation=o,this.imgList=e.imgList||[],a&&(this.document=new a("html.nodes",e.nodes,this)),e.title&&this.autosetTitle&&t.setNavigationBarTitle({title:e.title}),this.ready()}else this.$emit("error",{source:"parse",errMsg:"错误的html类型："+typeof e});else this.nodes=[]},getContext:function(e){var n,r=this,i=o(e);try{var a=function(){var e=n.value,i=!1;if(!e.nodes)return{v:r.getContext(e.$children)};var a,s=o(e.nodes);try{for(s.s();!(a=s.n()).done;){var u=a.value;"img"!=u.name||i?"video"==u.name&&r.videoContext.push({id:u.attrs.id,context:t.createVideoContext(u.attrs.id,e)}):(i=!0,e.lazyLoad&&c?(e._observer=t.createIntersectionObserver(e),e._observer.relativeToViewport({top:1e3,bottom:1e3}).observe(".img",(function(t){e.imgLoad=!0,e._observer.disconnect(),e._observer=null}))):e.imgLoad=!0)}}catch(l){s.e(l)}finally{s.f()}r.getContext(e.$children)};for(i.s();!(n=i.n()).done;){var s=a();if("object"===typeof s)return s.v}}catch(u){i.e(u)}finally{i.f()}},ready:function(){var e=this;this.$nextTick((function(){t.createSelectorQuery().in(e).select(".contain").boundingClientRect((function(t){e.$emit("ready",t)})).exec(),e.getContext(e.$children)}))}},watch:{html:function(t){this.execHtml(t)}}};e.default=l}).call(this,n("543d")["default"])},d2da:function(t,e,n){"use strict";var o=n("1ab9"),r=n.n(o);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-Parser/index-create-component',
    {
        'components/jyf-Parser/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1221"))
        })
    },
    [['components/jyf-Parser/index-create-component']]
]);
