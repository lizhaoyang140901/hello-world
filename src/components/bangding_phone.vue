<template>
  <div>
    <header>
      <van-row>
        <van-col>
          <img src="../assets/images/left.png" alt class="leftImg" @click="jumpB();" />
        </van-col>
        <van-col class="zshejishi">绑定手机号</van-col>
      </van-row>
    </header>
    <!-- 手机号 -->
    <van-field v-model="tel" type="number" placeholder="请输入手机号" maxlength="11" />
    <!-- 验证码 -->
    <van-field v-model="sms" center clearable placeholder="请输入短信验证码" type="number">
      <template #button>
        <van-button size="small" color="#6678ff" @click="zc_verify" v-show="show">获取验证码</van-button>
        <van-button size="small" color="#6678ff" class="count" v-show="!show">{{ count }}</van-button>
      </template>
    </van-field>
    <div class="zhBtn" @click="bangding">绑定完成</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "bangding_phone",
  data() {
    return {
      tel: "",
      sms: "",
      show: true,
      count: "",
    };
  },
  methods: {
    jumpB() {
      this.$router.go(-1);
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
        axios
          .post("/apis/customapi/User/sendSms", {
            mobile: this.tel
          })
          .then(function(response) {
            console.log(response.data);
            $store.dispatch("tijiaoyz",response.data.code).then(res => {})
            console.log(response.data.code);
            that.verify_id = response.data.key;
            // console.log(that.verify_id);
            if (response.data.status == 200) {
              Toast.success("验证码发送成功");
            } else if (response.data.status == 201) {
              Toast("手机号格式错误");
            } else if (response.data.status == 102) {
              Toast("手机号格式错误");
            } else {
              Toast.fail("网络不佳请稍后重试");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    bangding(){
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
      } else if (this.sms == "") {
        this.$toast({
          message: "请输入验证码",
          icon: "chat-o"
        });
      } else if (this.sms != that.$store.state.phone_code) {
        this.$toast({
          message: "验证码输入错误",
          icon: "chat-o"
        });
      } else {
        this.$toast({
          message: "绑定成功",
          icon: "chat-o"
        });
        setTimeout(function() {
          that.$router.push({ name: "login" });
        }, 3000);
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
</style>
