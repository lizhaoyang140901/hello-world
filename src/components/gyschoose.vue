<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">选择供应商</van-col>
      </van-row>
    </header>
	<div>
		<van-dropdown-menu :overlay="false">
			<!-- <van-dropdown-item title="区域" ref="item">
				<van-area :area-list="areaList" 
						  :columns-placeholder="['请选择', '请选择', '请选择']"
						  @cancel="quyu_guanbi"
						  @confirm="quyu_queren"/>
			</van-dropdown-item>-->
			<van-dropdown-item title="等级" v-model="dengji" :options="dengji_option" @close="dengji_fangfa"/> 
			<!-- <van-dropdown-item title="工种" v-model="gongzhong" :options="gongzhong_option" @close="gongzhong_fangfa"/> -->
		</van-dropdown-menu>
	</div>
	<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="shanglajiazia"
	   >
		<!-- 内容盒子 -->
		<div class="boxCont" v-for="(n, inx) in boxContList" :key="inx">
			<van-row>
				<van-col class="imgBox">
					<img :src="n.imgurl" alt class="imgHead" />
				</van-col>
				<van-col class="inputSjs" span="10">
					<p style="font-size:.5rem;font-weight:400;">{{n.text1}}</p>
					<p style="font-size:.3rem;font-weight:300;">{{n.text2}}</p>
				</van-col>
				<van-col>
					<van-button type="default" class="buttonCls" @click="jumpsjsDetails(n.jumpI)">查看详情</van-button>
				</van-col>
			</van-row>
			<!-- <div class="labelIconBox">
				<img src="../assets/images/labelIcon.png" alt class="labelIconImg" />
				<span class="styleGood">{{n.styleGood_txt}}</span>
			</div> -->
            <div class="choose" @click="choose(n.user_info_id,n.fs_tender_id)">选择该供应商</div>
		</div>
	</van-list>	
  </div>
</template>

<script>
import ditushuju from '../assets/area.js';
	
export default {
	name: "gyschoose",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			touxiangurl:require('../assets/images/touxiang.png'),
			loading: false,
			finished: false,
			areaList: ditushuju,
			dengji: "a",
			gongzhong: 0,
			fenye: 1,
			dengji_option:[
				{ text: '初级', value: 'a' },
				{ text: '中级', value: 'b' },
				{ text: '高级', value: 'c' },
				{ text: '精英', value: 'd' },
			],
			gongzhong_option:[
				{ text: '风水师', value: 0 },
				{ text: '设计师', value: 1 },
				{ text: '监理', value: 2 },
				{ text: '木工', value: 3 },
				{ text: '电工', value: 4 },
				{ text: '泥工', value: 5 }
			],
			boxContList: [],
			//判断工种条件是否选中
			gongzhong_biaoji: 0,
			//判断登记条件是否选中
			dengji_biaoji: 0,
			//判断是否第一次进入页面
			shouci: 0,
			//是否路由重新跳转
			luyou: 1,
			//列表累加
			listleijia: []
		};
	},
	methods: {
		shanglajiazia(l,n,m) {
			if(this.shouci === 0){
				return
			}else if(this.luyou === 0){
				return
			}else{
				if(this.dengji_biaoji === 0 && this.gongzhong_biaoji === 0){
						this.$axios.post("https://test.sazjob.com/customapi/HomePage/somelist",{
							page:l,
							juese:n,
							ranks:m,
							project_id:this.$route.query.project_id
						},{
							page:this.fenye
						}).then(_d => {
							this.listleijia = [];
							this.loading = false;
							console.log(_d);
							this.fenye += 1;
							console.log(this.fenye);
							this.$toast({
							  message: "加载完毕",
							  icon: "chat-o"
							});
							// if(_d.data.data.length === 0){
							// 	this.finished = true;
							// }
							var list = [];
							var map = {};
							for(var i in _d.data.data){
								var image = this.touxiang(_d.data.data[i].headimgurl);
								var text1 = this.xingming(_d.data.data[i].nickname);
								var text2 = this.zhicheng(_d.data.data[i].userclass_id,_d.data.data[i].ranks);
								map["imgurl"]=image;
								map["text1"]=text1;
								map["text2"]=text2;
								list.push(map);
								map = {};
							}
							console.log(this.boxContList);
							console.log(list);
							this.listleijia = list;
							this.boxContList = this.boxContList.concat(this.listleijia);
							console.log(this.boxContList);
						})
						console.log("原始");
						return;
				}else if(this.dengji_biaoji === 1 || this.gongzhong_biaoji === 1){
						this.$axios.post("https://test.sazjob.com/customapi/HomePage/somelist",{
							page:this.fenye,
							userclass_id:this.gongzhong_fangfa_first(this.gongzhong),
							ranks:this.dengji_fangfa_first(this.dengji)
						}).then(_d => {
							this.listleijia = [];
							this.loading = false;
							console.log(_d);
							this.fenye += 1;
							console.log(this.fenye);
							this.$toast({
							  message: "加载完毕",
							  icon: "chat-o"
							});
							if(_d.data.data.length === 0){
								this.finished = true;
							}
							var list = [];
							var map = {};
							for(var i in _d.data.data){
								var image = this.touxiang(_d.data.data[i].headimgurl);
								var text1 = this.xingming(_d.data.data[i].nickname);
								var text2 = this.zhicheng(_d.data.data[i].userclass_id,_d.data.data[i].ranks);
								map["imgurl"]=image;
								map["text1"]=text1;
								map["text2"]=text2;
								list.push(map);
								map = {};
							}
							console.log(this.boxContList);
							console.log(list);
							this.listleijia = list;
							this.boxContList = this.boxContList.concat(this.listleijia);
							console.log(this.boxContList);
						})
						console.log("变化");
						return;
				}
			}
		},
		jumpB() {
			this.$router.go(-1);
		},
		quyu_guanbi() {
		    this.$refs.item.toggle();
		},
		quyu_queren(val) {
			let sheng = val[0].name
			let shi = val[1].name
			let qu = val[2].name
			this.$refs.item.toggle();
		},
		gongzhong_fangfa_first(m) {
			switch(m){
			    case 0:
			        return 1
			        break;
			    case 1:
			        return 2
			        break;
				case 2:
					return 4
					break;
				case 3:
				    return 6
				    break;
				case 4:
				    return 7
				    break;	
			    default:
			        return 8
			        break;
			}
		},
		dengji_fangfa_first(m) {
			switch(m){
			    case "a":
			        return 1
			        break;
			    case "b":
			        return 2
			        break;
				case "c":
					return 3
					break;
			    default:
			        return 4
			        break;
			}
		},
		shigong_qingqiu(l,n,m) {
			this.$axios.post("https://test.sazjob.com/customapi/Yitoubiao/tbjueselist",{//修改过
				page:l,
				juese:5,
                ranks:this.dengji_fangfa_first(this.dengji),
                project_id:this.$route.query.project_id
			}).then(_d => {
				this.loading = false;
				
				if(_d.data.msg === "无数据"){
					this.loading = false;
					this.$toast({
					message: "暂无查询到您需要的施工人员，请联系官方",
					icon: "chat-o"
					})
                    this.$toast.setDefaultOptions({ duration: 2000 });
                    this.finished = true;
				}else if(_d.data.data.length<20){
                    this.finished = true;
                }
                console.log(_d);
				var list = [];
				var map = {};
				for(var i in _d.data.data){
					var image = this.touxiang(_d.data.data[i].headimgurl);
					var text1 = this.xingming(_d.data.data[i].nickname);
                    var text2 = this.zhicheng(5,_d.data.data[i].ranks);
                    var user_info_id = _d.data.data[i].user_info_id;
                    var fs_tender_id = _d.data.data[i].fs_tender_id;
					map["imgurl"]=image;
					map["text1"]=text1;
                    map["text2"]=text2;
                    map['user_info_id']=user_info_id;
                    map['fs_tender_id']=fs_tender_id;
					list.push(map);
					map = {};
				}
				console.log(list);
				this.boxContList = list;
				this.fenye += 1;
				console.log(this.fenye);
			})
		},
		dengji_fangfa() {
			if(this.fenye >2){
				this.fenye = this.fenye
			}else{
				this.fenye = 1;
			}
			this.shigong_qingqiu(this.fenye,this.gongzhong_fangfa_first(this.gongzhong),this.dengji_fangfa_first(this.dengji));
			this.dengji_biaoji = 1;
		},
		gongzhong_fangfa() {
			this.fenye = 1;
			if(this.fenye >2){
				this.fenye = this.fenye
			}else{
				this.fenye = 1;
			}
			this.shigong_qingqiu(this.fenye,this.gongzhong_fangfa_first(this.gongzhong),this.dengji_fangfa_first(this.dengji));
			this.gongzhong_biaoji = 1;
		},
		jumpsjsDetails() {
			this.$router.push({ name: "sjsDetails" });
		},
		zhicheng(n,m) {
			if(n === 5){
				switch(m){
				    case 1:
				        return '初级供应商'
				        break;
				    case 2:
				        return '中级供应商'
				        break;
					case 3:
						return '高级供应商'
						break;
				    default:
				        return '精英级供应商'
				        break;
				}
			}
		},
		touxiang(n) {
			let url = '';
			if(n){
				url = 'https://test.sazjob.com' + n;
			}else{
				url = this.touxiangurl + '';
			}
			return url;
		},
		xingming(n) {
			let url = '';
			if(n){
				url = n;
			}else{
				url = '未填写昵称'
			}
			return url;
        },
        //新添加
        choose(choose,fs_tender_id){
            this.$axios.post('https://test.sazjob.com/customapi/toubiao/selectfs',{
                project_id:this.$route.query.project_id,
                user_info_id:String(choose),
                juese:'fs_tender'
            })
			.then(res=>{
				console.log(res)
				if(res.data.msg=="已有选中"){
					this.$toast.fail('已选中该设计师');
				}else if(res.data.msg=='ok'){
					this.$toast.fail('选择成功');
				}else if(res.data.msg=="非本人项目"){
					this.$toast.fail('您没有操作权限');
				}else if(res.data.msg=="被选中userid非法数据"){
					this.$toast.fail('数据错误');
				}
			}).catch(err=>{
                console.log(`${err}`)
            })
        }
	},
	// watch: {
	// 	$route(to,from){
	// 		this.luyou = 0;
	// 		if(to.path === '/zhuangxiushifu'){
	// 			console.log('/zhuangxiushifu');
	// 			this.finished = false;
	// 			this.fenye = 1;
	// 			this.$axios.post("https://test.sazjob.com/customapi/HomePage/somelist").then(_d => {
	// 				this.loading = false;
	// 				console.log(_d.data.data);
	// 				var list = [];
	// 				var map = {};
	// 				for(var i in _d.data.data){
	// 					var image = this.touxiang(_d.data.data[i].headimgurl);
	// 					var text1 = this.xingming(_d.data.data[i].nickname);
	// 					var text2 = this.zhicheng(_d.data.data[i].userclass_id,_d.data.data[i].ranks);
	// 					map["imgurl"]=image;
	// 					map["text1"]=text1;
	// 					map["text2"]=text2;
	// 					list.push(map);
	// 					map = {};
	// 				}
	// 				this.boxContList = list;
	// 				this.fenye += 1;
	// 				console.log(this.fenye);
	// 				this.luyou = 1;
	// 				this.gongzhong_biaoji = 0;
	// 				this.dengji_biaoji = 0;
	// 			})
	// 		}
	// 	}
	// },
	mounted(){
		this.shigong_qingqiu(1);
	}
};
</script>
<style scoped>
.choose{
    width: 2.4rem;
    height: .4rem;
    line-height: .4rem;
    padding: .2rem;
    color: #fff;
    background: #6678ff;
    border-radius: .2rem;
    text-align: center;
    margin: .2rem auto;
    font-size: .3rem;
}
header {
  padding: 0 0.3rem;
  height: 1.4rem;
  line-height: 1.4rem;
  border-bottom: 0.15rem solid #f2f2f2;
  font-size: 0.5rem;
}
.leftImg {
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}
.zshejishi {
  display: inline-block;
}
.boxCont {
  padding: 0 0.3rem;
  border-bottom: 0.15rem solid #f2f2f2;
  box-sizing: border-box;
}
.imgBox {
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
}
.imgHead {
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
}
.buttonCls {
  margin-top: 1.2rem;
  background: #6678ff;
  color: #fff;
  border-radius: 0.2rem;
  width: 2.4rem;
  height: 0.8rem;
  line-height: 0;
  padding: 0;
}
.inputSjs {
  padding: 0.5rem 0 0 0;
  width: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1rem;
}
.inputSjs p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.labelIconBox {
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #d4d6ff;
  border-radius: 0.1rem;
  padding: 0 0.1rem;
  display: inline-block;
}
.labelIconImg {
  width: 0.4rem;
  height: 0.4rem;
}
.styleGood {
  display: inline-block;
  color: #909bff;
}
.sjsImg {
  margin: 0.2rem 0;
}
.sjsImg img {
  border-radius: 0.2rem;
  width: 2.72rem;
  height: 2.72rem;
}
</style>
