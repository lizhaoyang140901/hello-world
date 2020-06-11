<template>
	<div>
		<header>
			<van-row>
				<van-col>
					<img :src="lefturl" alt class="leftImg" @click="jumpB();" />
				</van-col>
				<van-col class="zshejishi">我的收付款</van-col>
			</van-row>
		</header>
		<van-row type="flex" justify="space-between">
			<van-col span="6" class="txmm">余额</van-col>
			<van-col span="12" class="txmm">
				<div class="jinqian">{{yuge}}</div>
			</van-col>
		</van-row>
		<van-row type="flex" justify="space-between">
			<van-col span="6" class="txmm">优惠金</van-col>
			<van-col span="12" class="txmm">
				<div class="jinqian">{{youhu}}</div>
			</van-col>
		</van-row>
		<van-row>
			<van-col class="txmm">提现</van-col>
			<van-col class="jiantou">
				<van-icon name="arrow" size="0.5rem" @click="tixian"/>
			</van-col>
		</van-row>
		<van-row>
			<van-col class="txmm">充值</van-col>
			<van-col class="jiantou">
			<van-icon name="arrow" size="0.5rem" @click="chongzhi"/>
		</van-col>
		</van-row>
		<van-cell-group>
			<van-field v-model="value" readonly />
		</van-cell-group>
		<van-grid :column-num="1">
			<van-grid-item v-for="(n, index) in qianlist" :key="index">
				<div class="biaoti">{{n.xg_name}}</div>
				<van-row class="zhuti">
				  <van-col class="neirong" span="12">{{n.shijian}}</van-col>
				  <van-col class="neirong" span="12">{{n.xg_ysws}}:{{n.qian}}</van-col>
				</van-row>
			</van-grid-item>  
		</van-grid>
	</div>
</template>

<script>
import store from '../../store/index'

export default {
	name: "xiaoguotu",
	data() {
		return {
			lefturl:require('../assets/my/left.png'),
			yuge:'',
			youhu:'',
			value:'',
			userid:'',
			qianlist:[
				/* {
					xg_name:"大苏打",
					xg_ysws:"未收",
					qian:"￥1000",
					shijian:"2020/4/28 下午7:50"
				} */
			]
		};
	},
	methods: {
		jumpB() {
			this.$router.go(-1);
		},
		tixian() {
			this.$toast({
			  message: "暂未开通充值端口",
			  icon: "chat-o"
			});
			this.$toast.setDefaultOptions({ duration: 2000 });
		},
		chongzhi() {
			this.$toast({
			  message: "暂未开通提现端口",
			  icon: "chat-o"
			});
			this.$toast.setDefaultOptions({ duration: 2000 });
		},
		shijianchuo(m) {
			return new Date(parseInt(m) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
		},
		ysws(m){
			if(m === 0){
				return '未收'
			}else{
				return '已收'
			}
		}
	},
	mounted() {
		if(typeof read_user === "function"){
			this.userid = read_user().userclass_id;
		}else{
			this.userid = store.state.userclass_id;
		}
		this.$axios.post('https://test.sazjob.com/customapi/Shoukuan/yue').then(_d => {
			// console.log(_d);
			// console.log(_d.data.data[0].money);
			this.yuge = "￥" + _d.data.data[0].money;
			this.youhu = "￥" + _d.data.data[0].money_youhui;
		})
		if(this.userid === 3){
			this.value = "我的付款:"
			this.$toast({
				message: "您近期未有任何财务变动",
				icon: "chat-o"
			})
			this.$toast.setDefaultOptions({ duration: 2000 });
		}else{
			this.value = "我的收款:"
			this.$axios.post('https://test.sazjob.com/customapi/Shoukuan/list',{
				page:1
			}).then(_d => {
				// console.log(_d);
				var list = [];
				var map = {};
				if(_d.data.msg === "无数据"){
					this.$toast({
					message: "您近期未有任何财务变动",
					icon: "chat-o"
					})
					this.$toast.setDefaultOptions({ duration: 2000 });
				}
				for(var n in _d.data.data){
					var xg_name = _d.data.data[n].title;
					var xg_ysws = _d.data.data[n].payed;
					var qian = _d.data.data[n].money;
					var shijian = _d.data.data[n].add_time;
					map["xg_name"] = xg_name;
					map["xg_ysws"] = this.ysws(xg_ysws);
					map["qian"] = "￥" + qian;
					map["shijian"] = this.shijianchuo(shijian);
					list.push(map);
					map = {};
				}
				// console.log(list);
				this.qianlist = list;
			})
		}
	}
};
</script>

<style scoped>
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
.txmm{
  height: 1rem;
  line-height: 1rem;
  font-size: 0.5rem;
  padding-left: 0.5rem;
}
.jinqian{
	float: right;
    padding-right: 0.3rem;
}
.jiantou{
  float: right;
  padding: 0.25rem;
}
.biaoti{
	width: 100%;
	text-align: center;
	font-weight: bolder;
	font-size: 0.5rem;
}
.zhuti{
	width: 100%;
    margin: 0.3rem;
}
.neirong{
	text-align: center;
	font-size: 0.4rem;
}
</style>
