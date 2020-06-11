<template>
  <div>
    <div class="my_title">我的</div>
    <van-cell-group>
      <van-cell>
        <div class="my_head">
			<img :src="touxiang">
		</div>
        <div class="my_information" v-if="usertoken">
		  <span>{{nickname}}</span>
        </div>
		<div class="my_information" v-else>
		  <span @click="my_denglu">未登录，请登录</span>
		</div>
        <div class="my_tu" @click="my_ziliao">
          <van-icon name="records" color="#6678ff" size="0.65rem" />
        </div>
      </van-cell>
	  <van-cell is-link v-for="(n,inx) in wode_list" :key="inx" @click="zhanshi(n.num)">
	    <div class="my_a">{{ n.text }}</div>
	  </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import store from '../../store/index';

export default {
	name: "index",
	data() {
		return {
			nickname:'',
			userid: '',
			usertoken: '',
			touxiang: false,
			wode_list: [],
			list1: [
				{
					text: "账户与安全",
					num: "1"
				},
				{
					text: "我的收付款",
					num: "2"
				},
				{
					text: "我的项目",
					num: "4"
				},
				// {	
				// 	text: "我的收藏",
				// 	num: "5"
				// },
				{
					text: "我的分享",
					num: "5"
				},
				{
					text: "我的资质",
					num: "6"
				},
				{
					text: "我的保险",
					num: "7"
				},
				{
					text: "清理缓存",
					num: "8"
				},
				{
					text: "版本管理",
					num: "9"
				}
			],
			list2: [
				{	
					text: "账户与安全",
					num: "1"
				},
				{
					text: "我的收付款",
					num: "2"
				},
				{
					text: "我的商品",
					num: "3"
				},
				{
					text: "我的项目",
					num: "4"
				},
				// {
				// 	text: "我的收藏",
				// 	num: "5"
				// },
				{
					text: "我的分享",
					num: "5"
				},
				{
					text: "我的资质",
					num: "6"
				},
				{
					text: "我的保险",
					num: "7"
				},
				{
					text: "清理缓存",
					num: "8"
				},
				{
					text: "版本管理",
					num: "9"
				}
			],
			list3: [
				{
					text: "账户与安全",
					num: "1"
				},
				{
					text: "我的收付款",
					num: "2"
				},
				{
					text: "我的项目",
					num: "4"
				},
				// {	
				// 	text: "我的收藏",
				// 	num: "5"
				// },
				{
					text: "我的分享",
					num: "5"
				},
				// {
				// 	text: "我的资质",
				// 	num: "6"
				// },
				{
					text: "我的保险",
					num: "7"
				},
				{
					text: "清理缓存",
					num: "8"
				},
				{
					text: "版本管理",
					num: "9"
				}
			]
		};
	},
	components: { 
		[Dialog.Component.name]: Dialog.Component,
	},
	mounted (){
		if(typeof read_user === "function"){
			this.userid = read_user().userclass_id;
			this.nickname = read_user().nickname;
			this.usertoken = read_user().token;
		}else{
			this.userid = store.state.userclass_id;
			this.nickname = store.state.user_nickname;
			this.usertoken = store.state.token;
		}
		if(this.userid == 5){
			this.wode_list = this.list2;
		}else if(this.userid == 3){
			this.wode_list = this.list3;
		}else{
			this.wode_list = this.list1;
		}
		this.$axios.post('https://test.sazjob.com/customapi/Usertool/myheadimg').then(_d => {
			console.log(_d);
			console.log(_d.data.data.headimgurl);
			this.touxiang = "https://test.sazjob.com/" + (_d.data.data.headimgurl?_d.data.data.headimgurl:read_user().headimgurl)
		})
		store.dispatch("daohang",2).then(res => {})
	},
	methods: {
		zhanshi(m) {
			this[m]();
		},
		1() {
			this.$router.push({ name: "zhanghu_my" });
		},
		2() {
			this.$router.push({ name: "shoufukuan_my" });
		},
		3() {
			this.$router.push({ name: "shop_guanli" });
		},
		4() {
			if(this.userid == 3){
				this.$router.push({ name: "Project" });
			}else{
				this.$router.push({ name: "TenderingIndex" });
			}
		},
		// 5() {
		// 	this.$router.push({ name: "shoucang_my" });
		// },
		5() {
			this.$router.push({ name: "fenxiangmy" });
		},
		6() {
			this.$router.push({ name: "zizhi_my" });
		},
		7() {
			this.$router.push({ name: "baoxian_my" });
		},
		8() {
			if(typeof clear_cache == "function"){
				clear_cache();
			}else{
				Dialog.confirm({
					title: '清除缓存',
					message: '6.06M,确认清除缓存吗？',
				})
				.then(() => {
						// on confirm
				})
				.catch(() => {
						// on cancel
				});
			}
		},
		9() {
			if(typeof banben == "function"){
				banben();
			}else{
				Dialog.alert({
					title: '版本号',
					message: 'M3216-kahsdk-213',
				}).then(() => {
					
				});
			}
		},
		my_denglu() {
		  // this.$router.push({ name: "denglu_my"})
		  this.$router.push({ name: "login" });
		},
		my_ziliao() {
		  this.$router.push({ name: "xinxi_my" });
		}
	}
};
</script>
<style scoped>
.my_title {
	background-color: #fafafa;
	padding: 0px 16px;
	height: 1.4rem;
	line-height: 1.4rem;
	font-size: 0.6rem;
}
.my_head {
	float: left;
	border-radius: 50%;
}
.my_head img{
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
}
.my_information {
  display: inline-block;
  margin: 0.75rem 0.3rem 0.3rem 0.3rem;
  font-size: 0.4rem;
}
.my_tu {
  float: right;
  margin-top: 0.7rem;
}
.my_a {
  float: left;
}
.tubiao {
  float: right;
  width: 0.28rem;
  height: 0.28rem;
  margin-top: 0.18rem;
}
</style>
