<template>
	<div>
		<header>
			<van-row>
				<van-col>
					<img :src="lefturl" alt class="leftImg" @click="jumpB();" />
				</van-col>
				<van-col class="zshejishi">我的分享</van-col>
			</van-row>
		</header>
		<div class="centent" ref="colorinfo">
			<div class="biaozhu">
				{{text}}
			</div>
			<div class="erweima">
				<img :src="erweimaurl">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "fenxiangmy",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			text:'注册成功,送优惠钱包1000,邀请注册送500;我们的注册之后获得的1000优惠钱包,是可以转赠的!!!',
			screenHeight: document.documentElement.clientHeight,
			erweimaurl:'',
			xs:true
		};
	},
	methods: {
		jumpB() {
			this.$router.go(-1);
		}
	},
	watch: {
		screenHeight(val){ //监听屏幕高度变化
			this.$refs.colorinfo.style["height"] = (Number(val)) + 'px';
		}
	},
	mounted() {
		var _this = this;
		window.onresize = function(){ // 定义窗口大小变更通知事件
		    _this.screenHeight = document.documentElement.clientHeight; //窗口高度
		};
		this.$toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
			overlay :this.xs
		});
		this.$refs.colorinfo.style["height"] = ((this.screenHeight)*0.6)+ "px"
		this.$axios.post('https://test.sazjob.com/customapi/Fenchai/fenxiang').then(_d => {
			this.xs = false;
			this.$toast.clear();
			this.erweimaurl = "https://test.sazjob.com/tiaoxing2/index2.php?tt=" + _d.data.data.yqcode;
		})
	}
}
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
.centent{
	display: flex;
    flex-direction: column;
    height: 100%;
}
.biaozhu{
	width: auto;
    height: 25%;
    text-align: left;
    font-size: 0.5rem;
    font-family: monospace;
    padding: 0.5rem;
}
.erweima{
	width: 70%;
    height: 75%;
    position: relative;
    overflow: hidden;
    padding-bottom: 100%;
    margin: auto;
}
.erweima img{
    width: 100%;
    position: absolute;
}
</style>
