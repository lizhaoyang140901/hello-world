<template>
  <div>
    <div class="dl_title">
      <span>登录</span>
    </div>
	<div id="logo">
		<img :src="loginimgurl">
	</div>
    <!-- 手机号 -->
    <van-field v-model="tel" type="number" placeholder="请输入手机号" maxlength="11" />
    <!-- 输入密码 -->
    <van-cell-group>
      <van-field
        v-model="value"
        placeholder="请输入密码"
        type="password"
        style="width:8rem"
        maxlength="12"
        v-show="!dl_eyes"
      />
      <van-field
        v-model="value"
        placeholder="请输入密码"
        style="width:8rem"
        maxlength="12"
        v-show="dl_eyes"
      />
      <div class="dl_showpsd" v-on:click="changeeyes" v-bind:class="{changeeyes:dl_eyes}"></div>
    </van-cell-group>

    <!-- 提交按钮 -->
    <div style="margin:105px 16px 16px 16px;">
      <van-button round block type="info" native-type="submit" @click="dl_tijiao">登录</van-button>
    </div>
    <div class="a123">
      <div class="dl_choice">
        <div class="dl_zhuce" @click="dl_zhuce">立即注册</div>
        <div class="dl_fen">|</div>
        <div class="dl_forget" @click="dl_forget">忘记密码</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import base64 from '../assets/file.js'

export default {
	name: "login",
	data() {
		return {
			tel: "",
			password: "",
			value1: "",
			dl_eyes: false,
			activeDisplay: "block",
			value: "",
			loginimgurl: base64.loginurl["url"],
			sfdl: '',
		};
	},
	methods: {
		dl_tijiao() {
			var that = this;
			if (this.tel == "") {
				this.$toast({
				message: "手机号不能为空",
				icon: "chat-o"
			});
			} else if (!/^1[3456789]\d{9}$/.test(this.tel)) {
				this.$toast({
				message: "请正确填写手机号",
				icon: "chat-o"
				});
			} else if (this.value == "") {
				// this.$toast('请输入验证码');
				this.$toast({
				message: "请输入密码",
				icon: "chat-o"
				});
			} else {
				var Toast = this.$toast;
				var _this = this;
					if(typeof (api) == 'undefined'){
						this.$axios.post("https://test.sazjob.com/customapi/User/login", {
							phone: this.tel,
							password: this.value
						}).then(response => {
							console.log(response);
							if (response.data.status == 200) {
								Toast.success("登录成功");
								if(typeof save_user === "function"){
									save_user(response);
									_this.$router.push({ name: "Index" });
								}else{
									store.commit("userid", response.data.data.userclass_id);
									store.commit("set_token", response.data.token);
									store.commit("nicheng",response.data.data.nickname);
									_this.$router.push({ name: "Index" });
								}
							} else if (response.data.status == 201) {
								Toast.fail("账号或密码输入有误");
							} else if (response.data.status == 120) {
								Toast.fail("账号或密码输入有误");
							} else if (response.data.status == 10) {
								Toast.fail("操作次数过多，请稍后尝试");
							} else {
								Toast.fail("网络不佳，请稍后重试");
							}
						})
						.catch(function(error) {
							console.log(error);
						});
					}else{
						api.ajax({
							url: 'https://test.sazjob.com/customapi/User/login',
							method: 'post',
							data: {
								values:{phone: this.tel,password: this.value}
							}
						},function(response,err){
							if (response) {
								// api.alert({msg:JSON.stringify(ret)});
								// api.alert({msg:JSON.stringify(ret.status)});
								// api.alert({msg:JSON.stringify(ret.status === '200')});
								// api.alert({msg:JSON.stringify(ret.status === '201')});
								// console.log(ret);
								if(response.status === "200"){
									Toast.success("登录成功");
									if(typeof save_user === "function"){
										// save_user_info(response);
										save_user(response);
									}else{
										store.commit("userid", response.data.data.userclass_id);
										store.commit("set_token", response.data.token);
										store.commit("nicheng",response.data.data.nickname);
									}
									_this.$router.push({ name: "Index" });
								} else if (response.status === "201") {
									Toast.fail("账号或密码输入有误");
								} else if (response.status === "120") {
									Toast.fail("账号或密码输入有误");
								} else if (response.status === "10") {
									Toast.fail("操作次数过多，请稍后尝试");
								} else {
									Toast.fail("网络不佳，请稍后重试");
								}
							} else {
								// api.alert({msg:JSON.stringify(err)});
								console.log(err);
							};
						});
					}
				
			}
		},
		changeeyes() {
			this.dl_eyes = !this.dl_eyes;
		},
		dl_zhuce() {
			this.$router.push({ name: "zhuce_my" });
		},
		dl_forget() {
			this.$router.push({ name: "wangji_my" });
		}
	},
	watch:{
		screenHeight(val){ //监听屏幕高度变化
			this.$refs.colorinfo.style["height"] = (Number(val)) + 'px';
		}
	}
	// created (){
	// 	this.$axios.post('https://test.sazjob.com/customapi/Usertool/islogin',{
	// 		Authorization:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQueGhhZG1pbiIsImF1ZCI6InNlcnZlci54aGFkbWluIiwiaWF0IjoxNTg4NDc5ODA5LCJleHAiOjE2MjAwMTU4MDksInVpZCI6MjJ9.Ug4MUMJ9lmPbFoD3G5FKro0-GLgkYlfYVoS95nqHqKo"
	// 	}).then(_d => {
	// 		alert(_d.data.data.user_info_id);
	// 	})
	// }
};
</script>
<style scoped>
#logo img{
	width: 7.5rem;
	text-align: center;
	display: block;
	margin: 0 auto;
}
.dl_title {
  background-color: #fafafa;
  padding: 0px 16px;
  height: 1.4rem;
  line-height: 1.4rem;
}
.zhBtn {
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
.dl_title img {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.dl_title span {
  font-size: 0.5rem;
  height: 1.4rem;
  line-height: 1.4rem;
  text-align: center;
  display: block;
}
.van-cell {
  float: left;
}
.van-cell-group {
  float: left;
  width: 100%;
}
.dl_showpsd {
  float: right;
  background: url("../assets/my/biyan.png") no-repeat 0 0;
  width: 0.8rem;
  height: 0.5rem;
  margin-top: 0.5rem;
  margin-right: 0.4rem;
}
.changeeyes {
  float: right;
  background: url("../assets/my/zhengyan.png") no-repeat 0 0;
  width: 0.8rem;
  height: 0.6rem;
  margin-top: 0.3rem;
  margin-right: 0.4rem;
}
.dl_choice {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -0%);
}
.a123 {
  position: relative;
}
.dl_zhuce {
  float: left;
}
.dl_fen {
  float: left;
  margin: 0rem 0.5rem;
}
.dl_forget {
  float: left;
}
</style>
