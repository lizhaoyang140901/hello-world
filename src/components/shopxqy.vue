<template>
	<div>
		<header>
			<van-row>
				<van-col>
					<img :src="lefturl" alt class="leftImg" @click="jumpB();" />
				</van-col>
				<van-col class="zshejishi">商品详情</van-col>
			</van-row>
		</header>
		<div>
			<van-cell-group v-for="(item,index) in tuxqlist" :key="index">
				<div class="shoptu">
					<img :src="item.img"/>
				</div>
				<van-field label="类型:" :value="item.leixing" readonly />
				<van-field label="名称:" :value="item.name" readonly />
				<van-field label="时间:" :value="item.shijian" readonly />
				<van-field label="价钱:" :value="item.jiaqian" readonly />
				<van-field label="地址:" :value="item.dizhi" readonly />
				<van-field label="描述:" :value="item.miaoshu" readonly />
			</van-cell-group>
		</div>
		<div v-show="this.from != 1">
			<van-row style="margin-top: 0.3rem;">
				<van-col span="12">
					<van-button class="gxan" type="primary" size="small" round @click="bji">编辑</van-button>
				</van-col>
				<van-col span="12">
					<van-button class="gxan" type="primary" size="small" round @click="schu">删除</van-button>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
import store from '../../store/index'
import { Dialog } from 'vant';

export default {
	name: "shopqxy",
	components: {
	    [Dialog.Component.name]: Dialog.Component,
	},
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			tuxqlist:[],
			from: 1
		};
	},
	methods: {
		jumpB() {
			if(this.from == 1){
				this.$router.push({ name: "shop"});
			}else{
				this.$router.push({ name: "shop_guanli"});
			}
		},
		add(m){
			return m<10?'0'+m:m 
		},
		shijianchuo(shijian) {
			var time = new Date(shijian * 1000);	
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			return y+'-'+this.add(m)+'-'+this.add(d);
		},
		bji() {
			this.$router.push({ name: "bianji_shop" ,params:{id:this.$route.params.id}});
		},
		schu() {
			Dialog.confirm({
				title: '商品管理',
				message: '您确定要删除此件商品吗？',
			}).then(() => {
			    var promise = new Promise((resolve,reject)=>{
			    	this.$axios.post("https://test.sazjob.com/backapi/Goods/goodsdown",{
			    		id:this.$route.params.id,
			    		status:0,
			    	}).then((_d) => {
			    		console.log(_d);
			    		resolve(_d)
			    		if (_d.data.status == 201) {
			    			this.$toast({
			    			  message: "操作失败",
			    			  icon: "chat-o"
			    			});
			    		}else if(_d.data.status === 200) {
			    			this.$toast({
			    			  message: "删除成功",
			    			  icon: "chat-o"
			    			});
			    		}
			    	})
			    });
			    promise.then((_d)=>{
			    	this.$router.push({ name: "shop_guanli"});
			    })
			}).catch(() => {
			    // on cancel
			});
		},
		leix(m){
			switch(m){
			    case 1:
			        return '家具'
			        break;
			    case 2:
			        return '家电'
			        break;
			    case 3:
			        return '灯具'
			        break;
				case 4:
				    return '地砖'
				    break;
				case 5:
				    return '地板'
				    break;
				case 6:
				    return '门窗卫浴'
				    break;
				case 7:
				    return '软装'
				    break;
				case 8:
				    return '木工辅料'
				    break;
				case 9:
				    return '泥工辅料'
				    break;
				case 10:
				    return '油漆辅料'
				    break;
				case 11:
				    return '水电辅料'
				    break;
			}
		}
	},
	created() {
		var promise = new Promise((resolve,reject)=>{
			var n = this.$route.params.id
			this.$axios.get('https://test.sazjob.com/backapi/Goods/view?id='+ n).then(_d => {
				console.log(_d.data.data);
				var list = [];
				var map = {};
				store.dispatch("tijiaospid",_d.data.data["type_id"]).then(res => {})
				map["img"] = "https://test.sazjob.com/" + _d.data.data["img"];
				map["leixing"] = this.leix(_d.data.data["type_id"]);
				map["name"] = _d.data.data["name"];
				map["shijian"] = this.shijianchuo(_d.data.data["addtime"]);
				map["jiaqian"] = "￥" + _d.data.data["sell"];
				map["dizhi"] = _d.data.data["province"] + "-" + _d.data.data["city"] + "-" + _d.data.data["converge"];
				map["miaoshu"] = _d.data.data["des"];
				list.push(map);
				console.log(list);
				this.tuxqlist = list
				resolve(_d)
			})
		})
		promise.then((_d)=>{
			this.from = this.$route.params.fromid
		})
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
.shoptu{
	text-align: center;
    padding: 0.3rem 0;
}
.shoptu img{
	width: 3rem;
    height: 3rem;
}
.gxan{
	width: 60%;
    margin: 0 auto;
    display: block;
}
</style>