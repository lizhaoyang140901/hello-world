<template>
	<div id="index">
		<div class="proDetailHeader">
			<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			</van-popup>
		</div>
		<div class="container">
			<van-grid :border="false" :column-num="2" class="tuijianBox">
				<van-grid-item v-for="(n, inx) in tuijianList" :key="inx">
					<img :src="'https://test.sazjob.com' +n.headimg" class="tuijianImg" @click="tuijian_xiangqing(n.shouye_id)"/>
					<div class="tuijianTxt">{{n.content}}</div>
					<van-row class="juchangClass">
						<van-col span="3">
							<img :src="'https://test.sazjob.com' +n.logo" class="tuijianLogo" />
						</van-col>
						<van-col span="12">
							<div class="juchangTxt">{{n.title}}</div>
						</van-col>
						<van-col class="juchangRight">
							<!-- <div class="heartNumber">{{n.loves}}</div>
							<img :src="imgUrl" 
								alt 
								:class="{xz:colornum == inx}"
								ref="colorinfo"
								@click="clickPic(inx)" 
								style="margin-bottom: 0.1rem; width: 0.4rem; height: 0.4rem; "/> -->
						</van-col>
					</van-row>
				</van-grid-item>
			</van-grid>
		</div>
	</div>
</template>

<script>
export default {
	name: "index",
	data() {
		return {
			show: false,
			colornum: 0,
			imgIndex: 0,
			tuijianList: [],
			imgUrl: require("../assets/images/heart.png"),
			shifou: true
		};
	},
	methods: {
		xihuan() {
			return require("../assets/images/heartactive.png");
		},
		buxihuan() {
			return require("../assets/images/heart.png");
		},
		tuijian_xiangqing(n){
			this.$router.push({ name: "tuijian_xiangqing" ,params:{id:n}});
		},
		clickPic(m) {
			this.colornum = m;
			this.shifou = !this.shifou
			if(this.shifou == false){
				this.$refs.colorinfo[m].src = this.xihuan();
			}else{
				this.$refs.colorinfo[m].src = this.buxihuan();
			}
		}
	},
	created() {
		this.$axios.get("https://test.sazjob.com/backapi/HomePage/index").then(_d => {
			this.tuijianList = _d.data.data.list;
			console.log(_d)
			console.log(_d.data.data.list);
		});
	}
};
</script>
<style scoped>
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
}
.tuijianLogo {
  width: 0.5rem;
  height: 0.5rem;
}
.juchangClass {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.1rem;
}
.juchangTxt {
  margin-left: 0.1rem;
}
.juchangRight {
  float: right;
}
.heartNumber {
  float: right;
  margin-left: 0.05rem;
}
.tuijianBox {
  margin-bottom: 1.3rem;
}
.tuijianBox >>> .van-grid-item__content{
  padding: 0.5rem 0.1rem;
}
</style>
