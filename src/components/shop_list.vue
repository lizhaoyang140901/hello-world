<template>
	<van-grid :border="false" :column-num="2">
		<van-grid-item class="shou_list_first" v-for="(n,index) in shop_lie" :key="index">
			<div class="zhuti">
				<img :src="n.imgurl" @click="shopxq(n.zhujian)"/>
				<span class="zhuti_text">{{n.title}}</span>
				<div class="futi">
					<span class="jiage">{{n.jiage}}</span>
					<span>{{n.fahuo}}</span>
					<span>{{n.fenlei}}</span>
				</div>
			</div>
		</van-grid-item>
	</van-grid>
</template>

<script>
import store from '../../store/index'

export default {
	name: "shop_list",
	props:['tell',"di"],
	data() {
		return{
			shop_lie:[],
			jiajuurl:require('../assets/images/jiaju.png'),
			newtell: 2,
			newqu: ''
		}
	},
	watch: {
		tell: function(newVal,oldVal){
			this.newtell = newVal;
			this.qingqiu_url();
		},
		di: function(newVal,oldVal){
			this.newqu = newVal;
			this.qingqiu_url();
		}
	},
	methods: {
		qingqiu_url(){
			var _this = this;
			var id = this.newtell;
			var did = this.newqu;
			this.$axios.post('https://test.sazjob.com/backapi/Goods/typelist',{
						  type_id:id,status:1,city:did
			}).then(_d => {
				var list = [];
				var map = {};
				for(var n in _d.data.data.list){
					map["imgurl"] = this.imglujing(_d.data.data.list[n].img);
					map["title"] = _d.data.data.list[n].name;
					map["jiage"] = "￥" + _d.data.data.list[n].sell;
					map["fahuo"] = _d.data.data.list[n].city + _d.data.data.list[n].converge;
					map["fenlei"] = this.fenleiid(_d.data.data.list[n].type_id);
					map["zhujian"] = _d.data.data.list[n].id;
					list.push(map);
					map = {}
				}
				console.log(list);
				if(list.length < 1){
					this.shop_lie = ''
					this.$toast({
						message: "暂没有查询到满足本件的商品",
						icon: "chat-o"
					});
					this.$toast.setDefaultOptions({ duration: 2000 });
				}else{
					this.shop_lie = list;
				}
			})
		},
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
					url = this.jiajuurl + " ";
				}
			}else{
				url = this.jiajuurl + " ";
			}
			return url;
		},
		shopxq(n) {
			this.$router.push({ name: "shopxqy" ,params:{id:n,fromid:1}});
		},
	},
	mounted(){
			var dddd = store.state.shopflid?store.state.shopflid:this.newtell
			this.$axios.post('https://test.sazjob.com/backapi/Goods/typelist',{
				type_id:dddd,status:1
			}).then(_d => {
			  var list = [];
			  var map = {};
			  for(var n in _d.data.data.list){
				  map["imgurl"] = this.imglujing(_d.data.data.list[n].img);
				  map["title"] = _d.data.data.list[n].name;
				  map["jiage"] = "￥" + _d.data.data.list[n].sell;
				  map["fahuo"] = _d.data.data.list[n].city + _d.data.data.list[n].converge;
				  map["fenlei"] = this.fenleiid(_d.data.data.list[n].type_id);
				  map["zhujian"] = _d.data.data.list[n].id;
				  list.push(map);
				  map = {}
			  }
			  this.shop_lie = list;
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
    margin: 0.1rem;
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
</style>
