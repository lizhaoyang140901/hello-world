<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img :src="lefturl" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">修改登录密码</van-col>
      </van-row>
    </header>
    <div>
      <!-- 手机号 -->
      <van-field v-model="tel" type="number" placeholder="请输入手机号" maxlength="11" />
      <!-- 验证码 -->
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码" type="number">
        <template #button>
          <van-button size="small" color="#6678ff" @click="zc_verify" v-show="show">获取验证码</van-button>
          <van-button size="small" color="#6678ff" class="count" v-show="!show">{{ count }}</van-button>
        </template>
      </van-field>
	  <van-cell-group>
	    <van-field
	      v-model="value_old"
	      placeholder="请输入老密码"
	      type="password"
	      style="width:8rem"
	      maxlength="12"
	      v-show="!dl_eyes_old"
	    />
	    <van-field
	      v-model="value_old"
	      placeholder="请输入老密码"
	      style="width:8rem"
	      maxlength="12"
	      v-show="dl_eyes_old"
	    />
	    <div class="dl_showpsd" @click="changeeyes_old" :class="{changeeyes_old:dl_eyes_old}"></div>
	  </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="value"
          placeholder="新密码 | 8-12位数字字母"
          type="password"
          style="width:8rem"
          maxlength="12"
          v-show="!dl_eyes"
        />
        <van-field
          v-model="value"
          placeholder="新密码 | 8-12位数字字母"
          style="width:8rem"
          maxlength="12"
          v-show="dl_eyes"
        />
        <div class="dl_showpsd" @click="changeeyes" :class="{changeeyes:dl_eyes}"></div>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="value1"
          placeholder="请确认新密码 | 8-12位数字字母"
          type="password"
          style="width:8rem"
          maxlength="12"
          v-show="!dl_eyes1"
        />
        <van-field
          v-model="value1"
          placeholder="请确认新密码 | 8-12位数字字母"
          style="width:8rem"
          maxlength="12"
          v-show="dl_eyes1"
        />
        <div class="dl_showpsd" @click="changeeyes1" :class="{changeeyes1:dl_eyes1}"></div>
      </van-cell-group>
	  <div class="zhBtn" @click="dl_tijiao">绑定完成</div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'

export default {
	name: "xiugaimima",
	data() {
		return {
			lefturl:require('../assets/images/left.png'),
			tel: "",
			sms: "",
			show: true,
			count: "",
			verify_id:"",
			dl_eyes: false,
			value_old:"",
			value: "",
			dl_eyes1: false,
			value1: "",
			dl_eyes_old: false
		};
	},
  methods: {
    jumpB() {
      this.$router.go(-1);
    },
	changeeyes_old() {
		this.dl_eyes_old = !this.dl_eyes_old;
	},
    changeeyes() {
      this.dl_eyes = !this.dl_eyes;
    },
    changeeyes1() {
      this.dl_eyes1 = !this.dl_eyes1;
    },
    zc_verify() {
      if (this.tel == "") {
        this.show = true;
        clearInterval(this.timer);
        this.timer = null;
        this.$toast("手机号不能为空");
      } else if (!/^1[3456789]\d{9}$/.test(this.tel)) {
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
    dl_tijiao() {
		// this.$router.push({ name: "my"})
		var that = this;
		if (this.tel == "") {
			this.$toast({
				message: "手机号不能为空",
				icon: "chat-o"
			});
		} else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/.test(this.tel)) {
			this.$toast({
				message: "请正确填写手机号",
				icon: "chat-o"
			});
		} else if(this.value_old == "") {
			// this.$toast('请输入验证码');
			this.$toast({
				message: "请输入老密码",
				icon: "chat-o"
			});
		} else if (this.value == "") {
			// this.$toast('请输入验证码');
			this.$toast({
				message: "请输入新密码",
				icon: "chat-o"
			});
		} else if (!/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}/.test(this.value)) {
			this.$toast({
				message: "请按照要求输入新密码",
				icon: "chat-o"
			});
		} else if (this.value1 == "") {
			this.$toast({
				message: "请再次输入新密码",
				icon: "chat-o"
			});
		} else if (!/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}/.test(this.value1)) {
			this.$toast({
				message: "请按照要求再次输入新密码",
				icon: "chat-o"
			});
		} else if (this.value != this.value1) {
			this.$toast({
				message: "两次密码输入不一致",
				icon: "chat-o"
			});
		} else if (this.sms == "") {
			this.$toast({
				message: "请输入验证码",
				icon: "chat-o"
			});
		}
		else {
			this.$axios.post('https://test.sazjob.com/customapi/User/resetpassword',{
				mobile: this.tel,
				verify_id: this.verify_id,
				verify: this.sms,
				phone: this.tel,
				oldpassword:this.value_old,
				password: this.value,	
				repassword :this.value1
			}).then(_d => {
				this.tel = '';
				this.sms = '';
				this.value_old = '';
				this.value = '';
				this.value1 = '';
				console.log(_d);
				if(_d.data.status == 200){
					this.$toast({
						message: "密码修改成功",
						icon: "chat-o"
					});
					that.$router.push({ name: "login" });
				}else if(_d.data.status == 105){
					this.$toast({
						message: "手机号不合法",
						icon: "chat-o"
					});
				}else if(_d.data.status == 106){
					this.$toast({
						message: "登录密码不正确",
						icon: "chat-o"
					});
				}else {
					this.$toast({
						message: "操作失败,请稍候重试",
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
.van-cell {
  /* border-bottom: 1px solid #ebedf0; */
  float: left;
}
.van-cell-group {
  /* border-bottom: 1px solid #ebedf0; */
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
.changeeyes1{
  float: right;
  background: url("../assets/my/zhengyan.png") no-repeat 0 0;
  width: 0.8rem;
  height: 0.6rem;
  margin-top: 0.3rem;
  margin-right: 0.4rem;
} 
.changeeyes_old{
  float: right;
  background: url("../assets/my/zhengyan.png") no-repeat 0 0;
  width: 0.8rem;
  height: 0.6rem;
  margin-top: 0.3rem;
  margin-right: 0.4rem;
} 
.changeeyes{
  float: right;
  background: url("../assets/my/zhengyan.png") no-repeat 0 0;
  width: 0.8rem;
  height: 0.6rem;
  margin-top: 0.3rem;
  margin-right: 0.4rem;
}
.zhBtn{
    background: #6678ff;
    height: 1.2rem;
    border-radius: 0.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.4rem;
    float: left;
    width: 80%;
    margin: 0 1rem;
}
</style>
