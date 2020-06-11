import Vue from 'vue'
import Vuex from 'vuex'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
// const store = new Vuex.Store({
export default new Vuex.Store({
//   state: {
//     // 放置初始状态 app启动的时候的全局的初始值
//     // bankInf: {"name":"我是vuex的第一个数据","token":100,"bankName":"中国银行"}
//   },
  state:{
    token:'',
    //用户类别ID
    userclass_id:'',
	//用户昵称
	user_nickname:'',
	//商品分类ID
	shopflid:'' ,
	//导航栏
	daohang_id: ''
  },
  mutations:{
    //   newBankName(state,msg){
    //       state.bankInf.bankName = msg
    //   }
    set_token(state,token){
        state.token = token
        sessionStorage.token = token
    },
    del_token(state){
        state.token = ''
        sessionStorage.removeItem('token')
    },
    //提交用户类别ID,保存到state
    userid(state,v){
      state.userclass_id = v;
	  // console.log("我把用户ID加进来啦");
	  // console.log(v);
	  // console.log(state.userclass_id);
    },
	//提交用户昵称
	nicheng(state,u){
		state.user_nickname = u;
	},
	//提交商品分类ID
	shangpin(state,x){
		state.shopflid = x.e;
		// alert("我天进来啦");
		// alert(state.shopflid);
	},
	//提交导航栏ID
	dhid(state,x){
		state.daohang_id = x.e;
	}
  },
  actions:{
    tijiaospid({commit},e){
		return new Promise((resole, reject) => {
			setTimeout(() => {
				commit("shangpin",{
					e
			})
			resole()
			reject()
			})
		})
    },
	daohang({commit},e){
		return new Promise((resole, reject) => {
			setTimeout(() => {
				commit("dhid",{
					e
				})
				resole()
				reject()
			})
		})
	}
  }
})
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
//  export default store
