(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/libs/request.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 12));
var _api = _interopRequireDefault(__webpack_require__(/*! ../api */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var baseUrl = _config.default;

/**
                                * @param{string}url 请求地址(baseUrl基础地址之后的地址)
                                * @param{Object}data 请求参数
                                * @param{string}method 请求方法(默认为POST请求)ps：get请求未封装
                                * @param{string}contentType 请求内容类型(默认为JSON类型，可选form)
                                * @param{Object}headers 其他 header 数据
                                */var _default =
function _default(url, data) {var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';var contentType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'json';var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  // 判断url地址第一个字符是否含 '/', 有则截取掉
  if (url.slice(0, 1) === '/') url = url.slice(1);
  // 删除data对象空属性
  for (var i in data) {
    if (typeof data[i] == 'undefined' || data[i] != 0 && !data[i]) {
      delete data[i];
    }
  }
  // 判断请求内容类型
  if (!/[A-Za-z]{4}/.test(contentType)) throw 'contentType 格式不正确，请检查是否为字符串json或者form';
  if (contentType.toUpperCase() === 'JSON') {
    headers['Content-Type'] = 'application/json; charset=UTF-8'; // 可以传引用类型
  } else {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'; // 无法传引用类型（传的是字符串，后端不想解析）
  }

  // 登录则传入cid -- token
  var token = uni.getStorageSync('token');
  if (token) {
    headers.token = token;
  }

  return new Promise(function (resolve, reject) {
    uni.request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: headers,
      success: function success(res) {
        if (parseInt(res.statusCode) === 200) {
          resolve(res.data);
          // console.log(url,res.data);
        } else if (parseInt(res.statusCode) === 401) {
          // 请求401时	
          throw Error("\u8BF7\u6C42\u63A5\u53E3".concat(baseUrl).concat(url, ",\u8BF7\u6C42\u6240\u4F20\u53C2\u6570").concat(JSON.stringify(data), ";\u540E\u7AEF\u8FD4\u56DE401"));
        } else if (parseInt(res.statusCode) === 500) {
          // 	请求500时				
          throw Error("\u8BF7\u6C42\u63A5\u53E3".concat(baseUrl).concat(url, ",\u8BF7\u6C42\u6240\u4F20\u53C2\u6570").concat(JSON.stringify(data), ";\u540E\u7AEF\u8FD4\u56DE500"));
        } else {
          resolve(res.data);
        }
      },
      fail: function fail(err) {
        console.log(err);
        // uni.showToast({
        // 	icon: 'none',
        // 	title: err
        // })
      } });

  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/config/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _api = _interopRequireDefault(__webpack_require__(/*! ../api */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var dev = _api.default.dev;
var pro = _api.default.pro;
var baseURL = '';
baseURL = dev;var _default =
baseURL;exports.default = _default;

/***/ }),

/***/ 13:
/*!**********************************************!*\
  !*** E:/UNIAPP/yingbang_applet/api/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 请在此对象写后端的请求接口列表
var _default = {
  // 此处写开发调试地址--自动生效
  dev: 'https://admin.homeyb.cn/',
  // dev:'http://ybcs.bajiaostar.com/',
  // dev:'http://60.180.141.112:8080/',
  // 此处写线上环境地址--自动生效
  pro: 'https://admin.homeyb.cn/',
  // pro:'http://ybcs.bajiaostar.com/',

  /**
   * 微信公众号
   */
  appid: 'wx25f4ed12afeb860c',
  redirect_url: 'http://h5.homeyb.cn/pages/login/authSuccess',
  redirectUrl: 'http://h5.homeyb.cn/pages/transfePage/transfePage',

  /**
                                                                     * 主页
                                                                     */
  map: 'api/home/map', //地图参数
  headlines: 'api/home/headlines', //头条列表
  bookView: 'api/home/bookView', //查看百科（头条）
  bookList: 'api/home/bookList', //购房百科
  indexData: 'api/home/index', //首页数据
  soldHouse: 'api/home/soldHouse', //近期已售
  collectList: 'api/homeToken/collectList', //查看我的收藏、记录（type 1-收藏、0-记录）
  aboutUs: 'api/home/aboutAs', //关于我们
  loginOut: 'api/homeToken/exit', //退出登录 0：操作成功 -1：操作失败
  clientAdd: 'api/homeToken/clientAdd', //我要推荐
  ownerAdd: 'api/home/ownerAdd', //我是业主
  recommend: 'api/home/recommend', //为你推荐 type:1-租房，2-二手房 3-新房
  collect: 'api/homeToken/collect', //加入收藏
  noCollect: 'api/homeToken/noCollect', //取消收藏
  checkToken: 'api/homeToken/checkUp', //检查token是否有效
  getOpenId: 'api/home/getOpenId', //获取openid
  getQrcodePic: 'api/home/getQrcodePic', //获取小程序码 
  getVideoList: 'api/home/videoList', //获取视频列表
  favoriteList: 'api/homeToken/favoriteList', //获取收藏夹列表
  addFavorite: 'api/homeToken/addFavorite', //新增收藏夹
  removeFavorite: 'api/homeToken/removeFavorite', //删除收藏夹
  editFavorite: 'api/homeToken/editFavorite', //编辑收藏夹
  addH5Browse: 'api/home/addH5Browse', //记录浏览记录
  getShareCollect: 'api/home/collectList', //查看分享的收藏夹内容
  getSDKSign: 'api/home/getSDKSign', //获取微信jsSDK配置

  /**
   * 房源信息(旧房)
   */
  jiufang: 'api/oldHouse/xy', //地图找房 县级
  jiufangProvince: 'api/oldHouse/xyProvince', //地图找房 区域
  jiufangHouse: 'api/oldHouse/xyHouse', //地图找房 小区
  oldHouseCondition2: 'api/oldHouse/oldHouseCondition2', //二手房条件筛选 （独家委托 Entrust1是2否）
  getChinaDict: 'api/oldHouse/getChinaDict', //查询区域列表
  houseInfo: 'api/oldHouse/houseInfo', //房源详情信息
  oldHouseCondition1: 'api/oldHouse/oldHouseCondition1', //租房条件筛选
  xiaoqu: 'api/oldHouse/areaList', //小区列表
  getOldHouseLog: 'api/oldHouse/getOldHouseLog', //旧房跟进记录
  areaDetail: 'api/oldHouse/areaInfo', //小区详情信息
  areaHouseList: 'api/oldHouse/areaHouseList', //查询小区下的所有房源 houseType 1-租房 2-二手房

  /**
   * 房源信息（新房）
   */
  areaList: 'api/newHouse/areaList', //新房列表
  areaCondition: 'api/newHouse/areaCondition', //新房条件查询
  areaInfo: 'api/newHouse/areaInfo', //新房详情
  apartment: 'api/newHouse/houseInfo', //户型详情
  xinfang: 'api/newHouse/xy', //地图找新房 县级
  xinfangProvince: 'api/newHouse/xyProvince', //地图找新房 区域
  xinfangHouse: 'api/newHouse/xyHouse', //地图找新房 楼盘


  /**
   * 经纪人
   */
  agentList: 'api/user/userList', //所有经纪人列表
  getInfo: 'api/user/getInfo', //获取个人信息(经纪人)
  rewardList: 'api/client/rewardList', //佣金明细
  agentEditInfo: 'api/user/editSave', //修改个人资料
  myClientList: 'api/user/myClientList', //我的客户
  getAgentInfo: 'api/user/getUserInfo', //经纪人详情
  login: 'api/user/wxlogin', //经纪人登录
  myClientInfo: 'api/user/myClientInfo', //跟进记录
  changeClientName: 'api/user/changeClientName', //修改客户名称
  getClientOpenId: 'api/user/getOpenId', //获取公众号openId
  saveOpenId: 'api/user/saveGZHOpenId', //绑定公众号openId

  /**
   * 客户
   */
  myRecommendList: 'api/client/myRecommendList', //我的推荐
  myManagerList: 'api/client/myManagerList', //我的经纪人
  getMyInfo: 'api/client/getInfo', //获取个人信息(用户)
  userEditInfo: 'api/client/editSave', //修改个人信息（用户）
  wxLogin: 'api/client/wxlogin', //客户登录
  sendCode: 'api/client/ver', //发送验证码
  h5userLogin: 'api/client/login', //H5登录
  getWechatInfo: 'api/home/getGZHOpenId' //获取用户微信信息
};exports.default = _default;

/***/ }),

/***/ 14:
/*!*****************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/dayjs/dayjs.min.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, n) { true ? module.exports = n() : undefined;}(this, function () {"use strict";var t = "millisecond",n = "second",e = "minute",r = "hour",i = "day",s = "week",u = "month",a = "quarter",o = "year",h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c = function c(t, n, e) {var r = String(t);return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;},d = { s: c, z: function z(t) {var n = -t.utcOffset(),e = Math.abs(n),r = Math.floor(e / 60),i = e % 60;return (n <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");}, m: function m(t, n) {var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),r = t.clone().add(e, u),i = n - r < 0,s = t.clone().add(e + (i ? -1 : 1), u);return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);}, a: function a(t) {return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);}, p: function p(h) {return { M: u, y: o, w: s, d: i, h: r, m: e, s: n, ms: t, Q: a }[h] || String(h || "").toLowerCase().replace(/s$/, "");}, u: function u(t) {return void 0 === t;} },$ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") },l = "en",m = {};m[l] = $;var y = function y(t) {return t instanceof v;},M = function M(t, n, e) {var r;if (!t) return l;if ("string" == typeof t) m[t] && (r = t), n && (m[t] = n, r = t);else {var i = t.name;m[i] = t, r = i;}return e || (l = r), r;},g = function g(t, n, e) {if (y(t)) return t.clone();var r = n ? "string" == typeof n ? { format: n, pl: e } : n : {};return r.date = t, new v(r);},D = d;D.l = M, D.i = y, D.w = function (t, n) {return g(t, { locale: n.$L, utc: n.$u });};var v = function () {function c(t) {this.$L = this.$L || M(t.locale, null, !0), this.parse(t);}var d = c.prototype;return d.parse = function (t) {this.$d = function (t) {var n = t.date,e = t.utc;if (null === n) return new Date(NaN);if (D.u(n)) return new Date();if (n instanceof Date) return new Date(n);if ("string" == typeof n && !/Z$/i.test(n)) {var r = n.match(h);if (r) return e ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);}return new Date(n);}(t), this.init();}, d.init = function () {var t = this.$d;this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();}, d.$utils = function () {return D;}, d.isValid = function () {return !("Invalid Date" === this.$d.toString());}, d.isSame = function (t, n) {var e = g(t);return this.startOf(n) <= e && e <= this.endOf(n);}, d.isAfter = function (t, n) {return g(t) < this.startOf(n);}, d.isBefore = function (t, n) {return this.endOf(n) < g(t);}, d.$g = function (t, n, e) {return D.u(t) ? this[n] : this.set(e, t);}, d.year = function (t) {return this.$g(t, "$y", o);}, d.month = function (t) {return this.$g(t, "$M", u);}, d.day = function (t) {return this.$g(t, "$W", i);}, d.date = function (t) {return this.$g(t, "$D", "date");}, d.hour = function (t) {return this.$g(t, "$H", r);}, d.minute = function (t) {return this.$g(t, "$m", e);}, d.second = function (t) {return this.$g(t, "$s", n);}, d.millisecond = function (n) {return this.$g(n, "$ms", t);}, d.unix = function () {return Math.floor(this.valueOf() / 1e3);}, d.valueOf = function () {return this.$d.getTime();}, d.startOf = function (t, a) {var h = this,f = !!D.u(a) || a,c = D.p(t),d = function d(t, n) {var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);return f ? e : e.endOf(i);},$ = function $(t, n) {return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h);},l = this.$W,m = this.$M,y = this.$D,M = "set" + (this.$u ? "UTC" : "");switch (c) {case o:return f ? d(1, 0) : d(31, 11);case u:return f ? d(1, m) : d(0, m + 1);case s:var g = this.$locale().weekStart || 0,v = (l < g ? l + 7 : l) - g;return d(f ? y - v : y + (6 - v), m);case i:case "date":return $(M + "Hours", 0);case r:return $(M + "Minutes", 1);case e:return $(M + "Seconds", 2);case n:return $(M + "Milliseconds", 3);default:return this.clone();}}, d.endOf = function (t) {return this.startOf(t, !1);}, d.$set = function (s, a) {var h,f = D.p(s),c = "set" + (this.$u ? "UTC" : ""),d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[o] = c + "FullYear", h[r] = c + "Hours", h[e] = c + "Minutes", h[n] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],$ = f === i ? this.$D + (a - this.$W) : a;if (f === u || f === o) {var l = this.clone().set("date", 1);l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate();} else d && this.$d[d]($);return this.init(), this;}, d.set = function (t, n) {return this.clone().$set(t, n);}, d.get = function (t) {return this[D.p(t)]();}, d.add = function (t, a) {var h,f = this;t = Number(t);var c = D.p(a),d = function d(n) {var e = g(f);return D.w(e.date(e.date() + Math.round(n * t)), f);};if (c === u) return this.set(u, this.$M + t);if (c === o) return this.set(o, this.$y + t);if (c === i) return d(1);if (c === s) return d(7);var $ = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1,l = this.valueOf() + t * $;return D.w(l, this);}, d.subtract = function (t, n) {return this.add(-1 * t, n);}, d.format = function (t) {var n = this;if (!this.isValid()) return "Invalid Date";var e = t || "YYYY-MM-DDTHH:mm:ssZ",r = D.z(this),i = this.$locale(),s = this.$H,u = this.$m,a = this.$M,o = i.weekdays,h = i.months,c = function c(t, r, i, s) {return t && (t[r] || t(n, e)) || i[r].substr(0, s);},d = function d(t) {return D.s(s % 12 || 12, t, "0");},$ = i.meridiem || function (t, n, e) {var r = t < 12 ? "AM" : "PM";return e ? r.toLowerCase() : r;},l = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a + 1, MM: D.s(a + 1, 2, "0"), MMM: c(i.monthsShort, a, h, 3), MMMM: h[a] || h(this, e), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: c(i.weekdaysMin, this.$W, o, 2), ddd: c(i.weekdaysShort, this.$W, o, 3), dddd: o[this.$W], H: String(s), HH: D.s(s, 2, "0"), h: d(1), hh: d(2), a: $(s, u, !0), A: $(s, u, !1), m: String(u), mm: D.s(u, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: r };return e.replace(f, function (t, n) {return n || l[t] || r.replace(":", "");});}, d.utcOffset = function () {return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);}, d.diff = function (t, h, f) {var c,d = D.p(h),$ = g(t),l = 6e4 * ($.utcOffset() - this.utcOffset()),m = this - $,y = D.m(this, $);return y = (c = {}, c[o] = y / 12, c[u] = y, c[a] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[e] = m / 6e4, c[n] = m / 1e3, c)[d] || m, f ? y : D.a(y);}, d.daysInMonth = function () {return this.endOf(u).$D;}, d.$locale = function () {return m[this.$L];}, d.locale = function (t, n) {if (!t) return this.$L;var e = this.clone();return e.$L = M(t, n, !0), e;}, d.clone = function () {return D.w(this.toDate(), this);}, d.toDate = function () {return new Date(this.$d);}, d.toJSON = function () {return this.isValid() ? this.toISOString() : null;}, d.toISOString = function () {return this.$d.toISOString();}, d.toString = function () {return this.$d.toUTCString();}, c;}();return g.prototype = v.prototype, g.extend = function (t, n) {return t(n, v, g), g;}, g.locale = M, g.isDayjs = y, g.unix = function (t) {return g(1e3 * t);}, g.en = m[l], g.Ls = m, g;});

/***/ }),

/***/ 15:
/*!***************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/dayjs/plugin/relativeTime.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (r, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";return function (r, t, e) {var n = t.prototype;e.en.relativeTime = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };var o = function o(r, t, n, _o) {for (var d, i, u = n.$locale().relativeTime, a = [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], f = a.length, s = 0; s < f; s += 1) {var l = a[s];l.d && (d = _o ? e(r).diff(n, l.d, !0) : n.diff(r, l.d, !0));var h = Math.round(Math.abs(d));if (h <= l.r || !l.r) {1 === h && s > 0 && (l = a[s - 1]), i = u[l.l].replace("%d", h);break;}}return t ? i : (d > 0 ? u.future : u.past).replace("%s", i);};n.to = function (r, t) {return o(r, t, this, !0);}, n.from = function (r, t) {return o(r, t, this);};var d = function d(r) {return r.$u ? e.utc() : e();};n.toNow = function (r) {return this.to(d(this), r);}, n.fromNow = function (r) {return this.from(d(this), r);};};});

/***/ }),

/***/ 16:
/*!********************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/dayjs/locale/zh-cn.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (_, e) { true ? module.exports = e(__webpack_require__(/*! dayjs */ 14)) : undefined;}(this, function (_) {"use strict";_ = _ && _.hasOwnProperty("default") ? _.default : _;var e = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function ordinal(_, e) {switch (e) {case "W":return _ + "周";default:return _ + "日";}}, weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" } };return _.locale(e, null, !0), e;});

/***/ }),

/***/ 17:
/*!****************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 18));

var _mpShare = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpShare.js */ 19));

var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 20));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 24));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 25));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 26));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 27));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 28));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 29));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 30));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 31));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 32));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 33));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 34));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 35));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 36));


var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 37));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 38));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post, put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 18:
/*!***************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/mixin/mpShare.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  onLoad: function onLoad() {
    // 设置默认的转发参数
    this.$u.mpShare = {
      title: '', // 默认为小程序名称
      path: '', // 默认为当前页面路径
      imageUrl: '' // 默认为当前页面的截图
    };
  },
  onShareAppMessage: function onShareAppMessage() {
    return this.$u.mpShare;
  } };

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/request/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",





    // 设置全局默认配置
    value: function setConfig(customConfig) {
      this.config = Object.assign(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this = this;var options,tmpConfig,interceptorReuest,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};if (!(

                this.interceptor.request && typeof this.interceptor.request === 'function')) {_context.next = 7;break;}
                tmpConfig = {};
                interceptorReuest = this.interceptor.request(options);if (!(
                interceptorReuest === false)) {_context.next = 6;break;}return _context.abrupt("return",
                false);case 6:

                this.options = interceptorReuest;case 7:


                options.dataType = options.dataType || this.config.dataType;
                options.responseType = options.responseType || this.config.responseType;
                options.url = options.url || '';
                options.params = options.params || {};
                options.header = Object.assign(this.config.header, options.header);
                options.method = options.method || this.config.method;return _context.abrupt("return",

                new Promise(function (resolve, reject) {
                  options.complete = function (response) {
                    // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
                    uni.hideLoading();
                    // 清除定时器，如果请求回来了，就无需loading
                    clearTimeout(_this.config.timer);
                    // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
                    if (_this.config.originalData) {
                      // 判断是否存在拦截器
                      if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                        var resInterceptors = _this.interceptor.response(response);
                        // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
                        if (resInterceptors !== false) {
                          resolve(resInterceptors);
                        } else {
                          // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                          reject(response);
                        }
                      } else {
                        // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
                        resolve(response);
                      }
                    } else {
                      if (response.statusCode == 200) {
                        if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                          var _resInterceptors = _this.interceptor.response(response.data);
                          if (_resInterceptors !== false) {
                            resolve(_resInterceptors);
                          } else {
                            reject(response);
                          }
                        } else {
                          // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                          resolve(response.data);
                        }
                      } else {
                        // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
                        if (response.errMsg) {
                          uni.showModal({
                            title: response.errMsg });

                        }
                        reject(response);
                      }
                    }
                  };

                  // 判断用户传递的URL是否/开头,如果不是,加上/
                  options.url = Request.isHttp(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
                  options.url : '/' + options.url);

                  // 是否显示loading
                  // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
                  // 而没有清除前者的定时器，导致前者超时，一直显示loading
                  if (_this.config.showLoading && !_this.config.timer) {
                    _this.config.timer = setTimeout(function () {
                      uni.showLoading({
                        title: _this.config.loadingText,
                        mask: _this.config.loadingMask });

                      _this.config.timer = null;
                    }, _this.config.loadingTime);
                  }
                  uni.request(options);
                }).catch(function (e) {}));case 14:case "end":return _context.stop();}}}, _callee, this);}));function request() {return _request.apply(this, arguments);}return request;}() }], [{ key: "isHttp", // 判断是否http|https开头的URL
    value: function isHttp(url) {return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);} }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {
        'content-type': 'application/json;charset=UTF-8' },

      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 22);

/***/ }),

/***/ 22:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 23);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 23:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 24:
/*!************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/queryParams.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 25:
/*!******************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/route.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!***********************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (timestamp == null) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 27:
/*!*********************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  console.log(timer);
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 28:
/*!**************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 29:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/guid.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!******************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/color.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 31:
/*!**********************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/type2icon.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 317:
/*!**********************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/WXBizDataCrypt.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Crypto = __webpack_require__(/*! ./cryptojs.js */ 318).Crypto;
var app = getApp();

function RdWXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

RdWXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  var encryptedData = Crypto.util.base64ToBytes(encryptedData);
  var key = Crypto.util.base64ToBytes(this.sessionKey);
  var iv = Crypto.util.base64ToBytes(iv);

  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

  try {
    // 解密
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes: true,
      iv: iv,
      mode: mode });


    var decryptResult = JSON.parse(bytes);

  } catch (err) {
    console.log(err);
  }

  if (decryptResult.watermark.appid !== this.appId) {
    console.log(err);
  }

  return decryptResult;
};

module.exports = RdWXBizDataCrypt;

/*
                                   var crypto = require('crypto')
                                   
                                   function WXBizDataCrypt(appId, sessionKey) {
                                     this.appId = appId
                                     this.sessionKey = sessionKey
                                   }
                                   
                                   WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
                                     // base64 decode
                                     var sessionKey = new Buffer(this.sessionKey, 'base64')
                                     encryptedData = new Buffer(encryptedData, 'base64')
                                     iv = new Buffer(iv, 'base64')
                                   
                                     try {
                                        // 解密
                                       var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
                                       // 设置自动 padding 为 true，删除填充补位
                                       decipher.setAutoPadding(true)
                                       var decoded = decipher.update(encryptedData, 'binary', 'utf8')
                                       decoded += decipher.final('utf8')
                                       
                                       decoded = JSON.parse(decoded)
                                   
                                     } catch (err) {
                                       throw new Error('Illegal Buffer')
                                     }
                                   
                                     if (decoded.watermark.appid !== this.appId) {
                                       throw new Error('Illegal Buffer')
                                     }
                                   
                                     return decoded
                                   }
                                   
                                   module.exports = WXBizDataCrypt
                                   */

/***/ }),

/***/ 318:
/*!****************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/cryptojs.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Crypto = exports.Crypto = __webpack_require__(/*! ./lib/Crypto */ 319).Crypto;

['CryptoMath',
'BlockModes',
'DES',
'AES',
'HMAC',
'MARC4',
'MD5',
'PBKDF2',
'PBKDF2Async',
'Rabbit',
'SHA1',
'SHA256'].
forEach(function (path) {
  __webpack_require__(320)("./" + path);
});

/***/ }),

/***/ 319:
/*!******************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/Crypto.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Crypto == "undefined" || !Crypto.util)
{
  (function () {

    var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Global Crypto object
    // with browser window or with node module
    var Crypto = typeof window === 'undefined' ? exports.Crypto = {} : window.Crypto = {};

    // Crypto utilities
    var util = Crypto.util = {

      // Bit-wise rotate left
      rotl: function rotl(n, b) {
        return n << b | n >>> 32 - b;
      },

      // Bit-wise rotate right
      rotr: function rotr(n, b) {
        return n << 32 - b | n >>> b;
      },

      // Swap big-endian to little-endian and vice versa
      endian: function endian(n) {

        // If number given, swap endian
        if (n.constructor == Number) {
          return util.rotl(n, 8) & 0x00FF00FF |
          util.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) {
          n[i] = util.endian(n[i]);}
        return n;

      },

      // Generate an array of any length of random bytes
      randomBytes: function randomBytes(n) {
        for (var bytes = []; n > 0; n--) {
          bytes.push(Math.floor(Math.random() * 256));}
        return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function bytesToWords(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
          words[b >>> 5] |= (bytes[i] & 0xFF) << 24 - b % 32;}
        return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function wordsToBytes(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);}
        return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
      },

      // Convert a hex string to a byte array
      hexToBytes: function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
          bytes.push(parseInt(hex.substr(c, 2), 16));}
        return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function bytesToBase64(bytes) {

        // Use browser-native function if it exists
        if (typeof btoa == "function") return btoa(Binary.bytesToString(bytes));

        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else
            base64.push("=");
          }
        }

        return base64.join("");

      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function base64ToBytes(base64) {

        // Use browser-native function if it exists
        if (typeof atob == "function") return Binary.stringToBytes(atob(base64));

        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 |
          base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }

        return bytes;

      } };



    // Crypto character encodings
    var charenc = Crypto.charenc = {};

    // UTF-8 encoding
    var UTF8 = charenc.UTF8 = {

      // Convert a string to a byte array
      stringToBytes: function stringToBytes(str) {
        return Binary.stringToBytes(unescape(encodeURIComponent(str)));
      },

      // Convert a byte array to a string
      bytesToString: function bytesToString(bytes) {
        return decodeURIComponent(escape(Binary.bytesToString(bytes)));
      } };



    // Binary encoding
    var Binary = charenc.Binary = {

      // Convert a string to a byte array
      stringToBytes: function stringToBytes(str) {
        for (var bytes = [], i = 0; i < str.length; i++) {
          bytes.push(str.charCodeAt(i) & 0xFF);}
        return bytes;
      },

      // Convert a byte array to a string
      bytesToString: function bytesToString(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++) {
          str.push(String.fromCharCode(bytes[i]));}
        return str.join("");
      } };



  })();
}

/***/ }),

/***/ 32:
/*!************************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/randomArray.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 320:
/*!**********************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib sync ^\.\/.*$ ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AES": 321,
	"./AES.js": 321,
	"./BlockModes": 322,
	"./BlockModes.js": 322,
	"./Crypto": 319,
	"./Crypto.js": 319,
	"./CryptoMath": 323,
	"./CryptoMath.js": 323,
	"./DES": 324,
	"./DES.js": 324,
	"./HMAC": 325,
	"./HMAC.js": 325,
	"./MARC4": 326,
	"./MARC4.js": 326,
	"./MD5": 327,
	"./MD5.js": 327,
	"./PBKDF2": 328,
	"./PBKDF2.js": 328,
	"./PBKDF2Async": 329,
	"./PBKDF2Async.js": 329,
	"./Rabbit": 332,
	"./Rabbit.js": 332,
	"./SHA1": 333,
	"./SHA1.js": 333,
	"./SHA256": 334,
	"./SHA256.js": 334
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 320;

/***/ }),

/***/ 321:
/*!***************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/AES.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8;

  // Precomputed SBOX
  var SBOX = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
  0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
  0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
  0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
  0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
  0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
  0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
  0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
  0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
  0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
  0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
  0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
  0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
  0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
  0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
  0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
  0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
  0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
  0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
  0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
  0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
  0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
  0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
  0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
  0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
  0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
  0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
  0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
  0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
  0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
  0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];

  // Compute inverse SBOX lookup table
  for (var INVSBOX = [], i = 0; i < 256; i++) {INVSBOX[SBOX[i]] = i;}

  // Compute mulitplication in GF(2^8) lookup tables
  var MULT2 = [],
  MULT3 = [],
  MULT9 = [],
  MULTB = [],
  MULTD = [],
  MULTE = [];

  function xtime(a, b) {
    for (var result = 0, i = 0; i < 8; i++) {
      if (b & 1) result ^= a;
      var hiBitSet = a & 0x80;
      a = a << 1 & 0xFF;
      if (hiBitSet) a ^= 0x1b;
      b >>>= 1;
    }
    return result;
  }

  for (var i = 0; i < 256; i++) {
    MULT2[i] = xtime(i, 2);
    MULT3[i] = xtime(i, 3);
    MULT9[i] = xtime(i, 9);
    MULTB[i] = xtime(i, 0xB);
    MULTD[i] = xtime(i, 0xD);
    MULTE[i] = xtime(i, 0xE);
  }

  // Precomputed RCon lookup
  var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

  // Inner state
  var state = [[], [], [], []],
  keylength,
  nrounds,
  keyschedule;

  var AES = C.AES = {

    /**
                       * Public API
                       */

    encrypt: function encrypt(message, password, options) {

      options = options || {};

      // Determine mode
      var mode = options.mode || new C.mode.OFB();

      // Allow mode to override options
      if (mode.fixOptions) mode.fixOptions(options);

      var

      // Convert to bytes if message is a string
      m =
      message.constructor == String ?
      UTF8.stringToBytes(message) :
      message,


      // Generate random IV
      iv = options.iv || util.randomBytes(AES._blocksize * 4),

      // Generate key
      k =
      password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, { asBytes: true }) :
      // else, assume byte array representing cryptographic key
      password;


      // Encrypt
      AES._init(k);
      mode.encrypt(AES, m, iv);

      // Return ciphertext
      m = options.iv ? m : iv.concat(m);
      return options && options.asBytes ? m : util.bytesToBase64(m);

    },

    decrypt: function decrypt(ciphertext, password, options) {

      options = options || {};

      // Determine mode
      var mode = options.mode || new C.mode.OFB();

      // Allow mode to override options
      if (mode.fixOptions) mode.fixOptions(options);

      var

      // Convert to bytes if ciphertext is a string
      c =
      ciphertext.constructor == String ?
      util.base64ToBytes(ciphertext) :
      ciphertext,


      // Separate IV and message
      iv = options.iv || c.splice(0, AES._blocksize * 4),

      // Generate key
      k =
      password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, { asBytes: true }) :
      // else, assume byte array representing cryptographic key
      password;


      // Decrypt
      AES._init(k);
      mode.decrypt(AES, c, iv);

      // Return plaintext
      return options && options.asBytes ? c : UTF8.bytesToString(c);

    },


    /**
        * Package private methods and properties
        */

    _blocksize: 4,

    _encryptblock: function _encryptblock(m, offset) {

      // Set input
      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = m[offset + col * 4 + row];}
      }

      // Add round key
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[col][row];}
      }

      for (var round = 1; round < nrounds; round++) {

        // Sub bytes
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] = SBOX[state[row][col]];}
        }

        // Shift rows
        state[1].push(state[1].shift());
        state[2].push(state[2].shift());
        state[2].push(state[2].shift());
        state[3].unshift(state[3].pop());

        // Mix columns
        for (var col = 0; col < 4; col++) {

          var s0 = state[0][col],
          s1 = state[1][col],
          s2 = state[2][col],
          s3 = state[3][col];

          state[0][col] = MULT2[s0] ^ MULT3[s1] ^ s2 ^ s3;
          state[1][col] = s0 ^ MULT2[s1] ^ MULT3[s2] ^ s3;
          state[2][col] = s0 ^ s1 ^ MULT2[s2] ^ MULT3[s3];
          state[3][col] = MULT3[s0] ^ s1 ^ s2 ^ MULT2[s3];

        }

        // Add round key
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] ^= keyschedule[round * 4 + col][row];}
        }

      }

      // Sub bytes
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = SBOX[state[row][col]];}
      }

      // Shift rows
      state[1].push(state[1].shift());
      state[2].push(state[2].shift());
      state[2].push(state[2].shift());
      state[3].unshift(state[3].pop());

      // Add round key
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[nrounds * 4 + col][row];}
      }

      // Set output
      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          m[offset + col * 4 + row] = state[row][col];}
      }

    },

    _decryptblock: function _decryptblock(c, offset) {

      // Set input
      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = c[offset + col * 4 + row];}
      }

      // Add round key
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[nrounds * 4 + col][row];}
      }

      for (var round = 1; round < nrounds; round++) {

        // Inv shift rows
        state[1].unshift(state[1].pop());
        state[2].push(state[2].shift());
        state[2].push(state[2].shift());
        state[3].push(state[3].shift());

        // Inv sub bytes
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] = INVSBOX[state[row][col]];}
        }

        // Add round key
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] ^= keyschedule[(nrounds - round) * 4 + col][row];}
        }

        // Inv mix columns
        for (var col = 0; col < 4; col++) {

          var s0 = state[0][col],
          s1 = state[1][col],
          s2 = state[2][col],
          s3 = state[3][col];

          state[0][col] = MULTE[s0] ^ MULTB[s1] ^ MULTD[s2] ^ MULT9[s3];
          state[1][col] = MULT9[s0] ^ MULTE[s1] ^ MULTB[s2] ^ MULTD[s3];
          state[2][col] = MULTD[s0] ^ MULT9[s1] ^ MULTE[s2] ^ MULTB[s3];
          state[3][col] = MULTB[s0] ^ MULTD[s1] ^ MULT9[s2] ^ MULTE[s3];

        }

      }

      // Inv shift rows
      state[1].unshift(state[1].pop());
      state[2].push(state[2].shift());
      state[2].push(state[2].shift());
      state[3].push(state[3].shift());

      // Inv sub bytes
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = INVSBOX[state[row][col]];}
      }

      // Add round key
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[col][row];}
      }

      // Set output
      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          c[offset + col * 4 + row] = state[row][col];}
      }

    },


    /**
        * Private methods
        */

    _init: function _init(k) {
      keylength = k.length / 4;
      nrounds = keylength + 6;
      AES._keyexpansion(k);
    },

    // Generate a key schedule
    _keyexpansion: function _keyexpansion(k) {

      keyschedule = [];

      for (var row = 0; row < keylength; row++) {
        keyschedule[row] = [
        k[row * 4],
        k[row * 4 + 1],
        k[row * 4 + 2],
        k[row * 4 + 3]];

      }

      for (var row = keylength; row < AES._blocksize * (nrounds + 1); row++) {

        var temp = [
        keyschedule[row - 1][0],
        keyschedule[row - 1][1],
        keyschedule[row - 1][2],
        keyschedule[row - 1][3]];


        if (row % keylength == 0) {

          // Rot word
          temp.push(temp.shift());

          // Sub word
          temp[0] = SBOX[temp[0]];
          temp[1] = SBOX[temp[1]];
          temp[2] = SBOX[temp[2]];
          temp[3] = SBOX[temp[3]];

          temp[0] ^= RCON[row / keylength];

        } else if (keylength > 6 && row % keylength == 4) {

          // Sub word
          temp[0] = SBOX[temp[0]];
          temp[1] = SBOX[temp[1]];
          temp[2] = SBOX[temp[2]];
          temp[3] = SBOX[temp[3]];

        }

        keyschedule[row] = [
        keyschedule[row - keylength][0] ^ temp[0],
        keyschedule[row - keylength][1] ^ temp[1],
        keyschedule[row - keylength][2] ^ temp[2],
        keyschedule[row - keylength][3] ^ temp[3]];


      }

    } };



})();

/***/ }),

/***/ 322:
/*!**********************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/BlockModes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Crypto-JS contribution from Simon Greatrix
 */

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Create pad namespace
  var C_pad = C.pad = {};

  // Calculate the number of padding bytes required.
  function _requiredPadding(cipher, message) {
    var blockSizeInBytes = cipher._blocksize * 4;
    var reqd = blockSizeInBytes - message.length % blockSizeInBytes;
    return reqd;
  };

  // Remove padding when the final byte gives the number of padding bytes.
  var _unpadLength = function _unpadLength(message) {
    var pad = message.pop();
    for (var i = 1; i < pad; i++) {
      message.pop();
    }
  };

  // No-operation padding, used for stream ciphers
  C_pad.NoPadding = {
    pad: function pad(cipher, message) {},
    unpad: function unpad(message) {} };


  // Zero Padding.
  //
  // If the message is not an exact number of blocks, the final block is
  // completed with 0x00 bytes. There is no unpadding.
  C_pad.ZeroPadding = {
    pad: function pad(cipher, message) {
      var blockSizeInBytes = cipher._blocksize * 4;
      var reqd = message.length % blockSizeInBytes;
      if (reqd != 0) {
        for (reqd = blockSizeInBytes - reqd; reqd > 0; reqd--) {
          message.push(0x00);
        }
      }
    },

    unpad: function unpad(message) {} };


  // ISO/IEC 7816-4 padding.
  //
  // Pads the plain text with an 0x80 byte followed by as many 0x00
  // bytes are required to complete the block.
  C_pad.iso7816 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);
      message.push(0x80);
      for (; reqd > 1; reqd--) {
        message.push(0x00);
      }
    },

    unpad: function unpad(message) {
      while (message.pop() != 0x80) {}
    } };


  // ANSI X.923 padding
  //
  // The final block is padded with zeros except for the last byte of the
  // last block which contains the number of padding bytes.
  C_pad.ansix923 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);
      for (var i = 1; i < reqd; i++) {
        message.push(0x00);
      }
      message.push(reqd);
    },

    unpad: _unpadLength };


  // ISO 10126
  //
  // The final block is padded with random bytes except for the last
  // byte of the last block which contains the number of padding bytes.
  C_pad.iso10126 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);
      for (var i = 1; i < reqd; i++) {
        message.push(Math.floor(Math.random() * 256));
      }
      message.push(reqd);
    },

    unpad: _unpadLength };


  // PKCS7 padding
  //
  // PKCS7 is described in RFC 5652. Padding is in whole bytes. The
  // value of each added byte is the number of bytes that are added,
  // i.e. N bytes, each of value N are added.
  C_pad.pkcs7 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);
      for (var i = 0; i < reqd; i++) {
        message.push(reqd);
      }
    },

    unpad: _unpadLength };


  // Create mode namespace
  var C_mode = C.mode = {};

  /**
                             * Mode base "class".
                             */
  var Mode = C_mode.Mode = function (padding) {
    if (padding) {
      this._padding = padding;
    }
  };

  Mode.prototype = {
    encrypt: function encrypt(cipher, m, iv) {
      this._padding.pad(cipher, m);
      this._doEncrypt(cipher, m, iv);
    },

    decrypt: function decrypt(cipher, m, iv) {
      this._doDecrypt(cipher, m, iv);
      this._padding.unpad(m);
    },

    // Default padding
    _padding: C_pad.iso7816 };



  /**
                                * Electronic Code Book mode.
                                * 
                                * ECB applies the cipher directly against each block of the input.
                                * 
                                * ECB does not require an initialization vector.
                                */
  var ECB = C_mode.ECB = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  };

  // Inherit from Mode
  var ECB_prototype = ECB.prototype = new Mode();

  // Concrete steps for Mode template
  ECB_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4;
    // Encrypt each block
    for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
      cipher._encryptblock(m, offset);
    }
  };
  ECB_prototype._doDecrypt = function (cipher, c, iv) {
    var blockSizeInBytes = cipher._blocksize * 4;
    // Decrypt each block
    for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
      cipher._decryptblock(c, offset);
    }
  };

  // ECB never uses an IV
  ECB_prototype.fixOptions = function (options) {
    options.iv = [];
  };


  /**
      * Cipher block chaining
      * 
      * The first block is XORed with the IV. Subsequent blocks are XOR with the
      * previous cipher output.
      */
  var CBC = C_mode.CBC = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  };

  // Inherit from Mode
  var CBC_prototype = CBC.prototype = new Mode();

  // Concrete steps for Mode template
  CBC_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4;

    // Encrypt each block
    for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
      if (offset == 0) {
        // XOR first block using IV
        for (var i = 0; i < blockSizeInBytes; i++) {
          m[i] ^= iv[i];}
      } else {
        // XOR this block using previous crypted block
        for (var i = 0; i < blockSizeInBytes; i++) {
          m[offset + i] ^= m[offset + i - blockSizeInBytes];}
      }
      // Encrypt block
      cipher._encryptblock(m, offset);
    }
  };
  CBC_prototype._doDecrypt = function (cipher, c, iv) {
    var blockSizeInBytes = cipher._blocksize * 4;

    // At the start, the previously crypted block is the IV
    var prevCryptedBlock = iv;

    // Decrypt each block
    for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
      // Save this crypted block
      var thisCryptedBlock = c.slice(offset, offset + blockSizeInBytes);
      // Decrypt block
      cipher._decryptblock(c, offset);
      // XOR decrypted block using previous crypted block
      for (var i = 0; i < blockSizeInBytes; i++) {
        c[offset + i] ^= prevCryptedBlock[i];
      }
      prevCryptedBlock = thisCryptedBlock;
    }
  };


  /**
      * Cipher feed back
      * 
      * The cipher output is XORed with the plain text to produce the cipher output,
      * which is then fed back into the cipher to produce a bit pattern to XOR the
      * next block with.
      * 
      * This is a stream cipher mode and does not require padding.
      */
  var CFB = C_mode.CFB = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  };

  // Inherit from Mode
  var CFB_prototype = CFB.prototype = new Mode();

  // Override padding
  CFB_prototype._padding = C_pad.NoPadding;

  // Concrete steps for Mode template
  CFB_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4,
    keystream = iv.slice(0);

    // Encrypt each byte
    for (var i = 0; i < m.length; i++) {

      var j = i % blockSizeInBytes;
      if (j == 0) cipher._encryptblock(keystream, 0);

      m[i] ^= keystream[j];
      keystream[j] = m[i];
    }
  };
  CFB_prototype._doDecrypt = function (cipher, c, iv) {
    var blockSizeInBytes = cipher._blocksize * 4,
    keystream = iv.slice(0);

    // Encrypt each byte
    for (var i = 0; i < c.length; i++) {

      var j = i % blockSizeInBytes;
      if (j == 0) cipher._encryptblock(keystream, 0);

      var b = c[i];
      c[i] ^= keystream[j];
      keystream[j] = b;
    }
  };


  /**
      * Output feed back
      * 
      * The cipher repeatedly encrypts its own output. The output is XORed with the
      * plain text to produce the cipher text.
      * 
      * This is a stream cipher mode and does not require padding.
      */
  var OFB = C_mode.OFB = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  };

  // Inherit from Mode
  var OFB_prototype = OFB.prototype = new Mode();

  // Override padding
  OFB_prototype._padding = C_pad.NoPadding;

  // Concrete steps for Mode template
  OFB_prototype._doEncrypt = function (cipher, m, iv) {

    var blockSizeInBytes = cipher._blocksize * 4,
    keystream = iv.slice(0);

    // Encrypt each byte
    for (var i = 0; i < m.length; i++) {

      // Generate keystream
      if (i % blockSizeInBytes == 0)
      cipher._encryptblock(keystream, 0);

      // Encrypt byte
      m[i] ^= keystream[i % blockSizeInBytes];

    }
  };
  OFB_prototype._doDecrypt = OFB_prototype._doEncrypt;

  /**
                                                        * Counter
                                                        * @author Gergely Risko
                                                        *
                                                        * After every block the last 4 bytes of the IV is increased by one
                                                        * with carry and that IV is used for the next block.
                                                        *
                                                        * This is a stream cipher mode and does not require padding.
                                                        */
  var CTR = C_mode.CTR = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  };

  // Inherit from Mode
  var CTR_prototype = CTR.prototype = new Mode();

  // Override padding
  CTR_prototype._padding = C_pad.NoPadding;

  CTR_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4;
    var counter = iv.slice(0);

    for (var i = 0; i < m.length;) {
      // do not lose iv
      var keystream = counter.slice(0);

      // Generate keystream for next block
      cipher._encryptblock(keystream, 0);

      // XOR keystream with block
      for (var j = 0; i < m.length && j < blockSizeInBytes; j++, i++) {
        m[i] ^= keystream[j];
      }

      // Increase counter
      if (++counter[blockSizeInBytes - 1] == 256) {
        counter[blockSizeInBytes - 1] = 0;
        if (++counter[blockSizeInBytes - 2] == 256) {
          counter[blockSizeInBytes - 2] = 0;
          if (++counter[blockSizeInBytes - 3] == 256) {
            counter[blockSizeInBytes - 3] = 0;
            ++counter[blockSizeInBytes - 4];
          }
        }
      }
    }
  };
  CTR_prototype._doDecrypt = CTR_prototype._doEncrypt;

})();

/***/ }),

/***/ 323:
/*!**********************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/CryptoMath.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcut
  var util = C.util;

  // Convert n to unsigned 32-bit integer
  util.u32 = function (n) {
    return n >>> 0;
  };

  // Unsigned 32-bit addition
  util.add = function () {
    var result = this.u32(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
      result = this.u32(result + this.u32(arguments[i]));}
    return result;
  };

  // Unsigned 32-bit multiplication
  util.mult = function (m, n) {
    return this.add((n & 0xFFFF0000) * m,
    (n & 0x0000FFFF) * m);
  };

  // Unsigned 32-bit greater than (>) comparison
  util.gt = function (m, n) {
    return this.u32(m) > this.u32(n);
  };

  // Unsigned 32-bit less than (<) comparison
  util.lt = function (m, n) {
    return this.u32(m) < this.u32(n);
  };

})();

/***/ }),

/***/ 324:
/*!***************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/DES.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Definition of Data Encryption Standard (DES) taken from:
 * http://www.itl.nist.gov/fipspubs/fip46-2.htm
 */

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,charenc = C.charenc,UTF8 = charenc.UTF8;

  /***************************************************************************
                                                              * 
                                                              * DES Key Schedule.
                                                              * 
                                                              * The Key consists of 16 sub-keys of 48 bits each. As each sub-key is
                                                              * applied to an expanded 32-bit value where each 4 bits of input is
                                                              * expanded into 6 bits of output the sub-key can be broken down into 8
                                                              * 32-bit values which allows the key to be used without expansion.
                                                              * 
                                                              * To create the 16 sub-keys, 56 bits are selected from the input 64 bit key
                                                              * according to <i>PC1</i>. Each sub-key is generated by left rotating the
                                                              * bits a different amount and then selecting 48 bits according to <i>PC2</i>.
                                                              * 
                                                              **************************************************************************/

  var KeySchedule;

  /**
                    * Representation of a DES key schedule.
                    * 
                    * @param {Array
                    *            of 8 bytes} key The cipher key
                    * 
                    * @constructor
                    */
  KeySchedule = function KeySchedule(key) {
    /**
                                            * The schedule of 16 keys
                                            */
    this.keys = new Array(16);
    this._initialiseKeys(key);
  };

  /**
      * Permuted Choice 1 (PC1) byte offsets into the key. Each of the 56 entries
      * selects one bit of DES's 56 bit key.
      * <p>
      * 
      * <pre>
      * The PC1 is defined as:
      * 
      * 57,   49,    41,   33,    25,    17,    9,
      *  1,   58,    50,   42,    34,    26,   18,
      * 10,    2,    59,   51,    43,    35,   27,
      * 19,   11,     3,   60,    52,    44,   36,
      * 63,   55,    47,   39,    31,    23,   15,
      *  7,   62,    54,   46,    38,    30,   22,
      * 14,    6,    61,   53,    45,    37,   29,
      * 21,   13,     5,   28,    20,    12,    4
      * </pre>
      * 
      * We represent this as an offset into an 8-byte array and a bit mask upon
      * that byte. For example 57=(7*8)+1 so is the first (MSB) of the 7th byte.
      * 
      * @constant
      */
  KeySchedule.PC1_offsets = [7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0,
  7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6,
  5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 3, 2, 1, 0];

  /**
                                                          * Permuted Choice 1 (PC1) bit masks. Each of the 56 entries selects one bit
                                                          * of DES's 56 bit key.
                                                          * 
                                                          * @constant
                                                          */
  KeySchedule.PC1_masks = [128, 128, 128, 128, 128, 128, 128, 128, 64, 64,
  64, 64, 64, 64, 64, 64, 32, 32, 32, 32, 32, 32, 32, 32, 16, 16, 16,
  16, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8,
  8, 8, 8, 16, 16, 16, 16];

  /**
                             * Permuted Choice 2 (PC2) selects the active 48 bits from the 56 bits of
                             * the key.
                             * <p>
                             * 
                             * <pre>
                             * The PC2 is defined as:
                             * 
                             * 14,   17,   11,   24,    1,    5,
                             *  3,   28,   15,    6,   21,   10,
                             * 23,   19,   12,    4,   26,    8,
                             * 16,    7,   27,   20,   13,    2,
                             * 41,   52,   31,   37,   47,   55,
                             * 30,   40,   51,   45,   33,   48,
                             * 44,   49,   39,   56,   34,   53,
                             * 46,   42,   50,   36,   29,   32
                             * </pre>
                             * 
                             * We invert the choice to specify what each bit adds to each 6-bit value of
                             * the key. For example, bit 1 is the 5th bit selected so this add 2 to the
                             * first 6-bit value.
                             * 
                             * @constant
                             */
  KeySchedule.PC2_offsets1 = [0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 0, 2, 3, 0, 1,
  3, 0, 0, 2, 3, 1, 0, 2, 0, 0, 2, 3, 1];

  /**
                                           * PC2 offsets for 2nd block.
                                           * 
                                           * @constant
                                           */
  KeySchedule.PC2_offsets2 = [7, 5, 4, 7, 5, 6, 0, 7, 4, 0, 6, 5, 4, 7, 0,
  6, 5, 7, 4, 5, 6, 7, 5, 4, 6, 0, 4, 6];

  /**
                                           * Permuted Choice 2 (PC2) masks for 1st block.
                                           * 
                                           * @constant
                                           */
  KeySchedule.PC2_masks1 = [2, 1, 32, 4, 1, 4, 16, 1, 0, 1, 8, 8, 2, 32, 8,
  32, 16, 0, 16, 4, 2, 0, 32, 4, 0, 2, 8, 16];

  /**
                                                * PC2 masks for 2nd block.
                                                * 
                                                * @constant
                                                */
  KeySchedule.PC2_masks2 = [2, 32, 8, 1, 2, 2, 0, 4, 4, 0, 8, 16, 32, 16, 0,
  32, 4, 32, 2, 1, 16, 8, 8, 16, 1, 0, 1, 4];

  /**
                                               * Cumulative key shifts.
                                               * 
                                               * @constant
                                               */
  KeySchedule.keyShifts = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23,
  25, 27, 28];

  KeySchedule.prototype._initialiseKeys = function (key) {
    var i;

    // extract 56 key bits in order determined by PC1
    var bits = new Array(56);
    for (i = 0; i < 56; i++) {
      bits[i] = (key[KeySchedule.PC1_offsets[i]] & KeySchedule.PC1_masks[i]) != 0;
    }

    // split 56 bits into two 28-bit chunks
    var bits1 = bits.slice(0, 28);
    var bits2 = bits.slice(28, 56);

    // duplicate each half to allow for easy bit shifts
    bits1 = bits1.concat(bits1);
    bits2 = bits2.concat(bits2);

    // assemble the 16 keys
    for (i = 0; i < 16; i++) {
      var k = [0, 0, 0, 0, 0, 0, 0, 0];

      // select the bits of the key according to PC2
      var s = KeySchedule.keyShifts[i];
      for (var j = 0; j < 28; j++) {
        if (bits1[j + s]) {
          k[KeySchedule.PC2_offsets1[j]] += KeySchedule.PC2_masks1[j];
        }
        if (bits2[j + s]) {
          k[KeySchedule.PC2_offsets2[j]] += KeySchedule.PC2_masks2[j];
        }
      }

      // Scale each of the 8 blocks to a 32-bit mask.
      k[0] = ((k[0] & 0x1f) << 27) + ((k[0] & 0x20) >> 5);
      for (var j = 1; j <= 6; j++) {
        k[j] = k[j] << 27 - 4 * j;
      }
      k[7] = ((k[7] & 0x3e) >> 1) + ((k[7] & 0x1) << 31);
      this.keys[i] = k;
    }
  };

  /**
      * Retrieve the key for a specified round
      * 
      * @param i
      *            the round
      * @returns the key
      */
  KeySchedule.prototype.getKey = function (i) {
    return this.keys[i];
  };

  /***************************************************************************
      * 
      * DES Engine State
      * 
      **************************************************************************/

  var State;

  /**
              * The algorithm's state. DES operates on two sets of 32-bits, with each
              * block of 32-bits treated as a single number.
              * 
              * @class
              */
  State = function State() {
    /** The LHS of the Feistel scheme */
    this.lhs = 0;
    /** The RHS of the Feistel scheme */
    this.rhs = 0;
  };

  /**
      * The masks that select the SBOX input. Each SBOX accepts 6 bits from the
      * input.
      * 
      * @constant
      */
  State.SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
  0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

  /**
                                                    * The SBOXes. The 8 SBOXes each map 6 bit masked bit of the input to 4 bits
                                                    * of output. These SBOXes include the post SBOX permutation and benefit
                                                    * from JavaScript's sparse arrays to make specifying the input match
                                                    * simple.
                                                    * 
                                                    * @constant
                                                    */
  State.SBOX = new Array(8);

  var SBOX = State.SBOX;

  SBOX[0] = new Array();
  SBOX[0][0] = 0x808200; // 0 (0, 0) = 14
  SBOX[0][268435456] = 0x8000; // 10000000 (0, 1) = 4
  SBOX[0][536870912] = 0x808002; // 20000000 (0, 2) = 13
  SBOX[0][805306368] = 0x2; // 30000000 (0, 3) = 1
  SBOX[0][1073741824] = 0x200; // 40000000 (0, 4) = 2
  SBOX[0][1342177280] = 0x808202; // 50000000 (0, 5) = 15
  SBOX[0][1610612736] = 0x800202; // 60000000 (0, 6) = 11
  SBOX[0][1879048192] = 0x800000; // 70000000 (0, 7) = 8
  SBOX[0][-2147483648] = 0x202; // 80000000 (0, 8) = 3
  SBOX[0][-1879048192] = 0x800200; // 90000000 (0, 9) = 10
  SBOX[0][-1610612736] = 0x8200; // a0000000 (0, 10) = 6
  SBOX[0][-1342177280] = 0x808000; // b0000000 (0, 11) = 12
  SBOX[0][-1073741824] = 0x8002; // c0000000 (0, 12) = 5
  SBOX[0][-805306368] = 0x800002; // d0000000 (0, 13) = 9
  SBOX[0][-536870912] = 0x0; // e0000000 (0, 14) = 0
  SBOX[0][-268435456] = 0x8202; // f0000000 (0, 15) = 7
  SBOX[0][134217728] = 0x0; // 8000000 (1, 0) = 0
  SBOX[0][402653184] = 0x808202; // 18000000 (1, 1) = 15
  SBOX[0][671088640] = 0x8202; // 28000000 (1, 2) = 7
  SBOX[0][939524096] = 0x8000; // 38000000 (1, 3) = 4
  SBOX[0][1207959552] = 0x808200; // 48000000 (1, 4) = 14
  SBOX[0][1476395008] = 0x200; // 58000000 (1, 5) = 2
  SBOX[0][1744830464] = 0x808002; // 68000000 (1, 6) = 13
  SBOX[0][2013265920] = 0x2; // 78000000 (1, 7) = 1
  SBOX[0][-2013265920] = 0x800200; // 88000000 (1, 8) = 10
  SBOX[0][-1744830464] = 0x8200; // 98000000 (1, 9) = 6
  SBOX[0][-1476395008] = 0x808000; // a8000000 (1, 10) = 12
  SBOX[0][-1207959552] = 0x800202; // b8000000 (1, 11) = 11
  SBOX[0][-939524096] = 0x800002; // c8000000 (1, 12) = 9
  SBOX[0][-671088640] = 0x8002; // d8000000 (1, 13) = 5
  SBOX[0][-402653184] = 0x202; // e8000000 (1, 14) = 3
  SBOX[0][-134217728] = 0x800000; // f8000000 (1, 15) = 8
  SBOX[0][1] = 0x8000; // 1 (2, 0) = 4
  SBOX[0][268435457] = 0x2; // 10000001 (2, 1) = 1
  SBOX[0][536870913] = 0x808200; // 20000001 (2, 2) = 14
  SBOX[0][805306369] = 0x800000; // 30000001 (2, 3) = 8
  SBOX[0][1073741825] = 0x808002; // 40000001 (2, 4) = 13
  SBOX[0][1342177281] = 0x8200; // 50000001 (2, 5) = 6
  SBOX[0][1610612737] = 0x200; // 60000001 (2, 6) = 2
  SBOX[0][1879048193] = 0x800202; // 70000001 (2, 7) = 11
  SBOX[0][-2147483647] = 0x808202; // 80000001 (2, 8) = 15
  SBOX[0][-1879048191] = 0x808000; // 90000001 (2, 9) = 12
  SBOX[0][-1610612735] = 0x800002; // a0000001 (2, 10) = 9
  SBOX[0][-1342177279] = 0x8202; // b0000001 (2, 11) = 7
  SBOX[0][-1073741823] = 0x202; // c0000001 (2, 12) = 3
  SBOX[0][-805306367] = 0x800200; // d0000001 (2, 13) = 10
  SBOX[0][-536870911] = 0x8002; // e0000001 (2, 14) = 5
  SBOX[0][-268435455] = 0x0; // f0000001 (2, 15) = 0
  SBOX[0][134217729] = 0x808202; // 8000001 (3, 0) = 15
  SBOX[0][402653185] = 0x808000; // 18000001 (3, 1) = 12
  SBOX[0][671088641] = 0x800000; // 28000001 (3, 2) = 8
  SBOX[0][939524097] = 0x200; // 38000001 (3, 3) = 2
  SBOX[0][1207959553] = 0x8000; // 48000001 (3, 4) = 4
  SBOX[0][1476395009] = 0x800002; // 58000001 (3, 5) = 9
  SBOX[0][1744830465] = 0x2; // 68000001 (3, 6) = 1
  SBOX[0][2013265921] = 0x8202; // 78000001 (3, 7) = 7
  SBOX[0][-2013265919] = 0x8002; // 88000001 (3, 8) = 5
  SBOX[0][-1744830463] = 0x800202; // 98000001 (3, 9) = 11
  SBOX[0][-1476395007] = 0x202; // a8000001 (3, 10) = 3
  SBOX[0][-1207959551] = 0x808200; // b8000001 (3, 11) = 14
  SBOX[0][-939524095] = 0x800200; // c8000001 (3, 12) = 10
  SBOX[0][-671088639] = 0x0; // d8000001 (3, 13) = 0
  SBOX[0][-402653183] = 0x8200; // e8000001 (3, 14) = 6
  SBOX[0][-134217727] = 0x808002; // f8000001 (3, 15) = 13

  SBOX[1] = new Array();
  SBOX[1][0] = 0x40084010; // 0 (0, 0) = 15
  SBOX[1][16777216] = 0x4000; // 1000000 (0, 1) = 1
  SBOX[1][33554432] = 0x80000; // 2000000 (0, 2) = 8
  SBOX[1][50331648] = 0x40080010; // 3000000 (0, 3) = 14
  SBOX[1][67108864] = 0x40000010; // 4000000 (0, 4) = 6
  SBOX[1][83886080] = 0x40084000; // 5000000 (0, 5) = 11
  SBOX[1][100663296] = 0x40004000; // 6000000 (0, 6) = 3
  SBOX[1][117440512] = 0x10; // 7000000 (0, 7) = 4
  SBOX[1][134217728] = 0x84000; // 8000000 (0, 8) = 9
  SBOX[1][150994944] = 0x40004010; // 9000000 (0, 9) = 7
  SBOX[1][167772160] = 0x40000000; // a000000 (0, 10) = 2
  SBOX[1][184549376] = 0x84010; // b000000 (0, 11) = 13
  SBOX[1][201326592] = 0x80010; // c000000 (0, 12) = 12
  SBOX[1][218103808] = 0x0; // d000000 (0, 13) = 0
  SBOX[1][234881024] = 0x4010; // e000000 (0, 14) = 5
  SBOX[1][251658240] = 0x40080000; // f000000 (0, 15) = 10
  SBOX[1][8388608] = 0x40004000; // 800000 (1, 0) = 3
  SBOX[1][25165824] = 0x84010; // 1800000 (1, 1) = 13
  SBOX[1][41943040] = 0x10; // 2800000 (1, 2) = 4
  SBOX[1][58720256] = 0x40004010; // 3800000 (1, 3) = 7
  SBOX[1][75497472] = 0x40084010; // 4800000 (1, 4) = 15
  SBOX[1][92274688] = 0x40000000; // 5800000 (1, 5) = 2
  SBOX[1][109051904] = 0x80000; // 6800000 (1, 6) = 8
  SBOX[1][125829120] = 0x40080010; // 7800000 (1, 7) = 14
  SBOX[1][142606336] = 0x80010; // 8800000 (1, 8) = 12
  SBOX[1][159383552] = 0x0; // 9800000 (1, 9) = 0
  SBOX[1][176160768] = 0x4000; // a800000 (1, 10) = 1
  SBOX[1][192937984] = 0x40080000; // b800000 (1, 11) = 10
  SBOX[1][209715200] = 0x40000010; // c800000 (1, 12) = 6
  SBOX[1][226492416] = 0x84000; // d800000 (1, 13) = 9
  SBOX[1][243269632] = 0x40084000; // e800000 (1, 14) = 11
  SBOX[1][260046848] = 0x4010; // f800000 (1, 15) = 5
  SBOX[1][268435456] = 0x0; // 10000000 (2, 0) = 0
  SBOX[1][285212672] = 0x40080010; // 11000000 (2, 1) = 14
  SBOX[1][301989888] = 0x40004010; // 12000000 (2, 2) = 7
  SBOX[1][318767104] = 0x40084000; // 13000000 (2, 3) = 11
  SBOX[1][335544320] = 0x40080000; // 14000000 (2, 4) = 10
  SBOX[1][352321536] = 0x10; // 15000000 (2, 5) = 4
  SBOX[1][369098752] = 0x84010; // 16000000 (2, 6) = 13
  SBOX[1][385875968] = 0x4000; // 17000000 (2, 7) = 1
  SBOX[1][402653184] = 0x4010; // 18000000 (2, 8) = 5
  SBOX[1][419430400] = 0x80000; // 19000000 (2, 9) = 8
  SBOX[1][436207616] = 0x80010; // 1a000000 (2, 10) = 12
  SBOX[1][452984832] = 0x40000010; // 1b000000 (2, 11) = 6
  SBOX[1][469762048] = 0x84000; // 1c000000 (2, 12) = 9
  SBOX[1][486539264] = 0x40004000; // 1d000000 (2, 13) = 3
  SBOX[1][503316480] = 0x40000000; // 1e000000 (2, 14) = 2
  SBOX[1][520093696] = 0x40084010; // 1f000000 (2, 15) = 15
  SBOX[1][276824064] = 0x84010; // 10800000 (3, 0) = 13
  SBOX[1][293601280] = 0x80000; // 11800000 (3, 1) = 8
  SBOX[1][310378496] = 0x40080000; // 12800000 (3, 2) = 10
  SBOX[1][327155712] = 0x4000; // 13800000 (3, 3) = 1
  SBOX[1][343932928] = 0x40004000; // 14800000 (3, 4) = 3
  SBOX[1][360710144] = 0x40084010; // 15800000 (3, 5) = 15
  SBOX[1][377487360] = 0x10; // 16800000 (3, 6) = 4
  SBOX[1][394264576] = 0x40000000; // 17800000 (3, 7) = 2
  SBOX[1][411041792] = 0x40084000; // 18800000 (3, 8) = 11
  SBOX[1][427819008] = 0x40000010; // 19800000 (3, 9) = 6
  SBOX[1][444596224] = 0x40004010; // 1a800000 (3, 10) = 7
  SBOX[1][461373440] = 0x80010; // 1b800000 (3, 11) = 12
  SBOX[1][478150656] = 0x0; // 1c800000 (3, 12) = 0
  SBOX[1][494927872] = 0x4010; // 1d800000 (3, 13) = 5
  SBOX[1][511705088] = 0x40080010; // 1e800000 (3, 14) = 14
  SBOX[1][528482304] = 0x84000; // 1f800000 (3, 15) = 9

  SBOX[2] = new Array();
  SBOX[2][0] = 0x104; // 0 (0, 0) = 10
  SBOX[2][1048576] = 0x0; // 100000 (0, 1) = 0
  SBOX[2][2097152] = 0x4000100; // 200000 (0, 2) = 9
  SBOX[2][3145728] = 0x10104; // 300000 (0, 3) = 14
  SBOX[2][4194304] = 0x10004; // 400000 (0, 4) = 6
  SBOX[2][5242880] = 0x4000004; // 500000 (0, 5) = 3
  SBOX[2][6291456] = 0x4010104; // 600000 (0, 6) = 15
  SBOX[2][7340032] = 0x4010000; // 700000 (0, 7) = 5
  SBOX[2][8388608] = 0x4000000; // 800000 (0, 8) = 1
  SBOX[2][9437184] = 0x4010100; // 900000 (0, 9) = 13
  SBOX[2][10485760] = 0x10100; // a00000 (0, 10) = 12
  SBOX[2][11534336] = 0x4010004; // b00000 (0, 11) = 7
  SBOX[2][12582912] = 0x4000104; // c00000 (0, 12) = 11
  SBOX[2][13631488] = 0x10000; // d00000 (0, 13) = 4
  SBOX[2][14680064] = 0x4; // e00000 (0, 14) = 2
  SBOX[2][15728640] = 0x100; // f00000 (0, 15) = 8
  SBOX[2][524288] = 0x4010100; // 80000 (1, 0) = 13
  SBOX[2][1572864] = 0x4010004; // 180000 (1, 1) = 7
  SBOX[2][2621440] = 0x0; // 280000 (1, 2) = 0
  SBOX[2][3670016] = 0x4000100; // 380000 (1, 3) = 9
  SBOX[2][4718592] = 0x4000004; // 480000 (1, 4) = 3
  SBOX[2][5767168] = 0x10000; // 580000 (1, 5) = 4
  SBOX[2][6815744] = 0x10004; // 680000 (1, 6) = 6
  SBOX[2][7864320] = 0x104; // 780000 (1, 7) = 10
  SBOX[2][8912896] = 0x4; // 880000 (1, 8) = 2
  SBOX[2][9961472] = 0x100; // 980000 (1, 9) = 8
  SBOX[2][11010048] = 0x4010000; // a80000 (1, 10) = 5
  SBOX[2][12058624] = 0x10104; // b80000 (1, 11) = 14
  SBOX[2][13107200] = 0x10100; // c80000 (1, 12) = 12
  SBOX[2][14155776] = 0x4000104; // d80000 (1, 13) = 11
  SBOX[2][15204352] = 0x4010104; // e80000 (1, 14) = 15
  SBOX[2][16252928] = 0x4000000; // f80000 (1, 15) = 1
  SBOX[2][16777216] = 0x4010100; // 1000000 (2, 0) = 13
  SBOX[2][17825792] = 0x10004; // 1100000 (2, 1) = 6
  SBOX[2][18874368] = 0x10000; // 1200000 (2, 2) = 4
  SBOX[2][19922944] = 0x4000100; // 1300000 (2, 3) = 9
  SBOX[2][20971520] = 0x100; // 1400000 (2, 4) = 8
  SBOX[2][22020096] = 0x4010104; // 1500000 (2, 5) = 15
  SBOX[2][23068672] = 0x4000004; // 1600000 (2, 6) = 3
  SBOX[2][24117248] = 0x0; // 1700000 (2, 7) = 0
  SBOX[2][25165824] = 0x4000104; // 1800000 (2, 8) = 11
  SBOX[2][26214400] = 0x4000000; // 1900000 (2, 9) = 1
  SBOX[2][27262976] = 0x4; // 1a00000 (2, 10) = 2
  SBOX[2][28311552] = 0x10100; // 1b00000 (2, 11) = 12
  SBOX[2][29360128] = 0x4010000; // 1c00000 (2, 12) = 5
  SBOX[2][30408704] = 0x104; // 1d00000 (2, 13) = 10
  SBOX[2][31457280] = 0x10104; // 1e00000 (2, 14) = 14
  SBOX[2][32505856] = 0x4010004; // 1f00000 (2, 15) = 7
  SBOX[2][17301504] = 0x4000000; // 1080000 (3, 0) = 1
  SBOX[2][18350080] = 0x104; // 1180000 (3, 1) = 10
  SBOX[2][19398656] = 0x4010100; // 1280000 (3, 2) = 13
  SBOX[2][20447232] = 0x0; // 1380000 (3, 3) = 0
  SBOX[2][21495808] = 0x10004; // 1480000 (3, 4) = 6
  SBOX[2][22544384] = 0x4000100; // 1580000 (3, 5) = 9
  SBOX[2][23592960] = 0x100; // 1680000 (3, 6) = 8
  SBOX[2][24641536] = 0x4010004; // 1780000 (3, 7) = 7
  SBOX[2][25690112] = 0x10000; // 1880000 (3, 8) = 4
  SBOX[2][26738688] = 0x4010104; // 1980000 (3, 9) = 15
  SBOX[2][27787264] = 0x10104; // 1a80000 (3, 10) = 14
  SBOX[2][28835840] = 0x4000004; // 1b80000 (3, 11) = 3
  SBOX[2][29884416] = 0x4000104; // 1c80000 (3, 12) = 11
  SBOX[2][30932992] = 0x4010000; // 1d80000 (3, 13) = 5
  SBOX[2][31981568] = 0x4; // 1e80000 (3, 14) = 2
  SBOX[2][33030144] = 0x10100; // 1f80000 (3, 15) = 12

  SBOX[3] = new Array();
  SBOX[3][0] = 0x80401000; // 0 (0, 0) = 7
  SBOX[3][65536] = 0x80001040; // 10000 (0, 1) = 13
  SBOX[3][131072] = 0x401040; // 20000 (0, 2) = 14
  SBOX[3][196608] = 0x80400000; // 30000 (0, 3) = 3
  SBOX[3][262144] = 0x0; // 40000 (0, 4) = 0
  SBOX[3][327680] = 0x401000; // 50000 (0, 5) = 6
  SBOX[3][393216] = 0x80000040; // 60000 (0, 6) = 9
  SBOX[3][458752] = 0x400040; // 70000 (0, 7) = 10
  SBOX[3][524288] = 0x80000000; // 80000 (0, 8) = 1
  SBOX[3][589824] = 0x400000; // 90000 (0, 9) = 2
  SBOX[3][655360] = 0x40; // a0000 (0, 10) = 8
  SBOX[3][720896] = 0x80001000; // b0000 (0, 11) = 5
  SBOX[3][786432] = 0x80400040; // c0000 (0, 12) = 11
  SBOX[3][851968] = 0x1040; // d0000 (0, 13) = 12
  SBOX[3][917504] = 0x1000; // e0000 (0, 14) = 4
  SBOX[3][983040] = 0x80401040; // f0000 (0, 15) = 15
  SBOX[3][32768] = 0x80001040; // 8000 (1, 0) = 13
  SBOX[3][98304] = 0x40; // 18000 (1, 1) = 8
  SBOX[3][163840] = 0x80400040; // 28000 (1, 2) = 11
  SBOX[3][229376] = 0x80001000; // 38000 (1, 3) = 5
  SBOX[3][294912] = 0x401000; // 48000 (1, 4) = 6
  SBOX[3][360448] = 0x80401040; // 58000 (1, 5) = 15
  SBOX[3][425984] = 0x0; // 68000 (1, 6) = 0
  SBOX[3][491520] = 0x80400000; // 78000 (1, 7) = 3
  SBOX[3][557056] = 0x1000; // 88000 (1, 8) = 4
  SBOX[3][622592] = 0x80401000; // 98000 (1, 9) = 7
  SBOX[3][688128] = 0x400000; // a8000 (1, 10) = 2
  SBOX[3][753664] = 0x1040; // b8000 (1, 11) = 12
  SBOX[3][819200] = 0x80000000; // c8000 (1, 12) = 1
  SBOX[3][884736] = 0x400040; // d8000 (1, 13) = 10
  SBOX[3][950272] = 0x401040; // e8000 (1, 14) = 14
  SBOX[3][1015808] = 0x80000040; // f8000 (1, 15) = 9
  SBOX[3][1048576] = 0x400040; // 100000 (2, 0) = 10
  SBOX[3][1114112] = 0x401000; // 110000 (2, 1) = 6
  SBOX[3][1179648] = 0x80000040; // 120000 (2, 2) = 9
  SBOX[3][1245184] = 0x0; // 130000 (2, 3) = 0
  SBOX[3][1310720] = 0x1040; // 140000 (2, 4) = 12
  SBOX[3][1376256] = 0x80400040; // 150000 (2, 5) = 11
  SBOX[3][1441792] = 0x80401000; // 160000 (2, 6) = 7
  SBOX[3][1507328] = 0x80001040; // 170000 (2, 7) = 13
  SBOX[3][1572864] = 0x80401040; // 180000 (2, 8) = 15
  SBOX[3][1638400] = 0x80000000; // 190000 (2, 9) = 1
  SBOX[3][1703936] = 0x80400000; // 1a0000 (2, 10) = 3
  SBOX[3][1769472] = 0x401040; // 1b0000 (2, 11) = 14
  SBOX[3][1835008] = 0x80001000; // 1c0000 (2, 12) = 5
  SBOX[3][1900544] = 0x400000; // 1d0000 (2, 13) = 2
  SBOX[3][1966080] = 0x40; // 1e0000 (2, 14) = 8
  SBOX[3][2031616] = 0x1000; // 1f0000 (2, 15) = 4
  SBOX[3][1081344] = 0x80400000; // 108000 (3, 0) = 3
  SBOX[3][1146880] = 0x80401040; // 118000 (3, 1) = 15
  SBOX[3][1212416] = 0x0; // 128000 (3, 2) = 0
  SBOX[3][1277952] = 0x401000; // 138000 (3, 3) = 6
  SBOX[3][1343488] = 0x400040; // 148000 (3, 4) = 10
  SBOX[3][1409024] = 0x80000000; // 158000 (3, 5) = 1
  SBOX[3][1474560] = 0x80001040; // 168000 (3, 6) = 13
  SBOX[3][1540096] = 0x40; // 178000 (3, 7) = 8
  SBOX[3][1605632] = 0x80000040; // 188000 (3, 8) = 9
  SBOX[3][1671168] = 0x1000; // 198000 (3, 9) = 4
  SBOX[3][1736704] = 0x80001000; // 1a8000 (3, 10) = 5
  SBOX[3][1802240] = 0x80400040; // 1b8000 (3, 11) = 11
  SBOX[3][1867776] = 0x1040; // 1c8000 (3, 12) = 12
  SBOX[3][1933312] = 0x80401000; // 1d8000 (3, 13) = 7
  SBOX[3][1998848] = 0x400000; // 1e8000 (3, 14) = 2
  SBOX[3][2064384] = 0x401040; // 1f8000 (3, 15) = 14

  SBOX[4] = new Array();
  SBOX[4][0] = 0x80; // 0 (0, 0) = 2
  SBOX[4][4096] = 0x1040000; // 1000 (0, 1) = 12
  SBOX[4][8192] = 0x40000; // 2000 (0, 2) = 4
  SBOX[4][12288] = 0x20000000; // 3000 (0, 3) = 1
  SBOX[4][16384] = 0x20040080; // 4000 (0, 4) = 7
  SBOX[4][20480] = 0x1000080; // 5000 (0, 5) = 10
  SBOX[4][24576] = 0x21000080; // 6000 (0, 6) = 11
  SBOX[4][28672] = 0x40080; // 7000 (0, 7) = 6
  SBOX[4][32768] = 0x1000000; // 8000 (0, 8) = 8
  SBOX[4][36864] = 0x20040000; // 9000 (0, 9) = 5
  SBOX[4][40960] = 0x20000080; // a000 (0, 10) = 3
  SBOX[4][45056] = 0x21040080; // b000 (0, 11) = 15
  SBOX[4][49152] = 0x21040000; // c000 (0, 12) = 13
  SBOX[4][53248] = 0x0; // d000 (0, 13) = 0
  SBOX[4][57344] = 0x1040080; // e000 (0, 14) = 14
  SBOX[4][61440] = 0x21000000; // f000 (0, 15) = 9
  SBOX[4][2048] = 0x1040080; // 800 (1, 0) = 14
  SBOX[4][6144] = 0x21000080; // 1800 (1, 1) = 11
  SBOX[4][10240] = 0x80; // 2800 (1, 2) = 2
  SBOX[4][14336] = 0x1040000; // 3800 (1, 3) = 12
  SBOX[4][18432] = 0x40000; // 4800 (1, 4) = 4
  SBOX[4][22528] = 0x20040080; // 5800 (1, 5) = 7
  SBOX[4][26624] = 0x21040000; // 6800 (1, 6) = 13
  SBOX[4][30720] = 0x20000000; // 7800 (1, 7) = 1
  SBOX[4][34816] = 0x20040000; // 8800 (1, 8) = 5
  SBOX[4][38912] = 0x0; // 9800 (1, 9) = 0
  SBOX[4][43008] = 0x21040080; // a800 (1, 10) = 15
  SBOX[4][47104] = 0x1000080; // b800 (1, 11) = 10
  SBOX[4][51200] = 0x20000080; // c800 (1, 12) = 3
  SBOX[4][55296] = 0x21000000; // d800 (1, 13) = 9
  SBOX[4][59392] = 0x1000000; // e800 (1, 14) = 8
  SBOX[4][63488] = 0x40080; // f800 (1, 15) = 6
  SBOX[4][65536] = 0x40000; // 10000 (2, 0) = 4
  SBOX[4][69632] = 0x80; // 11000 (2, 1) = 2
  SBOX[4][73728] = 0x20000000; // 12000 (2, 2) = 1
  SBOX[4][77824] = 0x21000080; // 13000 (2, 3) = 11
  SBOX[4][81920] = 0x1000080; // 14000 (2, 4) = 10
  SBOX[4][86016] = 0x21040000; // 15000 (2, 5) = 13
  SBOX[4][90112] = 0x20040080; // 16000 (2, 6) = 7
  SBOX[4][94208] = 0x1000000; // 17000 (2, 7) = 8
  SBOX[4][98304] = 0x21040080; // 18000 (2, 8) = 15
  SBOX[4][102400] = 0x21000000; // 19000 (2, 9) = 9
  SBOX[4][106496] = 0x1040000; // 1a000 (2, 10) = 12
  SBOX[4][110592] = 0x20040000; // 1b000 (2, 11) = 5
  SBOX[4][114688] = 0x40080; // 1c000 (2, 12) = 6
  SBOX[4][118784] = 0x20000080; // 1d000 (2, 13) = 3
  SBOX[4][122880] = 0x0; // 1e000 (2, 14) = 0
  SBOX[4][126976] = 0x1040080; // 1f000 (2, 15) = 14
  SBOX[4][67584] = 0x21000080; // 10800 (3, 0) = 11
  SBOX[4][71680] = 0x1000000; // 11800 (3, 1) = 8
  SBOX[4][75776] = 0x1040000; // 12800 (3, 2) = 12
  SBOX[4][79872] = 0x20040080; // 13800 (3, 3) = 7
  SBOX[4][83968] = 0x20000000; // 14800 (3, 4) = 1
  SBOX[4][88064] = 0x1040080; // 15800 (3, 5) = 14
  SBOX[4][92160] = 0x80; // 16800 (3, 6) = 2
  SBOX[4][96256] = 0x21040000; // 17800 (3, 7) = 13
  SBOX[4][100352] = 0x40080; // 18800 (3, 8) = 6
  SBOX[4][104448] = 0x21040080; // 19800 (3, 9) = 15
  SBOX[4][108544] = 0x0; // 1a800 (3, 10) = 0
  SBOX[4][112640] = 0x21000000; // 1b800 (3, 11) = 9
  SBOX[4][116736] = 0x1000080; // 1c800 (3, 12) = 10
  SBOX[4][120832] = 0x40000; // 1d800 (3, 13) = 4
  SBOX[4][124928] = 0x20040000; // 1e800 (3, 14) = 5
  SBOX[4][129024] = 0x20000080; // 1f800 (3, 15) = 3

  SBOX[5] = new Array();
  SBOX[5][0] = 0x10000008; // 0 (0, 0) = 12
  SBOX[5][256] = 0x2000; // 100 (0, 1) = 1
  SBOX[5][512] = 0x10200000; // 200 (0, 2) = 10
  SBOX[5][768] = 0x10202008; // 300 (0, 3) = 15
  SBOX[5][1024] = 0x10002000; // 400 (0, 4) = 9
  SBOX[5][1280] = 0x200000; // 500 (0, 5) = 2
  SBOX[5][1536] = 0x200008; // 600 (0, 6) = 6
  SBOX[5][1792] = 0x10000000; // 700 (0, 7) = 8
  SBOX[5][2048] = 0x0; // 800 (0, 8) = 0
  SBOX[5][2304] = 0x10002008; // 900 (0, 9) = 13
  SBOX[5][2560] = 0x202000; // a00 (0, 10) = 3
  SBOX[5][2816] = 0x8; // b00 (0, 11) = 4
  SBOX[5][3072] = 0x10200008; // c00 (0, 12) = 14
  SBOX[5][3328] = 0x202008; // d00 (0, 13) = 7
  SBOX[5][3584] = 0x2008; // e00 (0, 14) = 5
  SBOX[5][3840] = 0x10202000; // f00 (0, 15) = 11
  SBOX[5][128] = 0x10200000; // 80 (1, 0) = 10
  SBOX[5][384] = 0x10202008; // 180 (1, 1) = 15
  SBOX[5][640] = 0x8; // 280 (1, 2) = 4
  SBOX[5][896] = 0x200000; // 380 (1, 3) = 2
  SBOX[5][1152] = 0x202008; // 480 (1, 4) = 7
  SBOX[5][1408] = 0x10000008; // 580 (1, 5) = 12
  SBOX[5][1664] = 0x10002000; // 680 (1, 6) = 9
  SBOX[5][1920] = 0x2008; // 780 (1, 7) = 5
  SBOX[5][2176] = 0x200008; // 880 (1, 8) = 6
  SBOX[5][2432] = 0x2000; // 980 (1, 9) = 1
  SBOX[5][2688] = 0x10002008; // a80 (1, 10) = 13
  SBOX[5][2944] = 0x10200008; // b80 (1, 11) = 14
  SBOX[5][3200] = 0x0; // c80 (1, 12) = 0
  SBOX[5][3456] = 0x10202000; // d80 (1, 13) = 11
  SBOX[5][3712] = 0x202000; // e80 (1, 14) = 3
  SBOX[5][3968] = 0x10000000; // f80 (1, 15) = 8
  SBOX[5][4096] = 0x10002000; // 1000 (2, 0) = 9
  SBOX[5][4352] = 0x10200008; // 1100 (2, 1) = 14
  SBOX[5][4608] = 0x10202008; // 1200 (2, 2) = 15
  SBOX[5][4864] = 0x2008; // 1300 (2, 3) = 5
  SBOX[5][5120] = 0x200000; // 1400 (2, 4) = 2
  SBOX[5][5376] = 0x10000000; // 1500 (2, 5) = 8
  SBOX[5][5632] = 0x10000008; // 1600 (2, 6) = 12
  SBOX[5][5888] = 0x202000; // 1700 (2, 7) = 3
  SBOX[5][6144] = 0x202008; // 1800 (2, 8) = 7
  SBOX[5][6400] = 0x0; // 1900 (2, 9) = 0
  SBOX[5][6656] = 0x8; // 1a00 (2, 10) = 4
  SBOX[5][6912] = 0x10200000; // 1b00 (2, 11) = 10
  SBOX[5][7168] = 0x2000; // 1c00 (2, 12) = 1
  SBOX[5][7424] = 0x10002008; // 1d00 (2, 13) = 13
  SBOX[5][7680] = 0x10202000; // 1e00 (2, 14) = 11
  SBOX[5][7936] = 0x200008; // 1f00 (2, 15) = 6
  SBOX[5][4224] = 0x8; // 1080 (3, 0) = 4
  SBOX[5][4480] = 0x202000; // 1180 (3, 1) = 3
  SBOX[5][4736] = 0x200000; // 1280 (3, 2) = 2
  SBOX[5][4992] = 0x10000008; // 1380 (3, 3) = 12
  SBOX[5][5248] = 0x10002000; // 1480 (3, 4) = 9
  SBOX[5][5504] = 0x2008; // 1580 (3, 5) = 5
  SBOX[5][5760] = 0x10202008; // 1680 (3, 6) = 15
  SBOX[5][6016] = 0x10200000; // 1780 (3, 7) = 10
  SBOX[5][6272] = 0x10202000; // 1880 (3, 8) = 11
  SBOX[5][6528] = 0x10200008; // 1980 (3, 9) = 14
  SBOX[5][6784] = 0x2000; // 1a80 (3, 10) = 1
  SBOX[5][7040] = 0x202008; // 1b80 (3, 11) = 7
  SBOX[5][7296] = 0x200008; // 1c80 (3, 12) = 6
  SBOX[5][7552] = 0x0; // 1d80 (3, 13) = 0
  SBOX[5][7808] = 0x10000000; // 1e80 (3, 14) = 8
  SBOX[5][8064] = 0x10002008; // 1f80 (3, 15) = 13

  SBOX[6] = new Array();
  SBOX[6][0] = 0x100000; // 0 (0, 0) = 4
  SBOX[6][16] = 0x2000401; // 10 (0, 1) = 11
  SBOX[6][32] = 0x400; // 20 (0, 2) = 2
  SBOX[6][48] = 0x100401; // 30 (0, 3) = 14
  SBOX[6][64] = 0x2100401; // 40 (0, 4) = 15
  SBOX[6][80] = 0x0; // 50 (0, 5) = 0
  SBOX[6][96] = 0x1; // 60 (0, 6) = 8
  SBOX[6][112] = 0x2100001; // 70 (0, 7) = 13
  SBOX[6][128] = 0x2000400; // 80 (0, 8) = 3
  SBOX[6][144] = 0x100001; // 90 (0, 9) = 12
  SBOX[6][160] = 0x2000001; // a0 (0, 10) = 9
  SBOX[6][176] = 0x2100400; // b0 (0, 11) = 7
  SBOX[6][192] = 0x2100000; // c0 (0, 12) = 5
  SBOX[6][208] = 0x401; // d0 (0, 13) = 10
  SBOX[6][224] = 0x100400; // e0 (0, 14) = 6
  SBOX[6][240] = 0x2000000; // f0 (0, 15) = 1
  SBOX[6][8] = 0x2100001; // 8 (1, 0) = 13
  SBOX[6][24] = 0x0; // 18 (1, 1) = 0
  SBOX[6][40] = 0x2000401; // 28 (1, 2) = 11
  SBOX[6][56] = 0x2100400; // 38 (1, 3) = 7
  SBOX[6][72] = 0x100000; // 48 (1, 4) = 4
  SBOX[6][88] = 0x2000001; // 58 (1, 5) = 9
  SBOX[6][104] = 0x2000000; // 68 (1, 6) = 1
  SBOX[6][120] = 0x401; // 78 (1, 7) = 10
  SBOX[6][136] = 0x100401; // 88 (1, 8) = 14
  SBOX[6][152] = 0x2000400; // 98 (1, 9) = 3
  SBOX[6][168] = 0x2100000; // a8 (1, 10) = 5
  SBOX[6][184] = 0x100001; // b8 (1, 11) = 12
  SBOX[6][200] = 0x400; // c8 (1, 12) = 2
  SBOX[6][216] = 0x2100401; // d8 (1, 13) = 15
  SBOX[6][232] = 0x1; // e8 (1, 14) = 8
  SBOX[6][248] = 0x100400; // f8 (1, 15) = 6
  SBOX[6][256] = 0x2000000; // 100 (2, 0) = 1
  SBOX[6][272] = 0x100000; // 110 (2, 1) = 4
  SBOX[6][288] = 0x2000401; // 120 (2, 2) = 11
  SBOX[6][304] = 0x2100001; // 130 (2, 3) = 13
  SBOX[6][320] = 0x100001; // 140 (2, 4) = 12
  SBOX[6][336] = 0x2000400; // 150 (2, 5) = 3
  SBOX[6][352] = 0x2100400; // 160 (2, 6) = 7
  SBOX[6][368] = 0x100401; // 170 (2, 7) = 14
  SBOX[6][384] = 0x401; // 180 (2, 8) = 10
  SBOX[6][400] = 0x2100401; // 190 (2, 9) = 15
  SBOX[6][416] = 0x100400; // 1a0 (2, 10) = 6
  SBOX[6][432] = 0x1; // 1b0 (2, 11) = 8
  SBOX[6][448] = 0x0; // 1c0 (2, 12) = 0
  SBOX[6][464] = 0x2100000; // 1d0 (2, 13) = 5
  SBOX[6][480] = 0x2000001; // 1e0 (2, 14) = 9
  SBOX[6][496] = 0x400; // 1f0 (2, 15) = 2
  SBOX[6][264] = 0x100400; // 108 (3, 0) = 6
  SBOX[6][280] = 0x2000401; // 118 (3, 1) = 11
  SBOX[6][296] = 0x2100001; // 128 (3, 2) = 13
  SBOX[6][312] = 0x1; // 138 (3, 3) = 8
  SBOX[6][328] = 0x2000000; // 148 (3, 4) = 1
  SBOX[6][344] = 0x100000; // 158 (3, 5) = 4
  SBOX[6][360] = 0x401; // 168 (3, 6) = 10
  SBOX[6][376] = 0x2100400; // 178 (3, 7) = 7
  SBOX[6][392] = 0x2000001; // 188 (3, 8) = 9
  SBOX[6][408] = 0x2100000; // 198 (3, 9) = 5
  SBOX[6][424] = 0x0; // 1a8 (3, 10) = 0
  SBOX[6][440] = 0x2100401; // 1b8 (3, 11) = 15
  SBOX[6][456] = 0x100401; // 1c8 (3, 12) = 14
  SBOX[6][472] = 0x400; // 1d8 (3, 13) = 2
  SBOX[6][488] = 0x2000400; // 1e8 (3, 14) = 3
  SBOX[6][504] = 0x100001; // 1f8 (3, 15) = 12

  SBOX[7] = new Array();
  SBOX[7][0] = 0x8000820; // 0 (0, 0) = 13
  SBOX[7][1] = 0x20000; // 1 (0, 1) = 2
  SBOX[7][2] = 0x8000000; // 2 (0, 2) = 8
  SBOX[7][3] = 0x20; // 3 (0, 3) = 4
  SBOX[7][4] = 0x20020; // 4 (0, 4) = 6
  SBOX[7][5] = 0x8020820; // 5 (0, 5) = 15
  SBOX[7][6] = 0x8020800; // 6 (0, 6) = 11
  SBOX[7][7] = 0x800; // 7 (0, 7) = 1
  SBOX[7][8] = 0x8020000; // 8 (0, 8) = 10
  SBOX[7][9] = 0x8000800; // 9 (0, 9) = 9
  SBOX[7][10] = 0x20800; // a (0, 10) = 3
  SBOX[7][11] = 0x8020020; // b (0, 11) = 14
  SBOX[7][12] = 0x820; // c (0, 12) = 5
  SBOX[7][13] = 0x0; // d (0, 13) = 0
  SBOX[7][14] = 0x8000020; // e (0, 14) = 12
  SBOX[7][15] = 0x20820; // f (0, 15) = 7
  SBOX[7][-2147483648] = 0x800; // 80000000 (1, 0) = 1
  SBOX[7][-2147483647] = 0x8020820; // 80000001 (1, 1) = 15
  SBOX[7][-2147483646] = 0x8000820; // 80000002 (1, 2) = 13
  SBOX[7][-2147483645] = 0x8000000; // 80000003 (1, 3) = 8
  SBOX[7][-2147483644] = 0x8020000; // 80000004 (1, 4) = 10
  SBOX[7][-2147483643] = 0x20800; // 80000005 (1, 5) = 3
  SBOX[7][-2147483642] = 0x20820; // 80000006 (1, 6) = 7
  SBOX[7][-2147483641] = 0x20; // 80000007 (1, 7) = 4
  SBOX[7][-2147483640] = 0x8000020; // 80000008 (1, 8) = 12
  SBOX[7][-2147483639] = 0x820; // 80000009 (1, 9) = 5
  SBOX[7][-2147483638] = 0x20020; // 8000000a (1, 10) = 6
  SBOX[7][-2147483637] = 0x8020800; // 8000000b (1, 11) = 11
  SBOX[7][-2147483636] = 0x0; // 8000000c (1, 12) = 0
  SBOX[7][-2147483635] = 0x8020020; // 8000000d (1, 13) = 14
  SBOX[7][-2147483634] = 0x8000800; // 8000000e (1, 14) = 9
  SBOX[7][-2147483633] = 0x20000; // 8000000f (1, 15) = 2
  SBOX[7][16] = 0x20820; // 10 (2, 0) = 7
  SBOX[7][17] = 0x8020800; // 11 (2, 1) = 11
  SBOX[7][18] = 0x20; // 12 (2, 2) = 4
  SBOX[7][19] = 0x800; // 13 (2, 3) = 1
  SBOX[7][20] = 0x8000800; // 14 (2, 4) = 9
  SBOX[7][21] = 0x8000020; // 15 (2, 5) = 12
  SBOX[7][22] = 0x8020020; // 16 (2, 6) = 14
  SBOX[7][23] = 0x20000; // 17 (2, 7) = 2
  SBOX[7][24] = 0x0; // 18 (2, 8) = 0
  SBOX[7][25] = 0x20020; // 19 (2, 9) = 6
  SBOX[7][26] = 0x8020000; // 1a (2, 10) = 10
  SBOX[7][27] = 0x8000820; // 1b (2, 11) = 13
  SBOX[7][28] = 0x8020820; // 1c (2, 12) = 15
  SBOX[7][29] = 0x20800; // 1d (2, 13) = 3
  SBOX[7][30] = 0x820; // 1e (2, 14) = 5
  SBOX[7][31] = 0x8000000; // 1f (2, 15) = 8
  SBOX[7][-2147483632] = 0x20000; // 80000010 (3, 0) = 2
  SBOX[7][-2147483631] = 0x800; // 80000011 (3, 1) = 1
  SBOX[7][-2147483630] = 0x8020020; // 80000012 (3, 2) = 14
  SBOX[7][-2147483629] = 0x20820; // 80000013 (3, 3) = 7
  SBOX[7][-2147483628] = 0x20; // 80000014 (3, 4) = 4
  SBOX[7][-2147483627] = 0x8020000; // 80000015 (3, 5) = 10
  SBOX[7][-2147483626] = 0x8000000; // 80000016 (3, 6) = 8
  SBOX[7][-2147483625] = 0x8000820; // 80000017 (3, 7) = 13
  SBOX[7][-2147483624] = 0x8020820; // 80000018 (3, 8) = 15
  SBOX[7][-2147483623] = 0x8000020; // 80000019 (3, 9) = 12
  SBOX[7][-2147483622] = 0x8000800; // 8000001a (3, 10) = 9
  SBOX[7][-2147483621] = 0x0; // 8000001b (3, 11) = 0
  SBOX[7][-2147483620] = 0x20800; // 8000001c (3, 12) = 3
  SBOX[7][-2147483619] = 0x820; // 8000001d (3, 13) = 5
  SBOX[7][-2147483618] = 0x20020; // 8000001e (3, 14) = 6
  SBOX[7][-2147483617] = 0x8020800; // 8000001f (3, 15) = 11

  State.prototype._exchangeLR = function (v, m) {
    var t = (this.lhs >> v ^ this.rhs) & m;
    this.rhs ^= t;
    this.lhs ^= t << v;
  };

  State.prototype._exchangeRL = function (v, m) {
    var t = (this.rhs >> v ^ this.lhs) & m;
    this.lhs ^= t;
    this.rhs ^= t << v;
  };

  /**
      * Perform the initial permutation of the input to create the starting state
      * of the algorithm. The initial permutation maps each consecutive bit of
      * the input into a different byte of the state.
      * 
      * <pre>
      * The initial permutation is defined to be:
      * 
      *      58    50   42    34    26   18    10    2  
      *      60    52   44    36    28   20    12    4
      *      62    54   46    38    30   22    14    6
      *      64    56   48    40    32   24    16    8
      *      57    49   41    33    25   17     9    1
      *      59    51   43    35    27   19    11    3
      *      61    53   45    37    29   21    13    5
      *      63    55   47    39    31   23    15    7
      * </pre>
      * 
      * 
      * @param message
      *            The message as an array of unsigned bytes.
      * @param offset
      *            The offset into the message that the current 64-bit block
      *            begins.
      * @returns the initial engine state
      */
  State.prototype.initialPerm = function (message, offset) {
    var input = message.slice(offset, offset + 8);

    this.lhs = (input[0] << 24) + (input[1] << 16) + (input[2] << 8) +
    input[3];
    this.rhs = (input[4] << 24) + (input[5] << 16) + (input[6] << 8) +
    input[7];

    this._exchangeLR(4, 0x0f0f0f0f);
    this._exchangeLR(16, 0x0000ffff);
    this._exchangeRL(2, 0x33333333);
    this._exchangeRL(8, 0x00ff00ff);
    this._exchangeLR(1, 0x55555555);
  };

  /**
      * Perform one round of the DES algorithm using the given key. A round is
      * defined as:
      * 
      * <pre>
      * L&amp;rsquo = R
      * R&amp;rsquo = L &circ; f(R, k)
      * </pre>
      * 
      * where f consists of expanding, XORing with the key and contracting back
      * with the SBOXes.
      * 
      * Note that the final round is defined slightly differently as:
      * 
      * <pre>
      * L&amp;rsquo = L &circ; f(R, k)
      * R&amp;rsquo = R
      * </pre>
      * 
      * Therefore in the final round this function produces LHS and RHS the wrong
      * way around.
      * 
      * @param k
      *            the key
      */
  State.prototype.round = function (k) {
    var r = this.rhs,l = this.lhs;
    var f = 0;
    for (var i = 0; i < 8; i++) {
      var v = (r ^ k[i]) & State.SBOX_MASK[i];
      f += State.SBOX[i][v];
    }

    this.lhs = r;
    this.rhs = l ^ f;
  };

  /**
      * Apply the inverse of the initial permutation.
      * 
      * <pre>
      * The inverse is defined to be:
      * 
      *      40     8   48    16    56   24    64   32
      *      39     7   47    15    55   23    63   31
      *      38     6   46    14    54   22    62   30
      *      37     5   45    13    53   21    61   29
      *      36     4   44    12    52   20    60   28
      *      35     3   43    11    51   19    59   27
      *      34     2   42    10    50   18    58   26
      *      33     1   41     9    49   17    57   25
      * </pre>
      * 
      * @param cipherText
      * @param offset
      */
  State.prototype.finalPerm = function (cipherText, offset) {
    var t = this.lhs;
    this.lhs = this.rhs;
    this.rhs = t;

    this._exchangeLR(1, 0x55555555);
    this._exchangeRL(8, 0x00ff00ff);
    this._exchangeRL(2, 0x33333333);
    this._exchangeLR(16, 0x0000ffff);
    this._exchangeLR(4, 0x0f0f0f0f);

    cipherText[offset] = this.lhs >> 24 & 0xff;
    cipherText[offset + 1] = this.lhs >> 16 & 0xff;
    cipherText[offset + 2] = this.lhs >> 8 & 0xff;
    cipherText[offset + 3] = this.lhs & 0xff;
    cipherText[offset + 4] = this.rhs >> 24 & 0xff;
    cipherText[offset + 5] = this.rhs >> 16 & 0xff;
    cipherText[offset + 6] = this.rhs >> 8 & 0xff;
    cipherText[offset + 7] = this.rhs & 0xff;
  };

  /**
      * DES cipher
      */
  var DES = C.DES = {
    _blocksize: 2,

    _keyschedule: null,

    _state: new State(),

    _init: function _init(k) {
      this._keyschedule = new KeySchedule(k);
    },

    encrypt: function encrypt(message, password, options) {

      options = options || {};

      // Determine mode
      var mode = options.mode || new C.mode.OFB();

      // Allow mode to override options
      if (mode.fixOptions)
      mode.fixOptions(options);

      var
      // Convert to bytes if message is a string
      m = message.constructor == String ? UTF8.stringToBytes(message) :
      message,

      // Generate random IV
      iv = options.iv || util.randomBytes(8),

      // Generate key
      k = password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 8, {
        asBytes: true }) :

      // else, assume byte array representing cryptographic key
      password;

      // Create key schedule
      this._keyschedule = new KeySchedule(k);

      // Encrypt
      mode.encrypt(DES, m, iv);

      // Return ciphertext
      m = options.iv ? m : iv.concat(m);
      return options && options.asBytes ? m : util.bytesToBase64(m);
    },

    _encryptblock: function _encryptblock(message, offset) {
      this._state.initialPerm(message, offset);
      for (var i = 0; i <= 15; i++) {
        this._state.round(this._keyschedule.getKey(i));
      }
      this._state.finalPerm(message, offset);
    },

    decrypt: function decrypt(ciphertext, password, options) {
      options = options || {};

      // Determine mode
      var mode = options.mode || new C.mode.OFB();

      // Allow mode to override options
      if (mode.fixOptions)
      mode.fixOptions(options);

      var

      // Convert to bytes if ciphertext is a string
      c = ciphertext.constructor == String ? util.
      base64ToBytes(ciphertext) : ciphertext,

      // Separate IV and message
      iv = options.iv || c.splice(0, 8),

      // Generate key
      k = password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true }) :

      // else, assume byte array representing cryptographic key
      password;

      // Create key schedule
      this._keyschedule = new KeySchedule(k);

      mode.decrypt(DES, c, iv);

      // Return plaintext
      return options && options.asBytes ? c : UTF8.bytesToString(c);
    },

    _decryptblock: function _decryptblock(message, offset) {
      this._state.initialPerm(message, offset);
      for (var i = 15; i >= 0; i--) {
        this._state.round(this._keyschedule.getKey(i));
      }
      this._state.finalPerm(message, offset);
    } };


})();

/***/ }),

/***/ 325:
/*!****************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/HMAC.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  C.HMAC = function (hasher, message, key, options) {

    // Convert to byte arrays
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    if (key.constructor == String) key = UTF8.stringToBytes(key);
    /* else, assume byte arrays already */

    // Allow arbitrary length keys
    if (key.length > hasher._blocksize * 4)
    key = hasher(key, { asBytes: true });

    // XOR keys with pad constants
    var okey = key.slice(0),
    ikey = key.slice(0);
    for (var i = 0; i < hasher._blocksize * 4; i++) {
      okey[i] ^= 0x5C;
      ikey[i] ^= 0x36;
    }

    var hmacbytes = hasher(okey.concat(hasher(ikey.concat(message), { asBytes: true })), { asBytes: true });

    return options && options.asBytes ? hmacbytes :
    options && options.asString ? Binary.bytesToString(hmacbytes) :
    util.bytesToHex(hmacbytes);

  };

})();

/***/ }),

/***/ 326:
/*!*****************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/MARC4.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  var MARC4 = C.MARC4 = {

    /**
                           * Public API
                           */

    encrypt: function encrypt(message, password) {

      var

      // Convert to bytes
      m = UTF8.stringToBytes(message),

      // Generate random IV
      iv = util.randomBytes(16),

      // Generate key
      k = password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, { asBytes: true }) :
      // else, assume byte array representing cryptographic key
      password;

      // Encrypt
      MARC4._marc4(m, k, 1536);

      // Return ciphertext
      return util.bytesToBase64(iv.concat(m));

    },

    decrypt: function decrypt(ciphertext, password) {

      var

      // Convert to bytes
      c = util.base64ToBytes(ciphertext),

      // Separate IV and message
      iv = c.splice(0, 16),

      // Generate key
      k = password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, { asBytes: true }) :
      // else, assume byte array representing cryptographic key
      password;

      // Decrypt
      MARC4._marc4(c, k, 1536);

      // Return plaintext
      return UTF8.bytesToString(c);

    },


    /**
        * Internal methods
        */

    // The core
    _marc4: function _marc4(m, k, drop) {

      // State variables
      var i, j, s, temp;

      // Key setup
      for (i = 0, s = []; i < 256; i++) {s[i] = i;}
      for (i = 0, j = 0; i < 256; i++) {

        j = (j + s[i] + k[i % k.length]) % 256;

        // Swap
        temp = s[i];
        s[i] = s[j];
        s[j] = temp;

      }

      // Clear counters
      i = j = 0;

      // Encryption
      for (var k = -drop; k < m.length; k++) {

        i = (i + 1) % 256;
        j = (j + s[i]) % 256;

        // Swap
        temp = s[i];
        s[i] = s[j];
        s[j] = temp;

        // Stop here if we're still dropping keystream
        if (k < 0) continue;

        // Encrypt
        m[k] ^= s[(s[i] + s[j]) % 256];

      }

    } };



})();

/***/ }),

/***/ 327:
/*!***************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/MD5.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  // Public API
  var MD5 = C.MD5 = function (message, options) {
    var digestbytes = util.wordsToBytes(MD5._md5(message));
    return options && options.asBytes ? digestbytes :
    options && options.asString ? Binary.bytesToString(digestbytes) :
    util.bytesToHex(digestbytes);
  };

  // The core
  MD5._md5 = function (message) {

    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
    l = message.length * 8,
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF |
      (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << l % 32;
    m[(l + 64 >>> 9 << 4) + 14] = l;

    // Method shortcuts
    var FF = MD5._ff,
    GG = MD5._gg,
    HH = MD5._hh,
    II = MD5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
      bb = b,
      cc = c,
      dd = d;

      a = FF(a, b, c, d, m[i + 0], 7, -680876936);
      d = FF(d, a, b, c, m[i + 1], 12, -389564586);
      c = FF(c, d, a, b, m[i + 2], 17, 606105819);
      b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i + 4], 7, -176418897);
      d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
      c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i + 7], 22, -45705983);
      a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
      d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i + 10], 17, -42063);
      b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
      a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
      d = FF(d, a, b, c, m[i + 13], 12, -40341101);
      c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
      b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

      a = GG(a, b, c, d, m[i + 1], 5, -165796510);
      d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
      c = GG(c, d, a, b, m[i + 11], 14, 643717713);
      b = GG(b, c, d, a, m[i + 0], 20, -373897302);
      a = GG(a, b, c, d, m[i + 5], 5, -701558691);
      d = GG(d, a, b, c, m[i + 10], 9, 38016083);
      c = GG(c, d, a, b, m[i + 15], 14, -660478335);
      b = GG(b, c, d, a, m[i + 4], 20, -405537848);
      a = GG(a, b, c, d, m[i + 9], 5, 568446438);
      d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
      c = GG(c, d, a, b, m[i + 3], 14, -187363961);
      b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
      a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
      d = GG(d, a, b, c, m[i + 2], 9, -51403784);
      c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
      b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

      a = HH(a, b, c, d, m[i + 5], 4, -378558);
      d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
      b = HH(b, c, d, a, m[i + 14], 23, -35309556);
      a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
      d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
      c = HH(c, d, a, b, m[i + 7], 16, -155497632);
      b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
      a = HH(a, b, c, d, m[i + 13], 4, 681279174);
      d = HH(d, a, b, c, m[i + 0], 11, -358537222);
      c = HH(c, d, a, b, m[i + 3], 16, -722521979);
      b = HH(b, c, d, a, m[i + 6], 23, 76029189);
      a = HH(a, b, c, d, m[i + 9], 4, -640364487);
      d = HH(d, a, b, c, m[i + 12], 11, -421815835);
      c = HH(c, d, a, b, m[i + 15], 16, 530742520);
      b = HH(b, c, d, a, m[i + 2], 23, -995338651);

      a = II(a, b, c, d, m[i + 0], 6, -198630844);
      d = II(d, a, b, c, m[i + 7], 10, 1126891415);
      c = II(c, d, a, b, m[i + 14], 15, -1416354905);
      b = II(b, c, d, a, m[i + 5], 21, -57434055);
      a = II(a, b, c, d, m[i + 12], 6, 1700485571);
      d = II(d, a, b, c, m[i + 3], 10, -1894986606);
      c = II(c, d, a, b, m[i + 10], 15, -1051523);
      b = II(b, c, d, a, m[i + 1], 21, -2054922799);
      a = II(a, b, c, d, m[i + 8], 6, 1873313359);
      d = II(d, a, b, c, m[i + 15], 10, -30611744);
      c = II(c, d, a, b, m[i + 6], 15, -1560198380);
      b = II(b, c, d, a, m[i + 13], 21, 1309151649);
      a = II(a, b, c, d, m[i + 4], 6, -145523070);
      d = II(d, a, b, c, m[i + 11], 10, -1120210379);
      c = II(c, d, a, b, m[i + 2], 15, 718787259);
      b = II(b, c, d, a, m[i + 9], 21, -343485551);

      a = a + aa >>> 0;
      b = b + bb >>> 0;
      c = c + cc >>> 0;
      d = d + dd >>> 0;

    }

    return util.endian([a, b, c, d]);

  };

  // Auxiliary functions
  MD5._ff = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  MD5._gg = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  MD5._hh = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  MD5._ii = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  // Package private blocksize
  MD5._blocksize = 16;

  MD5._digestsize = 16;

})();

/***/ }),

/***/ 328:
/*!******************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/PBKDF2.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  C.PBKDF2 = function (password, salt, keylen, options) {

    // Convert to byte arrays
    if (password.constructor == String) password = UTF8.stringToBytes(password);
    if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
    /* else, assume byte arrays already */

    // Defaults
    var hasher = options && options.hasher || C.SHA1,
    iterations = options && options.iterations || 1;

    // Pseudo-random function
    function PRF(password, salt) {
      return C.HMAC(hasher, salt, password, { asBytes: true });
    }

    // Generate key
    var derivedKeyBytes = [],
    blockindex = 1;
    while (derivedKeyBytes.length < keylen) {
      var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));
      for (var u = block, i = 1; i < iterations; i++) {
        u = PRF(password, u);
        for (var j = 0; j < block.length; j++) {block[j] ^= u[j];}
      }
      derivedKeyBytes = derivedKeyBytes.concat(block);
      blockindex++;
    }

    // Truncate excess bytes
    derivedKeyBytes.length = keylen;

    return options && options.asBytes ? derivedKeyBytes :
    options && options.asString ? Binary.bytesToString(derivedKeyBytes) :
    util.bytesToHex(derivedKeyBytes);

  };

})();

/***/ }),

/***/ 329:
/*!***********************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/PBKDF2Async.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  if (!C.nextTick) {
    // node.js has setTime out but prefer process.nextTick
    if (typeof process != 'undefined' && typeof process.nextTick !== 'undefined') {
      C.nextTick = process.nextTick;
    } else if (typeof setTimeout !== 'undefined') {
      C.nextTick = function (callback) {
        setTimeout(callback, 0);
      };
    }
  }

  C.PBKDF2Async = function (password, salt, keylen, callback, options) {

    // Convert to byte arrays
    if (password.constructor == String) password = UTF8.stringToBytes(password);
    if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
    /* else, assume byte arrays already */

    // Defaults
    var hasher = options && options.hasher || C.SHA1,
    iterations = options && options.iterations || 1;

    // Progress callback option
    var progressChangeHandler = options && options.onProgressChange;
    var totalIterations = Math.ceil(keylen / hasher._digestsize) * iterations;
    function fireProgressChange(currentIteration) {
      if (progressChangeHandler) {
        var iterationsSoFar = derivedKeyBytes.length / hasher._digestsize * iterations + currentIteration;
        setTimeout(function () {
          progressChangeHandler(Math.round(iterationsSoFar / totalIterations * 100));
        }, 0);
      }
    }

    // Pseudo-random function
    function PRF(password, salt) {
      return C.HMAC(hasher, salt, password, { asBytes: true });
    }

    var nextTick = C.nextTick;

    // Generate key
    var derivedKeyBytes = [],
    blockindex = 1;

    var _outer, _inner;
    nextTick(_outer = function outer() {
      if (derivedKeyBytes.length < keylen) {
        var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));
        fireProgressChange(1);

        var u = block,i = 1;
        nextTick(_inner = function inner() {
          if (i < iterations) {
            u = PRF(password, u);
            for (var j = 0; j < block.length; j++) {block[j] ^= u[j];}
            i++;
            fireProgressChange(i);

            nextTick(_inner);
          } else {
            derivedKeyBytes = derivedKeyBytes.concat(block);
            blockindex++;
            nextTick(_outer);
          }
        });
      } else {
        // Truncate excess bytes
        derivedKeyBytes.length = keylen;
        callback(
        options && options.asBytes ? derivedKeyBytes :
        options && options.asString ? Binary.bytesToString(derivedKeyBytes) :
        util.bytesToHex(derivedKeyBytes));
      }
    });
  };

})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 330)))

/***/ }),

/***/ 33:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/test.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty };exports.default = _default;

/***/ }),

/***/ 330:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 331);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 331:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 330)))

/***/ }),

/***/ 332:
/*!******************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/Rabbit.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  // Inner state
  var x = [],
  c = [],
  b;

  var Rabbit = C.Rabbit = {

    /**
                             * Public API
                             */

    encrypt: function encrypt(message, password) {

      var

      // Convert to bytes
      m = UTF8.stringToBytes(message),

      // Generate random IV
      iv = util.randomBytes(8),

      // Generate key
      k = password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, { asBytes: true }) :
      // else, assume byte array representing cryptographic key
      password;

      // Encrypt
      Rabbit._rabbit(m, k, util.bytesToWords(iv));

      // Return ciphertext
      return util.bytesToBase64(iv.concat(m));

    },

    decrypt: function decrypt(ciphertext, password) {

      var

      // Convert to bytes
      c = util.base64ToBytes(ciphertext),

      // Separate IV and message
      iv = c.splice(0, 8),

      // Generate key
      k = password.constructor == String ?
      // Derive key from passphrase
      C.PBKDF2(password, iv, 32, { asBytes: true }) :
      // else, assume byte array representing cryptographic key
      password;

      // Decrypt
      Rabbit._rabbit(c, k, util.bytesToWords(iv));

      // Return plaintext
      return UTF8.bytesToString(c);

    },


    /**
        * Internal methods
        */

    // Encryption/decryption scheme
    _rabbit: function _rabbit(m, k, iv) {

      Rabbit._keysetup(k);
      if (iv) Rabbit._ivsetup(iv);

      for (var s = [], i = 0; i < m.length; i++) {

        if (i % 16 == 0) {

          // Iterate the system
          Rabbit._nextstate();

          // Generate 16 bytes of pseudo-random data
          s[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16;
          s[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16;
          s[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16;
          s[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16;

          // Swap endian
          for (var j = 0; j < 4; j++) {
            s[j] = (s[j] << 8 | s[j] >>> 24) & 0x00FF00FF |
            (s[j] << 24 | s[j] >>> 8) & 0xFF00FF00;
          }

          // Convert words to bytes
          for (var b = 120; b >= 0; b -= 8) {
            s[b / 8] = s[b >>> 5] >>> 24 - b % 32 & 0xFF;}

        }

        m[i] ^= s[i % 16];

      }

    },

    // Key setup scheme
    _keysetup: function _keysetup(k) {

      // Generate initial state values
      x[0] = k[0];
      x[2] = k[1];
      x[4] = k[2];
      x[6] = k[3];
      x[1] = k[3] << 16 | k[2] >>> 16;
      x[3] = k[0] << 16 | k[3] >>> 16;
      x[5] = k[1] << 16 | k[0] >>> 16;
      x[7] = k[2] << 16 | k[1] >>> 16;

      // Generate initial counter values
      c[0] = util.rotl(k[2], 16);
      c[2] = util.rotl(k[3], 16);
      c[4] = util.rotl(k[0], 16);
      c[6] = util.rotl(k[1], 16);
      c[1] = k[0] & 0xFFFF0000 | k[1] & 0xFFFF;
      c[3] = k[1] & 0xFFFF0000 | k[2] & 0xFFFF;
      c[5] = k[2] & 0xFFFF0000 | k[3] & 0xFFFF;
      c[7] = k[3] & 0xFFFF0000 | k[0] & 0xFFFF;

      // Clear carry bit
      b = 0;

      // Iterate the system four times
      for (var i = 0; i < 4; i++) {Rabbit._nextstate();}

      // Modify the counters
      for (var i = 0; i < 8; i++) {c[i] ^= x[i + 4 & 7];}

    },

    // IV setup scheme
    _ivsetup: function _ivsetup(iv) {

      // Generate four subvectors
      var i0 = util.endian(iv[0]),
      i2 = util.endian(iv[1]),
      i1 = i0 >>> 16 | i2 & 0xFFFF0000,
      i3 = i2 << 16 | i0 & 0x0000FFFF;

      // Modify counter values
      c[0] ^= i0;
      c[1] ^= i1;
      c[2] ^= i2;
      c[3] ^= i3;
      c[4] ^= i0;
      c[5] ^= i1;
      c[6] ^= i2;
      c[7] ^= i3;

      // Iterate the system four times
      for (var i = 0; i < 4; i++) {Rabbit._nextstate();}

    },

    // Next-state function
    _nextstate: function _nextstate() {

      // Save old counter values
      for (var c_old = [], i = 0; i < 8; i++) {c_old[i] = c[i];}

      // Calculate new counter values
      c[0] = c[0] + 0x4D34D34D + b >>> 0;
      c[1] = c[1] + 0xD34D34D3 + (c[0] >>> 0 < c_old[0] >>> 0 ? 1 : 0) >>> 0;
      c[2] = c[2] + 0x34D34D34 + (c[1] >>> 0 < c_old[1] >>> 0 ? 1 : 0) >>> 0;
      c[3] = c[3] + 0x4D34D34D + (c[2] >>> 0 < c_old[2] >>> 0 ? 1 : 0) >>> 0;
      c[4] = c[4] + 0xD34D34D3 + (c[3] >>> 0 < c_old[3] >>> 0 ? 1 : 0) >>> 0;
      c[5] = c[5] + 0x34D34D34 + (c[4] >>> 0 < c_old[4] >>> 0 ? 1 : 0) >>> 0;
      c[6] = c[6] + 0x4D34D34D + (c[5] >>> 0 < c_old[5] >>> 0 ? 1 : 0) >>> 0;
      c[7] = c[7] + 0xD34D34D3 + (c[6] >>> 0 < c_old[6] >>> 0 ? 1 : 0) >>> 0;
      b = c[7] >>> 0 < c_old[7] >>> 0 ? 1 : 0;

      // Calculate the g-values
      for (var g = [], i = 0; i < 8; i++) {

        var gx = x[i] + c[i] >>> 0;

        // Construct high and low argument for squaring
        var ga = gx & 0xFFFF,
        gb = gx >>> 16;

        // Calculate high and low result of squaring
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb,
        gl = ((gx & 0xFFFF0000) * gx >>> 0) + ((gx & 0x0000FFFF) * gx >>> 0) >>> 0;

        // High XOR low
        g[i] = gh ^ gl;

      }

      // Calculate new state values
      x[0] = g[0] + (g[7] << 16 | g[7] >>> 16) + (g[6] << 16 | g[6] >>> 16);
      x[1] = g[1] + (g[0] << 8 | g[0] >>> 24) + g[7];
      x[2] = g[2] + (g[1] << 16 | g[1] >>> 16) + (g[0] << 16 | g[0] >>> 16);
      x[3] = g[3] + (g[2] << 8 | g[2] >>> 24) + g[1];
      x[4] = g[4] + (g[3] << 16 | g[3] >>> 16) + (g[2] << 16 | g[2] >>> 16);
      x[5] = g[5] + (g[4] << 8 | g[4] >>> 24) + g[3];
      x[6] = g[6] + (g[5] << 16 | g[5] >>> 16) + (g[4] << 16 | g[4] >>> 16);
      x[7] = g[7] + (g[6] << 8 | g[6] >>> 24) + g[5];

    } };



})();

/***/ }),

/***/ 333:
/*!****************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/SHA1.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  // Public API
  var SHA1 = C.SHA1 = function (message, options) {
    var digestbytes = util.wordsToBytes(SHA1._sha1(message));
    return options && options.asBytes ? digestbytes :
    options && options.asString ? Binary.bytesToString(digestbytes) :
    util.bytesToHex(digestbytes);
  };

  // The core
  SHA1._sha1 = function (message) {

    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
    l = message.length * 8,
    w = [],
    H0 = 1732584193,
    H1 = -271733879,
    H2 = -1732584194,
    H3 = 271733878,
    H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >>> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {

      var a = H0,
      b = H1,
      c = H2,
      d = H3,
      e = H4;

      for (var j = 0; j < 80; j++) {

        if (j < 16) w[j] = m[i + j];else
        {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = n << 1 | n >>> 31;
        }

        var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (
        j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
        j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
        j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
        (H1 ^ H2 ^ H3) - 899497514);

        H4 = H3;
        H3 = H2;
        H2 = H1 << 30 | H1 >>> 2;
        H1 = H0;
        H0 = t;

      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;

    }

    return [H0, H1, H2, H3, H4];

  };

  // Package private blocksize
  SHA1._blocksize = 16;

  SHA1._digestsize = 20;

})();

/***/ }),

/***/ 334:
/*!******************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/crypto/lib/SHA256.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 319).Crypto : window.Crypto;

  // Shortcuts
  var util = C.util,
  charenc = C.charenc,
  UTF8 = charenc.UTF8,
  Binary = charenc.Binary;

  // Constants
  var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

  // Public API
  var SHA256 = C.SHA256 = function (message, options) {
    var digestbytes = util.wordsToBytes(SHA256._sha256(message));
    return options && options.asBytes ? digestbytes :
    options && options.asString ? Binary.bytesToString(digestbytes) :
    util.bytesToHex(digestbytes);
  };

  // The core
  SHA256._sha256 = function (message) {

    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
    l = message.length * 8,
    H = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
    0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19],
    w = [],
    a,b,c,d,e,f,g,h,i,j,
    t1,t2;

    // Padding
    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {

      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];
      f = H[5];
      g = H[6];
      h = H[7];

      for (var j = 0; j < 64; j++) {

        if (j < 16) w[j] = m[j + i];else
        {

          var gamma0x = w[j - 15],
          gamma1x = w[j - 2],
          gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (
          gamma0x << 14 | gamma0x >>> 18) ^
          gamma0x >>> 3,
          gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (
          gamma1x << 13 | gamma1x >>> 19) ^
          gamma1x >>> 10;

          w[j] = gamma0 + (w[j - 7] >>> 0) +
          gamma1 + (w[j - 16] >>> 0);

        }

        var ch = e & f ^ ~e & g,
        maj = a & b ^ a & c ^ b & c,
        sigma0 = (a << 30 | a >>> 2) ^ (
        a << 19 | a >>> 13) ^ (
        a << 10 | a >>> 22),
        sigma1 = (e << 26 | e >>> 6) ^ (
        e << 21 | e >>> 11) ^ (
        e << 7 | e >>> 25);


        t1 = (h >>> 0) + sigma1 + ch + K[j] + (w[j] >>> 0);
        t2 = sigma0 + maj;

        h = g;
        g = f;
        f = e;
        e = d + t1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 >>> 0;

      }

      H[0] += a;
      H[1] += b;
      H[2] += c;
      H[3] += d;
      H[4] += e;
      H[5] += f;
      H[6] += g;
      H[7] += h;

    }

    return H;

  };

  // Package private blocksize
  SHA256._blocksize = 16;

  SHA256._digestsize = 32;

})();

/***/ }),

/***/ 34:
/*!*******************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/random.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 35:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/trim.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 36:
/*!******************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/function/toast.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/config/config.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-05-26
var version = '1.2.9';var _default =

{
  v: version,
  version: version };exports.default = _default;

/***/ }),

/***/ 38:
/*!*****************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!********************************************!*\
  !*** E:/UNIAPP/yingbang_applet/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 447:
/*!**********************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/node_modules/uview-ui/components/u-empty/icon.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  car: {
    image: 'data:image/png;base64,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',
    text: '购物车为空' },

  page: {
    image: 'data:image/png;base64,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',
    text: '页面不存在' },

  search: {
    image: 'data:image/png;base64,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',
    text: '没有搜索结果' },

  address: {
    image: 'data:image/png;base64,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',
    text: '没有收货地址' },

  wifi: {
    image: 'data:image/png;base64,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',
    text: '没有WiFi' },

  order: {
    image: 'data:image/png;base64,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',
    text: '订单为空' },

  coupon: {
    image: 'data:image/png;base64,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',
    text: '没有优惠券' },

  favor: {
    image: 'data:image/png;base64,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',
    text: '暂无收藏' },

  permission: {
    image: 'data:image/png;base64,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',
    text: '无权限' },

  history: {
    image: 'data:image/png;base64,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',
    text: '无历史记录' },

  news: {
    image: 'data:image/png;base64,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',
    text: '无新闻列表' },

  message: {
    image: 'data:image/png;base64,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',
    text: '消息列表为空' },

  list: {
    image: 'data:image/png;base64,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',
    text: '列表为空' },

  data: {
    image: 'data:image/png;base64,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',
    text: '数据为空' } };exports.default = _default;

/***/ }),

/***/ 469:
/*!*************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/mescroll-uni/mescroll-uni.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll-uni
                                                                                                        * version 1.1.5
                                                                                                        * 2019-07-25 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options) {
  var me = this;
  me.version = '1.1.5'; // mescroll版本号
  me.options = options || {}; // 配置

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 40, // 下拉节流 (值越大每秒刷新频率越高)
    supply: 200, // 补帧动画的过渡时长 (只对android小程序生效,用于解决android小程序下拉卡顿的问题)
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms
      btnClick: null, // 点击按钮的回调
      onShow: null // 是否显示的回调
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null // 是否显示的回调
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  me.extendDownScroll(me.optDown);

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {// 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    me.moveTimeDiff = 1000 / me.optDown.fps;
  }

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)) {
    // 可下拉的条件
    if (me.optDown.use && !me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的角度是否在配置的范围内
      var x = Math.abs(me.lastPoint.x - curPoint.x);
      var y = Math.abs(me.lastPoint.y - curPoint.y);
      var z = Math.sqrt(x * x + y * y);
      if (z !== 0) {
        var angle = Math.asin(y / z) / Math.PI * 180; // 两点之间的角度,区间 [0,90]
        if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新
      }

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }

      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (this.getScrollTop() === this.startTop) {// 到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑 && 检查并触发上拉
    isScrollUp && this.triggerUpScroll(true);
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.downHight = this.optDown.offset; // 更新下拉区域高度
  this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || {
    use: false };

  me.extendUpScroll(me.optUp);

  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && (不在下拉中 || 支持同时上下拉)
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function () {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
MeScroll.prototype.setBounce = function (isBounce) {


































































};

/***/ }),

/***/ 470:
/*!********************************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/mescroll-uni/mescroll-uni-option.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll 全局配置
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    supply: 200, // 补帧动画的过渡时长 (只对android小程序生效,用于解决android小程序下拉卡顿的问题)
    offset: 80 // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    offset: 80, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300 // 回到顶部的动画时长,默认300ms
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '~ 暂无相关数据 ~' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 506:
/*!*************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/Modal/js/rate.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var rateList = [
{ id: '1', name: '基准利率', value: 1 },
{ id: '2', name: '7折基准率', value: 0.7 },
{ id: '3', name: '8折基准率', value: 0.8 },
{ id: '4', name: '8.3折基准率', value: 0.83 },
{ id: '5', name: '8.5折基准率', value: 0.85 },
{ id: '6', name: '8.8折基准率', value: 0.88 },
{ id: '7', name: '9折基准率', value: 0.9 },
{ id: '8', name: '9.5折基准率', value: 0.95 },
{ id: '9', name: '1.05折基准率', value: 1.05 },
{ id: '10', name: '1.1折基准率', value: 1.1 },
{ id: '11', name: '1.2折基准率', value: 1.2 },
{ id: '12', name: '1.3折基准率', value: 1.3 },
{ id: '13', name: '1.4折基准率', value: 1.4 }];var _default =


{
  rateList: rateList };exports.default = _default;

/***/ }),

/***/ 528:
/*!*****************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/jyf-Parser/Parser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//Parser.js
var Tokenizer = __webpack_require__(/*! ./Tokenizer.js */ 529);
var DomHandler = __webpack_require__(/*! ./DomHandler.js */ 530);
var trustAttrs = {
  align: true,
  alt: true,




  author: true,
  autoplay: true,
  class: true,
  color: true,
  colspan: true,
  controls: true,
  "data-src": true,
  dir: true,
  face: true,
  height: true,
  href: true,
  id: true,
  ignore: true,
  loop: true,
  muted: true,
  name: true,
  poster: true,
  rowspan: true,
  size: true,
  span: true,
  src: true,
  start: true,
  style: true,
  type: true,

  "unit-id": true,

  width: true };








































































var voidTag = {
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  circle: true,
  command: true,
  ellipse: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  source: true,
  stop: true,
  track: true,
  use: true,
  wbr: true };


function Parser(cbs, callback) {
  this._cbs = cbs;
  this._callback = callback;
  this._tagname = "";
  this._attribname = "";
  this._attribvalue = "";
  this._attribs = null;
  this._stack = [];
  this._tokenizer = new Tokenizer(this);
}
Parser.prototype.ontext = function (data) {
  this._cbs.ontext(data);
};
Parser.prototype.onopentagname = function (name) {
  name = name.toLowerCase();
  this._tagname = name;
  this._attribs = {
    style: '' };

  if (!voidTag[name]) this._stack.push(name);
};
Parser.prototype.onopentagend = function () {
  if (this._attribs) {
    this._cbs.onopentag(this._tagname, this._attribs);
    this._attribs = null;
  }
  if (voidTag[this._tagname]) this._cbs.onclosetag(this._tagname);
  this._tagname = "";
};
Parser.prototype.onclosetag = function (name) {
  name = name.toLowerCase();
  if (this._stack.length && !voidTag[name]) {
    var pos = this._stack.lastIndexOf(name);
    if (pos !== -1) {
      pos = this._stack.length - pos;
      while (pos--) {this._cbs.onclosetag(this._stack.pop());}
    } else if (name === "p") {
      this.onopentagname(name);
      this._closeCurrentTag();
    }
  } else if (name === "br" || name === "hr" || name === "p") {
    this.onopentagname(name);
    this._closeCurrentTag();
  }
};
Parser.prototype._closeCurrentTag = function () {
  var name = this._tagname;
  this.onopentagend();
  if (this._stack[this._stack.length - 1] === name) {
    this._cbs.onclosetag(name);
    this._stack.pop();
  }
};
Parser.prototype.onattribend = function () {
  this._attribvalue = this._attribvalue.replace(/&quot;/g, '"');
  if (this._attribs && trustAttrs[this._attribname]) {
    this._attribs[this._attribname] = this._attribvalue;
  }
  this._attribname = "";
  this._attribvalue = "";
};
Parser.prototype.onend = function () {
  for (
  var i = this._stack.length; i > 0; this._cbs.onclosetag(this._stack[--i])) {
    ;}
  this._callback({
    'nodes': this._cbs.nodes,
    'title': this._cbs.title,
    'imgList': this._cbs.imgList });

};
Parser.prototype.write = function (chunk) {
  this._tokenizer.parse(chunk);
};

function html2nodes(data, tagStyle, imgMode) {
  return new Promise(function (resolve, reject) {
    try {
      var style = '';
      data = data.replace(/<style.*?>([\s\S]*?)<\/style>/gi, function () {
        style += arguments[1];
        return '';
      });
      var handler = new DomHandler(style, tagStyle, imgMode);
      new Parser(handler, function (res) {



        return resolve(res);
      }).write(data);
    } catch (err) {
      return reject(err);
    }
  });
}
module.exports = html2nodes;

/***/ }),

/***/ 529:
/*!********************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/jyf-Parser/Tokenizer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Tokenizer.js
function Tokenizer(cbs) {
  this._state = "TEXT";
  this._buffer = "";
  this._sectionStart = 0;
  this._index = 0;
  this._cbs = cbs;
}
Tokenizer.prototype.TEXT = function (c) {
  var index = this._buffer.indexOf("<", this._index);
  if (index != -1) {
    this._index = index;
    this._cbs.ontext(this._getSection());
    this._state = "BeforeTag";
    this._sectionStart = this._index;
  } else this._index = this._buffer.length;
};
Tokenizer.prototype.BeforeTag = function (c) {
  switch (c) {
    case "/":
      this._state = "BeforeCloseTag";
      break;
    case "!":
      this._state = "BeforeDeclaration";
      break;
    case "?":
      var index = this._buffer.indexOf(">", this._index);
      if (index != -1) {
        this._index = index;
        this._sectionStart = this._index + 1;
      } else this._sectionStart = this._index = this._buffer.length;
      this._state = "TEXT";
      break;
    case ">":
      this._state = "TEXT";
      break;
    case "<":
      this._cbs.ontext(this._getSection());
      this._sectionStart = this._index;
      break;
    default:
      if (/\s/.test(c)) this._state = "TEXT";else
      {
        this._state = "InTag";
        this._sectionStart = this._index;
      }}

};
Tokenizer.prototype.InTag = function (c) {
  if (c === "/" || c === ">" || /\s/.test(c)) {
    this._cbs.onopentagname(this._getSection());
    this._state = "BeforeAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.BeforeAttrsName = function (c) {
  if (c === ">") {
    this._cbs.onopentagend();
    this._state = "TEXT";
    this._sectionStart = this._index + 1;
  } else if (c === "/") {
    this._state = "InSelfCloseTag";
  } else if (!/\s/.test(c)) {
    this._state = "InAttrsName";
    this._sectionStart = this._index;
  }
};
Tokenizer.prototype.InAttrsName = function (c) {
  if (c === "=" || c === "/" || c === ">" || /\s/.test(c)) {
    this._cbs._attribname = this._getSection().toLowerCase();
    this._sectionStart = -1;
    this._state = "AfterAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.AfterAttrsName = function (c) {
  if (c === "=") {
    this._state = "BeforeAttrsValue";
  } else if (c === "/" || c === ">") {
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
    this._index--;
  } else if (!/\s/.test(c)) {
    this._cbs.onattribend();
    this._state = "InAttrsName";
    this._sectionStart = this._index;
  }
};
Tokenizer.prototype.BeforeAttrsValue = function (c) {
  if (c === '"') {
    this._state = "InAttrsValueDQ";
    this._sectionStart = this._index + 1;
  } else if (c === "'") {
    this._state = "InAttrsValueSQ";
    this._sectionStart = this._index + 1;
  } else if (!/\s/.test(c)) {
    this._state = "InAttrsValueNQ";
    this._sectionStart = this._index;
    this._index--;
  }
};
Tokenizer.prototype.InAttrsValueDQ = function (c) {
  if (c === '"') {
    this._cbs._attribvalue += this._getSection();
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
  }
};
Tokenizer.prototype.InAttrsValueSQ = function (c) {
  if (c === "'") {
    this._cbs._attribvalue += this._getSection();
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
  }
};
Tokenizer.prototype.InAttrsValueNQ = function (c) {
  if (/\s/.test(c) || c === ">") {
    this._cbs._attribvalue += this._getSection();
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.BeforeCloseTag = function (c) {
  if (/\s/.test(c)) ;else
  if (c === ">") {
    this._state = "TEXT";
  } else {
    this._state = "InCloseTag";
    this._sectionStart = this._index;
  }
};
Tokenizer.prototype.InCloseTag = function (c) {
  if (c === ">" || /\s/.test(c)) {
    this._cbs.onclosetag(this._getSection());
    this._state = "AfterCloseTag";
    this._index--;
  }
};
Tokenizer.prototype.InSelfCloseTag = function (c) {
  if (c === ">") {
    this._cbs.onopentagend();
    this._state = "TEXT";
    this._sectionStart = this._index + 1;
  } else if (!/\s/.test(c)) {
    this._state = "BeforeAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.AfterCloseTag = function (c) {
  if (c === ">") {
    this._state = "TEXT";
    this._sectionStart = this._index + 1;
  }
};
Tokenizer.prototype.BeforeDeclaration = function (c) {
  if (c == '-') this._state = "InComment";else
  if (c == '[') this._state = "BeforeCDATA1";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.InDeclaration = function (c) {
  var index = this._buffer.indexOf(">", this._index);
  if (index != -1) {
    this._index = index;
    this._sectionStart = index + 1;
  } else this._sectionStart = this._index = this._buffer.length;
  this._state = "TEXT";
};
Tokenizer.prototype.InComment = function (c) {
  var key = c == '-' ? '-->' : '>';
  var index = this._buffer.indexOf(key, this._index);
  if (index != -1) {
    this._index = index + key.length - 1;
    this._sectionStart = this._index + 1;
  } else this._sectionStart = this._index = this._buffer.length;
  this._state = "TEXT";
};
Tokenizer.prototype.BeforeCDATA1 = function (c) {
  if (c == 'C') this._state = "BeforeCDATA2";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA2 = function (c) {
  if (c == 'D') this._state = "BeforeCDATA3";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA3 = function (c) {
  if (c == 'A') this._state = "BeforeCDATA4";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA4 = function (c) {
  if (c == 'T') this._state = "BeforeCDATA5";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA5 = function (c) {
  if (c == 'A') this._state = "InCDATA";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.InCDATA = function (c) {
  var key = c == '[' ? ']]>' : '>';
  var index = this._buffer.indexOf(key, this._index);
  if (index != -1) {
    this._index = index + key.length - 1;
    this._sectionStart = this._index + 1;
  } else this._sectionStart = this._index = this._buffer.length;
  this._state = "TEXT";
};
Tokenizer.prototype.parse = function (chunk) {
  this._buffer += chunk;
  for (; this._index < this._buffer.length; this._index++) {
    this[this._state](this._buffer[this._index]);}
  if (this._state === "TEXT" && this._sectionStart !== this._index)
  this._cbs.ontext(this._buffer.substr(this._sectionStart));
  this._cbs.onend();
};
Tokenizer.prototype._getSection = function () {
  return this._buffer.substring(this._sectionStart, this._index);
};
module.exports = Tokenizer;

/***/ }),

/***/ 530:
/*!*********************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/jyf-Parser/DomHandler.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _createForOfIteratorHelper(o) {if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var it,normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} //DomHandler.js
var emoji; // 使用emoji补丁包时将此句改为 const emoji = require('./emoji.js');
var CssHandler = __webpack_require__(/*! ./CssHandler.js */ 531);

var CanIUse = __webpack_require__(/*! ./api.js */ 532).versionHigherThan('2.7.1');

var trustTag = {
  a: 0,
  abbr: 1,
  ad: 0,
  audio: 0,
  b: 1,
  blockquote: 1,
  br: 0,
  code: 1,
  col: 0,
  colgroup: 0,
  dd: 1,
  del: 1,
  dl: 1,
  dt: 1,
  div: 1,
  em: 1,
  fieldset: 0,
  font: 1,
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  hr: 0,
  i: 1,
  img: 1,
  ins: 1,
  label: 1,
  legend: 0,
  li: 0,
  ol: 0,
  p: 1,
  q: 1,
  source: 0,
  span: 1,
  strong: 1,
  sub: 0,
  sup: 0,
  table: 0,
  tbody: 0,
  td: 0,
  tfoot: 0,
  th: 0,
  thead: 0,
  tr: 0,
  u: 1,
  ul: 0,
  video: 1 };

var blockTag = {
  address: true,
  article: true,
  aside: true,
  body: true,
  center: true,
  cite: true,
  footer: true,
  header: true,
  html: true,
  nav: true,
  pre: true,
  section: true };

var ignoreTag = {
  area: true,
  base: true,
  basefont: true,
  canvas: true,
  circle: true,
  command: true,
  ellipse: true,
  embed: true,
  frame: true,
  head: true,
  iframe: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  map: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  script: true,
  stop: true,
  textarea: true,
  title: true,
  track: true,
  use: true,
  wbr: true };


if (CanIUse) {
  trustTag.bdi = 0;
  trustTag.bdo = 0;
  trustTag.caption = 0;
  trustTag.rt = 0;
  trustTag.ruby = 0;
  ignoreTag.rp = true;
  trustTag.big = 1;
  trustTag.small = 1;
  trustTag.pre = 0;
  delete blockTag.pre;
} else blockTag.caption = true;


function randomId() {
  var res = "";
  for (var i = 0; i < 5; i++) {
    var rand = parseInt(Math.random() * 52);
    if (rand < 26)
    res = res + String.fromCharCode(65 + rand);else

    res = res + String.fromCharCode(71 + rand);
  }
  return res;
}

function DomHandler(style) {var tagStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var imgMode = arguments.length > 2 ? arguments[2] : undefined;
  this.imgList = [];
  this.imgIndex = 0;
  this.nodes = [];
  this.title = "";
  this._CssHandler = new CssHandler(style, tagStyle);
  this._tagStack = [];
  this._videoNum = 0;



  this._whiteSpace = false;
}
DomHandler.prototype._addDomElement = function (element) {
  if (element.name == 'pre' || element.attrs && /white-space\s*:\s*pre/.test(element.attrs.style)) {
    this._whiteSpace = true;
    element.pre = true;
  }
  var parent = this._tagStack[this._tagStack.length - 1];
  var siblings = parent ? parent.children : this.nodes;
  siblings.push(element);
};
DomHandler.prototype._bubbling = function () {
  for (var i = this._tagStack.length - 1; i >= 0; i--) {
    if (trustTag[this._tagStack[i].name])
    this._tagStack[i].continue = true;else

    return this._tagStack[i].name;
  }
};
DomHandler.prototype.onopentag = function (name, attrs) {
  var element = {
    children: [] };

  var matched = this._CssHandler.match(name, attrs, element);
  //处理属性
  switch (name) {
    case 'div':
    case 'p':
      if (attrs.align) {
        attrs.style += ';text-align:' + attrs.align;
        delete attrs.align;
      }
      break;
    case 'img':
      if (attrs.width) {
        attrs.style = 'width:' + attrs.width + (/[0-9]/.test(attrs.width[attrs.width.length - 1]) ? 'px' : '') + ';' +
        attrs.style;
        delete attrs.width;
      }
      if (attrs['data-src']) {
        attrs.src = attrs.src || attrs['data-src'];
        delete attrs['data-src'];
      }



      if (!attrs.hasOwnProperty('ignore') && attrs.src) {
        if (this._bubbling() == 'a') {
          attrs.ignore = "true"; // 图片在链接中不可预览
          break;
        }
        var url = attrs.src;

        // 去重，至多重试10次
        for (var i = 0; this.imgList.indexOf(url) != -1 && i < 10; i++) {
          // 网络链接
          if (/^http/.test(url)) {
            url = url.replace(/^(https*):\/\/([\S]+?)\//, function () {
              var domain = "";var _iterator = _createForOfIteratorHelper(
              arguments[2]),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var c = _step.value;
                  if (/[a-zA-Z]/.test(c))
                  domain += Math.random() >= 0.5 ? c.toUpperCase() : c;else
                  domain += c;
                }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
              return arguments[1] + '://' + domain + '/';
            });
          }
          // base64
          else if (/base64/.test(url)) {
              url = url.replace(/^data:(image\/\S+);base64,/, function () {
                var head = "";var _iterator2 = _createForOfIteratorHelper(
                arguments[1]),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var c = _step2.value;
                    if (/[a-zA-Z]/.test(c))
                    head += Math.random() >= 0.5 ? c.toUpperCase() : c;else
                    head += c;
                  }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
                return 'data:' + head + ';base64,';
              });
            } else break;
        }

        element.current = this.imgList.length;
        this.imgList.push(url);
      } else
      attrs.ignore = "true";
      break;
    case 'font':
      name = 'span';
      if (attrs.color) {
        attrs.style += ';color:' + attrs.color;
        delete attrs.color;
      }
      if (attrs.face) {
        attrs.style += ";font-family:" + attrs.face;
        delete attrs.face;
      }
      if (attrs.size) {
        var size = parseInt(attrs.size);
        if (size < 1) size = 1;else
        if (size > 7) size = 7;
        var map = [10, 13, 16, 18, 24, 32, 48];
        attrs.style += ";font-size:" + map[size - 1] + "px";
        delete attrs.size;
      }
      break;
    case 'a':
    case 'ad':
      this._bubbling();
      break;
    case 'video':
    case 'audio':
      attrs.loop = attrs.hasOwnProperty('loop');
      attrs.controls = attrs.hasOwnProperty('controls');
      attrs.autoplay = attrs.hasOwnProperty('autoplay');
      if (name == 'video') {
        attrs.muted = attrs.hasOwnProperty('muted');
        if (attrs.width) {
          attrs.style = 'width:' + parseFloat(attrs.width) + 'px;' + attrs.style;
          delete attrs.width;
        }
        if (attrs.height) {
          attrs.style = 'height:' + parseFloat(attrs.height) + 'px;' + attrs.style;
          delete attrs.height;
        }
      }
      attrs.id = randomId() + (name == 'video' ? ++this._videoNum : '');
      attrs.source = [];
      if (attrs.src) attrs.source.push(attrs.src);
      if (!attrs.controls && !attrs.autoplay)
      console.warn('存在没有controls属性的' + name + '标签，可能导致无法播放', attrs);
      this._bubbling();
      break;
    case 'source':
      var parent = this._tagStack[this._tagStack.length - 1];
      if (parent && (parent.name == 'video' || parent.name == 'audio')) {
        parent.attrs.source.push(attrs.src);
        if (!parent.attrs.src) parent.attrs.src = attrs.src;
      }
      this._tagStack.push(element);
      return;}

  attrs.style = matched + attrs.style;
  if (blockTag[name]) name = 'div';else
  if (!trustTag.hasOwnProperty(name)) name = 'span';
  element.name = name;
  element.attrs = attrs;
  this._addDomElement(element);
  this._tagStack.push(element);
};
DomHandler.prototype.ontext = function (data) {
  if (!this._whiteSpace) {
    if (!/\S/.test(data))
    return;
    data = data.replace(/\s+/g, " ");
  }




































  var element = {
    type: 'text' };


  data = data.replace(/&nbsp;/g, '&#xA0;'); // 解决连续&nbsp;失效问题
  if (/&#*((?!sp|lt|gt).){2,8};/.test(data)) element.decode = true;

  if (emoji) data = emoji.parseEmoji(data);
  element.text = data;
  this._addDomElement(element);
};
DomHandler.prototype.onclosetag = function (name) {
  var element = this._tagStack.pop();
  var parent = this._tagStack.length ? this._tagStack[this._tagStack.length - 1].children : this.nodes;
  if (ignoreTag[name]) {
    if (name == 'title') {
      try {
        this.title = element.children[0].text;
      } catch (e) {}
    }
    parent.pop();
  }
  // 合并一些不必要的层，减小节点深度
  if (element.children.length == 1 && element.name == 'div') {
    var child = element.children[0];
    if (child.name == 'div' && !/padding/.test(element.attrs.style) && !(/margin/.test(element.attrs.style) &&
    /margin/.test(child.attrs.style)) && !/display/.test(element.attrs.style) && !/display/.test(child.attrs.style) &&
    !(element.attrs.id && child.attrs.id) && !(element.attrs.class && child.attrs.class)) {
      if (/padding/.test(child.attrs.style))
      child.attrs.style = ";box-sizing:border-box;" + child.attrs.style;
      child.attrs.style = element.attrs.style + ";" + child.attrs.style;
      child.attrs.id = (child.attrs.id || "") + (element.attrs.id || "");
      child.attrs.class = (child.attrs.class || "") + (element.attrs.class || "");
      parent[parent.indexOf(element)] = child;
    }
  }
  if (element.pre) {
    this._whiteSpace = false;var _iterator3 = _createForOfIteratorHelper(
    this._tagStack),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var ele = _step3.value;
        if (ele.pre)
        this._whiteSpace = true;}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
    delete element.pre;
  }
  // 多层样式处理 
  if (this._CssHandler.pop)
  this._CssHandler.pop(element);
};
module.exports = DomHandler;

/***/ }),

/***/ 531:
/*!*********************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/jyf-Parser/CssHandler.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _createForOfIteratorHelper(o) {if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var it,normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} //CssHandler.js

var CanIUse = __webpack_require__(/*! ./api.js */ 532).versionHigherThan('2.7.1');

function CssHandler(style, tagStyle) {
  this._style = new CssTokenizer(style, tagStyle).parse();
}
CssHandler.prototype.match = function (name, attrs) {
  var matched = this._style[name] ? this._style[name] + ';' : '';
  if (attrs.id)
  matched += this._style['#' + attrs.id] ? this._style['#' + attrs.id] + ';' : '';
  if (attrs.class) {var _iterator = _createForOfIteratorHelper(
    attrs.class.split(' ')),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var Class = _step.value;
        matched += this._style['.' + Class] ? this._style['.' + Class] + ';' : '';}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}
  return matched;
};

function CssTokenizer() {var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var tagStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.res = this.initClass(tagStyle);
  this._state = "SPACE";
  this._buffer = style;
  this._sectionStart = 0;
  this._index = 0;
  this._name = '';
  this._content = '';
  this._list = [];
  this._comma = false;
}
CssTokenizer.prototype.initClass = function (tagStyle) {
  var initStyle = JSON.parse(JSON.stringify(tagStyle));
  initStyle.a = "display:inline;color:#366092;word-break:break-all;" + (initStyle.a || "");
  initStyle.address = "font-style:italic;" + (initStyle.address || "");
  initStyle.blockquote = initStyle.blockquote ||
  'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px;';
  initStyle.center = 'text-align:center;' + (initStyle.center || "");
  initStyle.cite = "font-style:italic;" + (initStyle.cite || "");
  initStyle.code = initStyle.code ||
  'padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border:1px solid #cccccc;border-radius:3px;';
  initStyle.dd = "margin-left:40px;" + (initStyle.dd || "");
  initStyle.img = "max-width:100%;" + (initStyle.img || "");
  initStyle.mark = "display:inline;background-color:yellow;" + (initStyle.mark || "");
  initStyle.pre = "overflow:scroll;" + (initStyle.pre || 'background-color:#f6f8fa;padding:5px;border-radius:5px;');
  initStyle.s = "display:inline;text-decoration:line-through;" + (initStyle.s || "");
  initStyle.u = "display:inline;text-decoration:underline;" + (initStyle.u || "");

  //低版本兼容
  if (!CanIUse) {

    initStyle.big = "display:inline;font-size:1.2em;" + (initStyle.big || "");
    initStyle.small = "display:inline;font-size:0.8em;" + (initStyle.small || "");
    initStyle.pre = "font-family:monospace;white-space:pre;" + initStyle.pre;

  }

  return initStyle;
};
CssTokenizer.prototype.SPACE = function (c) {
  if (/[a-zA-Z.#]/.test(c)) {
    this._sectionStart = this._index;
    this._state = "InName";
  } else if (c == '@') this._state = "Ignore1";else
  if (c == '/') this._state = "BeforeComment";
};
CssTokenizer.prototype.BeforeComment = function (c) {
  if (c == '*') this._state = "InComment";else
  {
    this._index--;
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.InComment = function (c) {
  if (c == '*') this._state = "AfterComment";
};
CssTokenizer.prototype.AfterComment = function (c) {
  if (c == '/') this._state = "SPACE";else
  {
    this._index--;
    this._state = "InComment";
  }
};
CssTokenizer.prototype.InName = function (c) {
  if (c == '{') {
    this._list.push(this._buffer.substring(this._sectionStart, this._index));
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (c == ',') {
    this._list.push(this._buffer.substring(this._sectionStart, this._index));
    this._sectionStart = this._index + 1;
    this._comma = true;
  } else if ((c == '.' || c == '#') && !this._comma) {
    this._buffer = this._buffer.splice(this._index, 1, ' ');
  } else if (/\s/.test(c)) {
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._state = "NameSpace";
  } else if (/[>:\[]/.test(c)) {
    if (this._list.length) this._state = "IgnoreName";else
    this._state = "Ignore1";
  } else this._comma = false;
};
CssTokenizer.prototype.NameSpace = function (c) {
  if (c == '{') {
    this._list.push(this._name);
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (c == ',') {
    this._comma = true;
    this._list.push(this._name);
    this._sectionStart = this._index + 1;
    this._state = "InName";
  } else if (/\S/.test(c)) {
    if (this._comma) {
      this._sectionStart = this._index;
      this._index--;
      this._state = "InName";
    } else if (this._list.length) this._state = "IgnoreName";else
    this._state = "Ignore1";
  }
};
CssTokenizer.prototype.InContent = function (c) {
  if (c == '}') {
    this._content = this._buffer.substring(this._sectionStart, this._index);var _iterator2 = _createForOfIteratorHelper(
    this._list),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var item = _step2.value;
        this.res[item] = (this.res[item] || '') + ";" + this._content;}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
    this._list = [];
    this._comma = false;
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.IgnoreName = function (c) {
  if (c == ',') {
    this._sectionStart = this._index + 1;
    this._state = "InName";
  } else if (c == '{') {
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  }
};
CssTokenizer.prototype.Ignore1 = function (c) {
  if (c == ';') {
    this._state = "SPACE";
    this._sectionStart = this._index + 1;
  } else if (c == '{') this._state = "Ignore2";
};
CssTokenizer.prototype.Ignore2 = function (c) {
  if (c == '}') {
    this._state = "SPACE";
    this._sectionStart = this._index + 1;
  } else if (c == '{') this._state = "Ignore3";
};
CssTokenizer.prototype.Ignore3 = function (c) {
  if (c == '}') this._state = "Ignore2";
};
CssTokenizer.prototype.parse = function () {
  for (; this._index < this._buffer.length; this._index++) {
    this[this._state](this._buffer[this._index]);}
  return this.res;
};
module.exports = CssHandler;

/***/ }),

/***/ 532:
/*!**************************************************************!*\
  !*** E:/UNIAPP/yingbang_applet/components/jyf-Parser/api.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {String.prototype.splice = function () {var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var deleteCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var addStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (start < 0) start = this.length + start;
  if (deleteCount < 0) deleteCount = 0;
  return this.substring(0, start) + addStr + this.substring(start + deleteCount);
};

var SDKVersion = uni.getSystemInfoSync().SDKVersion;

module.exports = {

  versionHigherThan: function versionHigherThan() {var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var v1 = SDKVersion.split('.');
    var v2 = version.split('.');
    var len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }
    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);
      if (num1 > num2) {
        return true;
      } else if (num1 < num2) {
        return false;
      }
    }
    return true;
  },

  html2nodes: function html2nodes(html, tagStyle) {
    var Parser = __webpack_require__(/*! ./Parser.js */ 528);
    return Parser(html, tagStyle);
  },
  css2object: function css2object(style, tagStyle) {
    var CssHandler = __webpack_require__(/*! ./CssHandler.js */ 531);
    return new CssHandler(style, tagStyle)._style;
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map