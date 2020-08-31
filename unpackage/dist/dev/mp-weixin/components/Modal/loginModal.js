(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/Modal/loginModal"],{

/***/ 457:
/*!*****************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loginModal.vue?vue&type=template&id=60ed407e& */ 458);
/* harmony import */ var _loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginModal.vue?vue&type=script&lang=js& */ 460);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loginModal.vue?vue&type=style&index=0&lang=less& */ 462);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/Modal/loginModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 458:
/*!************************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue?vue&type=template&id=60ed407e& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./loginModal.vue?vue&type=template&id=60ed407e& */ 459);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_template_id_60ed407e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 459:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue?vue&type=template&id=60ed407e& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 460:
/*!******************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./loginModal.vue?vue&type=script&lang=js& */ 461);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 461:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//

var WXBizDataCrypt = __webpack_require__(/*! ../../crypto/WXBizDataCrypt.js */ 317);var _default =
{
  name: 'loginModal',
  props: ['show'],
  data: function data() {
    return {
      appId: 'wx685226499ed8d55c',
      mobile: '',
      openId: '',
      code: '',
      openid: '',
      session_key: '',
      manager: '' };

  },
  methods: {
    // 获取手机号授权
    GetPhoneNumber: function GetPhoneNumber(e) {
      console.log(e);
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
        uni.showModal({
          title: '提示',
          showCancel: true,
          content: '您取消了授权' });

      } else {
        var pc = new WXBizDataCrypt(this.appId, this.session_key);
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
        this.wxLogin(data.phoneNumber);
      }
    },
    // 客户登录
    wxLogin: function wxLogin(phoneNumber) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res, _res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                if (uni.getStorageSync('manager')) {
                  _this.manager = uni.getStorageSync('manager');
                }
                console.log(_this.manager);if (!
                _this.manager) {_context.next = 10;break;}_context.next = 5;return (
                  _this.$fetch(_this.$api.wxLogin, { mobile: phoneNumber, openId: _this.openid, manager: _this.manager }, 'GET'));case 5:res = _context.sent;
                uni.showToast({
                  icon: 'none',
                  title: res.msg });

                if (res.code == 0 || res.code == 1001) {
                  // uni.clearStorageSync('manager')
                  _this.$emit('close', false);
                  _this.$emit('token', res.data.token);
                }_context.next = 15;break;case 10:_context.next = 12;return (

                  _this.$fetch(_this.$api.wxLogin, { mobile: phoneNumber, openId: _this.openid }, 'GET'));case 12:_res = _context.sent;
                uni.showToast({
                  icon: 'none',
                  title: _res.msg });

                if (_res.code == 0 || _res.code == 1001) {
                  _this.$emit('close', false);
                  _this.$emit('token', _res.data.token);
                }case 15:case "end":return _context.stop();}}}, _callee);}))();

    },
    // 获取微信登录code
    getCode: function getCode() {var _this2 = this;
      uni.login({
        provider: 'weixin',
        success: function success(res) {
          if (res.code) {
            _this2.code = res.code;
            _this2.getOpenId();
          }
        } });

    },
    // 获取openId
    getOpenId: function getOpenId() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  _this3.$fetch(_this3.$api.getOpenId, { js_code: _this3.code }, 'GET'));case 2:res = _context2.sent;
                _this3.openid = res.data.openid;
                uni.setStorageSync('openId', _this3.openid);
                _this3.session_key = res.data.session_key;
                uni.setStorageSync('session_key', _this3.session_key);case 7:case "end":return _context2.stop();}}}, _callee2);}))();
    } },

  created: function created() {
    this.getCode();
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 462:
/*!***************************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./loginModal.vue?vue&type=style&index=0&lang=less& */ 463);
/* harmony import */ var _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_loginModal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 463:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/UNIAPP/yingbang_applet/components/Modal/loginModal.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Modal/loginModal.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/Modal/loginModal-create-component',
    {
        'components/Modal/loginModal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(457))
        })
    },
    [['components/Modal/loginModal-create-component']]
]);
