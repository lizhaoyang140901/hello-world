<template>
	<van-grid :border="false" :column-num="2">
		<van-grid-item class="shou_list_first" v-for="(n,index) in shop_lie" :key="index">
			<div class="zhuti">
				<img :src="n.imgurl" @click="shopxq(n.zhujian)"/>
				<span class="zhuti_text">{{n.title}}</span>
				<div class="futi">
					<span class="jiage">{{n.jiage}}</span>
					<!-- <span @click="fahuo_dizhi">{{n.fahuo}}</span> -->
					<span>{{n.fahuo}}</span>
					<span>{{n.fenlei}}</span>
				</div>
			</div>
			<!-- <div class="bian" v-show="bian_zj">
				<span style="display: block;" @click="bianji_shop(n.zhujian)">编辑</span>
				<span style="display: block;" @click="delete_shop(n.zhujian)">删除</span>
			</div> -->
		</van-grid-item>
	</van-grid>
</template>

<script>
import store from '../../store/index'

export default {
	name: "shop_guanli_list",
	props:['tell'],
	data() {
		return{
			// bian_zj:false,
			shop_lie:[ ],
			jiajuurl:require('../assets/images/jiaju.png'),
			fenye:1,
			newtell: 2
		}
	},
	watch: {
		tell: function(newVal,oldVal){
			this.newtell = newVal;
			this.qingqiu();
		}
	},
	methods:{
		qingqiu() {
			var yema = this.fenye
			// var _this = this;
			// var id = _this.tell;
			var id = this.newtell
			this.$axios.post('https://test.sazjob.com/customapi/Goods/mygoodslist',{
				type_id:id,status:1,page: yema
			}).then(_d => {
				console.log(_d)
				var list = [];
				var map = {};
				if( !_d.data.data){
					this.loading = false;
					this.$toast({
						message: "您暂未提交任何商品",
						icon: "chat-o"
					})
					this.$toast.setDefaultOptions({ duration: 2000 });
					this.shop_lie = '';
				}else{
					for(var n in _d.data.data){
						map["imgurl"] = this.imglujing(_d.data.data[n].img);
						map["title"] = _d.data.data[n].name;
						map["jiage"] = "￥" + _d.data.data[n].sell;
						map["fahuo"] = _d.data.data[n].city + _d.data.data[n].converge;
						map["fenlei"] = this.fenleiid(_d.data.data[n].type_id);
						map["zhujian"] = _d.data.data[n].id;
						list.push(map);
						map = {}
					}
					console.log(list);
					this.shop_lie = list;
				}
			})
		},
		shopxq(n) {
			this.$router.push({ name: "shopxqy" ,params:{id:n,fromid:2}});
		},
		// fahuo_dizhi(){
		// 	this.bian_zj = !this.bian_zj;
		// 	if(this.bian_zj == true){
		// 		this.bian_zj == true;
		// 	}else{
		// 		this.bian_zj = false;
		// 	}
		// },
		// bianji_shop(n) {
		// 	this.$router.push({ name: "bianji_shop" ,params:{id:n}});
		// },
		// delete_shop(n) {
		// 	var promise = new Promise((resolve,reject)=>{
		// 		this.$axios.post("https://test.sazjob.com/backapi/Goods/goodsdown",{
		// 			id:n,
		// 			status:0,
		// 		}).then((_d) => {
		// 			console.log(_d);
		// 			resolve(_d)
		// 			if (_d.data.status == 201) {
		// 				this.$toast({
		// 				  message: "操作失败",
		// 				  icon: "chat-o"
		// 				});
		// 			}else if(_d.data.status === 200) {
		// 				this.$toast({
		// 				  message: "删除成功",
		// 				  icon: "chat-o"
		// 				});
		// 			}
		// 		})
		// 	});
		// 	promise.then((_d)=>{
		// 		this.qingqiu();
		// 	})
		// },
		fenleiid(n) {
			switch(n){
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
		},
		imglujing(n) {
			var url = '';
			if(n){
				if(n.indexOf("/") != -1){
					if(n.indexOf("|") != -1){
						console.log(n.indexOf("|"));
						console.log(n.substring(0,n.indexOf("|")))
						url = "https://test.sazjob.com" + n.substring(0,n.indexOf("|"));
					}else{
						url = "https://test.sazjob.com" + n;
					}
				}else{
					url = this.jiajuurl+" ";
				}
			}else{
				url = this.jiajuurl+" ";
			}
			return url;
		}
	},
	mounted(){
			var yema = this.fenye;
			// console.log("newtell");
			// console.log(this.newtell);
			// console.log(store.state.shopflid);
			var dddd = store.state.shopflid?store.state.shopflid:this.newtell
			// console.log(dddd);
			// console.log("newtell");
			this.$axios.post('https://test.sazjob.com/customapi/Goods/mygoodslist',{
				type_id:dddd,status:1,page:yema
			}).then(_d => {
				console.log(_d)
				var list = [];
				var map = {};
				if( !_d.data.data){
					this.loading = false;
					this.$toast({
						message: "您暂未提交任何商品",
						icon: "chat-o"
					})
					this.$toast.setDefaultOptions({ duration: 2000 });
				}else{
					for(var n in _d.data.data){
						map["imgurl"] = this.imglujing(_d.data.data[n].img);
						map["title"] = _d.data.data[n].name;
						map["jiage"] = "￥" + _d.data.data[n].sell;
						map["fahuo"] = _d.data.data[n].city + _d.data.data[n].converge;
						map["fenlei"] = this.fenleiid(_d.data.data[n].type_id);
						map["zhujian"] = _d.data.data[n].id;
						list.push(map);
						map = {}
					}
					console.log(list);
					this.shop_lie = list;
				}
			})
	}
}
</script>

<style scoped>
.zhuti img{
	width: 3rem;
	height: 3rem;
	border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;	
}
.zhuti_text{
	font-size: 0.3rem;
    margin: 0.3rem;
    display: block;
}
.jiage{
	color: #d45b05;
    font-weight: 700;
}
.shou_list_first >>> .van-grid-item__content{
  padding: 0.2rem 0.2rem;
}
.futi{
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 3rem;
}
.bian{
	position: absolute;
    right: 0.3rem;
    bottom: 0.7rem;
    background-color: #c8c9cc;
    border-radius: 0.1rem;
}
</style>
