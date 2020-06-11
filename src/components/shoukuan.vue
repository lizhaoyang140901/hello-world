<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">设置收款账号</van-col>
      </van-row>
    </header>
    <div class="bank_content">
    	<div class="card">
        <div class="card_number">
          <img class="img-responsive" src="../assets/images/bank_img0.png">
          <div class="txt0"><span>卡号：</span><br>**** **** **** ****</div>
          <van-icon name="add" size="1rem" class="tianjia" @click="tjskzh"/>
        </div>
        <div class="youxiaoqi">有效期：**/**</div>
      </div>
    </div>
	<van-cell-group>
	  <van-field label="卡号" v-model="text" readonly />
	</van-cell-group>
    <div class="pop" v-if="tian">
      <van-row class="pop_first">
        <van-col>
          <img :src="lefturl" alt class="leftimg" @click="tjskzh1"/>
        </van-col>
        <van-col class="zshejishi">添加账号</van-col>
      </van-row>
      <van-cell-group>
        <van-field v-model="yinhang" placeholder="请输入银行卡号" />
		<!-- 手机号 -->
		<van-field v-model="tel" type="number" placeholder="请输入手机号" maxlength="11" />
		<!-- 验证码 -->
		<van-field v-model="sms" center clearable placeholder="请输入短信验证码" type="number">
		  <template #button>
		    <van-button size="small" type="primary" @click="zc_verify" v-show="show">获取验证码</van-button>
		    <van-button size="small" type="primary" class="count" v-show="!show">{{ count }}</van-button>
		  </template>
		</van-field>
		<van-cell-group>
		  <van-field
		    v-model="password"
		    placeholder="请输入密码"
		    type="password"
		    style="width:8rem"
		    maxlength="12"
		    v-show="!dl_password"
		  />
		  <van-field
		    v-model="password"
		    placeholder="请输入密码"
		    style="width:8rem"
		    maxlength="12"
		    v-show="dl_password"
		  />
		  <div class="dl_showpsd" @click="changeeyes" :class="{changeeyes:dl_password}"></div>
		</van-cell-group>
      </van-cell-group>
      <div class="zhBtn" @click="tijiao_kahao">添加卡号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xiaoguotu",
  data() {
		return {
			lefturl:require('../assets/my/left.png'),
			tian:false,
			yinhang:'',
			tel:'',
			sms:'',
			password:'',
			dl_password: false,
			show: true,
			count:'',
			verify_id:'',
			text:''
		};
  },
  mounted() {
	  this.$axios.post('https://test.sazjob.com/customapi/Usertool/mytxzhm').then(_d => {
		  console.log(_d);
		  console.log(_d.data.data.txzh);
		  this.text = _d.data.data.txzh
			/* alert(this.text) */
	  })
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
    tjskzh() {
      this.tian = true
    },
    tjskzh1(){
      this.tian = false
    },
	changeeyes(){
		this.dl_password = !this.dl_password;
	},
	zc_verify() {
	  if (this.tel == "") {
	    this.show = true;
	    clearInterval(this.timer);
	    this.timer = null;
	    this.$toast("手机号不能为空");
	  } else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/.test(this.tel)) {
	    this.show = true;
	    clearInterval(this.timer);
	    this.timer = null;
	    this.$toast("请正确填写手机号");
	  } else {
	    var Toast = this.$toast;
	    var $store = this.$store;
	    var that = this;
	    const TIME_COUNT = 60;
	    if (!this.timer) {
	      this.count = TIME_COUNT;
	      this.show = false;
	      this.timer = setInterval(() => {
	        if (this.count > 0 && this.count <= TIME_COUNT) {
	          this.count--;
	        } else {
	          this.show = true;
	          clearInterval(this.timer);
	          this.timer = null;
	        }
	      }, 1000);
	    }
	    this.$axios.post("https://test.sazjob.com/customapi/User/sendSms", {
	        mobile: this.tel
	      }).then(function(response) {
	        console.log(response.data);
	        console.log(response.data.code);
	        that.verify_id = response.data.key;
	        if (response.data.status == 200) {
	          Toast.success("验证码发送成功,请注意查收");
	        } else if (response.data.status == 201) {
	          Toast("请输入真实手机号");
	        } else if (response.data.status == 102) {
	          Toast("手机号格式错误");
	        } else {
	          Toast.fail("网络不佳请稍后重试");
	        }
	      }).catch(function(error) {
	        console.log(error);
	      });
	  }
	},
	tijiao_kahao() {
		var that = this;
		if (this.yinhang == "") {
			this.$toast({
				message: "卡号不能为空",
				icon: "chat-o"
			});
		} else if (this.tel == "") {
			this.$toast({
				message: "手机号不能为空",
				icon: "chat-o"
			});
		} else if (!/^1[3456789]\d{9}$/.test(this.tel)) {
			this.$toast({
				message: "请正确填写手机号",
				icon: "chat-o"
			});
		} else if(this.password == "") {
			this.$toast({
				message: "请输入密码",
				icon: "chat-o"
			});
		} else if (this.sms == "") {
			this.$toast({
				message: "请输入验证码",
				icon: "chat-o"
			});
		} 
		else if (!/^([1-9]{1})(\d{14}|\d{18})$/.test(this.yinhang)){
			console.log(this.yinhang)
			this.$toast({
				message: "卡号输入格式错误",
				icon: "chat-o"
			});
		}else {
			this.$axios.post('https://test.sazjob.com/customapi/User/settxzhm',{
				phone:this.tel,
				password:this.password,
				txzhm:this.yinhang,
				mobile:this.tel,
				verify_id:this.verify_id,
				verify:this.sms
			}).then(_d => {
				console.log(_d);
				if(_d.data.status == 200){
					this.$toast({
						message: "卡号添加成功",
						icon: "chat-o"
					});
					setTimeout(function() {
					  that.$router.push({ name: "zhanghu_my" });
					}, 1000);
				}else if(_d.data.status == 105){
					this.$toast({
						message: "添加失败，手机号不合法",
						icon: "chat-o"
					});
				}else if(_d.data.status == 106){
					this.$toast({
						message: "添加失败，登陆密码不正确",
						icon: "chat-o"
					});
				}else{
					this.$toast({
						message: "操作失败，请稍候重试",
						icon: "chat-o"
					});
				}
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
.leftimg{
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: middle;
}
.pop_first{
  padding-left: 0.2rem;
}
.tianjia{
  width: 1rem;
  height: 1rem;
  position: relative;
  left: 20%;
  top: 40%;
  color: #132ce7;
}
.bank_content{
  width:100%;
  padding:0.3rem;
  font-family: 'microsoft yahei',Verdana,Arial,Helvetica,sans-serif;
  font-size:0.24rem;
  background-color: #f8f9fb;
  height: 100%;
  max-width:7rem;
  margin:0 auto;
}
.card{
  height:3.2rem;
  background:url(../assets/images/bg_card.png) no-repeat;
  background-size:auto 100%;
}
.card .card_number{
  width:6rem;
  padding-top:0.48rem;
  height:1.26rem;
  margin-left:auto;
  margin-right:auto;
  color:#fff;
  line-height:0.6rem;
}
.card_number img{
  float:left;
  width:1.26rem;
  height:1.26rem;
}
.card_number .txt0{
  float:right;
  font-size:0.32rem;
}
.card_number span{
  font-size:0.22rem;
}
.card .youxiaoqi{
  width:6rem;
  height:0.24rem;
  color:#fff;
  margin-top:0.6rem;
  float:left;
  padding-left:0.5rem;
  font-size:0.22rem;
}
.bangding{
  width:6.3rem;
  height:0.98rem;
  margin-top:1rem;
  margin-left:auto;
  margin-right:auto;
  border:#b1b1b1 dashed 0.01rem;
  font-size:0.26rem;
  text-align:center;
  line-height:0.98rem;
}
.bangding a{
  color:#b1b1b1;
}
.pop {
	width: 90%;                       
	height: 8rem;
	z-index: 130;
	background-color: #fff;
	border: 0.1rem solid #eaeaea;
	box-sizing: border-box;
	border-radius: 0.2rem;
	padding: 0.5rem;
	margin: auto;
}
.zhBtn{
    background: #6678ff;
    height: 1.2rem;
    border-radius: 0.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
}
.changeeyes {
  float: right;
  background: url("../assets/my/zhengyan.png") no-repeat 0 0;
  width: 0.8rem;
  height: 0.6rem;
  margin-top: 0.3rem;
  margin-right: 0.4rem;
}
</style>
