// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import VueResource from 'vue-resource'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

// 引入 网络请求模块
Vue.use(VueResource)
Vue.http.headers.common['Accept'] = 'application/json';
Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.http.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi'
Vue.http.headers.common['Content-Type'] = 'application/json;charset=UTF-8;'
Vue.http.headers.common['id'] = '1'
Vue.http.headers.common['name'] = 'dz'

// Vue.http.interceptors.push((request, next) => {
//   　console.log(this)//此处this为请求所在页面的Vue实例
//     // modify request
//    //在请求之前可以进行一些预处理和配置
//     console.log('拦截请求做处理' + request)
//     // continue to next interceptor
//   　　next((response) => {
//     //在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
//           console.log('拦截响应做处理' + response)
//   　　　　return '';
//     });
//   });

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
