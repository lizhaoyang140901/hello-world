<template>
	<div>
		<header>
			<van-row>
				<van-col>
					<img :src="lefturl" alt class="leftImg" @click="jumpB();" />
				</van-col>
				<van-col class="zshejishi">我的资质</van-col>
			</van-row>
		</header>
		<div class="anniu">
			<van-button type="danger" @click="tianjia_zizhi">添加</van-button>
		</div>
		<div id="index">
			<div class="proDetailHeader">
				<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
				</van-popup>
			</div>
			<div class="container">
				<van-grid :border="false" :column-num="2" class="tuijianBox">
					<van-grid-item v-for="(n, inx) in tuijianList" :key="inx">
						<img :src="'https://test.sazjob.com' +n.headimg" class="tuijianImg" @click="zizhi_xiangqing(n.shouye_id)"/>
						<div class="tuijianTxt">{{n.content}}</div>
						<van-row class="bianji_shanchu">
							<van-col span="12">
								<van-button round type="primary" size="mini" @click="bianji(n.id)">编辑</van-button>
							</van-col>
							<van-col span="12">
								<van-button round type="primary" size="mini" @click="shanchu(n.id)">删除</van-button>
							</van-col>
						</van-row>
					</van-grid-item>
				</van-grid>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "zizhi_my",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			show: false,
			tuijianList: [],
			xs:true
		};
	},
	methods: {
		jumpB() {
			this.$router.push({ name: "my"});
		},
		zizhi_xiangqing(n){
			/* this.$router.push({ name: "zizhi_xiangqing" ,params:{id:n}}); */
		},
		tianjia_zizhi() {
			this.$router.push({ name: "zizhi_add"});
		},
		zizhi_qingqiu() {
			this.$axios.post("https://test.sazjob.com/customapi/Zizhi/list").then(_d => {
				console.log(_d.data.data);
				var list = [];
				var map = {};
				for(var m in _d.data.data){
					var title = _d.data.data[m].title;
					var id = _d.data.data[m].id;
					var img = _d.data.data[m].img;
					map["headimg"] = img;
					map["content"] = title;
					map["id"] = id;
					list.push(map);
				}
				console.log(list);
				this.tuijianList = list;
			});
		},
		bianji(n){
			// https://test.sazjob.com/backapi/Zizhi/update
			this.$router.push({ name: "zizhi_bianji",params:{id:n}});
		},
		shanchu(n) {
			var promise = new Promise((resolve,reject)=>{
				this.$axios.post('https://test.sazjob.com/backapi/Zizhi/delete',{
					id:n,
					status:0
				}).then(_d => {
					console.log(_d);
					resolve(_d)
					if(_d.data.status === 200){
						this.$toast({
						  message: "删除成功",
						  icon: "chat-o"
						});
					}else if(_d.data.status === 201) {
						this.$toast({
						  message: "操作失败",
						  icon: "chat-o"
						});
					}
				})
			})
			promise.then((_d)=>{
				this.$axios.post("https://test.sazjob.com/customapi/Zizhi/list").then(response => {
					console.log(response.data.data);
					var list = [];
					var map = {};
					for(var m in response.data.data){
						var title = response.data.data[m].title;
						var id = response.data.data[m].id;
						var img = response.data.data[m].img;
						map["headimg"] = img;
						map["content"] = title;
						map["id"] = id;
						list.push(map);
						map = {}
					}
					console.log(list);
					this.tuijianList = list;
				});
			})
		}
	},
	watch: {
		$route(to,from){
			if(to.path == '/zizhi_my'){
				this.zizhi_qingqiu();
			}
		}
	},
	created() {
		this.$toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
			overlay :this.xs
		});
		this.$axios.post("https://test.sazjob.com/customapi/Zizhi/list").then(_d => {
			/* this.tuijianList = _d.data.data.list; */
			console.log(_d);
			console.log(_d.data.data);
			this.xs = false;
			this.$toast.clear();
			var list = [];
			var map = {};
			if(_d.data.status === 201){
				this.$toast({
					message: "您暂未上传过任何资质",
					icon: "chat-o"
				});
				this.$toast.setDefaultOptions({ duration: 2000 });
			}
			for(var m in _d.data.data){
				var title = _d.data.data[m].title;
				var id = _d.data.data[m].id;
				var img = _d.data.data[m].img;
				map["headimg"] = img;
				map["content"] = title;
				map["id"] = id;
				list.push(map);
				map = {}
			}
			console.log(list);
			this.tuijianList = list;
		});
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
.anniu{
	text-align: right;
}
.proDetailHeader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  line-height: 1rem;
  padding: 0.15rem 0.3rem;
  font-size: 0.5rem;
  font-weight: 700;
  background-color: #fafafa;
}
.container {
  margin: 0 0.3rem;
}
.tuijian {
  margin: 0.1rem 0 0 0.3rem;
  font-size: 0.4rem;
}
.tuijianImg {
  width: 4.27rem;
  height: 4.27rem;
  border-radius: 0.2rem;
}
.tuijianTxt {
  width: 4.27rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  text-align: center;
}
.tuijianBox {
  margin-bottom: 1.3rem;
}
.tuijianBox >>> .van-grid-item__content{
  padding: 0.5rem 0.1rem;
}
</style>
