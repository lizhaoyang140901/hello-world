import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
/* 自定义 */
import First from '../views/First.vue' /* 首页*/
import Yewu from '../views/Yewu.vue'  /* 主题业务*/
import My from  '../views/My.vue'  /* 我的*/

Vue.use(VueRouter)

const routes = [
	{
	  path: '/',
	  name: 'First',
	  component: First
	},
	{
	  path: '/yewu',
	  name: 'yewu',
	  component: Yewu
	},
	{
	  path: '/my',
	  name: 'my',
	  component: My
	}
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
