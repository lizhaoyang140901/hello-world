import Vue from 'vue'
import App from './App'

import router from './router/index.js'
import Router, {RouterMount} from 'uni-simple-router';
Vue.use(Router)

import uView from "uview-ui";
Vue.use(uView);

// Vue.prototype.$imgUrl = myRequest.imgUrl
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
