import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import my from '@/components/my'
import Project from '@/components/Project'
import MoreProgress from '@/components/MoreProgress'
import SetUpPro from '@/components/SetUpPro'
import NewProject from  '@/components/NewProject'
import SplitDetails from '@/components/SplitDetails'
import WorkerMateral from '@/components/WorkerMateral'
import EditWorkItem from '@/components/EditWorkItem'
import AddWorkItem from '@/components/AddWorkItem'
import EditProItem from '@/components/EditProItem'

// 王强
import TenderingIndex  from '@/components/TenderingIndex'
import TenderDetails   from '@/components/TenderDetails'
import TenderRecord    from '@/components/TenderRecord'
import TenderReport    from '@/components/TenderReport'
import TenderWorker    from '@/components/TenderWorker'
import TenderGeomancer from '@/components/TenderGeomancer'
import workerRecord    from '@/components/workerRecord'
import DeliveryDetails from '@/components/DeliveryDetails'
import TenderStylist   from '@/components/TenderStylist'
import deliveryRecord from '@/components/deliveryRecord'
import TenderDetailsNew from '@/components/TenderDetailsNew'
import shejishiTb from '@/components/shejishiTb'
import TenderReportNew from '@/components/TenderReportNew'
import choosebuilder from '@/components/choosebuilder'
import gyreport from '@/components/gyreport'
import shDetails from '@/components/shDetails'
import sjchoos from '@/components/sjchoos'
import jlchoose from '@/components/jlchoose'
import sgdchoose from '@/components/sgdchoose'
import gyschoose from '@/components/gyschoose'

// 首页
import shejishi from '@/components/shejishi'
import sjsDetails from '@/components/sjsDetails'
import xiaoguotu from '@/components/xiaoguotu'
import zhuangxiushifu from '@/components/zhuangxiushifu'
import zxsfDetails from '@/components/zxsfDetails'
import zhanghu_my from '@/components/zhanghu_my'
import toubiao_my from '@/components/toubiao_my'
import xiangmu_my from '@/components/xiangmu_my'
import baoxian_my from '@/components/baoxian_my'
import shoucang_my from '@/components/shoucang_my'
import zhuce_my from '@/components/zhuce_my'
import login from '@/components/login'
import xinxi_my from '@/components/xinxi_my'
import wangji_my from '@/components/wangji_my'
import zxzhijian from '@/components/zhuangxiuzhijian'
import xiugaimima from '@/components/xiugaimima'
import bangding_phone from '@/components/bangding_phone'
import phone_old from '@/components/genghuan_phone_old'
import phone_new from '@/components/genghuan_phone_new'
import shoukuan from '@/components/shoukuan'
import tianxianmima from '@/components/shezhitianxianmm'
import shoufukuan_my from '@/components/shoufukuan_my'
import tuijian_xiangqing from '@/components/tuijian_xiangqing'
import zizhi_add from '@/components/zizhi_add'
import zizhirenzheng from '@/components/zizhirenzheng'
import zhangdan from '@/components/zhangdan'
import shop from '@/components/shop'
import shop_guanli from '@/components/shop_guanli'
import tianjia_shop from '@/components/tianjia_shop'
import bianji_shop from '@/components/bianji_shop'
import tuijianProject from '@/components/tuijianProject'
import zizhi_my from '@/components/zizhi_my'
import zizhi_bianji from '@/components/zizhi_bianji'
import baoxian_xq from '@/components/baoxian_xq'
import fenxiangmy from '@/components/fenxiangmy'
import shopxqy from '@/components/shopxqy'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Index',     //首页
		component: Index,
		meta: {
			keepAlive: false
		}
    }, {
		path: '/project',
		name: 'Project',
		component: Project,
		meta: {
			keepAlive: false
		}
    }, {
		path: "/TenderDetails/:project_id",
		name: 'TenderDetails',
		component: TenderDetails,
		meta: {
			keepAlive: false
		}
    }, {
		path: '/moreProgress',
		name: 'MoreProgress',
		component: MoreProgress,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/setup',
		name: "SetUp",
		component: SetUpPro,
		meta: {
			keepAlive: false
		}	
    }, {
		path: '/my',
		name: 'my',     //首页
		component: my,
		meta: {
			keepAlive: false
		}
    }, {
		path: '/TenderingIndex',
		name: 'TenderingIndex',     //招标
		component: TenderingIndex,
		meta: {
			keepAlive: false
		}
    }, {
		path: '/TenderRecord',
		name: 'TenderRecord',     //送货记录
		component: TenderRecord,
		meta: {
			keepAlive: true
		}
    },{
		path: '/TenderReport/:id',
		name: 'TenderReport',     //送货记录
		component: TenderReport,
		meta: {
			keepAlive: true
		}
    },{
		path: '/TenderWorker',
		name: 'TenderWorker',     //工人进度
		component: TenderWorker,
		meta: {
			keepAlive: true
		}
    },{
		path: '/TenderGeomancer',
		name: 'TenderGeomancer',     //风水师报告
		component: TenderGeomancer,
		meta: {
			keepAlive: true
		}
    },
    {
		path:'/workerRecord',
		name: 'workerRecord',     //工人进度报告
		component: workerRecord,
		meta: {
			keepAlive: true
		}
    },
    {
		path:'/DeliveryDetails/:id',
		name: 'DeliveryDetails',     //送货详情
		component: DeliveryDetails,
		meta: {
			keepAlive: true
		}
    },
    {
		path:'/TenderStylist/:project_id',
		name: 'TenderStylist',     //设计师设计图
		component: TenderStylist,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/shejishi',
		name: 'shejishi',     //设计师
		component: shejishi,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/sjsDetails/:user_class/:user_id',
		name: 'sjsDetails',     //设计师详情
		component: sjsDetails,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/xiaoguotu',
		name: 'xiaoguotu',     //效果图
		component: xiaoguotu,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/zhuangxiushifu',
		name: 'zhuangxiushifu',     //装修师傅
		component: zhuangxiushifu,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/zxzhijian',
		name: 'zhuangxiuzhijian',    //装修质检
		component: zxzhijian,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/zxsfDetails',
		name: 'zxsfDetails',     //装修师傅详情
		component: zxsfDetails,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/zhanghu_my',
		name: 'zhanghu_my',     //我的里面的账户与安全
		component: zhanghu_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/toubiao_my',
		name: 'toubiao_my',     //我的里面的业主投标
		component: toubiao_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/xiangmu_my',
		name: 'xiangmu_my',     //我的里面的项目
		component: xiangmu_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/baoxian_my',
		name: 'baoxian_my',     //我的里面的保险
		component: baoxian_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/shoucang_my',
		name: 'shoucang_my',     //我的里面的收藏
		component: shoucang_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/zhuce_my',
		name: 'zhuce_my',     //我的里面的注册
		component: zhuce_my,
		meta: {
			keepAlive: true,
			requireAuth: true
		}
    }, {
		path: '/login',
		name: 'login',     //我的里面的登录
		component: login,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/xinxi_my',
		name: 'xinxi_my',     //我的里面的资料详情
		component: xinxi_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/wangji_my',
		name: 'wangji_my',     //我的里面的忘记密码
		component: wangji_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/bangding_phone',
		name: 'bangding_phone',   //账户与安全的绑定手机号
		component: bangding_phone,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/phone_old',
		name: 'phone_old',   //账户与安全的更换手机号(旧的)
		component : phone_old,
		meta: {
			keepAlive: false
		}
    }, {
		path: '/phone_new',
		name: 'phone_new',   //账户与安全的更换手机号(新的)
		component :phone_new,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/shoukuan',
		name: 'shoukuan',   //账户与安全的设置收款账号
		component: shoukuan,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/tianxianmima',
		name: 'tianxianmima',
		component: tianxianmima,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/xiugaimima',    //修改登录密码
		name: 'xiugaimima',
		component: xiugaimima,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/shoufukuan_my',
		name: 'shoufukuan_my',  //账户与安全的收付款
		component: shoufukuan_my,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/tuijian_xiangqing:id',
		name: 'tuijian_xiangqing',   //首页推荐详情页
		component: tuijian_xiangqing,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/zizhi_add',
		name: 'zizhi_add',    //我的资质添加
		component: zizhi_add,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/zizhirenzheng',
		name: 'zizhirenzheng',    //首页资质认证
		component: zizhirenzheng,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/zhangdan',     //我的账单
		name: "zhangdan",
		component: zhangdan,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/shop',
		name: 'shop',     //商品浏览
		component: shop,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/shop_guanli',
		name: 'shop_guanli',     //商品管理
		component: shop_guanli,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/tianjia_shop:id',
		name: 'tianjia_shop',    //添加商品
		component: tianjia_shop,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/bianji_shop:id',
		name: 'bianji_shop',
		component: bianji_shop,
		meta: {
			keepAlive: true
		}
	},{
        path:'/deliveryRecord',
        name:'deliveryRecord',     //供应商工作记录（新添加）
        component:deliveryRecord,
		meta: {
			keepAlive: true
		}
    },  {
        path:'/TenderDetailsNew/:project_id',
        name:'TenderDetailsNew',     //（新添加）
        component:TenderDetailsNew,
		meta: {
			keepAlive: true
		}                                   
    }, {
        path:'/shejishiTb',
        name:'shejishiTb',        //（新添加）
        component:shejishiTb,
		meta: {
			keepAlive: true
		}
    }, {
        path: '/newProject',
        name: 'NewProject',
        component: NewProject,
		meta: {
			keepAlive: false
		}
    }, {
		path: '/tuijianProject',
		name: 'tuijianProject',
		component: tuijianProject,
		meta: {
			keepAlive: false
		}
	}, {
     	path: '/splitDetails/:project_id',      //设计师拆分材料与工作详情（ys_0425）
     	name: 'SplitDetails',     
     	component: SplitDetails,
		meta: {
			keepAlive: true
		}
    }, {
		path: '/zizhi_my',
		name: 'zizhi_my',    //我的资质
		component: zizhi_my,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/zizhi_bianji/:id',
		name: 'zizhi_bianji',      //编辑资质
		component: zizhi_bianji,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/baoxian_xq/:id',
		name: 'baoxian_xq',      //保险详情
		component: baoxian_xq,
		meta: {
			keepAlive: true
		}
	}, {
      	path:'/workerMateral/:project_id',
      	name: 'WorkerMateral',     //材料拆分报告
      	component: WorkerMateral,
		meta: {
			keepAlive: true
		}
  	}, {
        path: '/editWorkItem/:project_id/:id',    //设计师修改工作项（工作与材料）（ys_0429）
        name: 'EditWorkItem',     
        component:EditWorkItem,
		meta: {
			keepAlive: true
		}
   	}, {
      	path: '/addWorkItem/:project_id',      //设计师添加工作项（工作与材料）（ys_0425）
      	name: 'AddWorkItem',     
      	component:AddWorkItem,
		meta: {
			keepAlive: true
		}
   	}, {
		path: '/fenxiangmy',
		name: 'fenxiangmy',               //我的分享
		component: fenxiangmy,
		meta: {
			keepAlive: true
		}
	}, {
		path: '/shopxqy/:id/:fromid',
		name: 'shopxqy',
		component: shopxqy,
		meta: {
			keepAlive: true
		}
	}, {
     	path:'/TenderReportNew/:id',
     	name: 'TenderReportNew',     //送货记录修改
      	component: TenderReportNew,
		meta: {
			keepAlive: true
		}
    }, {
      	path: "/editProItem/:project_id",       //业主修改项目（ys_0504）
      	name: "EditProItem",
      	component: EditProItem,
		meta: {
			keepAlive: true
		}
    }, {
		path:'/gyreport/:id',
        name:'gyreport',          //添加供应商送货
        component:gyreport,
		meta: {
			keepAlive: true
		}
	}, {
		path:'/shDetails/:id',
        name:'shDetails',          //添加供应商送货详情
        component:shDetails,
		meta: {
			keepAlive: true
		}
	}, {
        path:'/choosebuilder',
        name:'choosebuilder',     //选择施工人员
        component:choosebuilder,
        meta: {
            keepAlive: true
        }
    }, {
        path:'/gyreport/:id',
        name:'gyreport',          //添加供应商送货
        component:gyreport,
        meta: {
            keepAlive: true
        }
    }, {
        path:'/shDetails/:id',
        name:'shDetails',          //添加供应商送货详情
        component:shDetails,
        meta: {
            keepAlive: true
        }
    }, {
        path:'/sjchoos',
        name:'sjchoos',     //选定设计师
        component:sjchoos,
        meta: {
            keepAlive: true
        }
    },{
        path:'/jlchoose',
        name:'jlchoose',        //选定监理
        component:jlchoose,
        meta: {
            keepAlive: true
        }
    },{
        path:'/sgdchoose',
        name:'sgdchoose',       //选定监理
        component:sgdchoose,
        meta: {
            keepAlive: true
        }
    },{
        path:'/gyschoose',
        name:'gyschoose',       //选定供应商
        component:gyschoose,
        meta: {
            keepAlive: true
        }
    }
],
    // 滚动行为：
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    
    // mode: 'history',
    provide(){
      return{
          reload:this.reload
      }
    },
    data() {
      isRouterAlive:true 
    }
})

/* {
        path:'/projectOpen',
        name:'projectOpen',         //（新添加）
        component:projectOpen
    }, */