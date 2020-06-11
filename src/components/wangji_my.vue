<template>
  <div>
    <div class="wj_title">
      <img src="../assets/my/left.png" alt @click="wj_fan()" />
      <span>忘记密码</span>
    </div>
    <!-- 手机号 -->
    <van-field v-model="tel" type="number" placeholder="请输入手机号" maxlength="11" />
    <!-- 验证码 -->
    <van-field v-model="sms" center clearable placeholder="请输入短信验证码" type="number">
      <template #button>
        <van-button size="small" type="primary" @click="zc_verify" v-show="show">获取验证码</van-button>
        <van-button size="small" type="primary" class="count" v-show="!show">{{ count }}</van-button>
      </template>
    </van-field>
    <!-- 输入密码 -->
    <van-field 
		v-model="password" 
		type="password" 
		placeholder="密码  |  8-12位数字字母结合" 
		maxlength="12" />
    <!-- 再次确认密码 -->
    <van-field
      v-model="password1"
      type="password"
      placeholder="再次确认密码"
      class="zc_again"
      maxlength="12"
    />
    <!-- 提交按钮 -->
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" @click="zc_tijiao">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "zhuce_my",
  data() {
    return {
      tel: "",
      password: "",
      password1: "",
      value: "",
      label: "",
      showPicker: false,
      sms: "",
      show: true,
      count: "",
      timer: null,
      verify_id: "",
      checked: true,
      yanzheng: ""
    };
  },
  methods: {
    wj_fan() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
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
        // var set=this.$set
        // var verify_id = this.verify_id
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
        this.$axios
          .post("https://test.sazjob.com/customapi/User/sendSms", {
            mobile: this.tel
          })
          .then(function(response) {
            // console.log(response);
            // console.log(response.data.status);
            // console.log(response.data.key);
            // console.log(verify_id)
            that.verify_id = response.data.key;
            // set(this.verify_id,response.data.key)
			console.log(response.data.code);
            console.log(that.verify_id);
            // this.verify_id = verify_id
            if (response.data.status == 200) {
              Toast.success("验证码发送成功,请注意查收");
            } else if (response.data.status == 201) {
              Toast("手机号格式错误");
            } else if (response.data.status == 102) {
              Toast("手机号格式错误");
            } 
            else {
              Toast.fail("网络不佳请稍后重试");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    zc_tijiao() {
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
      } else if (this.sms == "") {
        // this.$toast('请输入验证码');
        this.$toast({
          message: "请输入验证码",
          icon: "chat-o"
        });
      } else if (this.password == "") {
        // this.$toast('请输入密码');
        this.$toast({
          message: "请输入密码",
          icon: "chat-o"
        });
      } else if (
        !/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}/.test(this.password)
      ) {
        // this.$toast('请按照要求输入密码');
        this.$toast({
          message: "请按照要求输入密码",
          icon: "chat-o"
        });
      } else if (this.password1 == "") {
        // this.$toast('请再次确认密码');
        this.$toast({
          message: "请再次确认密码",
          icon: "chat-o"
        });
      } else if (this.password !== this.password1) {
        // this.$toast('请两次输入的密码不一致');
        this.$toast({
          message: "两次输入的密码不一致",
          icon: "chat-o"
        });
      } else {
        var Toast = this.$toast;
		var that = this;
		let data ={
			phone:this.tel,
			password:this.password,
			resPassword:this.password1,
			mobile:this.tel,
			verify:this.sms,
			verify_id:this.verify_id
		}
        this.$axios.post('https://test.sazjob.com/customapi/User/forgetPassword',data).then(function(response) {
            console.log(response);
			if(response.data.status == 200){
				Toast.success({
				  message: "修改成功",
				  icon: "chat-o"
				});
			}
			setTimeout(function() {
			  that.$router.push({ name: "login" });
			}, 2000);
          }).catch(function(error) {
			  console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
.wj_title {
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
.wj_title img {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0.03rem 0.25rem 0.2rem 0rem;
}
.wj_title span {
  font-size: 0.5rem;
  height: 1.4rem;
  line-height: 1.4rem;
}
</style>