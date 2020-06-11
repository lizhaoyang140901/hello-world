// 引入适配js文件
import "./assets/flexible";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './../store/index'
// 引入清除默认样式跟1px边框问题的css文件
import "./assets/style/border.css";
import "./assets/style/reset.css";
import "./assets/iconfont/iconfont.css";

import axios from 'axios'
Vue.prototype.$axios = axios;

import qs from 'qs'
Vue.prototype.$qs = qs;

// vant
import {
  Tabbar,
  TabbarItem,
  Panel,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Step,
  Steps,
  Col,
  Row,
  Icon,
  Swipe,
  SwipeItem,
  Button,
  Sticky,
  Field,
  Uploader,
  Popup,
  Search,
  Cell, 
  CellGroup,
  Area,
  DropdownMenu, 
  DropdownItem,
  ActionSheet,
  Picker,
  NavBar,
  DatetimePicker,
  Checkbox,
  CheckboxGroup,
  Form, 
  Toast,
  Overlay,
  SwitchCell,
  Sidebar,
  SidebarItem,
  Empty,
  PullRefresh,
  List 
} from "vant";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Panel)
  .use(Tab)
  .use(Tabs)
  .use(Grid)
  .use(GridItem)
  .use(Step)
  .use(Steps)
  .use(Col)
  .use(Row)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Button)
  .use(Sticky)
  .use(Field )
  .use(Uploader)
  .use(Popup)
  .use(Search)
  .use(Cell)
  .use(CellGroup)
  .use(Area)
  .use(Swipe)
  .use(SwipeItem)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(ActionSheet)
  .use(Picker)
  .use(NavBar)
  .use(DatetimePicker)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Form)
  .use(Toast)
  .use(Overlay)
  .use(SwitchCell)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Empty)
  .use(PullRefresh)
  .use(List);
  
Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

//Axios请求拦截器，随着业务的复杂，Axios层的使用将会越来越复杂，写个精简版的就行了。
axios.interceptors.request.use(config => {
    var token = '';
    if(typeof read_user === "function"){
    	token = read_user().token;
    }else{
    	token = store.state.token;
    }
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = token;
        /* console.log('interceptors config=',config) */
    }
    return config
}, error => {
    return Promise.reject(error)
})

//相应拦截器
axios.interceptors.response.use(response => {
	if(response.data){
		switch(response.data.status){
			case "200":
			console.log("请求成功" + response.data.status)
		}
	}
	return response;
},err => {
	if(err.response){
		switch(err.response.status){
			case "404":
			console.log("请求参数错误" + err.response.status)
			break;
			case "401":
			console.log("401请求错误" + err.response.status)
			router.replace({
				path: '/login'
			})
			break;
			default:
			console.log("其他错误" + err.response.status)
		}
	}
	return Promise.reject(err.response.data)
});

//save_userinfo  readuserinfo
router.beforeEach((to, from, next) => {
	if (typeof (api) == "undefined") {
		var token = false;
		if(store.state.token){
			token = store.state.token;
			if(token || to.path === '/login' || to.path === '/zhuce_my' || to.path === '/wangji_my' || to.path === '/xieyi'){
			 	next();
			}else{
			 	next({
			 		path: "/login"
			 	});
			}  
		}else if(typeof read_user === "function"){
			var bendi = '';
			var jiekou = '';
			axios.post('https://test.sazjob.com/customapi/Usertool/islogin',{
				Authorization:read_user().token
			}).then(_d => {
				jiekou = _d.data.data.user_info_id;
				bendi = read_user().userclass_id;
			})
			if((jiekou === bendi) || to.path === '/login' || to.path === '/zhuce_my' || to.path === '/wangji_my' || to.path === '/xieyi'){
			 	next();
			}else{
			 	next({
			 		path: "/login"
			 	});
			}    
		}else{
			if(token || to.path === '/login' || to.path === '/zhuce_my' || to.path === '/wangji_my' || to.path === '/xieyi'){
			 	next();
			}else{
			 	next({
			 		path: "/login"
			 	});
			}   
		}
	}else {  
		if(typeof read_user === "function"){
			if(read_user().token){
				var bendi = '';
				var jiekou = '';
				axios.post('https://test.sazjob.com/customapi/Usertool/islogin',{
					Authorization:read_user().token
				}).then(_d => {
					jiekou = _d.data.data.user_info_id;
					bendi = read_user().userclass_id;
				})
				if((jiekou === bendi) || to.path === '/login' || to.path === '/zhuce_my' || to.path === '/wangji_my' || to.path === '/xieyi'){
				 	next();
				}else{
				 	next({
				 		path: "/login"
				 	});
				}    
			}else{
				var token = false;
				if(token || to.path === '/login' || to.path === '/zhuce_my' || to.path === '/wangji_my'){
				 	next();
				}else{
				 	next({
				 		path: "/login"
				 	});
				}   
			}
		}else{
			var token = false;
			if(token || to.path === '/login' || to.path === '/zhuce_my' || to.path === '/wangji_my' || to.path === '/xieyi'){
			 	next();
			}else{
			 	next({
			 		path: "/login"
			 	});
			}   
		}
	}
})
if(true){
	window.apiready = function(){;
		api.setStatusBarStyle({
		    style: 'dark',
		    color:'#fafafa'
		});
		var bmLocation = api.require('bmLocation');
		bmLocation.singleLocation({
			reGeocode: false,
			netWorkState: false
		}, function(ret) {
			var sta = ret.status;
			if (sta) {
				var city = ret.reGeo.city;//城市名字
				var qu = ret.reGeo.district;//区名字
				var sheng = ret.reGeo.province;//省名字
				var str = '省：' + sheng + ',纬度：' + city + ',区：'+ qu;
				$api.setStorage('city',city);
			} else {
				api.alert({ msg: '发生错误' });
			}
		});
		new Vue({
			el: '#app',
			router,
			store,
			components: { App },
			template: '<App/>'
		})
	}
}else{
	new Vue({
	  el: '#app',
	  router,
	  store,
	  components: { App },
	  template: '<App/>'
	})
}






