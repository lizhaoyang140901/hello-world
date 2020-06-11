<template>
	<div>
		<header>
			<van-row>
				<van-col>
					<img :src="lefturl" alt class="leftImg" @click="jumpB();" />
				</van-col>
				<van-col class="zshejishi">保险详情</van-col>
			</van-row>
		</header>
		<div>
			<van-cell-group>
				<van-field v-model="baoxian_name" label="保险名称:" readonly/>
				<van-field v-model="baoxian_jiage" label="保险金额:" readonly/>
				<van-field v-model="baoxian_shijian" label="保险有效期:" readonly/>
				<van-field v-model="baoxian_hetong" label="保险合同:" readonly/>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
export default {
	name: "baoxian_xq",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			baoxian_name:'',
			baoxian_jiage:'',
			baoxian_shijian:'',
			baoxian_hetong:''
		};
	},
	methods: {
		jumpB() {
			this.$router.go(-1);
		}
	},
	mounted() {
		var n =this.$route.params.id
		this.$axios.get("https://test.sazjob.com/customapi/Baoxian/view?baoxian_type_id=" + n).then(_d => {
			console.log(_d);
			console.log(_d.data.data);
			this.baoxian_name = _d.data.data[0].name;
			this.baoxian_jiage = '￥'+_d.data.data[0].money;
			this.baoxian_shijian = _d.data.data[0].time_period + '天';
			this.baoxian_hetong = _d.data.data[0].hetong;
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
</style>
