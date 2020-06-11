<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">商品浏览</van-col>
      </van-row>
    </header>
	<div class="content">
		<!-- <div class="top_first">
			<van-search v-model="gongsi" shape="round" placeholder="请输入公司名" />
		</div> -->
		<div class="top_two">
			<van-dropdown-menu :overlay="false">
				<van-dropdown-item title="区域" ref="item">
					<van-area :area-list="areaList" 
							  :columns-placeholder="['请选择', '请选择', '请选择']"
							  @cancel="quyu_guanbi"
							  @confirm="quyu_queren"/>
				</van-dropdown-item>
			</van-dropdown-menu>
			<div class="content_left">
				<van-sidebar v-model="left_Key" @change="onChange"> 
					<div class="content_left_list" v-for="(n, index) in left_list" :key="index">
						<van-sidebar-item :title="n.title" :disabled="n.duicuo"/>
					</div>
				</van-sidebar>
			</div>
			<div class="content_right">
				<shop_list :tell="this.chuan" :di="this.quyu"></shop_list>
			</div>
		</div>
	</div>
  </div>
</template>

<script>	
import { Notify } from 'vant';
import shop_list from './shop_list.vue';
import ditushuju from '../assets/area.js';
import store from '../../store/index';

export default {
	name: "shop",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			gongsi:'',
			areaList: ditushuju,
			left_list:[
				{title:"家具"},{title:"家电"},{title:"灯具"},{title:"地砖"},{title:"地板"},{title:"门窗卫浴"},
				{title:"软装"},{title:"木工辅料"},{title:"泥工辅料"},{title:"油漆辅料"},{title:"水电辅料"}
			],
			left_Key: 1,
			chuan: '',
			quyu: ''
		};
	},
	components:{shop_list},
	methods: {
		jumpB() {
			this.$router.push({ name: "Index"});
		},
		quyu_guanbi() {
			this.$refs.item.toggle();
		},
		quyu_queren(val) {
			let sheng = val[0].name
			let shi = val[1].name
			let qu = val[2].name
			this.$refs.item.toggle();
			this.quyu = shi;
		},
		onChange(index) {
			this.chuan = index+1
		}
	},
	mounted() {
		this.left_Key = store.state.shopflid?(store.state.shopflid - 1):1
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
.content_left{
	float: left;
	height: 11.8rem;
	overflow-x: hidden;
	overflow-y: scroll;
}
.content_left::-webkit-scrollbar{
	display: none;
}
.content_right{
    float: left;
    width: 70%;
}
</style>
