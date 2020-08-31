(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/wm-poster/card"],{

/***/ 573:
/*!***************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/wm-poster/card.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card.vue?vue&type=template&id=befde2d4& */ 574);
/* harmony import */ var _card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.vue?vue&type=script&lang=js& */ 576);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs




/* normalize component */

var component = Object(_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/wm-poster/card.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 574:
/*!**********************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/wm-poster/card.vue?vue&type=template&id=befde2d4& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./card.vue?vue&type=template&id=befde2d4& */ 575);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_template_id_befde2d4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 575:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/UNIAPP/yingbang_applet/components/wm-poster/card.vue?vue&type=template&id=befde2d4& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 576:
/*!****************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/wm-poster/card.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./card.vue?vue&type=script&lang=js& */ 577);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 577:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/UNIAPP/yingbang_applet/components/wm-poster/card.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//

var _this;var _default =
{
  name: 'wm-poster',
  props: {
    CanvasID: { //CanvasID 等同于 canvas-id
      Type: String,
      default: 'PosterCanvas' },

    imgSrc: { //展示图
      Type: String,
      default: '' },

    QrSrc: { //二维码
      Type: String,
      default: '' },

    TitleColor: { //标题颜色
      Type: String,
      default: '#333333' },

    LineType: { //标题显示行数		
      Type: [String, Boolean],
      default: false },

    OriginalColor: { //默认颜色
      Type: String,
      default: '#b8b8b8' },

    Width: { //画布宽度  (高度根据图片比例计算 单位upx)
      Type: String,
      default: 750 },

    Height: {
      Type: String,
      default: '1048' },

    CanvasBg: { //canvas画布背景色
      Type: String,
      default: '#ffffff' },

    avatar: {
      Type: String,
      default: '' },

    userName: {
      Type: String,
      default: '' },

    company: {
      Type: String,
      default: '' },

    postName: {
      Type: String,
      default: '' },

    years: {
      Type: String,
      default: '' },

    visitTimes: {
      Type: String,
      default: '' } },


  data: function data() {
    return {
      canvasW: 0,
      canvasH: 0,
      canvasImgSrc: '',
      ctx: null };

  },
  methods: {
    OnCanvas: function OnCanvas() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var C_W, C_H, C_P, B_W, B_H, C_Q, A_V, L_W, L_H, _strlineW, _imgInfo, _QrCode, _avatar, r, q, l, imgW, _strHeight, postNameWidth, postNameHeight;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _this.ctx = uni.createCanvasContext(_this.CanvasID, _this2);
                C_W = uni.upx2px(_this.Width),
                C_H = uni.upx2px(_this.Height),
                C_P = uni.upx2px(30),
                B_W = uni.upx2px(530),
                B_H = uni.upx2px(924),
                C_Q = uni.upx2px(216),
                A_V = uni.upx2px(145),
                L_W = uni.upx2px(198),
                L_H = uni.upx2px(56);
                _strlineW = 0; //文本宽度
                _context.next = 5;return _this.getImageInfo({
                  imgSrc: _this.imgSrc });case 5:_imgInfo = _context.sent;_context.next = 8;return (

                  _this.getImageInfo({
                    imgSrc: _this.QrSrc }));case 8:_QrCode = _context.sent;_context.next = 11;return (

                  _this.getImageInfo({
                    imgSrc: _this.avatar }));case 11:_avatar = _context.sent;

                r = [_imgInfo.width, _imgInfo.height];
                q = [_QrCode.width, _QrCode.height];
                l = [L_W, L_H];
                imgW = C_W - C_P * 2;
                if (r[0] != imgW) {
                  r[1] = Math.floor(imgW / r[0] * r[1]);
                  r[0] = imgW;
                }
                if (q[0] != C_Q) {
                  q[1] = Math.floor(C_Q / q[0] * q[1]);
                  q[0] = C_Q;
                }
                _this.canvasW = C_W;
                _this.canvasH = C_H;
                _this.ctx.setFillStyle(_this.CanvasBg); //canvas背景颜色
                _this.ctx.fillRect(0, 0, C_W, _this.canvasH); //canvas画布大小

                //添加图片展示
                _this.ctx.drawImage(_imgInfo.path, 0, 0, C_W, C_H);
                //添加图片展示 end

                // 设置名片大小
                _strHeight = uni.upx2px(62);
                _this.ctx.setFillStyle('#FFFFFF');
                _this.ctx.setStrokeStyle('#FFFFFF');
                _this.ctx.lineJoin = 'round';
                _this.ctx.lineWidth = 5;
                _this.ctx.setShadow(0, 0, 20, 'rgba(0,0,0,0.05)');
                _this.ctx.strokeRect(C_P, _strHeight, B_W, B_H);
                _this.ctx.fillRect(C_P, _strHeight, B_W, B_H);


                //绘制圆形图片
                _strHeight += uni.upx2px(30);
                _this.ctx.save();
                _this.ctx.beginPath();
                _this.ctx.arc(C_W / 2, _strHeight + A_V / 2, A_V / 2, 0, 2 * Math.PI);
                _this.ctx.clip();
                _this.ctx.drawImage(_avatar.path, C_W / 2 - A_V / 2, _strHeight, A_V, A_V);
                _this.ctx.restore();

                //经纪人姓名
                _strHeight += A_V;
                _strHeight += uni.upx2px(60);
                _this.ctx.setFontSize(uni.upx2px(40));
                _this.ctx.setFillStyle('#333333');
                _this.ctx.setTextAlign('center');
                _this.ctx.fillText(_this.userName, C_W / 2, _strHeight);

                // 公司
                _strHeight += uni.upx2px(40);
                _this.ctx.setFontSize(uni.upx2px(28));
                _this.ctx.setFillStyle('#9B9B9B');
                _this.ctx.setTextAlign('center');
                _this.ctx.fillText(_this.company, C_W / 2, _strHeight);

                // 职位
                _strHeight += uni.upx2px(20);
                postNameWidth = uni.upx2px(98);
                postNameHeight = uni.upx2px(34);
                _this.ctx.setFillStyle('rgba(135,74,152,0.1)');
                _this.ctx.lineJoin = 'round';
                _this.ctx.fillRect(C_W / 2 - postNameWidth / 2, _strHeight, postNameWidth, postNameHeight);

                _strHeight += uni.upx2px(25);
                _this.ctx.setFontSize(uni.upx2px(24));
                _this.ctx.setFillStyle('#874A98');
                _this.ctx.setTextAlign('center');
                _this.ctx.fillText(_this.postName, C_W / 2, _strHeight);

                //分割线
                _strHeight += uni.upx2px(60);
                _this.ctx.setFontSize(uni.upx2px(2));
                _this.ctx.lineWidth = 1;
                _this.ctx.moveTo(uni.upx2px(90), _strHeight);
                _this.ctx.lineTo(uni.upx2px(500), _strHeight);
                _this.ctx.strokeStyle = '#F6F6F6';
                _this.ctx.stroke();

                // 服务年限,带看人数
                _strHeight += uni.upx2px(60);
                _this.ctx.setFontSize(uni.upx2px(28));
                _this.ctx.setFillStyle('#9B9B9B');
                _this.ctx.fillText('服务年限', uni.upx2px(180), _strHeight);
                _this.ctx.fillText('带看人数', uni.upx2px(410), _strHeight);

                _strHeight += uni.upx2px(60);
                _this.ctx.setFontSize(uni.upx2px(34));
                _this.ctx.setFillStyle('#333333');
                _this.ctx.setTextAlign('center');
                _this.ctx.fillText(_this.years, uni.upx2px(180), _strHeight);
                _this.ctx.fillText(_this.visitTimes, uni.upx2px(410), _strHeight);

                //分割线
                _strHeight += uni.upx2px(40);
                _this.ctx.setFontSize(uni.upx2px(2));
                _this.ctx.lineWidth = 1;
                _this.ctx.moveTo(uni.upx2px(90), _strHeight);
                _this.ctx.lineTo(uni.upx2px(500), _strHeight);
                _this.ctx.strokeStyle = '#F6F6F6';
                _this.ctx.stroke();

                // 文本
                _strHeight += uni.upx2px(60);
                _this.ctx.setFontSize(uni.upx2px(28));
                _this.ctx.setFillStyle('#9B9B9B');
                _this.ctx.setTextAlign('center');
                _this.ctx.fillText('长按识别二维码，海量房源任你选', C_W / 2, _strHeight);

                // 二维码
                _strHeight += uni.upx2px(60);
                _this.ctx.drawImage(_QrCode.path, C_W / 2 - C_Q / 2, _strHeight, q[0], q[1]);


                //延迟后渲染至canvas上
                setTimeout(function () {
                  _this.ctx.draw(true, function (ret) {
                    _this.getNewImage();
                  });
                }, 600);case 93:case "end":return _context.stop();}}}, _callee);}))();
    },
    getImageInfo: function getImageInfo(_ref)

    {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var imgSrc;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:imgSrc = _ref.imgSrc;return _context2.abrupt("return",
                new Promise(function (resolve, errs) {
                  uni.getImageInfo({
                    src: imgSrc,
                    success: function success(image) {
                      console.log(imgSrc, image);
                      resolve(image);
                    },
                    fail: function fail(err) {
                      console.log(imgSrc, err);
                      errs(err);
                    } });

                }));case 2:case "end":return _context2.stop();}}}, _callee2);}))();
    },
    getNewImage: function getNewImage() {
      uni.canvasToTempFilePath({
        canvasId: _this.CanvasID,
        quality: 1,
        complete: function complete(res) {
          _this.$emit('success', res);
        } },
      this);
    } },


  mounted: function mounted() {
    _this = this;
    setTimeout(function () {
      _this.OnCanvas();
    }, 1000);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/wm-poster/card.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wm-poster/card-create-component',
    {
        'components/wm-poster/card-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(573))
        })
    },
    [['components/wm-poster/card-create-component']]
]);
