<template>
		<div>
			<div class="bx_title">
			<img src="../assets/my/left.png" alt="" @click="bx_fan()">
			<span>我的保险</span>
		</div>
		<van-grid :column-num="1">
			<van-grid-item v-for="(n, index) in baoxianlist" :key="index">
				<van-row class="zhuti">
				  <van-col class="neirong" span="12">{{n.bx_name}}</van-col>
				  <van-col class="neirong" span="12">{{n.jiage}}</van-col>
				</van-row>
				<van-row class="zhuti">
				  <van-col class="neirong" span="12">{{n.kaishi}}</van-col>
				  <van-col class="neirong" span="12">{{n.jieshu}}</van-col>
				</van-row>
				<van-row class="zhuti">
				  <van-col class="neirong" offset="18" span="6">
					  <van-button round type="primary" size="small" @click="bx_xiangqing(n.bx_id)">保险详情</van-button>
				  </van-col>
				</van-row>
			</van-grid-item>  
		</van-grid>
		<div class="zhBtn" @click="xinxi">购买保险</div>
	</div>
</template>

<script>
export default {
	name: "biaoxian_my",
	data() {
		return {
			baoxianlist:[
				// {
				// 	bx_name:"太平洋保险",
				// 	bx_id:1,
				// 	kaishi:"2020/4/29 下午7:26",
				// 	jieshu:"2021/4/28 上午12:00",
				// 	jiage:"￥1000"
				// }
			],
			xs:true
		};
	},
	methods:{
		bx_fan(){
			this.$router.go(-1);
		},
		xinxi() {
			this.$toast({
				message: "购买保险暂未开通",
				icon: "chat-o"
			});
		},
		shijianchuo(m) {
			return new Date(parseInt(m) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
		},
		bx_xiangqing(n) {
			this.$router.push({ name: "baoxian_xq",params:{id:n}});
		}
	},
	mounted() {
		this.$toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
			overlay :this.xs
		});
		this.$axios.post("https://test.sazjob.com/customapi/Baoxian/list",{
			page:1
		}).then(_d => {
			console.log(_d)
			console.log(_d.data.data)
			this.xs = false;
			this.$toast.clear();
			var list = [];
			var map = {};
			if(_d.data.status === 102){
				this.$toast({
					message: "您未购买过任何保险",
					icon: "chat-o"
				});
				this.$toast.setDefaultOptions({ duration: 2000 });
			}
			for(var n in _d.data.data){
				var bx_name = _d.data.data[n].name;
				var bx_id = _d.data.data[n].baoxian_type_id;
				var kaishi = _d.data.data[n].add_time;
				var jieshu = _d.data.data[n].end_time;
				var jiage = _d.data.data[n].bxmoney;
				map["bx_name"] = bx_name;
				map["bx_id"] = bx_id;
				map["kaishi"] = this.shijianchuo(kaishi);
				map["jieshu"] = this.shijianchuo(jieshu);
				map["jiage"] = "￥"+jiage;
				list.push(map);
				map = {};
			}
			console.log(list);
			this.baoxianlist = list;
		})
	}
};
</script>
<style scoped>
.bx_title{
	background-color: #fafafa;
	padding: 0px 16px;
	height: 1.4rem;
	line-height: 1.4rem;
}
.zhBtn{
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 0.5rem;
    background: #6678ff;
    height: 1.2rem;
    border-radius: 0.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
}
.bx_title img{
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.bx_title span{
    font-size: .5rem;
    height: 1.4rem;
    line-height: 1.4rem;
}
.zhuti{
	width: 100%;
    margin: 0.3rem;
	text-align: center;
}
</style>