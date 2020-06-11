<template>
	<div class="content">
		<div class="content_first">
			<van-row class="content_two">
				<van-col class="content_two_first" @click="showPopup">
					<span class="city">{{city}}</span>
					<img :src="sousuo" alt class="locationLogo" />
				</van-col>
				<van-col span="15" class="content_two_two">
					<!-- <van-search v-model="search_v" shape="round" placeholder="请输入您要搜索的内容" /> -->
					<div>
						当前用户：{{juesename}}
					</div>
				</van-col>
			</van-row>
			<van-popup v-model="cityshow" position="bottom" :style="{ height: '40%' }" >
				<van-area :area-list="areaList"
						  :columns-placeholder="['请选择', '请选择', '请选择']"
						  ref="item"
						  @cancel="cityshow = false"
						  @confirm="quyu_queren"/>
			</van-popup>
		</div>
		<div class="box">
		    <div class="son">
				<van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
				  <van-swipe-item v-for="(n, index) in lunbo_list" :key="index"> 
					<img :src='n.img'>
				  </van-swipe-item>
				</van-swipe>
			</div>
		    <div  class="son">
				<div class="container_two">
					<van-row type="flex" justify="space-around">
					  <van-col class="container_two_first" span="22">热门广告</van-col>
					</van-row>
					<van-row type="flex" justify="space-around" class="fengge">
						<van-col span="7" v-for="(n,index) in guanggao" :key="index">
							<img class="container_two_san" :src='n.img' @click="guang">
							<span class="container_two_si">清新风格推荐</span>
						</van-col>
					</van-row>
				</div>
			</div>
		    <div  class="son">
				<div class="container_san">
					<van-row type="flex" justify="space-around">
						<van-col span="7" v-for="(n,index) in juese" :key="index">
							<img :src='n.img' @click="juese_luyou(n.title,userid)">
						</van-col>
					</van-row>
				</div>
			</div>
		</div>
		<van-popup v-model="show">
			<div class="hongbao">
				<span class="hongbao_first">{{text}}</span>
				<span>{{text2}}</span>
				<span @click="an">领取红包</span>
			</div>
		</van-popup>
	</div>
</template>

<script>
import store from '../../store/index'
import base64 from '../assets/file.js'
import ditushuju from '../assets/area.js';

export default{
	name:'index',
	data(){
		return{
			city:'',
			userid:'',
			sousuo:require('../assets/images/xiala.png'),
			search_v:'',
			lunbo_list: [],
			juesename: '',
			areaList: ditushuju,
			guanggao: [
				{
					img: base64.guanggao1["url"]
				},
				{
					img: base64.guanggao2["url"]
				},
				{
					img: base64.guanggao3["url"]
				}
			],
			juese: [
				{
					img: base64.yezhu["url"],
					title: "业主"
				},
				{
					img: base64.shigong["url"],
					title: "施工方"
				},
				{
					img: base64.gongying["url"],
					title: "供应商"
				}
			],
			screenHeight: document.documentElement.clientHeight,//屏幕高度
			cityshow: false,
			show: false,
			text: '',
			text2:''
		}
	},
	methods: {
		an() {
			this.show = false;
		},
		imgurl(n) {
			let url = '';
			if(n){
				url = 'https://test.sazjob.com' + n
			}else{
				url = ''
			}
			return url;
		},
		juese_luyou(n,m){
			/* console.log(m); */
			if(m == 3){
				console.log("业主");
				this.juesu_yi(n);
			}else if(m == 5){
				console.log("供应商");
				console.log(n);
				this.juesu_two(n);
			}else{
				console.log("施工方");
				this.juesu_san(n);
			}
		},
		juesu_yi(n){
			if(n === '业主'){
				console.log("点业主")
				this.$router.push({ name: "Project" });
			}else if(n === '施工方'){
				this.$router.push({ name: "zhuangxiushifu" });
			}else{
				console.log("点供应商")
				this.$router.push({ name: "shop" });
			}
		},
		juesu_two(n) {
			if(n === '业主'){
				console.log("点业主")
				this.$router.push({ name: "NewProject" });
			}else if(n === '施工方'){
				this.$router.push({ name: "zhuangxiushifu" });
			}else{
				console.log("点供应商")
				this.$router.push({ name: "shop" });
			}
		},
		juesu_san(n) {
			if(n === '业主'){
				console.log("点业主")
				this.$router.push({ name: "NewProject" });
			}else if(n === '施工方'){
				this.$router.push({ name: "zhuangxiushifu" });
			}else{
				console.log("点供应商")
				this.$router.push({ name: "shop" });
			}
		},
		guang() {
			/* window.location.href = 'https://' + 'www.baidu.com' */
			console.log("跳转外部链接")
		},
		showPopup() {
		  this.cityshow = true;
		},
		quyu_queren(val) {
			let sheng = val[0].name
			let shi = val[1].name
			let qu = val[2].name
			this.city = sheng
			this.cityshow = false
		}
	},
	created(){
		if(typeof testfun === "function"){
			this.city = testfun();
			this.userid = read_user().userclass_id;
		}else{
			this.city = '天津市';
			this.userid = store.state.userclass_id;
		}
		if(this.userid == 1){
			this.juesename = "风水师"
		}else if(this.userid == 2){
			this.juesename = "设计师"
		}else if(this.userid == 3){
			this.juesename = "业主"
		}else if(this.userid == 4){
			this.juesename = "监理"
		}else if(this.userid == 5){
			this.juesename = "供应商"
		}else if(this.userid == 6){
			this.juesename = "木工"
		}else if(this.userid == 7){
			this.juesename = "电工"
		}else if(this.userid == 8){
			this.juesename = "泥工"
		}
		var promise = new Promise((resolve,reject)=>{
			this.$axios.get('https://test.sazjob.com/customapi/Usertool/hongbao').then(ret => {
				console.log(ret);
				resolve(ret);
				if(ret.data.status == 101){
					console.log(ret.data.data.type);
					console.log(ret.data.data.money);
					this.show = true;
					this.text = ret.data.data.type == 1?'注册成功':'邀请成功',
					this.text2 = '送' + ret.data.data.money + "元钱"
				}
			})
		})
		promise.then((ret)=>{
			this.$axios.get("https://test.sazjob.com/backapi/Banner/company_banner").then(_d => {
				var list = [];
				var map = {};
				console.log(_d);
				for(var o in _d.data.data.list){
					map["img"] =this.imgurl(_d.data.data.list[o].imgurl);
					list.push(map);
					map = {};
				}
				this.lunbo_list = list;
			});
		})
	},
	mounted(){
		var _this = this;
		window.onresize = function(){ // 定义窗口大小变更通知事件
		    _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
		    _this.screenHeight = document.documentElement.clientHeight; //窗口高度
		};
		var oIframe = document.getElementsByClassName('box');
		oIframe[0].style["height"] = (this.screenHeight-54) + "px";
	},
	watch: {
		screenHeight(val){ //监听屏幕高度变化
			var oIframe = document.getElementsByClassName('box');
			oIframe[0].style["height"] = (Number(val)-54) + 'px';
		},
		$route(to,from){
			if(to.path === '/'){
				this.$axios.get("https://test.sazjob.com/backapi/Banner/company_banner").then(_d => {
					var list = [];
					var map = {};
					for(var or in _d.data.data.list){
						var imgurl = this.imgurl(_d.data.data.list[or].imgurl);
						map["img"] = imgurl;
						list.push(map);
						map = {};
					}
					this.lunbo_list = list;
				});
			}
		}
	}
}
</script>

<style scoped>
html,body{
    height: 100%;
}
#app{
	padding-bottom: 0 !important;
}
.content_first{
	line-height: 1rem;
}
.content_two{
	display: flex;
}
.content_two_first{
	flex: 0.5;
	text-align: right;
}
.content_two_two{
	flex: 2;
	text-align: center;
}
.locationLogo {
  width: 0.28rem;
  height: 0.17rem;
  margin-left: 0.05rem;
  display: inline-block;
}
.content{
	height: 100%;
	display: flex;
	flex-direction: column;
}
.box{
    display: flex;
    height: 100%; 
    flex-direction: column;
}
.son{
    height:30%;
	overflow: hidden;
	margin: 0 0.3rem;
	display: flex;
	border-radius: 0.3rem;
}
.son img{
	width: 100%;
	height: 100%;
}
.my-swipe{
	flex-shrink:0;
	width: 100%;
}
.container_two_first{
	font-size: 0.6rem;
	 margin: 0.1rem;
}
.container_two_si{
	font-size: 0.4rem;
	display: block;
	text-align: left;
	margin-top: 0.2rem;
}
.container_san{
	margin: auto;
}
.fengge{
	height:65%
}
.hongbao{
	height: 14rem;
    width: 7rem;
    background-size: 100% 100%;
	background-image: url('../assets/images/hongbao.png');
    text-align: center;
    line-height: 2rem;
    font-size: x-large;
    color: #fff;
	display: flex;
    flex-direction: column;
}
.hongbao_first{
	display: block;
	margin-top: 8rem;
}
</style>
