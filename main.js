import Vue from 'vue'
import App from './App'
import getApp from '@/components/getApp/getApp.vue'

Vue.config.productionTip = false


Vue.component('getApp',getApp);
/**
 * 引入封装好的ajax网络请求以及接口地址列表
 */
import fetch from './libs/request.js'
import api from './api'

Vue.prototype.$fetch = fetch
Vue.prototype.$api = api

/**
 * 引入时间插件 官方文档：https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md
 */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间
import 'dayjs/locale/zh-cn' // 引入中文
dayjs.locale('zh-cn') // 引入中文
dayjs.extend(relativeTime)
Vue.prototype.$dayjs = dayjs // 放入原型中

// #ifdef H5
/**
 * 引入vue-baidu-map
 */
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
	ak:'8Y3fYiQme7NVFdvr0thUVZ6wZ68CLUBu'
})
// #endif

/**
 * 引入uView	
 */
import uView from "uview-ui";
Vue.use(uView);	

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
