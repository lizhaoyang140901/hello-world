import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
const whitelist = {     //声明了一个白名单，为tabBar下的页面
    'pages/index/index': 'index',
    'pages/transaction/transaction': 'transaction',
    'pages/contract/contract': 'contract',
    'pages/my/my': 'my',
	'pages/assets/assets': 'assets'
};

//初始化
const router = new Router({
	h5:{
		useUniConfig:true,  //采用在pages.json下的所有页面配置信息,默认为true
	},
    routes: [
		{
			path: "/pages/login/login",
			aliasPath:'/',
			name:'登录'
		},
		{
			path: "/pages/index/index",
			name:'首页'
		},
		{
			path: "/pages/transaction/transaction",
			name:'杠杆'
		},
		{
			path: "/pages/contract/contract",
			name:'合约'
		},
		{
			path: "/pages/assets/assets",
			name:'资产'
		},
		{
			path: "/pages/my/my",
			name:'币币'
		},{
			path: "/pages/hp-content/hp-content",
			name:'帮助中心'
		},{
			path: "/pages/recharge/recharge",
			name:'充币'
		},{
			path: "/pages/huazhang/huazhang",
			name:'转账'
		},{
			path: "/pages/extract/extract",
			name:'提币'
		},{
			path: "/pages/invitation/invitation",
			name:'邀请'
		},{
			path: "/pages/notice/notice",
			name:'公告列表'
		},{
			path: "/pages/notice-xq/notice-xq",
			name:'公告详情'
		},{
			path: "/pages/security/security",
			name:'安全中心'
		},{
			path: "/pages/my_data/my_data",
			name:'个人资料'
		},{
			path: "/pages/gymy/gymy",
			name:'关于我们'
		},{
			path: "/pages/privacy/privacy",
			name:'隐私政策'
		},{
			path: "/pages/agreement/agreement",
			name:'用户协议'
		},{
			path: "/pages/loginps/loginps",
			name:'修改登录密码'
		},{
			path: "/pages/jiaoyips/jiaoyips",
			name:'设置交易密码'
		},{
			path: "/pages/register/register",
			name:'注册'
		},{
			path: "/pages/forget/forget",
			name:'忘记密码'
		},{
			path: "/pages/bill-page/bill-page",
			name:'账单'
		},{
			path: "/pages/trend/trend",
			name:'走势图'
		},{
			path: "/pages/order-my/order-my",
			name:'我的订单'
		},{
			path: "/pages/jy-record/jy-record",
			name:'交易记录'
		},{
			path: "/pages/activity/activity",
			name:'活动委托'
		},{
			path: "/pages/google/google",
			name:'谷歌验证'
		},{
			path: "/pages/real-name/real-name",
			name:'实名认证'
		},{
			path: "/pages/bz-details/bz-details",
			name:'币种详情'
		},{
			path: "/pages/recharging/recharging",
			name:'充提详情'  
		},{
            path: '*',
            name: 'moddle',
            redirect:to=>{
                const name = whitelist[to.path];
                if(name){
                    return {name}
                }
            }
        }
	],//路由表
	scrollBehavior (to, from, savedPosition) {
		return savedPosition || { x: 0, y: 0 }
	}
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (!uni.getStorage("Token")) {
			if (to.path !== '/pages/login/login') {
				return next({
					path:'/',
					NAVTYPE:'push'
				});
			}
		next()
	}else{
		next()
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;