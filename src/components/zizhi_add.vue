<template>
  <div>
    <header>
		<van-row>
			<van-col>
				<img :src="lefturl" alt class="leftImg" @click="jumpB();" />
			</van-col>
			<van-col class="zshejishi">添加资质</van-col>
		</van-row>
    </header>
		<div>
			<van-field v-model="zizhi_title" label="资质名称" placeholder="请输入资质名称" />
			<van-row>
				<van-col class="txmm">资质证材料</van-col>
			</van-row>
			<div class="picWrapper">
			    <img id="tuu" :src="tt" @click="nnn(abc)" v-show="utu">
			</div>
		</div>
		<div class="zhBtn" @click="tijiao">提交</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "zizhi_add",
  data() {
    return {
		lefturl:require('../assets/images/left.png'),
		zizhi_title: '',
		touurl: "",
		tt: false,
		utu: true
    };
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
	nnn(a) {
		tupian(a);
	},
	abc(ooo) {
		if(ooo){
			this.touurl = ooo;
			this.tt = "https://test.sazjob.com/" + ooo
		}
	},
	tijiao() {
		if (this.zizhi_title == "") {
		  this.$toast({
		    message: "资质名称不能为空",
		    icon: "chat-o"
		  });
		} else if(document.getElementById("tuu").src == '') {
			this.$toast({
			  message: "资质照片不能为空",
			  icon: "chat-o"
			});
		} else{
			var that = this;
			this.$axios.post("https://test.sazjob.com/backapi/Zizhi/add",{
				title:this.zizhi_title,
				img: this.touurl
			}).then(_d => {
				this.$toast({
					message: "修改成功",
					icon: "chat-o"
				});
				console.log(_d);
				setTimeout(function() {
					that.$router.push({ name: "zizhi_my"});
				}, 1000);
			})
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
	height: 1rem;
    line-height: 1rem;
    font-size: 0.38rem;
    padding-left: 0.4rem;
}
.picWrapper {
  width: 93%;
  margin: 0 auto;
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
#tuu{
	width: 2.5rem;
	height: 2.5rem;
	background-size: 100% 100%;
	background-image: url('../assets/images/tian.jpg');
}
</style>
