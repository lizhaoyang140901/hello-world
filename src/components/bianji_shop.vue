<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">修改商品</van-col>
      </van-row>
    </header>
	<div>
		<van-field v-model="shop_name" label="商品名称" placeholder="请输入商品名称" />
		<van-field v-model="shop_jiage" type="digit" label="商品价格" placeholder="请输入商品价格" />
		<van-field v-model="shop_fenlei" label="商品分类" readonly/>
		<!-- <van-field v-model="shop_fenlei" label="商品分类" placeholder="点击选择商品分类"  disabled @click="showPicker = true"/>
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
		  label="省市区"
		  disabled
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
		<van-row>
		  <van-col class="txmm">商品展示图</van-col>
		</van-row>
		<div class="picWrapper">
		    <img id="tuu" :src="tt" @click="nnn(abc)" v-show="utu">
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
  name: "bianji_shop",
  data() {
    return {
		lefturl: require('../assets/images/left.png'),
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
		touurl: "",
		tt: false,
		utu: true
    };
  },
  watch: {
  	$route(to,from){
  		if(to.path === '/bianji_shop'+this.$route.params.id){
  			this.$axios.get('https://test.sazjob.com/backapi/Goods/view?id='+ this.$route.params.id).then(_d => {
				console.log(_d)
			})
  		}
  	}
  },
  mounted (){
	  this.$axios.get('https://test.sazjob.com/backapi/Goods/view?id='+ this.$route.params.id).then(_d => {
	  console.log(_d.data.data);
		this.shop_name = _d.data.data.name;
		this.shop_jiage =  _d.data.data.sell;
		this.shop_fenlei = this.ftspid(_d.data.data.type_id);
		this.jiguan_ssq = _d.data.data.province + "-" + _d.data.data.city + "-" + _d.data.data.converge;
		this.tt = "https://test.sazjob.com/" + _d.data.data.img;
		this.shop_miaoshu = _d.data.data.des;
	  })
  },
  methods: {
    jumpB() {
      this.$router.push({ name: "shopxqy" });
    },
	ftspid(idid) {
		if (idid == 1) {
			return "家具";
		} else if (idid == 2) {
			return "家电";
		} else if (idid == 3) {
			return "灯具";
		} else if (idid == 4) {
			return "地砖";
		} else if (idid == 5) {
			return "地板";
		} else if (idid == 6) {
			return "门窗卫浴";
		} else if (idid == 7) {
			return "软装";
		} else if (idid == 8) {
			return "木工辅料";
		} else if (idid == 9) {
			return "泥工辅料";
		} else if (idid == 10) {
			return "油漆辅料";
		} else if (idid == 11) {
			return "水电辅料";
		} 
	},
	tijiaoid(m) {
		if (m == "家具") {
		  return "1";
		} else if (m == "家电") {
		  return "2";
		} else if (m == "灯具") {
		  return "3";
		} else if (m == "地砖") {
		  return "4";
		} else if (m == "地板") {
		  return "5";
		} else if (m == "门窗卫浴") {
		  return "6";
		} else if (m == "软装") {
		  return "7";
		} else if (m == "木工辅料") {
		  return "8";
		} else if (m == "泥工辅料") {
		  return "9";
		} else if (m == "油漆辅料") {
		  return "10";
		} else if (m == "水电辅料") {
		  return "11";
		} 
	},
	nnn(a) {
		tupian(a);
	},
	abc(ooo) {
		if(ooo){
			this.utu = true
			this.touurl = ooo
			this.tt = "https://test.sazjob.com/" + ooo
		}
	},
	// onConfirm(value) {
	//   this.shop_fenlei = value;
	//   this.showPicker = false;
	// },
	jiguantijiao(val){
		let sheng = val[0].name
		let shi = val[1].name
		let qu = val[2].name
		this.jiguan_ssq = sheng+"-"+shi+"-"+qu
		this.jiguan = false
	},
	tijiao_shop(){
		let n = this.$route.params.id
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
		} else if(this.shop_fenlei == "") {
			this.$toast({
			  message: "商品分类不能为空",
			  icon: "chat-o"
			});
		} 
		/* else if(this.shop_dizhi == "") {
			this.$toast({
			  message: "发货地址不能为空",
			  icon: "chat-o"
			});
		} */ 
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
			// console.log(n);
			// console.log(this.shop_name);
			// console.log(this.shop_miaoshu);
			// console.log(this.fileImgList[0].url.slice((this.fileImgList[0].url.indexOf("com/")+3)));
			// console.log(this.shop_jiage);
			// console.log(this.shop_fenlei);
			// console.log(1);
			// console.log(this.jiguan_ssq.split("-")[0]);
			// console.log(this.jiguan_ssq.split("-")[1]);
			// console.log(this.jiguan_ssq.split("-")[2])
			store.dispatch("tijiaospid",this.tijiaoid(this.shop_fenlei)).then(res => {})
			this.$axios.post('https://test.sazjob.com/backapi/Goods/edit',{
				id:n,
				name:this.shop_name,
				des:this.shop_miaoshu,
				img:this.touurl?this.touurl:this.tt.slice(this.tt.indexOf("com/") + 4),
				sell:this.shop_jiage,
				type_id:this.tijiaoid(this.shop_fenlei),
				status:1,
				province: this.jiguan_ssq.split("-")[0],
				city: this.jiguan_ssq.split("-")[1],
				converge: this.jiguan_ssq.split("-")[2],
			}).then(_d => {
				console.log(_d);
				this.$toast({
				  message: "修改成功",
				  icon: "chat-o"
				});
				setTimeout(() => {
					_this.shop_name ='';
					_this.shop_miaoshu ='';
					_this.shop_jiage ='';
					_this.fileImgList = [];
					_this.img_list = [];
					_this.shop_fenlei ='';
					_this.jiguan_ssq ='';
					_this.shop_dizhi = '';
					_this.$router.push({ name: "shop_guanli" });
				},2000)
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
.bottom{
	text-align: center;
    margin: 0.5rem;
}
.anniu{
	width: 6rem;
    display: block;
}
.box{
    margin: 0 0.4rem;
}
.reports{
    font-size: 0.4rem;
    color: #666;
}
.miaoshu{
	border: 0.1rem solid #f2f2f2;
    margin: 0.2rem 0;
    border-radius: 0.15rem;
}
#tuu{
	width: 2.5rem;
	height: 2.5rem;
	background-size: 100% 100%;
	background-image: url('../assets/images/tian.jpg');
}
</style>
