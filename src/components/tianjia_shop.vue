<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">添加商品</van-col>
      </van-row>
    </header>
	<div>
		<van-field v-model="shop_name" label="商品名称" placeholder="请输入商品名称" />
		<van-field v-model="shop_jiage" type="digit" label="商品价格" placeholder="请输入商品价格" />
		<van-field v-model="shop_fenlei" label="商品分类" readonly/>
		<!-- <van-field v-model="shop_fenlei" label="商品分类" placeholder="点击选择商品分类"  @click="showPicker = true"/>
		<van-popup v-model="showPicker" position="bottom">
		  <van-picker
		    show-toolbar
		    :columns="columns"
		    @confirm="onConfirm"
		    @cancel="showPicker = false"
		  />
		</van-popup> -->
		<!-- <van-field v-model="shop_dizhi" label="发货地址" placeholder="请输入发货地址" /> -->
		<van-field
		  disabled
		  label="省市区"
		  v-model="jiguan_ssq"
		  placeholder="请选择省市区"
		  @click="jiguan = true"/>
		<van-popup v-model="jiguan" position="bottom">
		  <van-area
		  :area-list="areaList"
		  :columns-placeholder="['请选择', '请选择', '请选择']"
		  @cancel="jiguan = false"
		  @confirm="jiguantijiao"
		  />
		</van-popup>
		<div>
			<van-row>
			  <van-col class="txmm">商品展示图</van-col>
			</van-row>
			<div class="picWrapper">
			    <img id="tuu" :src="tt" @click="nnn(abc)" v-show="utu">
			</div>
		</div>
		<div class="box">
		    <span class="reports">商品描述</span>
		    <div class="miaoshu">
				<van-field
					class="miaoshu_text"
				    v-model="shop_miaoshu"
				    rows="2"
				    autosize
				    type="textarea"
				    maxlength="300"
				    placeholder="请输入您的商品描述，内容不能为空。"
				    show-word-limit
				/>
			</div>
		</div>
		<div class="bottom" @click="tijiao_shop">
			<van-button round type="primary" size="normal" color="#7244e2">
				<span class="anniu">提交</span>
			</van-button>
		</div>
	</div>
  </div>
</template>

<script>
import ditushuju from '../assets/area.js'
import store from '../../store/index'

export default {
	name: "tianjia_shop",
	data() {
		return {
				lefturl:require('../assets/images/left.png'),
				shop_name: '',
				shop_jiage: '',
				shop_fenlei: '',
				shop_dizhi: '',
				// showPicker: false,
				// columns: ['家具', '家电', '灯具', '地砖', '地板', '门窗卫浴', '软装', '木工辅料', '泥工辅料', '油漆辅料', '水电辅料'],
				jiguan_ssq: '',
				areaList: ditushuju,
				jiguan: false,
				shop_miaoshu: '',
				tuuu: true,
				touurl: "",
				tt: false,
				utu: false
		};
	},
	mounted() {
		var idid = this.$route.params.id
		if (idid == 1) {
			this.shop_fenlei = "家具";
		} else if (idid == 2) {
			this.shop_fenlei = "家电";
		} else if (idid == 3) {
			this.shop_fenlei = "灯具";
		} else if (idid == 4) {
			this.shop_fenlei = "地砖";
		} else if (idid == 5) {
			this.shop_fenlei = "地板";
		} else if (idid == 6) {
			this.shop_fenlei = "门窗卫浴";
		} else if (idid == 7) {
			this.shop_fenlei = "软装";
		} else if (idid == 8) {
			this.shop_fenlei = "木工辅料";
		} else if (idid == 9) {
			this.shop_fenlei = "泥工辅料";
		} else if (idid == 10) {
			this.shop_fenlei = "油漆辅料";
		} else if (idid == 11) {
			this.shop_fenlei = "水电辅料";
		} 
		// console.log(this.shop_fenlei);
	},
	methods: {
		jumpB() {
			this.$router.push({ name: "shop_guanli" });
		},
		// onConfirm(value) {
		//   this.shop_fenlei = value;
		//   this.showPicker = false;
		// },
		nnn(a) {
			tupian(a)
		},
		abc(ooo) {
			if(ooo){
				this.utu = true
				this.touurl = ooo
				this.tt = "https://test.sazjob.com/" + ooo
			}
		},
		jiguantijiao(val){
			let sheng = val[0].name
			let shi = val[1].name
			let qu = val[2].name
			this.jiguan_ssq = sheng+"-"+shi+"-"+qu
			this.jiguan = false
		},
		tijiao_shop(){
			console.log("提交商品");
			if (this.shop_name == "") {
			  this.$toast({
				message: "商品名称不能为空",
				icon: "chat-o"
			  });
			} else if(this.shop_jiage == "") {
				this.$toast({
				  message: "商品价格不能为空",
				  icon: "chat-o"
				});
			} 
			// else if(this.shop_fenlei == "") {
			// 	this.$toast({
			// 	  message: "商品分类不能为空",
			// 	  icon: "chat-o"
			// 	});
			// } 
			// else if(this.shop_dizhi == "") {
			// 	this.$toast({
			// 	  message: "发货地址不能为空",
			// 	  icon: "chat-o"
			// 	});
			// } 
			else if(this.jiguan_ssq == "") {
				this.$toast({
				  message: "省市区不得为空",
				  icon: "chat-o"
				});
			}else if(document.getElementById("tuu").src == '') {
				this.$toast({
				  message: "商品图片不能为空",
				  icon: "chat-o"
				});
			} else if(this.shop_miaoshu == "") {
				this.$toast({
				  message: "商品描述不能为空",
				  icon: "chat-o"
				});
			} else if(!/^[0-9]*$/.test(this.shop_jiage)) {
				this.$toast({
				  message: "商品价格只能是数字",
				  icon: "chat-o"
				});
			} else {
				var _this = this;
				var fen_id = '';
				if (this.shop_fenlei == "家具") {
				  fen_id = "1";
				} else if (this.shop_fenlei == "家电") {
				  fen_id = "2";
				} else if (this.shop_fenlei == "灯具") {
				  fen_id = "3";
				} else if (this.shop_fenlei == "地砖") {
				  fen_id = "4";
				} else if (this.shop_fenlei == "地板") {
				  fen_id = "5";
				} else if (this.shop_fenlei == "门窗卫浴") {
				  fen_id = "6";
				} else if (this.shop_fenlei == "软装") {
				  fen_id = "7";
				} else if (this.shop_fenlei == "木工辅料") {
				  fen_id = "8";
				} else if (this.shop_fenlei == "泥工辅料") {
				  fen_id = "9";
				} else if (this.shop_fenlei == "油漆辅料") {
				  fen_id = "10";
				} else if (this.shop_fenlei == "水电辅料") {
				  fen_id = "11";
				} 
				var name = this.shop_name;
				var des = this.shop_miaoshu;
				var img = this.touurl;
				var sell = this.shop_jiage;
				var type_id = fen_id;
				store.dispatch("tijiaospid",type_id).then(res => {})
				var ssq_sheng = this.jiguan_ssq.split("-")[0];
				var ssq_shi = this.jiguan_ssq.split("-")[1];
				var ssq_qu = this.jiguan_ssq.split("-")[2];
				this.$axios.post('https://test.sazjob.com/backapi/Goods/add',{
					name:name,
					des:des,
					img:img,
					sell:sell,
					type_id:type_id,
					province:ssq_sheng,
					city:ssq_shi,
					converge:ssq_qu
				}).then(_d => {
					console.log(_d);
					if(_d.data.status === '200'){
						this.$toast({
						  message: "添加成功",
						  icon: "chat-o"
						});
						setTimeout(() => {
							_this.$router.push({ name: "shop_guanli" });
						},1000)
					}else{
						this.$toast({
						  message: "添加失败",
						  icon: "chat-o"
						});
					}
				});
			}
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
.txmm{
	font-size: 0.4rem;
    margin-top: 0.5rem;
    margin-left: 0.4rem;
}
.picWrapper {
	width: 95%;
	margin: 0.4rem;
}
.miaoshu{
	border: 0.1rem solid #f2f2f2;
    margin: 0.2rem 0;
    border-radius: 0.15rem;
}
.bottom{
	text-align: center;
    margin: 0.5rem;
}
.anniu{
	width: 6rem;
    display: block;
}
.box{
    margin: 0 .4rem;
}
.reports{
    font-size: 0.4rem;
    color: #666;
}
#tuu{
	width: 2.5rem;
	height: 2.5rem;
	background-size: 100% 100%;
	background-image: url('../assets/images/tian.jpg');
	display: block !important;;
}

</style>
